package socket

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/person"
	"github.com/gofiber/contrib/websocket"
)

type PlayerSocketData struct{}


type playerSocketEventTypeEnum int
const playerSocketEventTypeEnumAuth playerSocketEventTypeEnum = 0

type playerSocketMessage struct {
	EventType playerSocketEventTypeEnum `json:"eventType"`
}

type playerSocketMessageAuth struct {
	ExchangeCode string `json:"exchangeCode"`
}

var playerHandlers = map[playerSocketEventTypeEnum]func(*Socket[PlayerSocketData], []byte) error {
	playerSocketEventTypeEnumAuth: handlePlayerAuth,
}

func HandleNewPlayerSocket(identifier string) {
	socket, ok := PlayerSockets.Get(identifier)
	if !ok {
		return
	}
	defer handlePlayerDisconnect(socket)

	for {
		_, message, err := socket.Connection.ReadMessage()
		if err != nil {
			return
		}

		data := playerSocketMessage{}
		if err := json.Unmarshal(message, &data); err != nil {
			return
		}

		if handler, ok := playerHandlers[data.EventType]; ok {
			if err := handler(socket, message); err != nil {
				socket.WriteWithStatus(8, websocket.FormatCloseMessage(1008, err.Error()))
				return
			}
		}
	}
}

func handlePlayerAuth(socket *Socket[PlayerSocketData], raw []byte) error {
	var body playerSocketMessageAuth
	if err := json.Unmarshal(raw, &body); err != nil {
		return err
	}

	codeParts := strings.Split(body.ExchangeCode, ".")
  if len(codeParts) != 2 {
    return fmt.Errorf("Invalid Exchange Code")
  }

  code, failed := aid.KeyPair.DecryptAndVerifyB64(codeParts[0], codeParts[1])
  if failed {
    return fmt.Errorf("Invalid Exchange Code")
  }

  personParts := strings.Split(string(code), "=")
  if len(personParts) != 2 {
    return fmt.Errorf("Invalid Exchange Code")
  }

  personId := personParts[0]
  expire, err := time.Parse("2006-01-02T15:04:05.999Z", personParts[1])
  if err != nil {
    return fmt.Errorf("Invalid Exchange Code")
  }

  if expire.Add(10 * time.Minute).Before(time.Now()) {
    return fmt.Errorf("Invalid Exchange Code")
  }

  player := person.Find(personId)
  if player == nil {
    return fmt.Errorf("Invalid Exchange Code")
  }

	socket.Person = player

	socket.JSON(aid.JSON{
		"accountId": player.ID,
		"displayName": player.DisplayName,
	})

	return nil
}

func handlePlayerDisconnect(socket *Socket[PlayerSocketData]) {
	PlayerSockets.Delete(socket.ID)
}