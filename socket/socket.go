package socket

import (
	"reflect"
	"sync"
	"time"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/person"
	"github.com/gofiber/contrib/websocket"
	"github.com/google/uuid"
)

type Socket[T JabberSocketData | MatchmakerSocketData | ServerSocketData | PlayerSocketData] struct {
	ID string
	Connection *websocket.Conn
	Data *T
	Person *person.Person
	M sync.Mutex
	LastMessage time.Time
}

func (s *Socket[T]) Write(payload []byte) {
	s.M.Lock()
	err := s.Connection.WriteMessage(websocket.TextMessage, payload)
	if err != nil {
		// fmt.Println("Error for Jabber Socket", s.Person.DisplayName, err.Error())
		// s.Remove()
	}
	s.M.Unlock()

	// recover()
}

func (s *Socket[T]) WriteWithStatus(messageType int, payload []byte) {
	s.M.Lock()
	err := s.Connection.WriteMessage(messageType, payload)
	if err != nil {
		// fmt.Println("Error for Jabber Socket", s.Person.DisplayName, err.Error())
		// s.Remove()
	}
	s.M.Unlock()

	// recover()
}

func (s *Socket[T]) JSON(j aid.JSON) {
	s.Write(j.ToBytes())
}

func (s *Socket[T]) Remove() {
	s.M.Lock()
	defer s.M.Unlock()

	reflectType := reflect.TypeOf(s.Data).String()
	switch reflectType {
	case "*socket.JabberSocketData":
		JabberSockets.Delete(s.ID)
	case "*socket.MatchmakerSocketData":
		MatchmakerSockets.Delete(s.ID)
	default:
		aid.Print("Invalid socket type: " + reflectType)
	}
}

func newSocket[T JabberSocketData | MatchmakerSocketData | ServerSocketData | PlayerSocketData](conn *websocket.Conn, data ...T) *Socket[T] {
	additional := data[0]

	conn.SetCloseHandler(nil)

	return &Socket[T]{
		ID: uuid.New().String(),
		Connection: conn,
		Data: &additional,
		LastMessage: time.Now(),
	}
}

func NewJabberSocket(conn *websocket.Conn, id string, data JabberSocketData) *Socket[JabberSocketData] {
	socket := newSocket[JabberSocketData](conn, data)
	socket.ID = id
	return socket
}

func NewMatchmakerSocket(conn *websocket.Conn, data MatchmakerSocketData) *Socket[MatchmakerSocketData] {
	return newSocket[MatchmakerSocketData](conn, data)
}

func NewServerSocket(conn *websocket.Conn, data ServerSocketData) *Socket[ServerSocketData] {
	return newSocket[ServerSocketData](conn, data)
}

func NewPlayerSocket(conn *websocket.Conn, data PlayerSocketData) *Socket[PlayerSocketData] {
	return newSocket[PlayerSocketData](conn, data)
}

var (
	JabberSockets = aid.GenericSyncMap[Socket[JabberSocketData]]{}
	MatchmakerSockets = aid.GenericSyncMap[Socket[MatchmakerSocketData]]{}
	ServerSockets = aid.GenericSyncMap[Socket[ServerSocketData]]{}
	PlayerSockets = aid.GenericSyncMap[Socket[PlayerSocketData]]{}
)