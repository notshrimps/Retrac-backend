package parties

import (
	"sync"

	"github.com/ectrc/snow/person"
)

type partyManager struct {
	parties sync.Map
}

func NewPartyManager() *partyManager {
	return &partyManager{}
}

func (pm *partyManager) AddParty(p *person.Party) {
	pm.parties.Store(p.ID, p)
}

func (pm *partyManager) GetParty(id string) *person.Party {
	p, ok := pm.parties.Load(id)
	if !ok {
		return nil
	}

	return p.(*person.Party)
}

func (pm *partyManager) DeleteParty(id string) {
	pm.parties.Delete(id)
}

func (pm *partyManager) Map() map[string]*person.Party {
	parties := map[string]*person.Party{}
	pm.parties.Range(func(key, value interface{}) bool {
		parties[key.(string)] = value.(*person.Party)
		return true
	})
	return parties
}

var PartyManager = NewPartyManager()