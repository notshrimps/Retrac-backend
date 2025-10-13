package handlers

import (
	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/socket"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func MiddlewareWebsocket(c *fiber.Ctx) error {
	if g := c.Request().Header.Peek("Sec-WebSocket-Protocol"); g == nil {
		return fiber.NewError(400, "Invalid protocol")
	}

	switch c.Get("Sec-WebSocket-Protocol") {
	case "xmpp":
		c.Locals("protocol", "jabber")
	default:
		c.Locals("protocol", "matchmaking")
		c.Locals("authorization", c.Get("Authorization"))
	}
	c.Locals("identifier", "ws-"+aid.RandomString(18))

	return c.Next()
}

func WebsocketConnection(c *websocket.Conn) {
	protocol := c.Locals("protocol").(string)
	identifier := c.Locals("identifier").(string)

	switch protocol {
	case "jabber":
		socket.JabberSockets.Set(identifier, socket.NewJabberSocket(c, identifier, socket.JabberSocketData{}))
		socket.HandleNewJabberSocket(identifier)
	case "matchmaking":
		socket.MatchmakerSockets.Set(identifier, socket.NewMatchmakerSocket(c, socket.MatchmakerSocketData{
			Authorization: c.Locals("authorization").(string),
		}))
		socket.HandleNewMatchmakerSocket(identifier)
	case "server":
		socket.ServerSockets.Set(identifier, socket.NewServerSocket(c, socket.ServerSocketData{}))
		socket.HandleNewServerSocket(identifier)
	case "player":
		socket.PlayerSockets.Set(identifier, socket.NewPlayerSocket(c, socket.PlayerSocketData{}))
		socket.HandleNewPlayerSocket(identifier)
	default:
		aid.Print("Invalid protocol: " + protocol)
	}
}

func GetSnowConnectedSockets(c *fiber.Ctx) error {
	jabber := aid.JSON{}
	socket.JabberSockets.Range(func(key string, value *socket.Socket[socket.JabberSocketData]) bool {
		jabber[key] = value
		return true
	})

	matchmaking := aid.JSON{}
	socket.MatchmakerSockets.Range(func(key string, value *socket.Socket[socket.MatchmakerSocketData]) bool {
		matchmaking[key] = value
		return true
	})

	return c.Status(200).JSON(aid.JSON{
		"jabber": jabber,
		"matchmaking": matchmaking,
	})
}