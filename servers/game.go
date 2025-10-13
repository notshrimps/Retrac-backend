package servers

import (
	"fmt"

	"github.com/ectrc/snow/parties"
	"github.com/ectrc/snow/person"
)

type GameServerStatusEnum int
const GameServerStatusEnumPreparing GameServerStatusEnum = 0
const GameServerStatusEnumAvailable GameServerStatusEnum = 1
const GameServerStatusEnumClosed GameServerStatusEnum = 2

type RuntimeStatusEnum = int
const RuntimeStatusEnumNotRunning RuntimeStatusEnum = 0
const RuntimeStatusEnumLaunched RuntimeStatusEnum = 1
const RuntimeStatusEnumServerInitialising RuntimeStatusEnum = 2
const RuntimeStatusEnumBoundPort RuntimeStatusEnum = 3

type GameServer struct {
	ID string
	Address string
	Port int
	Constraint string
	Status GameServerStatusEnum
	Parties []string // array of party ids
}

func NewGameServer(id string, constraint string) *GameServer {
	return &GameServer{
		ID: id,
		Address: "0.0.0.0",
		Port: -1,
		Status: GameServerStatusEnumPreparing,
		Parties: []string{},
		Constraint: constraint,
	}
}

/*
type HosterServer struct {
	ID string
	MatchmakeStatus int
	RuntimeStatus int
	Install struct {
		Version string
		RootPath string
		RelativeRedirectLibrary string
		RelativeServerLibrary string
		RelativeGamePath string
	}
	ReservedPort int
	ContraintKey string
	Unregistered bool
}*/

func (s *GameServer) SetStatus(status GameServerStatusEnum) error {
	if status == GameServerStatusEnumAvailable && s.Status != GameServerStatusEnumPreparing {
		return fmt.Errorf("server is not in preparing status")
	}

	if status == GameServerStatusEnumClosed && s.Status != GameServerStatusEnumAvailable {
		return fmt.Errorf("server is not in available status")
	}

	if s.Port == -1 {
		return fmt.Errorf("server is not bound so cannot set status to available or closed")
	}

	s.Status = status
	return nil
}

func (s *GameServer) Bind(address string, port int) error {
	if s.Status != GameServerStatusEnumPreparing {
		return fmt.Errorf("server is not in preparing status")
	}

	if s.Port != -1 {
		return fmt.Errorf("server is already bound")
	}

	s.Address = address
	s.Port = port

	return nil
}

func (s *GameServer) AddTeam(p *person.Party) {
	s.Parties = append(s.Parties, p.ID)
}

func (s *GameServer) RemoveTeam(p string) {
	for i, team := range s.Parties {
		if team == p {
			s.Parties = append(s.Parties[:i], s.Parties[i+1:]...)
			break
		}
	}
}

func (s *GameServer) FindTeam(pId string) *person.Party {
	for _, team := range s.Parties {
		if team == pId {
			return parties.PartyManager.GetParty(team)
		}
	}

	return nil
}

func (s *GameServer) GetPlayers() int {
	length := 0
	if s == nil {
		return length
	}
	for _, team := range s.Parties {
		party := parties.PartyManager.GetParty(team)
		if party == nil {
			continue
		}

		length += len(party.Members)
	}
	return length
}