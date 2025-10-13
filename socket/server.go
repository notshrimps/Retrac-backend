package socket

import (
	"encoding/json"
	"fmt"
	"slices"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/servers"
	"github.com/gofiber/contrib/websocket"
)

type ServerSocketEvent int

const ServerSocketEventEnumInitiate ServerSocketEvent = 0
const ServerSocketEventEnumSetPlayers ServerSocketEvent = 1
const ServerSocketEventEnumKickPlayers ServerSocketEvent = 2

type ServerSocketData struct {
	server *servers.GameServer
}

type serverSocketMessage struct {
	Event ServerSocketEvent `json:"event"`
}

type serverSocketMessageAuth struct {
	Payload struct {
		ExchangeCode string `json:"exchangeCode"`
		SessionID string `json:"sessionId"`
	} `json:"payload"`
}


var serverHandlers = map[ServerSocketEvent]func(*Socket[ServerSocketData], []byte) error {
	ServerSocketEventEnumInitiate: handleServerAuth,
}

func HandleNewServerSocket(identifier string) {
	socket, ok := ServerSockets.Get(identifier)
	if !ok {
		return
	}
	defer handleServerDisconnect(socket)

	// fmt.Println("SERVER SOCKET CONNECTION")

	for {
		_, message, err := socket.Connection.ReadMessage()
		if err != nil {
			return
		}

		data := serverSocketMessage{}
		if err := json.Unmarshal(message, &data); err != nil {
			return
		}

		if handler, ok := serverHandlers[data.Event]; ok {
			if err := handler(socket, message); err != nil {
				socket.WriteWithStatus(8, websocket.FormatCloseMessage(1008, err.Error()))
				return
			}
		}
	}
}

func handleServerDisconnect(socket *Socket[ServerSocketData]) {
	ServerSockets.Delete(socket.ID)
}

func handleServerAuth(socket *Socket[ServerSocketData], raw []byte) error {
	var body serverSocketMessageAuth
	if err := json.Unmarshal(raw, &body); err != nil {
		return err
	}

	fmt.Println("Server Initiate", body.Payload.ExchangeCode, body.Payload.SessionID)
	if !slices.Contains[[]string](aid.Config.Accounts.Codes, body.Payload.ExchangeCode) {
		fmt.Println("Invalid Exchange Code")
		return fmt.Errorf("Invalid Exchange Code")
	}

	socket.Data.server = servers.Manager.GetServer(body.Payload.SessionID)
	if socket.Data.server == nil {
		fmt.Println("Server not found")
		return fmt.Errorf("Invalid Session ID")
	}

	// for _, team := range socket.Data.server.Parties {
	// 	party := parties.PartyManager.GetParty(team)
	// 	if party == nil {
	// 		continue
	// 	}

	// 	players := []string{}
	// 	for _, player := range party.Members {
	// 		players = append(players, player.Person.DisplayName + ":" + player.Person.ID)
	// 	}

	// 	newEventData.Data = append(newEventData.Data.([]serverSetTeamData), serverSetTeamData{
	// 		Fill: false,
	// 		Players: players,
	// 	})
	// }

	// h := aid.JSONStringify(newEventData)
	// socket.Write([]byte(h))

	return nil
}