package socket

import (
	"fmt"
	"reflect"
	"time"

	"github.com/beevik/etree"
	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/person"
	"github.com/gofiber/contrib/websocket"
)

type JabberSocketData struct {
	JabberID string
	PartyID string
	LastPresence string
}

var jabberHandlers = map[string]func(*Socket[JabberSocketData], *etree.Document) error {
	"stream": jabberStreamHandler,
	"open": jabberOpenHandler,
	"iq": jabberIqRootHandler,
	"presence": jabberPresenceRootHandler,
	"message": jabberMessageHandler,
}

func HandleNewJabberSocket(identifier string) {
	socket, ok := JabberSockets.Get(identifier)
	if !ok {
		return
	}
	defer socket.CloseJabberSocket()

	for {
		_, message, failed := socket.Connection.ReadMessage()
		if failed != nil {
			break
		}

		socket.LastMessage = time.Now()
		JabberSocketOnMessage(socket, message)
	}
}

func (socket *Socket[JabberSocketData]) CloseJabberSocket() {
	if socket.Person == nil {
		return
	}

	party := socket.Person.GetCurrentParty()
	if party != nil {
		if party.Captain.Person.ID == socket.Person.ID && len(party.Members) > 0 {
			party.PromoteMember(party.GetFirstMember())
			EmitPartyNewCaptain(party)
		}
		EmitPartyMemberLeft(party, party.GetMember(socket.Person))
		party.RemoveMember(socket.Person)

		for _, member := range party.Members {
			memberSocket, ok := JabberSockets.Get(member.Person.ID)
			if !ok {
				continue
			}

			memberSocket.JabberNotifyFriends()
		}

		socket.JabberNotifyFriends()
	}

	socket.WriteWithStatus(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, "bye bye"))
	socket.Remove()
}

func JabberSocketOnMessage(socket *Socket[JabberSocketData], message []byte) {
	parsed := etree.NewDocument()
	if err := parsed.ReadFromString(string(message)); err != nil {
		return
	}

	if handler, ok := jabberHandlers[parsed.Root().Tag]; ok {
		if err := handler(socket, parsed); err != nil {
			// socket.CloseJabberSocket()
			return 
		}
		return
	}
}

func jabberStreamHandler(socket *Socket[JabberSocketData], parsed *etree.Document) error {
	return nil
}

func jabberOpenHandler(socket *Socket[JabberSocketData], parsed *etree.Document) error {
	socket.Write([]byte(`<open xmlns="urn:ietf:params:xml:ns:xmpp-framing" from="prod.ol.epicgames.com" version="1.0" id="`+ socket.ID +`" />`))
	socket.Write([]byte(`<stream:features xmlns:stream="http://etherx.jabber.org/streams" />`))
	return nil
}

func jabberIqRootHandler(socket *Socket[JabberSocketData], parsed *etree.Document) error {
	if parsed.Root().SelectAttr("type").Value == "get" {
		socket.Write([]byte(`<iq xmlns="jabber:client" type="result" id="`+ parsed.Root().SelectAttr("id").Value +`" from="prod.ol.epicgames.com" to="`+ socket.Data.JabberID +`" />`))
		return nil
	}

	snowId, err := aid.GetSnowFromToken(parsed.FindElement("/iq/query/password").Text())
	if err != nil {
		return err
	}

	person := person.Find(snowId)
	if person == nil {
		return fmt.Errorf("person not found")
	}

	JabberSockets.ChangeKey(socket.ID, person.ID)
	socket.ID = person.ID
	socket.Person = person
	socket.Data.JabberID = snowId + "@prod.ol.epicgames.com/" + parsed.FindElement("/iq/query/resource").Text()
	socket.Data.PartyID = person.DisplayName + ":" + person.ID + parsed.FindElement("/iq/query/resource").Text()

	socket.Write([]byte(`<iq xmlns="jabber:client" type="result" id="_xmpp_auth1" from="prod.ol.epicgames.com" to="`+ socket.Data.JabberID +`" />`))
	return nil
}

func jabberPresenceRootHandler(socket *Socket[JabberSocketData], parsed *etree.Document) error {
	status := parsed.FindElement("/presence/status")
	if status == nil {
		return jabberPresenceJoinGroupchat(socket, parsed)
	}

	socket.Data.LastPresence = status.Text()
	socket.JabberNotifyFriends()

	return nil
}

func jabberPresenceJoinGroupchat(socket *Socket[JabberSocketData], parsed *etree.Document) error {
	towards := parsed.FindElement("/presence").SelectAttr("to").Value

	partyId := aid.Regex(towards, `Party-(.*?)@`)
	if partyId == nil {
		return nil
	}

	// party, ok := person.Parties.Get(*partyId)
	party := socket.Person.GetCurrentParty()
	if party == nil {
		return nil
	}

	for _, member := range party.Members {
		if member.Person.ID == socket.ID {
			return nil
		}
	
		memberSocket, ok := JabberSockets.Get(member.Person.ID)
		if !ok {
			continue
		}
		memberPartyId := "Party-" + party.ID + "@muc.prod.ol.epicgames.com/" + memberSocket.Data.PartyID
		memberRole := aid.Ternary[string](party.Captain.Person.ID == member.Person.ID, "moderator", "participant")
		memberAffiliation := aid.Ternary[string](party.Captain.Person.ID == member.Person.ID, "owner", "none")

		socket.Write([]byte(`<presence xmlns="jabber:client" from="`+ memberPartyId +`" to="`+ socket.Data.JabberID +`">
			<x xmlns="http://jabber.org/protocol/muc#user">
				<item 
					affiliation="`+ memberAffiliation +`" 
					role="`+ memberRole +`" 
					jid="`+ memberSocket.Data.JabberID +`"
					nick="`+ memberPartyId +`"
				/>
			</x>
		</presence>`))
	}

	socketPartyId := "Party-" + party.ID + "@muc.prod.ol.epicgames.com/" + socket.Data.PartyID
	socketRole := aid.Ternary[string](party.Captain.Person.ID == socket.ID, "moderator", "participant")
	socketAffiliation := aid.Ternary[string](party.Captain.Person.ID == socket.ID, "owner", "none")

	socket.Write([]byte(`<presence xmlns="jabber:client" from="`+ socketPartyId +`" to="`+ socket.Data.JabberID +`">
		<x xmlns="http://jabber.org/protocol/muc#user">
			<item 
				affiliation="`+ socketAffiliation +`" 
				role="`+ socketRole +`" 
				jid="`+ socket.Data.JabberID +`"
				nick="`+ socketPartyId +`"
			/>
			<status code="110"/>
			<status code="100"/>
			<status code="170"/>
		</x>
	</presence>`))

	return nil
}

func jabberMessageHandler(socket *Socket[JabberSocketData], parsed *etree.Document) error {
	message := parsed.FindElement("/message")
	if message.FindElement("/body") == nil {
		return nil
	}

	towards := message.SelectAttr("to")
	if towards == nil {
		return nil
	}

	redirect := map[string]func(*Socket[JabberSocketData], *etree.Document) error {
		"chat": jabberMessageChatHandler,
		"groupchat": jabberMessageGroupchatHandler,
	}

	if handler, ok := redirect[towards.Value]; ok {
		if err := handler(socket, parsed); err != nil {
			return err
		}
	}

	return nil
}

func jabberMessageChatHandler(socket *Socket[JabberSocketData], parsed *etree.Document) error {
	return nil
}

func jabberMessageGroupchatHandler(socket *Socket[JabberSocketData], parsed *etree.Document) error {
	return nil
}

func (s *Socket[T]) JabberSendMessageToPerson(jabberId string, data aid.JSON) {
	if reflect.TypeOf(s.Data) != reflect.TypeOf(&JabberSocketData{}) {
		return
	}

	s.Write([]byte(`<message xmlns="jabber:client" from="xmpp-admin@prod.ol.epicgames.com" to="`+ jabberId +`">
		<body>`+ string(data.ToBytes()) +`</body>
	</message>`))
}

func (s *Socket[T]) JabberNotifyFriends() {
	if reflect.TypeOf(s.Data) != reflect.TypeOf(&JabberSocketData{}) {
		return
	}

	jabberSocket, ok := JabberSockets.Get(s.ID)
	if !ok {
		aid.Print("jabber socket not found even though it should be")
		return
	}

	s.Person.Relationships.Range(func(key string, value *person.Relationship) bool {
		friendSocket, found := JabberSockets.Get(value.From.ID)
		if value.Direction == person.RelationshipOutboundDirection {
			friendSocket, found = JabberSockets.Get(value.Towards.ID)
		}
		if !found {
			return true
		}

		friendSocket.Write([]byte(`<presence xmlns="jabber:client" type="available" from="`+ jabberSocket.Data.JabberID +`" to="`+ friendSocket.Data.JabberID +`">
			<status>`+ jabberSocket.Data.LastPresence +`</status>
		</presence>`))

		jabberSocket.Write([]byte(`<presence xmlns="jabber:client" type="available" from="`+ friendSocket.Data.JabberID +`" to="`+ jabberSocket.Data.JabberID +`">
			<status>`+ friendSocket.Data.LastPresence +`</status>
		</presence>`))

		return true
	})

	jabberSocket.Write([]byte(`<presence xmlns="jabber:client" type="available" from="`+ jabberSocket.Data.JabberID +`" to="`+ jabberSocket.Data.JabberID +`">
		<status>`+ jabberSocket.Data.LastPresence +`</status>
	</presence>`))
}

func jabberTick() {
	JabberSockets.Range(func(key string, socket *Socket[JabberSocketData]) bool {
		if time.Now().Sub(socket.LastMessage) > 5 * time.Minute {
			socket.CloseJabberSocket()
		}
		return true
	})
}

func init() {
	aid.Ticker(200 * time.Second, jabberTick)
}