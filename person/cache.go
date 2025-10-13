package person

import (
	"sync"
	"time"

	"github.com/ectrc/snow/aid"
)

var (
	Cache *PersonsCache
)

type CacheEntry struct {
	Entry *Person
	LastAccessed time.Time
}

type PersonsCache struct {
	sync.Map
}

func NewPersonsCacheMutex() *PersonsCache {
	return &PersonsCache{}
}

func (m *PersonsCache) CacheKiller() {
	if m.Count() == 0 {
		return
	}

	m.Range(func(key, value interface{}) bool {
		cacheEntry := value.(*CacheEntry)
		
		if time.Since(cacheEntry.LastAccessed) >= 5 * time.Minute {
			if cacheEntry.Entry.Party != nil {
				return true
			}

			m.Delete(key)
			go cacheEntry.Entry.Save()
		}

		return true
	})
}

func (m *PersonsCache) GetPerson(id string) *Person {
	if p, ok := m.Load(id); ok {
		cacheEntry := p.(*CacheEntry)
		cacheEntry.LastAccessed = time.Now()
		return cacheEntry.Entry
	}

	return nil
}

func (m *PersonsCache) GetPersonByDisplay(displayName string) *Person {
	var person *Person
	m.RangeEntry(func(key string, value *CacheEntry) bool {
		if value.Entry.DisplayName == displayName {
			person = value.Entry
			value.LastAccessed = time.Now()
			return false
		}

		return true
	})

	return person
}

func (m *PersonsCache) GetPersonByDiscordID(discordId string) *Person {
	var person *Person
	m.RangeEntry(func(key string, value *CacheEntry) bool {
		if value.Entry.Discord.ID == discordId {
			person = value.Entry
			value.LastAccessed = time.Now()
			return false
		}

		return true
	})

	return person
}

func (m *PersonsCache) SavePerson(p *Person) {
	m.Store(p.ID, &CacheEntry{
		Entry: p,
		LastAccessed: time.Now(),
	})
}

func (m *PersonsCache) RemovePerson(id string) {
	m.Delete(id)
}

func (m *PersonsCache) RangeEntry(f func(key string, value *CacheEntry) bool) {
	m.Range(func(key, value interface{}) bool {
		return f(key.(string), value.(*CacheEntry))
	})
}

func (m *PersonsCache) Count() int {
	count := 0
	m.Range(func(key, value interface{}) bool {
		count++
		return true
	})

	return count
}

func init() {
	if Cache == nil {
		Cache = NewPersonsCacheMutex()
	}
	aid.Ticker(time.Second * 5, func() {
		Cache.CacheKiller()
	})
}