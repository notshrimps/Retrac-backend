package fortnite

import (
	"fmt"
	"strings"

	"github.com/ectrc/snow/person"
)

var (
	grantLookupTable = map[string]func(*person.Person, *LootResult, *ItemGrant) error {
		"AthenaCharacter": grantAthenaCosmetic,
		"AthenaBackpack": grantAthenaCosmetic,
		"AthenaPickaxe": grantAthenaCosmetic,
		"AthenaDance": grantAthenaCosmetic,
		"AthenaGlider": grantAthenaCosmetic,
		"AthenaLoadingScreen": grantAthenaCosmetic,
		"AthenaMusicPack": grantAthenaCosmetic,
		"AthenaPet": grantAthenaCosmetic,
		"AthenaSkyDiveContrail": grantAthenaCosmetic,
		"AthenaSpray": grantAthenaCosmetic,
		"AthenaToy": grantAthenaCosmetic,
		"AthenaEmoji": grantAthenaCosmetic,
		"AthenaItemWrap": grantAthenaCosmetic,
		"Currency": grantCurrency,
		"Token": grantCommonCoreCosmetic,
		"HomebaseBannerIcon":grantCommonCoreCosmetic,
		"HomebaseBannerColor": grantCommonCoreCosmetic,
		"CosmeticVariantToken": grantCosmeticVariantToken,
		"PersistentResource": grantPersistentResource,
		"AccountResource": grantPersistentResource,
		"Snow": grantSnowCustomReward,
	}
)

// This will either update the quantity of an
// already exisiting item or create a new item.
func GrantToPerson(p *person.Person, grants ...*ItemGrant) (*LootResult, error) {
	loot := NewLootResult()
	newGrants := grants

	for _, grant := range grants {
		if c := strings.Split(grant.TemplateID, ":"); len(c) == 2 && DataClient.SnowVariantTokens[c[1]] != nil {
			// fmt.Println("granting variant token", grant.TemplateID)
			grantCosmeticVariantToken(p, loot, &ItemGrant{TemplateID: "CosmeticVariantToken:" + strings.Split(grant.TemplateID, ":")[1], Quantity: 1})
		}

		pureIdParts := strings.Split(grant.TemplateID, ":")
		if len(pureIdParts) < 2 {
			continue
		}
		pureId := pureIdParts[1]
		// fmt.Println("pureId for variant:", pureId)
		if DataClient.SnowVariantTokens[pureId] != nil {
			newGrants = append(newGrants, &ItemGrant{TemplateID: "CosmeticVariantToken:" + pureId, Quantity: 1})
			continue
		}
	}

	for _, grant := range newGrants {
		templateData := strings.Split(grant.TemplateID, ":")
		if len(templateData) < 2 {
			continue
		}

		handler, ok := grantLookupTable[templateData[0]]
		if !ok {
			continue
		}

		err := handler(p, loot, grant)
		if err != nil {
			continue
		}
	}

	return loot, nil
}

func grantAthenaCosmetic(p *person.Person, loot *LootResult, grant *ItemGrant) error {
	parts := strings.Split(grant.TemplateID, ":")

	newTemplateId := ""
	switch parts[0] {
	case "AthenaPet":
		newTemplateId = "AthenaBackpack:" + parts[1]
	case "AthenaSpray":
		newTemplateId = "AthenaDance:" + parts[1]
	case "AthenaEmoji":
		newTemplateId = "AthenaDance:" + parts[1]
	case "AthenaToy":
		newTemplateId = "AthenaDance:" + parts[1]
	default:
		newTemplateId = parts[0] + ":" + parts[1]
	}

	if item := p.AthenaProfile.Items.GetItemByTemplateID(newTemplateId); item != nil {
		// item.Quantity += grant.Quantity
		// item.Save()
		return nil
	}

	item := person.NewItem(newTemplateId, grant.Quantity)
	p.AthenaProfile.Items.AddItem(item).Save()
	loot.AddItem(item)

	return nil
}

func grantCurrency(p *person.Person, loot *LootResult, grant *ItemGrant) error {
	// fmt.Println("granting currency", grant.TemplateID, grant.Quantity, "to", p.DisplayName)
	p.GiveAndSyncVbucks(grant.Quantity)
	return nil
}

func grantCommonCoreCosmetic(p *person.Person, loot *LootResult, grant *ItemGrant) error {
	if item := p.CommonCoreProfile.Items.GetItemByTemplateID(grant.TemplateID); item != nil {
		item.Quantity += grant.Quantity
		item.Save()
		return nil
	}

	item := person.NewItem(grant.TemplateID, grant.Quantity)
	p.CommonCoreProfile.Items.AddItem(item).Save()
	loot.AddItem(item)
	return nil
}

func grantCosmeticVariantToken(p *person.Person, loot *LootResult, grant *ItemGrant) error {
	parts := strings.Split(grant.TemplateID, ":")
	newTemplateId := "CosmeticVariantToken:" + parts[1]
	if variantToken := p.AthenaProfile.VariantTokens.GetVariantToken(newTemplateId); variantToken != nil {
		return fmt.Errorf("variant token already owned")
	}
	
	tokenData, ok := DataClient.SnowVariantTokens[parts[1]]
	if !ok {
		return fmt.Errorf("invalid variant token data")
	}

	if tokenData.Item == nil {
		return nil
	}
	
	found := p.AthenaProfile.Items.GetItemByTemplateID(tokenData.Item.Type.BackendValue + ":" + tokenData.Item.ID)
	if found == nil {
		return fmt.Errorf("tried to give variant for nil item" + tokenData.Item.Type.BackendValue + ":" + tokenData.Item.ID)
	}
	
	g := map[string][]string{}
	for _, variant := range tokenData.Grants {
		if _, ok := g[variant.Channel]; !ok {
			g[variant.Channel] = []string{}
		}

		g[variant.Channel] = append(g[variant.Channel], variant.Value)
	}

	for c, tags := range g {
		channel := found.GetChannel(c)
		if channel == nil {
			channel = found.NewChannel(c, tags, tags[0])
			found.AddChannel(channel)
			continue
		}

		channel.Owned = append(channel.Owned, tags...)
	}
	found.Save()

	p.AthenaProfile.CreateItemAttributeChangedChange(found, "Variants")
	return nil
}

func grantPersistentResource(p *person.Person, loot *LootResult, grant *ItemGrant) error {
	parts := strings.Split(grant.TemplateID, ":")
	switch parts[1] {
	case "AthenaSeasonalXP":
		p.CurrentSeasonStats.SeasonXP += grant.Quantity
		p.CurrentSeasonStats.Save()

		if p.AthenaProfile.Attributes.GetAttributeByKey("level") == nil {
			p.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("level", 1))
		}

		if p.AthenaProfile.Attributes.GetAttributeByKey("xp") == nil {
			p.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("xp", 0))
		}

		p.AthenaProfile.Attributes.GetAttributeByKey("level").SetValue(DataClient.SnowSeason.GetSeasonLevel(p.CurrentSeasonStats)).Save()
		p.AthenaProfile.Attributes.GetAttributeByKey("xp").SetValue(DataClient.SnowSeason.GetRelativeSeasonXP(p.CurrentSeasonStats)).Save()
	case "AthenaBattleStar":
		// p.CurrentSeasonStats.BookXP += grant.Quantity
		// p.CurrentSeasonStats.Save()
		// p.AthenaProfile.Attributes.GetAttributeByKey("book_level").SetValue(DataClient.SnowSeason.GetBookLevel(p.CurrentSeasonStats)).Save()
		// p.AthenaProfile.Attributes.GetAttributeByKey("book_xp").SetValue(DataClient.SnowSeason.GetRelativeBookXP(p.CurrentSeasonStats)).Save()

		currentLevel := DataClient.SnowSeason.GetSeasonLevel(p.CurrentSeasonStats)
		levelValue := grant.Quantity / 10
		xp := 0

		data := DataClient.SnowSeason.LevelProgression[currentLevel:currentLevel+levelValue]
		for _, v := range data {
			xp += v.XpToNextLevel
		}

		p.CurrentSeasonStats.SeasonXP += xp
		p.CurrentSeasonStats.Save()

		if p.AthenaProfile.Attributes.GetAttributeByKey("level") == nil {
			p.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("level", 1))
		}

		if p.AthenaProfile.Attributes.GetAttributeByKey("xp") == nil {
			p.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("xp", 0))
		}

		p.AthenaProfile.Attributes.GetAttributeByKey("level").SetValue(DataClient.SnowSeason.GetSeasonLevel(p.CurrentSeasonStats)).Save()
		p.AthenaProfile.Attributes.GetAttributeByKey("xp").SetValue(DataClient.SnowSeason.GetRelativeSeasonXP(p.CurrentSeasonStats)).Save()
		break
	}
	return nil
}

func grantSnowCustomReward(p *person.Person, loot *LootResult, grant *ItemGrant) error {
	parts := strings.Split(grant.TemplateID, ":")
	switch parts[1] {
	case "BattlePass":
		p.CurrentSeasonStats.BookPurchased = true
		p.CurrentSeasonStats.Save()

		if p.AthenaProfile.Attributes.GetAttributeByKey("book_purchased") == nil {
			p.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("book_purchased", false))
		}

		p.AthenaProfile.Attributes.GetAttributeByKey("book_purchased").SetValue(true).Save()
	}

	DataClient.SnowSeason.GrantUnredeemedBookRewards(p, "GB_BattlePassPurchased")
	return nil
}
