package storage

import (
	"strings"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/storage/objects"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type PostgresStorage struct {
	Postgres *gorm.DB
}

func NewPostgresStorage() *PostgresStorage {
	l := logger.Default.LogMode(logger.Silent)
	if aid.Config.Output.Level == "time" {
		l = logger.Default.LogMode(logger.Info)
	}

	db, err := gorm.Open(postgres.Open(aid.Config.Database.URI), &gorm.Config{
		Logger: l,
	})
	if err != nil {
		panic(err)
	}

	return &PostgresStorage{
		Postgres: db,
	}
}

func (s *PostgresStorage) Migrate(table interface{}, tableName string) {
	s.Postgres.Table(tableName).AutoMigrate(table)
}

func (s *PostgresStorage) MigrateAll() {
	s.Migrate(&DB_Person{}, "Persons")
	s.Migrate(&DB_Relationship{}, "Relationships")
	s.Migrate(&DB_Profile{}, "Profiles")
	s.Migrate(&DB_Attribute{}, "Attributes")
	s.Migrate(&DB_Loadout{}, "Loadouts")
	s.Migrate(&DB_Item{}, "Items")
	s.Migrate(&DB_Purchase{}, "Purchases")
	s.Migrate(&DB_PurchaseLoot{}, "PurchaseLoot")
	s.Migrate(&DB_VariantChannel{}, "Variants")
	s.Migrate(&DB_Quest{}, "Quests")
	s.Migrate(&DB_Gift{}, "Gifts")
	s.Migrate(&DB_GiftLoot{}, "GiftLoot")
	s.Migrate(&DB_DiscordPerson{}, "Discords")
	s.Migrate(&DB_BanStatus{}, "Bans")
	s.Migrate(&DB_SeasonStat{}, "Stats")
	s.Migrate(&DB_MatchResult{}, "Matches")
	s.Migrate(&DB_Receipt{}, "Receipts")
	s.Migrate(&DB_ReceiptLoot{}, "ReceiptLoot")
	s.Migrate(&DB_VariantToken{}, "VariantTokens")
	s.Migrate(&DB_VariantTokenGrant{}, "VariantTokenGrants")
	s.Migrate(&DB_Report{}, "Reports")
	s.Migrate(&DB_HWID{}, "Devices")

	
	to_migrate := map[string]interface{}{
		// shop
		"shops":                         &objects.ShopCatalog{},
		"shop_sections":                 &objects.ShopSection{},
		"shop_offers_item":              &objects.ShopOfferTypeItem{},
		"shop_offers_money":             &objects.ShopOfferTypeMoney{},
		"shop_offers_kit":               &objects.ShopOfferTypeKit{},
		"shop_offers_book":              &objects.ShopOfferTypeBook{},
		"shop_offer_grants":             &objects.ShopOfferGrant{},
		"shop_offer_metas":              &objects.ShopOfferMeta{},
		"shop_offer_prices_mtxcurrency": &objects.ShopOfferPriceMtxCurrency{},
		"shop_offer_prices_realmoney":   &objects.ShopOfferPriceRealMoney{},
		"shop_offer_displays":           &objects.OfferDisplay{},
	}

	for tableName, table := range to_migrate {
		s.Migrate(table, tableName)
	}
}

func (s *PostgresStorage) DropTables() {
	s.Postgres.Exec(`DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;`)
}

func (s *PostgresStorage) PreloadPerson() (tx *gorm.DB) {
	return s.Postgres.
		Model(&DB_Person{}).
		Preload("Profiles").
		Preload("Profiles.Loadouts").
		Preload("Profiles.Attributes").
		Preload("Profiles.Items").
		Preload("Profiles.Items.Variants").
		Preload("Profiles.Gifts").
		Preload("Profiles.Gifts.Loot").
		Preload("Profiles.Quests").
		Preload("Profiles.VariantTokens").
		Preload("Profiles.VariantTokens.VariantGrants").
		Preload("Profiles.Purchases").
		Preload("Profiles.Purchases.Loot").
		Preload("Receipts").
		Preload("Receipts.Loot").
		Preload("Discord").
		Preload("BanHistory").
		Preload("Stats").
		Preload("Stats.Matches").
		Preload("IncomingReports").
		Preload("OutgoingReports")
}

func (s *PostgresStorage) GetPerson(personId string) *DB_Person {
	var dbPerson DB_Person
	s.PreloadPerson().Where("id = ?", personId).Find(&dbPerson)

	if dbPerson.ID == "" {
		return nil
	}

	return &dbPerson
}

func (s *PostgresStorage) GetPersonByDisplay(displayName string) *DB_Person {
	var dbPerson DB_Person
	s.PreloadPerson().Where("display_name = ?", displayName).Find(&dbPerson)

	if dbPerson.ID == "" {
		return nil
	}

	return &dbPerson
}

func (s *PostgresStorage) GetPersonsByPartialDisplay(displayName string) []*DB_Person {
	var dbPersons []*DB_Person
	s.PreloadPerson().Where("display_name LIKE ?", "%" + displayName + "%").Find(&dbPersons)

	if len(dbPersons) == 0 {
		return nil
	}

	return dbPersons
}

func (s *PostgresStorage) GetPersonByDiscordID(discordId string) *DB_Person {
	var discordEntry DB_DiscordPerson
	s.Postgres.Model(&DB_DiscordPerson{}).Where("id = ?", discordId).Find(&discordEntry)

	if discordEntry.ID == "" {
		return nil
	}

	return s.GetPerson(discordEntry.PersonID)
}

func (s *PostgresStorage) GetAllPersons() []*DB_Person {
	var dbPersons []*DB_Person
	s.PreloadPerson().Find(&dbPersons)

	return dbPersons
}

func (s *PostgresStorage) GetPersonsCount() int {
	var count int64
	s.Postgres.Model(&DB_Person{}).Count(&count)
	return int(count)
}

func (s *PostgresStorage) TotalVBucks() int {
	var total int64
	s.Postgres.Model(&DB_Item{}).Select("sum(quantity)").Where("template_id = ?", "Currency:MtxPurchased").Find(&total)
	return int(total / 2) // duplicate due to common_core and common_public 
}

func (s *PostgresStorage) SavePerson(person *DB_Person) {
	s.Postgres.Save(person)
}

func (s *PostgresStorage) DeletePerson(personId string) {
	s.PreloadPerson().Delete(&DB_Person{}, "id = ?", personId)
}

func (s *PostgresStorage) GetIncomingRelationships(personId string) []*DB_Relationship {
	var dbRelationships []*DB_Relationship
	s.Postgres.Model(&DB_Relationship{}).Where("towards_person_id = ?", personId).Find(&dbRelationships)
	return dbRelationships
}

func (s *PostgresStorage) GetOutgoingRelationships(personId string) []*DB_Relationship {
	var dbRelationships []*DB_Relationship
	s.Postgres.Model(&DB_Relationship{}).Where("from_person_id = ?", personId).Find(&dbRelationships)
	return dbRelationships
}

func (s *PostgresStorage) SaveRelationship(relationship *DB_Relationship) {
	s.Postgres.Save(relationship)
}

func (s *PostgresStorage) DeleteRelationship(relationship *DB_Relationship) {
	s.Postgres.Delete(relationship)
}

func (s *PostgresStorage) SaveProfile(profile *DB_Profile) {
	s.Postgres.Save(profile)
}

func (s *PostgresStorage) DeleteProfile(profileId string) {
	s.Postgres.Delete(&DB_Profile{}, "id = ?", profileId)
}

func (s *PostgresStorage) SaveItem(item *DB_Item) {
	s.Postgres.Save(item)
}

func (s *PostgresStorage) BulkCreateItems(items *[]DB_Item) {
	s.Postgres.Create(items)
}

func (s *PostgresStorage) DeleteItem(itemId string) {
	s.Postgres.Delete(&DB_Item{}, "id = ?", itemId)
}

func (s *PostgresStorage) SaveVariant(variant *DB_VariantChannel) {
	s.Postgres.Save(variant)
}

func (s *PostgresStorage) BulkCreateVariants(variants *[]DB_VariantChannel) {
	s.Postgres.Create(variants)
}

func (s *PostgresStorage) DeleteVariant(variantId string) {
	s.Postgres.Delete(&DB_VariantChannel{}, "id = ?", variantId)
}

func (s *PostgresStorage) SaveQuest(quest *DB_Quest) {
	s.Postgres.Save(quest)
}

func (s *PostgresStorage) DeleteQuest(questId string) {
	s.Postgres.Delete(&DB_Quest{}, "id = ?", questId)
}

func (s *PostgresStorage) SaveLoot(loot *DB_GiftLoot) {
	s.Postgres.Save(loot)
}

func (s *PostgresStorage) DeleteLoot(lootId string) {
	s.Postgres.Delete(&DB_GiftLoot{}, "id = ?", lootId)
}

func (s *PostgresStorage) SaveGift(gift *DB_Gift) {
	s.Postgres.Save(gift)
}

func (s *PostgresStorage) DeleteGift(giftId string) {
	s.Postgres.Delete(&DB_Gift{}, "id = ?", giftId)
}

func (s *PostgresStorage) SaveVariantToken(variantToken *DB_VariantToken) {
	s.Postgres.Save(variantToken)
}

func (s *PostgresStorage) DeleteVariantToken(variantTokenId string) {
	s.Postgres.Delete(&DB_VariantToken{}, "id = ?", variantTokenId)
}

func (s *PostgresStorage) SaveVariantTokenGrant(variantTokenGrant *DB_VariantTokenGrant) {
	s.Postgres.Save(variantTokenGrant)
}

func (s *PostgresStorage) DeleteVariantTokenGrant(variantTokenGrantId string) {
	s.Postgres.Delete(&DB_VariantTokenGrant{}, "id = ?", variantTokenGrantId)
}

func (s *PostgresStorage) SaveAttribute(attribute *DB_Attribute) {
	s.Postgres.Save(attribute)
}

func (s *PostgresStorage) DeleteAttribute(attributeId string) {
	s.Postgres.Delete(&DB_Attribute{}, "id = ?", attributeId)
}

func (s *PostgresStorage) SaveLoadout(loadout *DB_Loadout) {
	s.Postgres.Save(loadout)
}

func (s *PostgresStorage) DeleteLoadout(loadoutId string) {
	s.Postgres.Delete(&DB_Loadout{}, "id = ?", loadoutId)
}

func (s *PostgresStorage) SavePurchase(purchase *DB_Purchase) {
	s.Postgres.Save(purchase)
}

func (s *PostgresStorage) DeletePurchase(purchaseId string) {
	s.Postgres.Delete(&DB_Purchase{}, "id = ?", purchaseId)
}

func (s *PostgresStorage) SaveDiscordPerson(discordPerson *DB_DiscordPerson) {
	s.Postgres.Save(discordPerson)
}

func (s *PostgresStorage) DeleteDiscordPerson(discordPersonId string) {
	s.Postgres.Delete(&DB_DiscordPerson{}, "id = ?", discordPersonId)
}

func (s *PostgresStorage) SaveBanStatus(banStatus *DB_BanStatus) {
	s.Postgres.Save(banStatus)
}

func (s *PostgresStorage) DeleteBanStatus(banStatusId string) {
	s.Postgres.Delete(&DB_BanStatus{}, "id = ?", banStatusId)
}

func (s *PostgresStorage) SaveReceipt(receipt *DB_Receipt) {
	s.Postgres.Save(receipt)
}

func (s *PostgresStorage) DeleteReceipt(receiptId string) {
	s.Postgres.Delete(&DB_Receipt{}, "id = ?", receiptId)
}

func (s *PostgresStorage) SaveReceiptLoot(receiptLoot *DB_ReceiptLoot) {
	s.Postgres.Save(receiptLoot)
}

func (s *PostgresStorage) DeleteReceiptLoot(receiptLootId string) {
	s.Postgres.Delete(&DB_ReceiptLoot{}, "id = ?", receiptLootId)
}

func (s *PostgresStorage) SaveSeasonStats(seasonStats *DB_SeasonStat) {
	s.Postgres.Save(seasonStats)
}

func (s *PostgresStorage) DeleteSeasonStats(seasonId string) {
	s.Postgres.Delete(&DB_SeasonStat{}, "id = ?", seasonId)
}

func (s *PostgresStorage) SaveReport(report *DB_Report) {
	s.Postgres.Save(report)
}

func (s *PostgresStorage) DeleteReport(reportId string) {
	s.Postgres.Delete(&DB_Report{}, "id = ?", reportId)
}

func (s *PostgresStorage) SaveMatch(matchResult *DB_MatchResult) {
	s.Postgres.Save(matchResult)
}

func (s *PostgresStorage) DeleteMatch(matchResultId string) {
	s.Postgres.Delete(&DB_MatchResult{}, "id = ?", matchResultId)
}

func (s *PostgresStorage) SaveHWID(hwid *DB_HWID) {
	s.Postgres.Save(hwid)
}

func (s *PostgresStorage) DeleteHWID(hwidId string) {
	s.Postgres.Delete(&DB_HWID{}, "id = ?", hwidId)
}

func (s *PostgresStorage) GetHWIDs(hwidId string) *[]DB_HWID {
	var hwids []DB_HWID
	s.Postgres.Model(&DB_HWID{}).Where("id = ?", hwidId).Find(&hwids)
	return &hwids
}

func (s *PostgresStorage) BanHWID(hwidId string) {
	s.Postgres.Model(&DB_HWID{}).Where("id = ?", hwidId).Update("banned", true)
}

func (s *PostgresStorage) GetHWIDByPerson(personId string) *DB_HWID {
	var hwid DB_HWID
	s.Postgres.Model(&DB_HWID{}).Where("person_id = ?", personId).Find(&hwid)

	if hwid.ID == "" {
		return nil
	}

	return &hwid
}

func (s *PostgresStorage) GetTop10SeasonStats() *[]DB_SeasonStat {
	var points []DB_SeasonStat
	s.Postgres.Model(&DB_SeasonStat{}).Where("season = 14") .Order("hype desc").Limit(10).Find(&points)
	return &points
}

func (s *PostgresStorage) GetTop1000Wins(pl string) *map[string]int {
	var points []DB_SeasonStat
	s.Postgres.Model(&DB_SeasonStat{}).Where("season = 14").Limit(1000).Find(&points)

	playerWins := make(map[string]int)

	for _, point := range points {
		var matches []DB_MatchResult
		s.Postgres.Model(&DB_MatchResult{}).Where("season_stat_id = ?", point.ID).Find(&matches)

		for _, match := range matches {
			if !strings.Contains(strings.ToLower(match.Playlist), pl) {
				continue
			}

			if match.Placement == 1 {
				playerWins[point.PersonID]++
			}
		}
	}

	return &playerWins
}

func (s* PostgresStorage) GetAllItemsForProfile(profileId string) *[]DB_Item {
	var items []DB_Item
	s.Postgres.Model(&DB_Item{}).Where("profile_id = ?", profileId).Find(&items)
	return &items
}

func (s* PostgresStorage) preloadShop() *gorm.DB {
	return s.Postgres.
		Model(&objects.ShopCatalog{}).
		Preload("Sections").
		Preload("Sections.DB_itemOffers").
		Preload("Sections.DB_itemOffers.Rewards").
		Preload("Sections.DB_itemOffers.Price").
		Preload("Sections.DB_itemOffers.Display").
		Preload("Sections.DB_itemOffers.Meta").
		Preload("Sections.DB_currencyOffers").
		Preload("Sections.DB_currencyOffers.Rewards").
		Preload("Sections.DB_currencyOffers.Price").
		Preload("Sections.DB_currencyOffers.Display").
		Preload("Sections.DB_currencyOffers.Meta").
		Preload("Sections.DB_starterKitOffers").
		Preload("Sections.DB_starterKitOffers.Rewards").
		Preload("Sections.DB_starterKitOffers.Price").
		Preload("Sections.DB_starterKitOffers.Display").
		Preload("Sections.DB_starterKitOffers.Meta").
		Preload("Sections.DB_battlePassOffers").
		Preload("Sections.DB_battlePassOffers.Rewards").
		Preload("Sections.DB_battlePassOffers.Price").
		Preload("Sections.DB_battlePassOffers.Display").
		Preload("Sections.DB_battlePassOffers.Meta")
}

func (s* PostgresStorage) QueryShops() ([]objects.ShopCatalog, error) {
	var catalogs []objects.ShopCatalog
	err := s.preloadShop().Find(&catalogs).Error
	if err != nil {
		return nil, err
	}
	return catalogs, nil
}

func (s* PostgresStorage) QueryShop(date string) (*objects.ShopCatalog, error) {
	var catalog objects.ShopCatalog
	err := s.preloadShop().Where("ID = ?", date).First(&catalog).Error
	if err != nil {
		return nil, err
	}
	return &catalog, nil
}

func (s* PostgresStorage) SaveShop(shop *objects.ShopCatalog) error {
	err := s.Postgres.Save(shop).Error
	if err != nil {
		return err
	}
	return nil
}

func (s* PostgresStorage) DeleteShop(date string) error {
	fullShop, err := s.QueryShop(date)
	if err != nil {
		return err
	}

	for _, section := range fullShop.Sections {
		for _, item := range section.DB_itemOffers {
			for _, reward := range item.Rewards {
				s.Postgres.Delete(reward)
			}
			s.Postgres.Delete(item)
		}

		for _, item := range section.DB_battlePassOffers {
			for _, reward := range item.Rewards {
				s.Postgres.Delete(reward)
			}
			s.Postgres.Delete(item)
		}

		for _, item := range section.DB_currencyOffers {
			for _, reward := range item.Rewards {
				s.Postgres.Delete(reward)
			}
			s.Postgres.Delete(item)
		}

		for _, item := range section.DB_starterKitOffers {
			for _, reward := range item.Rewards {
				s.Postgres.Delete(reward)
			}
			s.Postgres.Delete(item)
		}

		s.Postgres.Delete(section)
	}

	err = s.Postgres.Delete(fullShop).Error

	return nil
}

func (s* PostgresStorage) GetShopBookOfferByID(offerId string) *objects.ShopOfferTypeBook {
	var offer objects.ShopOfferTypeBook
	s.Postgres.Model(&objects.ShopOfferTypeBook{}).Preload("Price").Preload("Display").Preload("Meta").Preload("Rewards").Where("ID = ?", offerId).First(&offer)
	if offer.ID == "" {
		return nil
	}
	return &offer
}

func (s* PostgresStorage) DeleteSection(section *objects.ShopSection) error {
	for _, item := range section.DB_itemOffers {
		for _, reward := range item.Rewards {
			s.Postgres.Delete(reward)
		}
		s.Postgres.Delete(item)
	}

	for _, item := range section.DB_battlePassOffers {
		for _, reward := range item.Rewards {
			s.Postgres.Delete(reward)
		}
		s.Postgres.Delete(item)
	}

	for _, item := range section.DB_currencyOffers {
		for _, reward := range item.Rewards {
			s.Postgres.Delete(reward)
		}
		s.Postgres.Delete(item)
	}

	for _, item := range section.DB_starterKitOffers {
		for _, reward := range item.Rewards {
			s.Postgres.Delete(reward)
		}
		s.Postgres.Delete(item)
	}

	err := s.Postgres.Delete(section).Error
	if err != nil {
		return err
	}
	return nil
}

func (s* PostgresStorage) DeleteItemOffer(offer *objects.ShopOfferTypeItem) error {
	for _, reward := range offer.Rewards {
		s.Postgres.Delete(reward)
	}

	err := s.Postgres.Delete(offer).Error
	if err != nil {
		return err
	}
	return nil
}

func (s* PostgresStorage) DeleteOfferGrant(grant *objects.ShopOfferGrant) error {
	err := s.Postgres.Delete(grant).Error
	if err != nil {
		return err
	}
	return nil
}

func (s* PostgresStorage) DeleteOfferDisplay(display *objects.OfferDisplay) error {
	err := s.Postgres.Delete(display).Error
	if err != nil {
		return err
	}
	return nil
}

func (s* PostgresStorage) DeleteOfferMeta(meta *objects.ShopOfferMeta) error {
	err := s.Postgres.Delete(meta).Error
	if err != nil {
		return err
	}
	return nil
}

func (s* PostgresStorage) DeleteOfferPrice(price *objects.ShopOfferPriceMtxCurrency) error {
	err := s.Postgres.Delete(price).Error
	if err != nil {
		return err
	}
	return nil
}