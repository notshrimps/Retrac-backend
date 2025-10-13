package socket

import (
	"slices"
	"strings"
	"time"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/parties"
	"github.com/ectrc/snow/person"
	"github.com/ectrc/snow/servers"
	"github.com/gofiber/contrib/websocket"
)

type TicketOptions struct {
	PartyPlayerIds string `form:"partyPlayerIds"`
	BucketId string `form:"bucketId"`
	PlayerPlatform string `form:"player.platform"`
	PlayerSubregions string `form:"player.subregions"`
	PlayerOptionFillTeam string `form:"player.option.fillTeam"`
	PlayerOptionCrossplayOptOut string `form:"player.option.crossplayOptOut"`
	PlayerOptionCustomKey string `form:"player.option.customKey"`
	PartyWIN string `form:"party.WIN"`
	InputKBM string `form:"input.KBM"`
	PlayerInput string `form:"player.input"`
	PlayerPlayerGroups string `form:"player.playerGroups"`
	Version string
}

type MatchmakerPayload struct {
	TicketID string
	AccountID string
	Options *TicketOptions
	Nonce string
	ExpireAt string
}

type MatchmakerSocketData struct {
	Authorization string
	Constraint string
	TicketPayload *MatchmakerPayload
}

func HandleNewMatchmakerSocket(socketId string) {
	socket, ok := MatchmakerSockets.Get(socketId)
	if !ok {
		return
	}
	defer handleMatchmakerDisconnect(socket)

	authParts := strings.Split(socket.Data.Authorization, " ")
	if len(authParts) != 5 {
		return
	}

	payloadBytes, failed := aid.KeyPair.DecryptAndVerifyB64(authParts[2], authParts[3])
	if failed {
		return
	}
	payload := aid.BytesToStruct[MatchmakerPayload](payloadBytes)
  
	person := person.Find(payload.AccountID)
	if person == nil || person.GetActiveBan() != nil {
		return
	}
  
	party := person.GetCurrentParty()
	if party == nil {
		return
	}

	expired, err := time.Parse(time.RFC3339, payload.ExpireAt)
	if err != nil || time.Now().After(expired) {
		return
	}


	MatchmakerSockets.ChangeKey(socketId, payload.AccountID)
	socket.ID = person.ID
	socket.Person = person
	socket.Data.TicketPayload = &payload
	socket.Data.Constraint = payload.Options.BucketId

	bucket := servers.Manager.GetBucket(socket.Data.Constraint, payload.Options.PlayerOptionCustomKey)
	if bucket == nil {
		if slices.Contains(aid.Config.Fortnite.WhitelistedUsers, socket.Person.DisplayName) {
			bucket = servers.NewBucket(socket.Data.Constraint)
			bucket.CustomKey = payload.Options.PlayerOptionCustomKey
			bucket.Version = payload.Options.Version
			servers.Manager.AddBucket(bucket)
		} else {
			bucket = servers.Manager.GetBucket(socket.Data.Constraint, "")
			if bucket == nil {
				bucket = servers.NewBucket(socket.Data.Constraint)
				bucket.Version = payload.Options.Version
				servers.Manager.AddBucket(bucket)
			}
		}
	}

	if party.Captain.Person.ID == person.ID { 
		// object, location := bucket.GetPlayerLocation(person)
		// if location == servers.PlayerLocationEnumServer {
		// 	object.(*servers.GameServer).RemoveTeam(party)
		// }

		bucket.AddToQueue(party)
	}

	EmitMatchmakerConnecting(person)
	EmitMatchmakerWaitingForParty(person, party)

	for {
		t, _, failed := socket.Connection.ReadMessage()
		if failed != nil {
			break
		}

		if t == websocket.CloseMessage {
			break
		}
	}
}

func handleMatchmakerDisconnect(socket *Socket[MatchmakerSocketData]) {
	aid.Print("Closing matchmaker socket for:", socket.Person.DisplayName)

	socket.WriteWithStatus(8, websocket.FormatCloseMessage(1008, "Matchmaking Closed"))
	socket.Remove()
	recover()

	key := aid.Ternary(socket.Person.IsWhitelisted(), socket.Data.TicketPayload.Options.PlayerOptionCustomKey, "")
	bucket := servers.Manager.GetBucket(socket.Data.Constraint, key)
	if bucket == nil {
		return
	}

	party := socket.Person.GetCurrentParty()
	if party != nil {
		if party.Captain.Person.ID == socket.Person.ID {
			EmitMatchmakerStoppedByLeader(party)
			bucket.RemoveFromQueue(party)
		}
	}
}

func matchmakeTick() {
	// update player frontend in queue
	for _, bucket := range servers.Manager.Buckets {
		for _, party := range bucket.Queue {
			party := parties.PartyManager.GetParty(party)
			if party == nil {
				continue
			}

			for _, member := range party.Members {
				EmitMatchmakerQueueUpdate(member.Person, bucket)
			}
		}
	}

	// check if a server is available for a bucket, if not create one
	for _, bucket := range servers.Manager.Buckets {
		if len(bucket.GetReadyServers()) == 0 && len(bucket.Queue) > 1 {
			if len(bucket.Servers) >= 1 {
				continue
			}
			aid.Print("No servers available for bucket:", bucket.Constraint, "Creating new server.")

			region := strings.Split(bucket.Constraint, ":")[2]
			regionLookupMap := map[string][]*servers.HosterInteractor{
				"EU": servers.EU_Hosters,
				"NA": servers.NA_Hosters,
			}

			if regionLookupMap[region] == nil || len(regionLookupMap[region]) == 0 {
				aid.Print("No hosters available for region:", region)
				continue
			}

			for _, hoster := range regionLookupMap[region] {
				server := servers.TryCreateAndAddServer(hoster, bucket.Constraint, bucket.CustomKey, bucket.Version)
				if server == nil {
					aid.Print("Failed to create server for bucket:", bucket.Constraint)
					continue
				}

				aid.Print("Created new server for bucket:", bucket.Constraint)
				break
			}
		}
 	}

	// assign parties to available servers
	for _, bucket := range servers.Manager.Buckets {
		for _, server := range bucket.GetReadyServers() {
			for i := 0; i < 100; i++ {
				party := bucket.PopQueue()
				if party == nil {
					break
				}

				server.AddTeam(party)
				bucket.RemoveFromQueue(party)
				EmitMatchmakerSessionAssigned(party, server)
			}
		}
	}

	// tell frontend to join the server
	for _, bucket := range servers.Manager.Buckets {
		for _, server := range bucket.GetReadyServers() {
			for _, party := range server.Parties {
				party := parties.PartyManager.GetParty(party)
				if party == nil {
					continue
				}

				EmitMatchmakerJoinSession(party, server)
			}
		}
	}
}

func init() {
	// go func() {
	// 	time.Sleep(5 * time.Second)
	// 	servers.Manager.AddBucket(servers.NewBucket("6037427:0:EU:playlist_vamp_solo"))
	// 	server := servers.NewGameServer("1216d00c-5fe1-4a80-9998-3bf42be83052", "6037427:0:EU:playlist_vamp_solo")
	// 	server.Bind("127.0.0.1", 7777)
	// 	server.SetStatus(servers.GameServerStatusEnumAvailable)
	// 	servers.Manager.GetBucket("6037427:0:EU:playlist_vamp_solo").AddServer(server)
	// 	fmt.Println("Added test server")
	// }()

	aid.Ticker(1000 * time.Millisecond, matchmakeTick)
}