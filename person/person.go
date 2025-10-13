package person

import (
	"fmt"
	"slices"
	"strings"
	"time"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/storage"
	"github.com/google/uuid"
)

type Person struct {
	ID string
	DisplayName string
	RefundTickets int
	Permissions Permission

	AthenaProfile *Profile
	CommonCoreProfile *Profile
	CommonPublicProfile *Profile
	Profile0Profile *Profile
	CollectionsProfile *Profile
	CreativeProfile *Profile
	
	CurrentSeasonStats *SeasonStats
	AllSeasonsStats aid.GenericSyncMap[SeasonStats]
	
	Discord *storage.DB_DiscordPerson
	
	Reports *ReportMutex
	Receipts *ReceiptMutex
	
	BanHistory aid.GenericSyncMap[storage.DB_BanStatus]
	Relationships aid.GenericSyncMap[Relationship]
	// Parties aid.GenericSyncMap[Party]
	Party *Party
	Invites aid.GenericSyncMap[PartyInvite]
	Intentions aid.GenericSyncMap[PartyIntention]
}

func NewPerson() *Person {
	id := uuid.New().String()
	return &Person{
		ID: id,
		DisplayName: uuid.New().String(),
		Permissions: 0,
		RefundTickets: 3,
		AthenaProfile: NewProfile("athena"),
		CommonCoreProfile: NewProfile("common_core"),
		CommonPublicProfile: NewProfile("common_public"),
		Profile0Profile: NewProfile("profile0"),
		CollectionsProfile: NewProfile("collections"),
		CreativeProfile: NewProfile("creative"),
		Receipts: NewReceiptMutex(id),
		Reports: NewReportMutex(id),
		AllSeasonsStats: aid.GenericSyncMap[SeasonStats]{},
		BanHistory: aid.GenericSyncMap[storage.DB_BanStatus]{},
		Relationships: aid.GenericSyncMap[Relationship]{},
		// Parties: aid.GenericSyncMap[Party]{},
		Party: nil,
		Invites: aid.GenericSyncMap[PartyInvite]{},
		Intentions: aid.GenericSyncMap[PartyIntention]{},
	}
}

func NewPersonWithCustomID(id string) *Person {
	return &Person{
		ID: id,
		DisplayName: uuid.New().String(),
		Permissions: 0,
		RefundTickets: 3,
		AthenaProfile: NewProfile("athena"),
		CommonCoreProfile: NewProfile("common_core"),
		CommonPublicProfile: NewProfile("common_public"),
		Profile0Profile: NewProfile("profile0"),
		CollectionsProfile: NewProfile("collections"),
		CreativeProfile: NewProfile("creative"),
		Receipts: NewReceiptMutex(id),
		Reports: NewReportMutex(id),
		AllSeasonsStats: aid.GenericSyncMap[SeasonStats]{},
		BanHistory: aid.GenericSyncMap[storage.DB_BanStatus]{},
		Relationships: aid.GenericSyncMap[Relationship]{},
		// Parties: aid.GenericSyncMap[Party]{},
		Party: nil,
		Invites: aid.GenericSyncMap[PartyInvite]{},
		Intentions: aid.GenericSyncMap[PartyIntention]{},
	}
}

func Find(personId string) *Person {
	if Cache == nil {
		Cache = NewPersonsCacheMutex()
	}

	cachedPerson := Cache.GetPerson(personId)
	if cachedPerson != nil {
		return cachedPerson
	}

	person := storage.Repo.GetPersonFromDB(personId)
	if person == nil {
		return nil
	}

	return findHelper(person, false, true)
}

func FindShallow(personId string) *Person {
	if Cache == nil {
		Cache = NewPersonsCacheMutex()
	}

	cachedPerson := Cache.GetPerson(personId)
	if cachedPerson != nil {
		return cachedPerson
	}

	person := storage.Repo.GetPersonFromDB(personId)
	if person == nil {
		return nil
	}

	return findHelper(person, true, false)
}

func FindByDisplay(displayName string) *Person {
	if Cache == nil {
		Cache = NewPersonsCacheMutex()
	}

	cachedPerson := Cache.GetPersonByDisplay(displayName)
	if cachedPerson != nil {
		return cachedPerson
	}

	person := storage.Repo.GetPersonByDisplayFromDB(displayName)
	if person == nil {
		return nil
	}

	return findHelper(person, false, true)
}

func FindByDisplayShallow(displayName string) *Person {
	if Cache == nil {
		Cache = NewPersonsCacheMutex()
	}

	cachedPerson := Cache.GetPersonByDisplay(displayName)
	if cachedPerson != nil {
		return cachedPerson
	}

	person := storage.Repo.GetPersonByDisplayFromDB(displayName)
	if person == nil {
		return nil
	}

	return findHelper(person, true, false)
}

func FindByDiscord(discordId string) *Person {
	if Cache == nil {
		Cache = NewPersonsCacheMutex()
	}

	cachedPerson := Cache.GetPersonByDiscordID(discordId)
	if cachedPerson != nil {
		return cachedPerson
	}

	person := storage.Repo.GetPersonByDiscordIDFromDB(discordId)
	if person == nil {
		return nil
	}

	return findHelper(person, false, true)
}

func FindByDiscordShallow(discordId string) *Person {
	if Cache == nil {
		Cache = NewPersonsCacheMutex()
	}

	person := storage.Repo.GetPersonByDiscordIDFromDB(discordId)
	if person == nil {
		return nil
	}

	return findHelper(person, true, false)
}

func findHelper(databasePerson *storage.DB_Person, shallow bool, save bool) *Person {
	athenaProfile := NewProfile("athena")
	commonCoreProfile := NewProfile("common_core")
	commonPublicProfile := NewProfile("common_public")
	profile0 := NewProfile("profile0")
	collectionsProfile := NewProfile("collections")
	creativeProfile := NewProfile("creative")
	receipts := NewReceiptMutex(databasePerson.ID)
	reports := NewReportMutex(databasePerson.ID)


	allprofiles := map[string][]storage.DB_Profile{}
	for _, profile := range databasePerson.Profiles {
		allprofiles[profile.Type] = append(allprofiles[profile.Type], profile)
	}

	realProfiles := []storage.DB_Profile{}

	for _, profiles := range allprofiles {
		latestProfile := profiles[0]
		if len(profiles) > 1 {
			for _, profile := range profiles {
				if profile.Revision > latestProfile.Revision {
					latestProfile = profile
				}
			}	
		}

		realProfiles = append(realProfiles, latestProfile)
	}

	if !shallow {
		for _, profile := range realProfiles {
			if profile.Type == "athena" {
				athenaProfile.ID = profile.ID
				athenaProfile = FromDatabaseProfile(&profile)
			}

			if profile.Type == "common_core" {
				commonCoreProfile.ID = profile.ID
				commonCoreProfile = FromDatabaseProfile(&profile)
			}

			if profile.Type == "common_public" {
				commonPublicProfile.ID = profile.ID
				commonPublicProfile = FromDatabaseProfile(&profile)
			}

			if profile.Type == "profile0" {
				profile0.ID = profile.ID
				profile0 = FromDatabaseProfile(&profile)
			}

			if profile.Type == "collections" {
				collectionsProfile.ID = profile.ID
				collectionsProfile = FromDatabaseProfile(&profile)
			}

			if profile.Type == "creative" {
				creativeProfile.ID = profile.ID
				creativeProfile = FromDatabaseProfile(&profile)
			}
		}
	}

	for _, receipt := range databasePerson.Receipts {
		receipts.AddReceipt(FromDatabaseReceipt(&receipt))
	}

	person := &Person{
		ID: databasePerson.ID,
		DisplayName: databasePerson.DisplayName,
		Permissions: Permission(databasePerson.Permissions),
		AthenaProfile: athenaProfile,
		CommonCoreProfile: commonCoreProfile,
		CommonPublicProfile: commonPublicProfile,
		Profile0Profile: profile0,
		CollectionsProfile: collectionsProfile,
		CreativeProfile: creativeProfile,
		Discord: &databasePerson.Discord,
		RefundTickets: databasePerson.RefundTickets,
		Receipts: receipts,
		Reports: reports,
		AllSeasonsStats: aid.GenericSyncMap[SeasonStats]{},
		BanHistory: aid.GenericSyncMap[storage.DB_BanStatus]{},
		Relationships: aid.GenericSyncMap[Relationship]{},
		// Parties: aid.GenericSyncMap[Party]{},
		Party: nil,
		Invites: aid.GenericSyncMap[PartyInvite]{},
		Intentions: aid.GenericSyncMap[PartyIntention]{},
	}

	for _, ban := range databasePerson.BanHistory {
		person.BanHistory.Set(ban.ID, &ban)
	}

	for _, stat := range databasePerson.Stats {
		person.AllSeasonsStats.Set(fmt.Sprint(stat.Season), FromDatabaseSeasonStats(stat))

		if stat.Season == aid.Config.Fortnite.Season {
			person.CurrentSeasonStats = FromDatabaseSeasonStats(stat)
		}
	}

	for _, report := range databasePerson.IncomingReports {
		reports.AddReport(FromDatabaseReport(&report))
	}

	for _, report := range databasePerson.OutgoingReports {
		reports.AddReport(FromDatabaseReport(&report))
	}

	if person.CurrentSeasonStats == nil {
		person.CurrentSeasonStats = NewSeasonStats(aid.Config.Fortnite.Season)
		person.CurrentSeasonStats.PersonID = person.ID
		person.AllSeasonsStats.Set(fmt.Sprint(aid.Config.Fortnite.Season), person.CurrentSeasonStats)
		person.CurrentSeasonStats.Save()
	}


	if !shallow {
		person.LoadRelationships()
	}

	if save {
		Cache.SavePerson(person)
	}

	return person
}

func AllFromDatabase() []*Person {
	var persons []*Person
	for _, person := range storage.Repo.GetAllPersons() {
		persons = append(persons, Find(person.ID))
	}

	return persons
}

func AllFromCache() []*Person {
	if Cache == nil {
		Cache = NewPersonsCacheMutex()
	}

	var persons []*Person
	Cache.RangeEntry(func(key string, value *CacheEntry) bool {
		persons = append(persons, value.Entry)
		return true
	})

	return persons
}

func (p *Person) GetProfileFromType(profileType string) *Profile {
	switch profileType {
	case "athena":
		return p.AthenaProfile
	case "common_core":
		return p.CommonCoreProfile
	case "common_public":
		return p.CommonPublicProfile
	case "profile0":
		return p.Profile0Profile
	case "collections":
		return p.CollectionsProfile
	case "creative":
		return p.CreativeProfile
	}

	return nil
}

func (p *Person) Save() {
	dbPerson := p.ToDatabase()
	storage.Repo.SavePerson(dbPerson)
}

func (p *Person) SaveShallow() {
	dbPerson := p.ToDatabaseShallow()
	storage.Repo.SavePerson(dbPerson)
}

func (p *Person) AddBan(reason string, issuedBy string, expiry ...string) *storage.DB_BanStatus {
	t := time.Now().AddDate(0, 0, 7)

	if len(expiry) > 0 && expiry[0] != "" {
		parsed, err := aid.ParseDuration(expiry[0])
		if err == nil {
			t = time.Now().Add(parsed)
		}
	}

	if len(expiry) == 0 {
		t = time.Now().AddDate(999, 0, 7)
	}

	ban := &storage.DB_BanStatus{
		ID: uuid.New().String(),
		PersonID: p.ID,
		IssuedBy: issuedBy,
		Reason: reason,
		Expiry: t,
	}

	p.BanHistory.Set(ban.ID, ban)
	storage.Repo.SaveBanStatus(ban)

	hwid := storage.Repo.GetHWIDByPerson(ban.PersonID)
	if hwid != nil {
		hwid.Banned = true
		storage.Repo.SaveHWID(hwid)
	}

	p.Reports.RangeReports(func(key string, report *Report) bool {
		if report.OffenderID != p.ID {
			return true
		}

		reporter := Find(report.ReporterID)
		gift := NewGift("GiftBox:GB_BanAssist_Athena", 1, "", "")
		reporter.CommonCoreProfile.Gifts.AddGift(gift)
		reporter.AthenaProfile.CreateGiftAddedChange(gift)

		return true		
	})

	return ban
}

func (p *Person) ClearBans() {
	p.BanHistory.Range(func(key string, ban *storage.DB_BanStatus) bool {
		ban.Expiry = time.Now()
		storage.Repo.SaveBanStatus(ban)
		return true
	})

	hwid := storage.Repo.GetHWIDByPerson(p.ID)
	if hwid != nil {
		allHwids := storage.Repo.GetHWIDs(hwid.ID)
		for _, hwid := range *allHwids {
			hwid.Banned = false
			storage.Repo.SaveHWID(&hwid)
		}
	}
}

func (p *Person) GetActiveBan() *storage.DB_BanStatus {
	knownHwid := storage.Repo.GetHWIDByPerson(p.ID)
	if knownHwid != nil {
		allHwids := storage.Repo.GetHWIDs(knownHwid.ID)
		for _, hwid := range *allHwids {
			if hwid.Banned {
				return &storage.DB_BanStatus{
					ID: uuid.New().String(),
					PersonID: p.ID,
					IssuedBy: "HWID",
					Reason: "HWID Ban",
					Expiry: time.Now().AddDate(999, 0, 7),
				}
			}
		}
	}

	var latestBan *storage.DB_BanStatus
	p.BanHistory.Range(func(key string, ban *storage.DB_BanStatus) bool {
		if latestBan == nil || ban.Expiry.After(latestBan.Expiry) {
			latestBan = ban
		}
		return true
	})

	if latestBan != nil && latestBan.Expiry.Before(time.Now()) {
		hwid := storage.Repo.GetHWIDByPerson(p.ID)
		if hwid != nil {
			allHwids := storage.Repo.GetHWIDs(hwid.ID)
			for _, hwid := range *allHwids {
				hwid.Banned = false
				storage.Repo.SaveHWID(&hwid)
			}
		}

		return nil
	}

	if latestBan != nil {
		hwid := storage.Repo.GetHWIDByPerson(p.ID)
		if hwid != nil {
			hwid.Banned = true
			storage.Repo.SaveHWID(hwid)
		}
	}

	return latestBan
}

func (p *Person) AddPermission(permission Permission) {
	p.Permissions |= permission
	p.SaveShallow()
}

func (p *Person) RemovePermission(permission Permission) {
	p.Permissions &= ^permission
	p.SaveShallow()
}

func (p *Person) HasPermission(permission Permission) bool {
	return p.Permissions & permission != 0
}

func (p *Person) GetCurrentParty() *Party {
	return p.Party
}

func (p *Person) ToDatabase() *storage.DB_Person {
	dbPerson := storage.DB_Person{
		ID: p.ID,
		DisplayName: p.DisplayName,
		Permissions: int64(p.Permissions),
		RefundTickets: p.RefundTickets,
		Receipts: []storage.DB_Receipt{},
		BanHistory: []storage.DB_BanStatus{},
		Profiles: []storage.DB_Profile{},
		Stats: []storage.DB_SeasonStat{},
		Discord: storage.DB_DiscordPerson{},
		IncomingReports: []storage.DB_Report{},
		OutgoingReports: []storage.DB_Report{},
	}

	if p.Discord != nil {
		dbPerson.Discord = *p.Discord
	}

	profilesToConvert := map[string]*Profile{
		"common_core": p.CommonCoreProfile,
		"athena": p.AthenaProfile,
		"common_public": p.CommonPublicProfile,
		"profile0": p.Profile0Profile,
		"collections": p.CollectionsProfile,
		"creative": p.CreativeProfile,
	}

	p.BanHistory.Range(func(key string, ban *storage.DB_BanStatus) bool {
		dbPerson.BanHistory = append(dbPerson.BanHistory, *ban)
		return true
	})

	p.Receipts.RangeReceipts(func(key string, receipt *Receipt) bool {
		dbPerson.Receipts = append(dbPerson.Receipts, *receipt.ToDatabase())
		return true
	})

	p.AllSeasonsStats.Range(func(key string, stat *SeasonStats) bool {
		dbPerson.Stats = append(dbPerson.Stats, *stat.ToDatabase(p.ID))
		return true
	})

	p.Reports.RangeReports(func(key string, report *Report) bool {
		switch report.Type {
		case ReportTypeEnumIncoming:
			dbPerson.IncomingReports = append(dbPerson.IncomingReports, *report.ToDatabase())
		case ReportTypeEnumOutgoing:
			dbPerson.OutgoingReports = append(dbPerson.OutgoingReports, *report.ToDatabase())
		}
		return true
	})

	for profileType, profile := range profilesToConvert {
		dbProfile := storage.DB_Profile{
			ID: profile.ID,
			PersonID: p.ID,
			Type: profileType,
			Items: []storage.DB_Item{},
			Gifts: []storage.DB_Gift{},
			Quests: []storage.DB_Quest{},
			Loadouts: []storage.DB_Loadout{},
			Attributes: []storage.DB_Attribute{},
			Revision: profile.Revision,
		}

		profile.Items.RangeItems(func(id string, item *Item) bool {
			dbProfile.Items = append(dbProfile.Items, *item.ToDatabase(p.ID))
			return true
		})

		profile.Gifts.RangeGifts(func(id string, gift *Gift) bool {
			dbProfile.Gifts = append(dbProfile.Gifts, *gift.ToDatabase(p.ID))
			return true
		})

		profile.Quests.RangeQuests(func(id string, quest *Quest) bool {
			dbProfile.Quests = append(dbProfile.Quests, *quest.ToDatabase(p.ID))
			return true
		})

		profile.Attributes.RangeAttributes(func(key string, value *Attribute) bool {
			dbProfile.Attributes = append(dbProfile.Attributes, *value.ToDatabase(p.ID))
			return true
		})

		profile.Loadouts.RangeLoadouts(func(id string, loadout *Loadout) bool {
			dbProfile.Loadouts = append(dbProfile.Loadouts, *loadout.ToDatabase(p.ID))
			return true
		})

		dbPerson.Profiles = append(dbPerson.Profiles, dbProfile)
	}

	return &dbPerson
}

func (p *Person) ToDatabaseShallow() *storage.DB_Person {
	dbPerson := storage.DB_Person{
		ID: p.ID,
		DisplayName: p.DisplayName,
		Permissions: int64(p.Permissions),
		RefundTickets: p.RefundTickets,
		Receipts: []storage.DB_Receipt{},
		BanHistory: []storage.DB_BanStatus{},
		Profiles: []storage.DB_Profile{},
		Stats: []storage.DB_SeasonStat{},
		Discord: storage.DB_DiscordPerson{},
		IncomingReports: []storage.DB_Report{},
		OutgoingReports: []storage.DB_Report{},
	}

	if p.Discord != nil {
		dbPerson.Discord = *p.Discord
	}

	p.BanHistory.Range(func(key string, ban *storage.DB_BanStatus) bool {
		dbPerson.BanHistory = append(dbPerson.BanHistory, *ban)
		return true
	})

	p.Receipts.RangeReceipts(func(key string, receipt *Receipt) bool {
		dbPerson.Receipts = append(dbPerson.Receipts, *receipt.ToDatabase())
		return true
	})

	p.AllSeasonsStats.Range(func(key string, stat *SeasonStats) bool {
		dbPerson.Stats = append(dbPerson.Stats, *stat.ToDatabase(p.ID))
		return true
	})

	p.Reports.RangeReports(func(key string, report *Report) bool {
		switch report.Type {
		case ReportTypeEnumIncoming:
			dbPerson.IncomingReports = append(dbPerson.IncomingReports, *report.ToDatabase())
		case ReportTypeEnumOutgoing:
			dbPerson.OutgoingReports = append(dbPerson.OutgoingReports, *report.ToDatabase())
		}
		return true
	})

	return &dbPerson
}

func (p *Person) Snapshot() *PersonSnapshot {
	snapshot := &PersonSnapshot{
		ID: p.ID,
		DisplayName: p.DisplayName,
		RefundTickets: p.RefundTickets,
		Permissions: int64(p.Permissions),
		AthenaProfile: *p.AthenaProfile.Snapshot(),
		CommonCoreProfile: *p.CommonCoreProfile.Snapshot(),
		CommonPublicProfile: *p.CommonPublicProfile.Snapshot(),
		Profile0Profile: *p.Profile0Profile.Snapshot(),
		CollectionsProfile: *p.CollectionsProfile.Snapshot(),
		CreativeProfile: *p.CreativeProfile.Snapshot(),
		CurrentSeasonStats: *p.CurrentSeasonStats,
		AllSeasonsStats: []SeasonStats{},
		BanHistory: []storage.DB_BanStatus{},
		Receipts: []storage.DB_Receipt{},
		Discord: *p.Discord,
		Relationships: *p.Relationships.Snapshot(),
		Parties: nil,
		Invites: *p.Invites.Snapshot(),
		Intentions: *p.Intentions.Snapshot(),
	}

	p.BanHistory.Range(func(key string, ban *storage.DB_BanStatus) bool {
		snapshot.BanHistory = append(snapshot.BanHistory, *ban)
		return true
	})

	p.Receipts.RangeReceipts(func(key string, receipt *Receipt) bool {
		snapshot.Receipts = append(snapshot.Receipts, *receipt.ToDatabase())
		return true
	})

	p.AllSeasonsStats.Range(func(key string, stat *SeasonStats) bool {
		snapshot.AllSeasonsStats = append(snapshot.AllSeasonsStats, *stat)
		return true
	})

	return snapshot
} 

func (p *Person) Delete() {
	storage.Repo.DeletePerson(p.ID)
	Cache.RemovePerson(p.ID)
}

func (p *Person) SetPurchaseHistoryAttribute() {
	purchases := []aid.JSON{}

	p.AthenaProfile.Purchases.RangePurchases(func(key string, value *Purchase) bool {
		purchases = append(purchases, value.GenerateFortnitePurchaseEntry())
		return true
	})

	slices.SortFunc[[]aid.JSON](purchases, func(a, b aid.JSON) int {
		aPurchaseDate, err := time.Parse(time.RFC3339, a["purchaseDate"].(string))
		if err != nil {
			return 0
		}
		
		bPurchaseDate, err := time.Parse(time.RFC3339, b["purchaseDate"].(string))
		if err != nil {
			return 0
		}

		if aPurchaseDate.Equal(bPurchaseDate) {
			return 0
		}

		if aPurchaseDate.Before(bPurchaseDate) {
			return -1
		}

		return 1
	})

	purchaseAttribute := p.CommonCoreProfile.Attributes.GetAttributeByKey("mtx_purchase_history")
	if purchaseAttribute == nil {
		purchaseAttribute = NewAttribute("mtx_purchase_history", aid.JSON{
			"refundsUsed": p.AthenaProfile.Purchases.CountRefunded(),
			"refundCredits": 3 - p.AthenaProfile.Purchases.CountRefunded(),
			"purchases": purchases,
		})
		purchaseAttribute.Save()
	}
	purchaseAttribute.ValueJSON = aid.JSONStringify(aid.JSON{
		"refundsUsed": p.AthenaProfile.Purchases.CountRefunded(),
		"refundCredits": 3 - p.AthenaProfile.Purchases.CountRefunded(),
		"purchases": purchases,
	})
	purchaseAttribute.Save()
}

func (p *Person) SetInAppPurchasesAttribute() {
	receipts := []string{}
	fulfillmentCounts := map[string]int{}

	p.Receipts.RangeReceipts(func(key string, r *Receipt) bool {
		pureOfferId := strings.ReplaceAll(r.OfferID, "app-", "")
		receipts = append(receipts, r.ID)
		fulfillmentCounts[pureOfferId]++
		return true
	})

	inAppPurchaseAttribute := p.CommonCoreProfile.Attributes.GetAttributeByKey("in_app_purchases")
	inAppPurchaseAttribute.ValueJSON = aid.JSONStringify(aid.JSON{
		"ignoredReceipts": []string{},
		"refreshTimers": aid.JSON{},
		"receipts": receipts,
		"fulfillmentCounts": fulfillmentCounts,
	})
	inAppPurchaseAttribute.Save()
}

func (p *Person) SyncVBucks(sourceProfileType string) {
	antiSourceLookup := map[string]string{
		"profile0": "common_core",
		"common_core": "profile0",
	}
	sourceProfile := p.GetProfileFromType(sourceProfileType)
	antiSourceProfile := p.GetProfileFromType(antiSourceLookup[sourceProfileType])
	if sourceProfile == nil || antiSourceProfile == nil {
		return
	}

	sourceCurrency := sourceProfile.Items.GetItemByTemplateID("Currency:MtxPurchased")
	antiSourceCurrency := antiSourceProfile.Items.GetItemByTemplateID("Currency:MtxPurchased")
	if sourceCurrency == nil || antiSourceCurrency == nil {
		return
	}

	antiSourceCurrency.Quantity = sourceCurrency.Quantity
	antiSourceCurrency.Save()
}

func (p *Person) TakeAndSyncVbucks(quant int) {
	currency := p.CommonCoreProfile.Items.GetItemByTemplateID("Currency:MtxPurchased")
	if currency == nil {
		aid.Print("currency not found")
		return
	}

	currency.Quantity -= quant
	currency.Save()

	p.SyncVBucks("common_core")
}

func (p *Person) GiveAndSyncVbucks(quant int) {
	currency := p.CommonCoreProfile.Items.GetItemByTemplateID("Currency:MtxPurchased")
	if currency == nil {
		aid.Print("currency not found")
		return
	}

	currency.Quantity += quant
	currency.Save()

	p.SyncVBucks("common_core")
}

func (p *Person) HasEnoughVbucks(quant int) bool {
	currency := p.CommonCoreProfile.Items.GetItemByTemplateID("Currency:MtxPurchased")
	if currency == nil {
		return false
	}

	return currency.Quantity >= quant
}

func (p *Person) IsWhitelisted() bool {
	return slices.Contains[[]string](aid.Config.Fortnite.WhitelistedUsers, p.DisplayName)
}