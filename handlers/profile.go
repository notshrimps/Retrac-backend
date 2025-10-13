package handlers

import (
	"fmt"
	"strings"
	"time"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/discord"
	"github.com/ectrc/snow/fortnite"
	p "github.com/ectrc/snow/person"
	"github.com/ectrc/snow/shop"
	"github.com/ectrc/snow/socket"
	"github.com/ectrc/snow/storage"
	"github.com/ectrc/snow/storage/objects"

	"github.com/gofiber/fiber/v2"
)

var (
	clientActions = map[string]func(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
		"QueryProfile": clientQueryProfileAction,
		"ClientQuestLogin": clientClientQuestLoginAction,
		"MarkItemSeen": clientMarkItemSeenAction,
		"SetItemFavoriteStatusBatch": clientSetItemFavoriteStatusBatchAction,
		"EquipBattleRoyaleCustomization": clientEquipBattleRoyaleCustomizationAction,
		"SetBattleRoyaleBanner": clientSetBattleRoyaleBannerAction,
		"SetCosmeticLockerSlot": clientSetCosmeticLockerSlotAction,
		"SetCosmeticLockerBanner": clientSetCosmeticLockerBannerAction,
		"SetCosmeticLockerName": clientSetCosmeticLockerNameAction,
		"CopyCosmeticLoadout": clientCopyCosmeticLoadoutAction,
		"DeleteCosmeticLoadout": clientDeleteCosmeticLoadoutAction,
		"PurchaseCatalogEntry": clientPurchaseCatalogEntryAction,
		"RefundMtxPurchase": clientRefundMtxPurchaseAction,
		"GiftCatalogEntry": clientGiftCatalogEntryAction,
		"RemoveGiftBox": clientRemoveGiftBoxAction,
		"SetAffiliateName": clientSetAffiliateNameAction,
		"SetReceiveGiftsEnabled": clientSetReceiveGiftsEnabledAction,
		"VerifyRealMoneyPurchase": clientVerifyRealMoneyPurchaseAction,
	}

	clientRepeatingActions = []func(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error{
		clientCalculateTierAndLevel,
		clientSetPurchaseHistory,
		// clientCheckRetracUltimateRewards, // DO NOT ENABLE, SLOWS IT DOWN SOOOO MUCH
	}

	serverActions = map[string]func(c *fiber.Ctx, person *p.Person, profile *p.Profile, profileChanges, multiUpdate, notifications *[]aid.JSON) error{
		"QueryProfile": serverQueryProfileAction,
	}
)

func PostClientProfileAction(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person == nil {
		return c.Status(404).JSON(aid.ErrorBadRequest("No Account Found"))
	}

	profile := person.GetProfileFromType(c.Query("profileId"))
	if profile == nil {
		return c.Status(404).JSON(aid.ErrorBadRequest("No Profile Found"))
	}
	defer profile.ClearProfileChanges()

	profileSnapshots := map[string]*p.ProfileSnapshot{
		"athena": nil,
		"common_core": nil,
		"common_public": nil,
	}
	for key := range profileSnapshots {
		profileSnapshots[key] = person.GetProfileFromType(key).Snapshot()
	}

	notifications := []aid.JSON{}

	action, ok := clientActions[c.Params("action")];
	if ok && profile != nil {
		if err := action(c, person, profile, &notifications); err != nil {
			return c.Status(400).JSON(aid.ErrorBadRequest(err.Error()))
		}
	}

	for _, action := range clientRepeatingActions {
		if err := action(c, person, profile, &notifications); err != nil {
			return c.Status(400).JSON(aid.ErrorBadRequest(err.Error()))
		}
	}

	for key, profileSnapshot := range profileSnapshots {
		profile := person.GetProfileFromType(key)
		if profile == nil {
			continue
		}

		if profileSnapshot == nil {
			continue
		}

		profile.Diff(profileSnapshot)
	}

	profile.Revision = aid.Ternary[int](c.QueryInt("rvn") == -1, profile.Revision, c.QueryInt("rvn"))+1
	go profile.Save()
	delete(profileSnapshots, profile.Type)

	multiUpdate := []aid.JSON{}
	for key := range profileSnapshots {
		profile := person.GetProfileFromType(key)
		if profile == nil {
			continue
		}
	
		if len(profile.Changes) == 0 {
			continue
		}
		profile.Revision++
		
		multiUpdate = append(multiUpdate, aid.JSON{
			"profileId": profile.Type,
			"profileRevision": profile.Revision,
			"profileCommandRevision": profile.Revision,
			"profileChangesBaseRevision": profile.Revision - 1,
			"profileChanges": profile.Changes,
		})
		
		profile.ClearProfileChanges()
		go profile.Save()
	}

	return c.Status(200).JSON(aid.JSON{
		"profileId": c.Query("profileId"),
		"profileRevision": profile.Revision,
		"profileCommandRevision": profile.Revision,
		"profileChangesBaseRevision": profile.Revision - 1,
		"profileChanges": profile.Changes,
		"multiUpdate": multiUpdate,
		"notifications": notifications,
		"responseVersion": 1,
		"serverTime": time.Now().Format("2006-01-02T15:04:05.999Z"),
	})
}

func clientQueryProfileAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	profile.CreateFullProfileUpdateChange()
	return nil
}

func clientClientQuestLoginAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	if person.Discord.LastBoostedAt == "" && discord.HasBoosterRole(person) {
		person.Discord.LastBoostedAt = time.Now().Add(time.Hour * 24 * 7).Format("2006-01-02T15:04:05.999Z")
		fortnite.GrantRewardInitialBooster(person)
		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}

	if person.Discord.LastBoostedAt != "" && !discord.HasBoosterRole(person) {
		fortnite.RemoveRewardInitialBooster(person)
		person.Discord.LastBoostedAt = ""
		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}

	parsedDiscord, err := time.Parse("2006-01-02T15:04:05.999Z", person.Discord.LastBoostedAt)
	if err == nil && discord.HasBoosterRole(person) && time.Now().After(parsedDiscord) {
		person.Discord.LastBoostedAt = time.Now().Add(time.Hour * 24 * 7).Format("2006-01-02T15:04:05.999Z")
		fortnite.GrantRewardWeeklyBooster(person)
		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}

	if !person.Discord.HasCrystalDonatorRole && discord.HasCrystalDonatorRole(person) {
		person.Discord.HasCrystalDonatorRole = true
		fortnite.GiveEverything(person)
		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}

	if !person.Discord.HasContentCreatorRole && discord.HasContentCreatorRole(person) {
		person.Discord.HasContentCreatorRole = true
		fortnite.GrantRewardContentCreator(person)
		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}

	parsedLlamaTime, err := time.Parse("2006-01-02T15:04:05.999Z", person.Discord.LastLlamaRewardAt);
	if err == nil && discord.HasLlamaDonatorRole(person) && time.Now().After(parsedLlamaTime) {
		person.Discord.LastLlamaRewardAt = time.Now().Add(time.Hour * 24 * 7).Format("2006-01-02T15:04:05.999Z")
		fortnite.GrantRewardWeeklyLlama(person)
		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}


	if !person.Discord.HasLlamaDonatorRole && discord.HasLlamaDonatorRole(person) {
		person.Discord.HasLlamaDonatorRole = true
		person.Discord.LastLlamaRewardAt = time.Now().Add(time.Hour * 24 * 7).Format("2006-01-02T15:04:05.999Z")
		fortnite.GrantRewardOG(person)
		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}

	if !person.Discord.HasRetracPlusRole && discord.HasRetracPlusRole(person) {
		person.Discord.HasRetracPlusRole = true
		person.Discord.LastRetracPlusRewardAt = time.Now().Add(time.Hour * 24 * 14).Format("2006-01-02T15:04:05.999Z")
		fortnite.GrantRewardRetracWeekOne(person)
		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}

	parsedRetracPlus, err := time.Parse("2006-01-02T15:04:05.999Z", person.Discord.LastRetracPlusRewardAt)
	if err == nil && discord.HasRetracPlusRole(person) && time.Now().After(parsedRetracPlus) {
		person.Discord.LastRetracPlusRewardAt = time.Now().Add(time.Hour * 24 * 14).Format("2006-01-02T15:04:05.999Z")
		
		if person.CommonCoreProfile.Items.GetItemByTemplateID("Token:RetracPlusWeekTwo") == nil {
			fortnite.GrantRewardRetracWeekTwo(person)
		} else if person.CommonCoreProfile.Items.GetItemByTemplateID("Token:RetracPlusWeek3") == nil {
			fortnite.GrantRewardRetracWeekThree(person)
		} else if person.CommonCoreProfile.Items.GetItemByTemplateID("Token:RetracPlusWeek4") == nil {
			fortnite.GrantRewardRetracWeekFour(person)
		} 

		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}

	if person.Discord.LastRetracPlusRewardAt != "" && !discord.HasRetracPlusRole(person) {
		// fortnite.RemoveRewardRetracWeekOne(person)
		person.Discord.HasRetracPlusRole = false
		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}

	if !person.Discord.HasRetracUltimateRole && discord.HasRetracUltimateRole(person) {
		person.Discord.HasRetracUltimateRole = true
		fortnite.GrantRewardCustomCosmetics(person)
		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}

	if person.AthenaProfile.Loadouts.Count() == 0 {
		loadout := p.NewLoadout("PRESET 1", person.AthenaProfile)
		person.AthenaProfile.Loadouts.AddLoadout(loadout).Save()
		person.AthenaProfile.Attributes.AddAttribute(p.NewAttribute("loadouts", []string{loadout.ID})).Save()
		person.AthenaProfile.Attributes.AddAttribute(p.NewAttribute("last_applied_loadout", loadout.ID)).Save()
		person.AthenaProfile.Attributes.AddAttribute(p.NewAttribute("active_loadout_index", 0)).Save()
	}

	// BUGGED VBUCKS
	// for _, profile := range []*p.Profile{person.CommonCoreProfile, person.Profile0Profile} {
	// 	currency := []*p.Item{}
	// 	profile.Items.RangeItems(func(key string, value *p.Item) bool {
	// 		if value.TemplateID == "Currency:MtxPurchased" {
	// 			currency = append(currency, value)
	// 		}
	// 		return true
	// 	})

	// 	if len(currency) == 0 {
	// 		vbuck := p.NewItem("Currency:MtxPurchased", 0)
	// 		profile.Items.AddItem(vbuck)
	// 		vbuck.Save()
	// 		profile.Items.IndexedByTemplateID.Store("Currency:MtxPurchased", vbuck)
	// 	}

		// if len(currency) > 1 {
		// 	first := currency[0]
		// 	for _, item := range currency[1:] {
		// 		first.Quantity += item.Quantity
		// 		profile.Items.DeleteItem(item.ID)
		// 	}
		// 	first.Save()
		// }
	// }

	// var items_to_change_id = []string{
	// 	"EID_TwistDaytona_Retrac",
	// 	"EID_MagicMan_Retrac",
	// 	"EID_LasagnaDance_Retrac",
	// 	"EID_JumpStyleDance_Retrac",
	// 	"EID_JanuaryBop_Retrac",
	// 	"EID_HotPink_Retrac",
	// 	"EID_StringDance_Retrac",
	// 	"EID_BillyBounce_Retrac",
	// 	"CID_736_Athena_Commando_F_DonutDish_Retrac",
	// 	"CID_737_Athena_Commando_F_DonutPlate_Retrac",
	// 	"CID_704_Athena_Commando_F_LollipopTrickster_Retrac",
	// 	"CID_674_Athena_Commando_F_HoodieBandit_Retrac",
	// 	"CID_703_Athena_Commando_M_Cyclone_Retrac",
	// 	"CID_748_Athena_Commando_F_Hitman_Retrac",
	// 	"CID_757_Athena_Commando_F_WildCat_Retrac",
	// 	"CID_828_Athena_Commando_F_Valet_Retrac",
	// 	"CID_899_Athena_Commando_F_Poison_Retrac",
	// 	"CID_663_Athena_Commando_F_Frogman_Retrac",
	// 	"CID_452_Athena_Commando_F_CyberFu_Retrac",
	// 	"CID_434_Athena_Commando_F_StealthHonor_Retrac",
	// 	"CID_583_Athena_Commando_F_NoshHunter_Retrac",
	// 	"CID_616_Athena_Commando_F_CavalryBandit_Retrac",
	// 	"CID_801_Athena_Commando_F_GolfSummer_Retrac",
	// 	"CID_749_Athena_Commando_F_GraffitiAssassin_Retrac",
	// 	"CID_694_Athena_Commando_M_CatBurglar_Retrac",
	// 	"CID_753_Athena_Commando_F_Hostile_Retrac",
	// 	"CID_619_Athena_Commando_F_TechLlama_Retrac",
	// 	"CID_842_Athena_Commando_F_HightowerHoneydew_Retrac",
	// 	"CID_453_Athena_Commando_F_GlowBro_Retrac",
	// 	"CID_812_Athena_Commando_F_RedRidingSummer_Retrac",
	// }

	// person.AthenaProfile.Items.RangeItems(func(key string, value *p.Item) bool {
	// 	for _, id := range items_to_change_id {
	// 		if value.TemplateID == id {
	// 			value.TemplateID = strings.ReplaceAll(value.TemplateID, "_Retrac", "")
	// 			go value.Save()
	// 		}
	// 	}

	// 	return true
	// })

	return nil
}

func clientMarkItemSeenAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		ItemIds []string `json:"itemIds"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	for _, itemId := range body.ItemIds {
		item := profile.Items.GetItem(itemId)
		if item == nil {
			continue
		}
		
		item.HasSeen = true
		go item.Save()
	}

	return nil
}

func clientEquipBattleRoyaleCustomizationAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		SlotName string `json:"slotName" binding:"required"`
		ItemToSlot string `json:"itemToSlot"`
		IndexWithinSlot int `json:"indexWithinSlot"`
		VariantUpdates []struct{
			Active string `json:"active"`
			Channel string `json:"channel"`
		} `json:"variantUpdates"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	item := profile.Items.GetItem(body.ItemToSlot)
	if item == nil {
		if body.ItemToSlot != "" && !strings.Contains(strings.ToLower(body.ItemToSlot), "random") {
			return fmt.Errorf("item not found")
		}

		item = &p.Item{
			ID: body.ItemToSlot,
		}
	}

	for _, update := range body.VariantUpdates {
		channel := item.GetChannel(update.Channel)
		if channel == nil {
			continue
		}

		channel.Active = update.Active
		go channel.Save()
	}

	attr := profile.Attributes.GetAttributeByKey("favorite_" + strings.ReplaceAll(strings.ToLower(body.SlotName), "wrap", "wraps"))
	if attr == nil {
		return fmt.Errorf("attribute not found")
	}
	switch body.SlotName {
	case "Dance":
		value := aid.JSONParse(attr.ValueJSON)
		value.([]any)[body.IndexWithinSlot] = item.ID
		attr.ValueJSON = aid.JSONStringify(value)
	case "ItemWrap":
		value := aid.JSONParse(attr.ValueJSON)
		if body.IndexWithinSlot == -1 {
			attr.ValueJSON = aid.JSONStringify([]any{item.ID,item.ID,item.ID,item.ID,item.ID,item.ID,item.ID})
			break
		}
		value.([]any)[body.IndexWithinSlot] = item.ID
		attr.ValueJSON = aid.JSONStringify(value)
	default:
		attr.ValueJSON = aid.JSONStringify(item.ID)
	}
	go attr.Save()

	return nil
}

func clientSetBattleRoyaleBannerAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		HomebaseBannerColorID string `json:"homebaseBannerColorId" binding:"required"`
		HomebaseBannerIconID string `json:"homebaseBannerIconId" binding:"required"`
	}
	
	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	colorItem := person.CommonCoreProfile.Items.GetItemByTemplateID("HomebaseBannerColor:"+body.HomebaseBannerColorID)
	if colorItem == nil {
		return fmt.Errorf("color item not found")
	}

	iconItem := person.CommonCoreProfile.Items.GetItemByTemplateID("HomebaseBannerIcon:"+body.HomebaseBannerIconID)
	if iconItem == nil {
		return fmt.Errorf("icon item not found")
	}

	iconAttr := profile.Attributes.GetAttributeByKey("banner_icon")
	if iconAttr == nil {
		return fmt.Errorf("icon attribute not found")
	}

	colorAttr := profile.Attributes.GetAttributeByKey("banner_color")
	if colorAttr == nil {
		return fmt.Errorf("color attribute not found")
	}

	iconAttr.ValueJSON = aid.JSONStringify(strings.Split(iconItem.TemplateID, ":")[1])
	colorAttr.ValueJSON = aid.JSONStringify(strings.Split(colorItem.TemplateID, ":")[1])
	iconAttr.Save()
	colorAttr.Save()

	return nil
}

func clientSetItemFavoriteStatusBatchAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		ItemIds []string `json:"itemIds" binding:"required"`
		Favorite []bool `json:"itemFavStatus" binding:"required"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	for i, itemId := range body.ItemIds {
		item := profile.Items.GetItem(itemId)
		if item == nil {
			continue
		}

		item.Favorite = body.Favorite[i]
		go item.Save()
	}

	return nil
}

func clientSetCosmeticLockerSlotAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		Category string `json:"category" binding:"required"` // item type e.g. Character
		ItemToSlot string `json:"itemToSlot" binding:"required"` // template id
		LockerItem string `json:"lockerItem" binding:"required"` // locker id
		SlotIndex int `json:"slotIndex" binding:"required"` // index of slot
		VariantUpdates []struct{
			Active string `json:"active"`
			Channel string `json:"channel"`
		} `json:"variantUpdates" binding:"required"` // variant updates
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	item := profile.Items.GetItemByTemplateID(body.ItemToSlot)
	if item == nil {
		if body.ItemToSlot != "" && !strings.Contains(strings.ToLower(body.ItemToSlot), "random") {
			return fmt.Errorf("item not found")
		} 

		item = &p.Item{
			ID: body.ItemToSlot,
		}
	}

	currentLocker := profile.Loadouts.GetLoadout(body.LockerItem)
	if currentLocker == nil {
		return fmt.Errorf("current locker not found")
	}
	for _, update := range body.VariantUpdates {
		channel := item.GetChannel(update.Channel)
		if channel == nil {
			channel = item.NewChannel(update.Channel, []string{update.Active}, update.Active)
			item.AddChannel(channel)
		}
		
		channel.Active = update.Active
		go channel.Save()
	}

	switch body.Category {
	case "Character":
		defer profile.CreateLoadoutChangedChange(currentLocker, "CharacterID")
		currentLocker.CharacterID = item.ID
	case "Backpack":
		currentLocker.BackpackID = item.ID
	case "Pickaxe":
		currentLocker.PickaxeID = item.ID
	case "Glider":
		defer profile.CreateLoadoutChangedChange(currentLocker, "GliderID")
		currentLocker.GliderID = item.ID
	case "ItemWrap":
		defer profile.CreateLoadoutChangedChange(currentLocker, "ItemWrapID")
		if body.SlotIndex == -1 {
			for i := range currentLocker.ItemWrapID {
				currentLocker.ItemWrapID[i] = item.ID
			}
			break
		}
		currentLocker.ItemWrapID[body.SlotIndex] = item.ID
	case "Dance":
		defer profile.CreateLoadoutChangedChange(currentLocker, "DanceID")
		if body.SlotIndex == -1 {
			for i := range currentLocker.DanceID {
				currentLocker.DanceID[i] = item.ID
			}
			break
		}
		currentLocker.DanceID[body.SlotIndex] = item.ID
	case "SkyDiveContrail":
		currentLocker.ContrailID = item.ID
	case "LoadingScreen":
		currentLocker.LoadingScreenID = item.ID
	case "MusicPack":
		currentLocker.MusicPackID = item.ID
	}
	go currentLocker.Save()

	
	return nil
}

func clientSetCosmeticLockerBannerAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error { 
	var body struct {
		LockerItem string `json:"lockerItem" binding:"required"` // locker id
		BannerColorTemplateName string `json:"bannerColorTemplateName" binding:"required"` // template id
		BannerIconTemplateName string `json:"bannerIconTemplateName" binding:"required"` // template id
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	color := person.CommonCoreProfile.Items.GetItemByTemplateID("HomebaseBannerColor:" + body.BannerColorTemplateName)
	if color == nil {
		return fmt.Errorf("color item not found")
	}

	icon := profile.Items.GetItemByTemplateID("HomebaseBannerIcon:" + body.BannerIconTemplateName)
	if icon == nil {
		icon = &p.Item{
			ID: body.BannerIconTemplateName,
		}
	}

	currentLocker := profile.Loadouts.GetLoadout(body.LockerItem)
	if currentLocker == nil {
		return fmt.Errorf("current locker not found")
	}
	currentLocker.BannerColorID = color.ID
	currentLocker.BannerID = icon.ID

	go currentLocker.Save()

	return nil
}

func clientSetCosmeticLockerNameAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		LockerItem string `json:"lockerItem" binding:"required"`
		Name string `json:"name" binding:"required"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	loadoutsAttribute := profile.Attributes.GetAttributeByKey("loadouts")
	if loadoutsAttribute == nil {
		return fmt.Errorf("loadouts not found")
	}
	loadouts := p.AttributeConvertToSlice[string](loadoutsAttribute)

	currentLocker := profile.Loadouts.GetLoadout(body.LockerItem)
	if currentLocker == nil {
		return fmt.Errorf("current locker not found")
	}

	if loadouts[0] == currentLocker.ID {
		return fmt.Errorf("cannot rename default locker")
	}

	currentLocker.LockerName = body.Name
	go currentLocker.Save()

	return nil
}

func clientCopyCosmeticLoadoutAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		OptNewNameForTarget string `json:"optNewNameForTarget" binding:"required"`
		SourceIndex int `json:"sourceIndex" binding:"required"`
		TargetIndex int `json:"targetIndex" binding:"required"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	lastAppliedLoadoutAttribute := profile.Attributes.GetAttributeByKey("last_applied_loadout")
	if lastAppliedLoadoutAttribute == nil {
		return fmt.Errorf("last_applied_loadout not found")
	}

	activeLoadoutIndexAttribute := profile.Attributes.GetAttributeByKey("active_loadout_index")
	if activeLoadoutIndexAttribute == nil {
		return fmt.Errorf("active_loadout_index not found")
	}

	loadoutsAttribute := profile.Attributes.GetAttributeByKey("loadouts")
	if loadoutsAttribute == nil {
		return fmt.Errorf("loadouts not found")
	}
	loadouts := p.AttributeConvertToSlice[string](loadoutsAttribute)

	if body.SourceIndex >= len(loadouts) {
		return fmt.Errorf("source index out of range")
	}

	sandboxLoadout := profile.Loadouts.GetLoadout(loadouts[0])
	if sandboxLoadout == nil {
		return fmt.Errorf("sandbox loadout not found")
	}

	lastAppliedLoadout := profile.Loadouts.GetLoadout(p.AttributeConvert[string](lastAppliedLoadoutAttribute))
	if lastAppliedLoadout == nil {
		return fmt.Errorf("last applied loadout not found")
	}

	if body.TargetIndex >= len(loadouts) {
		newLoadout := p.NewLoadout(body.OptNewNameForTarget, profile)
		newLoadout.CopyFrom(lastAppliedLoadout)
		profile.Loadouts.AddLoadout(newLoadout)
		go newLoadout.Save()

		lastAppliedLoadout.CopyFrom(sandboxLoadout)
		go lastAppliedLoadout.Save()

		lastAppliedLoadoutAttribute.ValueJSON = aid.JSONStringify(newLoadout.ID)
		activeLoadoutIndexAttribute.ValueJSON = aid.JSONStringify(body.TargetIndex)
		go lastAppliedLoadoutAttribute.Save()
		go activeLoadoutIndexAttribute.Save()

		loadouts = append(loadouts, newLoadout.ID)
		loadoutsAttribute.ValueJSON = aid.JSONStringify(loadouts)
		go loadoutsAttribute.Save()

		sandboxLoadout.CopyFrom(newLoadout)
		go sandboxLoadout.Save()

		if len(profile.Changes) == 0 {
			profile.CreateLoadoutChangedChange(sandboxLoadout, "DanceID")
		}

		return nil
	}

	if body.SourceIndex > 0  {
		sourceLoadout := profile.Loadouts.GetLoadout(loadouts[body.SourceIndex])
		if sourceLoadout == nil {
			return fmt.Errorf("target loadout not found")
		}
	
		sandboxLoadout.CopyFrom(sourceLoadout)
		go sandboxLoadout.Save()

		lastAppliedLoadoutAttribute.ValueJSON = aid.JSONStringify(sourceLoadout.ID)
		activeLoadoutIndexAttribute.ValueJSON = aid.JSONStringify(body.SourceIndex)

		go lastAppliedLoadoutAttribute.Save()
		go activeLoadoutIndexAttribute.Save()

		if len(profile.Changes) == 0{
			profile.CreateLoadoutChangedChange(sandboxLoadout, "DanceID")
			profile.CreateLoadoutChangedChange(sourceLoadout, "DanceID")
		}

		return nil
	}

	targetLoadout := profile.Loadouts.GetLoadout(loadouts[body.TargetIndex])
	if targetLoadout == nil {
		return fmt.Errorf("target loadout not found")
	}

	sandboxLoadout.CopyFrom(targetLoadout)
	go sandboxLoadout.Save()

	if len(profile.Changes) == 0{
		profile.CreateLoadoutChangedChange(sandboxLoadout, "DanceID")
		profile.CreateLoadoutChangedChange(targetLoadout, "DanceID")
	}

	return nil
}

func clientDeleteCosmeticLoadoutAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		FallbackLoadoutIndex int `json:"fallbackLoadoutIndex" binding:"required"`
		LoadoutIndex int `json:"index" binding:"required"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	lastAppliedLoadoutAttribute := profile.Attributes.GetAttributeByKey("last_applied_loadout")
	if lastAppliedLoadoutAttribute == nil {
		return fmt.Errorf("last_applied_loadout not found")
	}

	activeLoadoutIndexAttribute := profile.Attributes.GetAttributeByKey("active_loadout_index")
	if activeLoadoutIndexAttribute == nil {
		return fmt.Errorf("active_loadout_index not found")
	}

	loadoutsAttribute := profile.Attributes.GetAttributeByKey("loadouts")
	if loadoutsAttribute == nil {
		return fmt.Errorf("loadouts not found")
	}
	loadouts := p.AttributeConvertToSlice[string](loadoutsAttribute)

	if body.LoadoutIndex >= len(loadouts) {
		return fmt.Errorf("loadout index out of range")
	}

	if body.LoadoutIndex == 0 {
		return fmt.Errorf("cannot delete default loadout")
	}

	if body.FallbackLoadoutIndex == -1 {
		body.FallbackLoadoutIndex = 0
	}

	fallbackLoadout := profile.Loadouts.GetLoadout(loadouts[body.FallbackLoadoutIndex])
	if fallbackLoadout == nil {
		return fmt.Errorf("fallback loadout not found")
	}

	lastAppliedLoadoutAttribute.ValueJSON = aid.JSONStringify(fallbackLoadout.ID)
	activeLoadoutIndexAttribute.ValueJSON = aid.JSONStringify(body.FallbackLoadoutIndex)
	lastAppliedLoadoutAttribute.Save()
	activeLoadoutIndexAttribute.Save()

	profile.Loadouts.DeleteLoadout(loadouts[body.LoadoutIndex])
	loadouts = append(loadouts[:body.LoadoutIndex], loadouts[body.LoadoutIndex+1:]...)
	loadoutsAttribute.ValueJSON = aid.JSONStringify(loadouts)
	loadoutsAttribute.Save()

	return nil
}

func clientPurchaseCatalogEntryAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		OfferID string `json:"offerId" binding:"required"`
		PurchaseQuantity int `json:"purchaseQuantity" binding:"required"`
		ExpectedTotalPrice int `json:"expectedTotalPrice" binding:"required"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}
	
	catalog := shop.Today()
	fetch := catalog.GetOfferByID(body.OfferID)
	if fetch == nil {
		return fmt.Errorf("offer not found")
	}

	switch fetch.Type {
	case objects.ShopOfferTypeEnumItem:
		offer := fetch.Offer.MustItemOffer()
		if (offer.Price.FinalPrice * body.PurchaseQuantity) != body.ExpectedTotalPrice {
			return fmt.Errorf("invalid price")
		}
	case objects.ShopOfferTypeEnumBook:
		offer := fetch.Offer.MustBookOffer()
		if (offer.Price.FinalPrice * body.PurchaseQuantity) != body.ExpectedTotalPrice {
			return fmt.Errorf("invalid price")
		}
	default:
		return fmt.Errorf("invalid offer type")
	}

	purchaseLookup := map[string]func(quantity int, offer objects.ShopOffer, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error{
		"item": clientPurchaseCatalogItemEntryAction,
		"book": clientPurchaseCatalogBattlePassEntryAction,
	}

	if purchaseFunc, ok := purchaseLookup[string(fetch.Type)]; ok {
		return purchaseFunc(body.PurchaseQuantity, fetch.Offer, person, profile, notifications)
	}

	return nil
}

func clientPurchaseCatalogItemEntryAction(quantity int, offerRaw objects.ShopOffer, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	offer := offerRaw.MustItemOffer()
	for _, grant := range offer.Rewards {
		if grant.ProfileType != objects.ProfileTypeEnumAthena {
			return fmt.Errorf("save the world not implemeted yet")
		}
	}

	if !person.HasEnoughVbucks(offer.Price.FinalPrice * quantity) {
		return fmt.Errorf("not enough vbucks")
	}

	person.TakeAndSyncVbucks(offer.Price.FinalPrice * quantity)

	loot := []aid.JSON{}
	purchase := p.NewPurchase(offer.OfferID(), offer.Price.FinalPrice)

	groupedRewards := map[string]int{}
	for i := 0; i < quantity; i++ {
		for _, grant := range offer.Rewards {
			groupedRewards[grant.TemplateID()] += grant.Quantity
		}
	}

	for templateID, quantity := range groupedRewards {
		result, err := fortnite.GrantToPerson(person, fortnite.NewItemGrant(templateID, quantity))
		if err == nil {
			loot = append(loot, result.GenerateFortniteLootResultEntry()...)
		}

		for id, vtid := range fortnite.DataClient.SnowVariantTokens {
			if vtid.Item == nil {
				continue
			}

			if vtid.Item.ID != strings.Split(templateID, ":")[1] {
				continue
			}

			r2, err := fortnite.GrantToPerson(person, fortnite.NewItemGrant("CosmeticVariantToken:" + id, 1))
			if err == nil {
				loot = append(loot, r2.GenerateFortniteLootResultEntry()...)
			}
		}
	}

	for _, item := range loot {

		purchaseItem := p.NewItem(item["itemType"].(string), 1)
		purchaseItem.ID = item["itemGuid"].(string)
		purchaseItem.ProfileType = item["itemProfile"].(string)
		purchase.AddLoot(purchaseItem)
	}

	*notifications = append(*notifications, aid.JSON{
		"type": "CatalogPurchase",
		"lootResult": aid.JSON{
			"items": loot,
		},
		"primary": true,
	})
	
	if offer.Meta.Refundable {
		person.AthenaProfile.Purchases.AddPurchase(purchase).Save()
	}

	affiliate := person.CommonCoreProfile.Attributes.GetAttributeByKey("mtx_affiliate")
	if affiliate == nil {
		return nil
	}

	creator := p.Find(p.AttributeConvert[string](affiliate))
	if creator != nil {
		creator.GiveAndSyncVbucks(int(float64(offer.Price.FinalPrice) * 0.05) * quantity)
	}

	return nil
}

func clientPurchaseCatalogBattlePassEntryAction(quantity int, offerRaw objects.ShopOffer, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	offer := offerRaw.MustBookOffer()
	if person.CommonCoreProfile.Items.GetItemByTemplateID("Currency:MtxPurchased") == nil {
		person.CommonCoreProfile.Items.AddItem(p.NewItem("Currency:MtxPurchased", 0))
	}

	if person.CommonCoreProfile.Items.GetItemByTemplateID("Currency:MtxPurchased").Quantity < offer.Price.FinalPrice * quantity {
		return fmt.Errorf("not enough vbucks")
	}
	person.TakeAndSyncVbucks(offer.Price.FinalPrice * quantity)

	groupedRewards := map[string]int{}
	for i := 0; i < quantity; i++ {
		for _, grant := range offer.Rewards {
			groupedRewards[grant.TemplateID()] += grant.Quantity
		}
	}

	for templateID, quantity := range groupedRewards {
		_, err := fortnite.GrantToPerson(person, fortnite.NewItemGrant(templateID, quantity))
		if err != nil {
			continue
		}
	}

	receipt := p.NewReceipt(offer.OfferID(), 0)
	receipt.SetState("OK")
	person.Receipts.AddReceipt(receipt).Save()
	affiliate := person.CommonCoreProfile.Attributes.GetAttributeByKey("mtx_affiliate")
	if affiliate == nil {
		return nil
	}

	creator := p.Find(p.AttributeConvert[string](affiliate))
	if creator != nil {
		creator.GiveAndSyncVbucks(int(float64(offer.Price.FinalPrice) * 0.05) * quantity)
	}
	return nil
}

func clientRefundMtxPurchaseAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		PurchaseID string `json:"purchaseId" binding:"required"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	purchase := person.AthenaProfile.Purchases.GetPurchase(body.PurchaseID)
	if purchase == nil {
		return fmt.Errorf("purchase not found")
	}

	if time.Now().After(purchase.FreeRefundExpiry) {
		if person.RefundTickets <= 0 {
			return fmt.Errorf("not enough refund tickets")
		}
		person.RefundTickets--
	}

	for _, lootItem := range purchase.Loot {
		person.GetProfileFromType(lootItem.ProfileType).Items.DeleteItem(lootItem.ID)
		person.GetProfileFromType(lootItem.ProfileType).CreateItemRemovedChange(lootItem.ID)
	}
	purchase.Save()
	purchase.Loot = append(purchase.Loot, p.NewItemWithType("FREE_REFUND", 1, "profile0"))
	purchase.RefundedAt = time.Now()
	person.GiveAndSyncVbucks(purchase.TotalPaid)
	person.SaveShallow()

	return nil
}

func clientGiftCatalogEntryAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		OfferID string `json:"offerId" binding:"required"`
		Currency string `json:"currency" binding:"required"`
		CurrencySubType string `json:"currencySubType" binding:"required"`
		ExpectedTotalPrice int `json:"expectedTotalPrice" binding:"required"`
		GameContext string `json:"gameContext" binding:"required"`
		GiftWrapTemplateId string `json:"giftWrapTemplateId" binding:"required"`
		PersonalMessage string `json:"personalMessage" binding:"required"`
		ReceiverAccountIds []string `json:"receiverAccountIds" binding:"required"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	catalog := shop.Today()
	fetch := catalog.GetOfferByID(body.OfferID)
	if fetch == nil {
		return fmt.Errorf("offer not found")
	}
	
	if fetch.Type != objects.ShopOfferTypeEnumItem {
		return fmt.Errorf("invalid offer type")
	}
	offer := fetch.Offer.MustItemOffer()

	if offer.Price.FinalPrice != body.ExpectedTotalPrice {
		return fmt.Errorf("invalid price")
	}

	for _, receiverAccountId := range body.ReceiverAccountIds {
		receiverPerson := p.Find(receiverAccountId)
		if receiverPerson == nil {
			return fmt.Errorf("one or more receivers not found")
		}

		for _, grant := range offer.Rewards {
			if receiverPerson.AthenaProfile.Items.GetItemByTemplateID(grant.TemplateID()) != nil {
				return fmt.Errorf("one or more receivers has one of the items")
			}
		}
	}

	price := offer.Price.FinalPrice * len(body.ReceiverAccountIds)
	if !person.HasEnoughVbucks(price) {
		return fmt.Errorf("not enough vbucks")
	}

	person.TakeAndSyncVbucks(price)

	for _, receiverAccountId := range body.ReceiverAccountIds {
		receiverPerson := p.Find(receiverAccountId)
		gift := p.NewGift(body.GiftWrapTemplateId, 1, person.ID, body.PersonalMessage)
		for _, grant := range offer.Rewards {
			item := p.NewItem(grant.TemplateID(), grant.Quantity)
			item.ProfileType = string(grant.ProfileType)
			gift.AddLoot(item)
		}
		
		receiverPerson.CommonCoreProfile.Gifts.AddGift(gift).Save()
		socket.EmitGiftReceived(receiverPerson)
	}

	return nil
}

func clientRemoveGiftBoxAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		GiftBoxItemId string `json:"giftBoxItemId" binding:"required"`	
		GiftBoxItemIds []string `json:"giftBoxItemIds" binding:"required"`	
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	body.GiftBoxItemIds = append(body.GiftBoxItemIds, body.GiftBoxItemId)

	for _, giftBoxItemId := range body.GiftBoxItemIds {
		gift := person.CommonCoreProfile.Gifts.GetGift(giftBoxItemId)
		if gift == nil {
			continue
		}

		loot := []aid.JSON{}
		for _, item := range gift.Loot {
			result, err := fortnite.GrantToPerson(person, fortnite.NewItemGrant(item.TemplateID, item.Quantity))
			if err != nil {
				continue
			}

			loot = append(loot, result.GenerateFortniteLootResultEntry()...)
			item.DeleteLoot()
		}

		person.CommonCoreProfile.Gifts.DeleteGift(gift.ID)

		*notifications = append(*notifications, aid.JSON{
			"type": "CatalogPurchase",
			"lootResult": aid.JSON{
				"items": loot,
			},
			"primary": true,
		})
	}

	return nil
}

func clientSetAffiliateNameAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		AffiliateName string `json:"affiliateName" binding:"required"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	affiliate := person.CommonCoreProfile.Attributes.GetAttributeByKey("mtx_affiliate")
	if affiliate == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid affiliate attribute"))
	}

	affiliate.ValueJSON = aid.JSONStringify(body.AffiliateName)
	affiliate.Save()

	setTime := person.CommonCoreProfile.Attributes.GetAttributeByKey("mtx_affiliate_set_time")
	if setTime == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid affiliate set time attribute"))
	}

	setTime.ValueJSON = aid.JSONStringify(time.Now().Format("2006-01-02T15:04:05.999Z"))
	setTime.Save()

	return nil
}

func clientSetReceiveGiftsEnabledAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		ReceiveGifts bool `json:"bReceiveGifts" binding:"required"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	profile.Attributes.GetAttributeByKey("allowed_to_receive_gifts").SetValue(body.ReceiveGifts).Save()
	return nil
}

func clientVerifyRealMoneyPurchaseAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	var body struct {
		AppStore string `json:"appStore" binding:"required"`
		AppStoreId string `json:"appStoreId" binding:"required"`
		PurchaseCorrelationId string `json:"purchaseCorrelationId" binding:"required"`
		ReceiptId string `json:"receiptId" binding:"required"`
		ReceiptInfo string `json:"receiptInfo" binding:"required"`
	}

	if err := c.BodyParser(&body); err != nil {
		return fmt.Errorf("invalid Body")
	}

	receipt := person.Receipts.GetReceipt(body.ReceiptId)
	if receipt == nil {
		return fmt.Errorf("receipt does not exist")
	}

	if receipt.OfferID != body.AppStoreId {
		return fmt.Errorf("receipt does not match offer")
	}

	gift := p.NewGift("GiftBox:GB_MakeGood", 1, "", "Thank you for your purchase!")
	for _, grant := range receipt.Loot {
		item := p.NewItem(grant.TemplateID, grant.Quantity)
		item.ProfileType = grant.ProfileType
		gift.AddLoot(item)
	}	
	
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
	person.SetInAppPurchasesAttribute()
	person.SyncVBucks("common_core")
	receipt.SetState("OK")
	receipt.Save()
	return nil
}

func clientCalculateTierAndLevel(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	for {
		tierChanged := fortnite.DataClient.SnowSeason.GrantUnredeemedBookRewards(person, "GB_BattlePass")
		levelChanged := fortnite.DataClient.SnowSeason.GrantUnredeemedLevelRewards(person)

		if !tierChanged && !levelChanged {
			break
		}
	}

	if person.AthenaProfile.Attributes.GetAttributeByKey("season_num") == nil {
		person.AthenaProfile.Attributes.AddAttribute(p.NewAttribute("season_num", 0))
	}

	if person.AthenaProfile.Attributes.GetAttributeByKey("level") == nil {
		person.AthenaProfile.Attributes.AddAttribute(p.NewAttribute("level", 1))
	}

	if person.AthenaProfile.Attributes.GetAttributeByKey("accountLevel") == nil {
		person.AthenaProfile.Attributes.AddAttribute(p.NewAttribute("accountLevel", 1))
	}

	if person.AthenaProfile.Attributes.GetAttributeByKey("xp") == nil {
		person.AthenaProfile.Attributes.AddAttribute(p.NewAttribute("xp", 0))
	}

	if person.AthenaProfile.Attributes.GetAttributeByKey("book_purchased") == nil {
		person.AthenaProfile.Attributes.AddAttribute(p.NewAttribute("book_purchased", 0))
	}

	if person.AthenaProfile.Attributes.GetAttributeByKey("book_level") == nil {
		person.AthenaProfile.Attributes.AddAttribute(p.NewAttribute("book_level", 1))
	}

	if person.AthenaProfile.Attributes.GetAttributeByKey("book_xp") == nil {
		person.AthenaProfile.Attributes.AddAttribute(p.NewAttribute("book_xp", 0))
	}

	person.AthenaProfile.Attributes.GetAttributeByKey("season_num").SetValue(person.CurrentSeasonStats.Season).Save()
	person.AthenaProfile.Attributes.GetAttributeByKey("level").SetValue(fortnite.DataClient.SnowSeason.GetSeasonLevel(person.CurrentSeasonStats)).Save()
	person.AthenaProfile.Attributes.GetAttributeByKey("accountLevel").SetValue(fortnite.DataClient.SnowSeason.GetSeasonLevel(person.CurrentSeasonStats)).Save()
	person.AthenaProfile.Attributes.GetAttributeByKey("xp").SetValue(fortnite.DataClient.SnowSeason.GetRelativeSeasonXP(person.CurrentSeasonStats)).Save()
	person.AthenaProfile.Attributes.GetAttributeByKey("book_purchased").SetValue(person.CurrentSeasonStats.BookPurchased).Save()
	person.AthenaProfile.Attributes.GetAttributeByKey("book_level").SetValue(fortnite.DataClient.SnowSeason.GetBookLevel(person.CurrentSeasonStats)).Save()
	person.AthenaProfile.Attributes.GetAttributeByKey("book_xp").SetValue(fortnite.DataClient.SnowSeason.GetRelativeBookXP(person.CurrentSeasonStats)).Save()

	return nil
}

func clientSetPurchaseHistory(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	person.SetPurchaseHistoryAttribute()
	return nil
}

func clientCheckRetracUltimateRewards(c *fiber.Ctx, person *p.Person, profile *p.Profile, notifications *[]aid.JSON) error {
	if !person.Discord.HasRetracUltimateRole && discord.HasRetracUltimateRole(person) {
		person.Discord.HasRetracUltimateRole = true
		go person.Save()
		go storage.Repo.SaveDiscordPerson(person.Discord)
	}

	if person.Discord.HasRetracUltimateRole {
		fortnite.GrantRewardCustomCosmetics(person)
	}

	if person.Discord.HasCrystalDonatorRole {
		fortnite.GrantRewardCrystalDonator(person)
	}

	return nil
}

func PostServerProfileAction(c *fiber.Ctx) error {
	person := p.Find(c.Params("accountId"))
	if person == nil {
		return c.Status(404).JSON(aid.ErrorBadRequest("No Account Found"))
	}

	profile := person.GetProfileFromType(c.Query("profileId"))
	if profile == nil {
		return c.Status(404).JSON(aid.ErrorBadRequest("No Profile Found"))
	}

	profileChanges := []aid.JSON{}
	multiUpdate := []aid.JSON{}
	notifications := []aid.JSON{}

	if action, ok := serverActions[c.Params("action")]; ok {
		if err := action(c, person, profile, &profileChanges, &multiUpdate, &notifications); err != nil {
			return c.Status(500).JSON(aid.ErrorBadRequest(err.Error()))
		}
	}

	return c.Status(200).JSON(aid.JSON{
		"profileId": c.Query("profileId"),
		"profileRevision": profile.Revision,
		"profileCommandRevision": profile.Revision,
		"profileChangesBaseRevision": profile.Revision - 1,
		"profileChanges": profileChanges,
		"multiUpdate": multiUpdate,
		"notifications": notifications,
		"responseVersion": 1,
		"serverTime": time.Now().Format("2006-01-02T15:04:05.999Z"),
	})
}

func serverQueryProfileAction(c *fiber.Ctx, person *p.Person, profile *p.Profile, profileChanges, multiUpdate, notifications *[]aid.JSON) error {
	*profileChanges = append(*profileChanges, aid.JSON{
		"changeType": "fullProfileUpdate",
		"profile": profile.GenerateFortniteProfileEntry(),
	})

	return nil
}