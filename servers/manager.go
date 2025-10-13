package servers

import (
	"strings"

	"github.com/ectrc/snow/parties"
	"github.com/ectrc/snow/person"
)

// manager.AddServer(&GameServer{
// 	ID: uuid.New().String(),
// 	Address: "127.0.0.1",
// 	Port: 7777,
// 	Status: GameServerStatusEnumAvailable,
// 	Teams: []*person.Party{},
// 	Constraints: []string{"0","6037427","EU","playlist_defaultsolo"},
// })

type Bucket struct {
	Constraint string
	CustomKey string
	Version string
	Servers map[string]*GameServer
	Queue []string // array of party ids
}

func NewBucket(constraint string) *Bucket {
	return &Bucket{
		Constraint: constraint,
		Servers: map[string]*GameServer{},
		Queue: []string{},
	}
}

func (b *Bucket) GetServer(serverID string) *GameServer {
	return b.Servers[serverID]
}

func (b *Bucket) AddServer(server *GameServer) {
	b.Servers[server.ID] = server
}

func (b *Bucket) RemoveServer(server *GameServer) {
	if server.Status == GameServerStatusEnumPreparing {
		for _, party := range server.Parties {
			b.AddToQueueFront(party)
			server.RemoveTeam(party)
		}
	}

	delete(b.Servers, server.ID)
}

func (b *Bucket) GetReadyServers() []*GameServer {
	readyservers := []*GameServer{}

	for _, server := range b.Servers {
		if server.Port == -1 {
			continue
		}

		if server.GetPlayers() > 98 {
			continue
		}

		if server.Status != GameServerStatusEnumAvailable {
			continue
		}

		readyservers = append(readyservers, server)
	}

	return readyservers
}

func (b *Bucket) GetQueue() []*person.Party {
	teams := []*person.Party{}

	for _, team := range b.Queue {
		party := parties.PartyManager.GetParty(team)
		if party == nil {
			continue
		}
		
		teams = append(teams, party)
	}

	return teams
}

func (b *Bucket) AddToQueue(party *person.Party) {
	b.Queue = append(b.Queue, party.ID)
}

func (b *Bucket) RemoveFromQueue(party *person.Party) {
	for i, p := range b.Queue {
		if p == party.ID {
			b.Queue = append(b.Queue[:i], b.Queue[i+1:]...)
			return
		}
	}
}

func (b *Bucket) AddToQueueFront(party string) {
	b.Queue = append([]string{party}, b.Queue...)
}

func (b *Bucket) PopQueue() *person.Party {
	if len(b.Queue) == 0 {
		return nil
	}

	party := b.Queue[0]
	b.Queue = b.Queue[1:]
	return parties.PartyManager.GetParty(party)
}


func (b *Bucket) GetQueueSize() int {
	var players int = 0
	for _, party := range b.Queue {
		party := parties.PartyManager.GetParty(party)
		if party == nil {
			continue
		}

		players += len(party.Members)
	}

	return players
}

type PlayerLocationEnum int
const PlayerLocationEnumQueue PlayerLocationEnum = 0
const PlayerLocationEnumServer PlayerLocationEnum = 1
const PlayerLocationEnumUnknown PlayerLocationEnum = 2

func (b *Bucket) GetPlayerLocation(player *person.Person) (interface{}, PlayerLocationEnum) {
	for _, party := range b.Queue {
		party := parties.PartyManager.GetParty(party)
		if party == nil {
			continue
		}

		if party.GetMember(player) != nil {
			return party, PlayerLocationEnumQueue
		}
	}

	return nil, PlayerLocationEnumUnknown
}

type PartyLocationEnum int
const PartyLocationEnumQueue PartyLocationEnum = 0
const PartyLocationEnumServer PartyLocationEnum = 1
const PartyLocationEnumUnknown PartyLocationEnum = 2

func (b *Bucket) GetPartyLocation(party *person.Party) (interface{}, PartyLocationEnum) {
	for _, queueParty := range b.Queue {
		if queueParty == party.ID {
			return queueParty, PartyLocationEnumQueue
		}

		for _, server := range b.Servers {
			for _, serverParty := range server.Parties {
				if serverParty == party.ID {
					return server, PartyLocationEnumServer
				}
			}
		}

		return nil, PartyLocationEnumUnknown
	}

	return nil, PartyLocationEnumUnknown
}

type ServerManager struct {
	Buckets []*Bucket
}

func NewServerManager() *ServerManager {
	return &ServerManager{
		Buckets: []*Bucket{},
	}
}

var Manager = NewServerManager()

func (m *ServerManager) GetBucket(constraint string, customKey string) *Bucket {
	for _, bucket := range m.Buckets {
		if strings.ToLower(bucket.Constraint) == strings.ToLower(constraint) {
			if (customKey != "" || bucket.CustomKey != "") && bucket.CustomKey != customKey {
				continue
			}

			return bucket
		}
	}

	return nil
}

func (m *ServerManager) GetBucketByServer(serverId string) *Bucket {
	for _, bucket := range m.Buckets {
		if bucket.GetServer(serverId) != nil {
			return bucket
		}
	}

	return nil
}

func (m *ServerManager) AddBucket(bucket *Bucket) *Bucket {
	m.Buckets = append(m.Buckets, bucket)
	return bucket
}

func (m *ServerManager) RemoveBucket(constraint string, customKey string) {
	for i, bucket := range m.Buckets {
		if bucket.Constraint == constraint {
			m.Buckets = append(m.Buckets[:i], m.Buckets[i+1:]...)
			return
		}
	}
}

func (m *ServerManager) GetServer(serverID string) *GameServer {
	for _, bucket := range m.Buckets {
		server := bucket.GetServer(serverID)
		if server != nil {
			return server
		}
	}

	return nil
}

func (m *ServerManager) DeleteAllServers() {
	for _, bucket := range m.Buckets {
		for _, server := range bucket.Servers {
			bucket.RemoveServer(server)
		}
	}
}