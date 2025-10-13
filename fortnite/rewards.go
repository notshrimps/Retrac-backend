package fortnite

import (
	"slices"

	p "github.com/ectrc/snow/person"
)

func GrantRewardTwitchPrime1(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_Twitch", 1, "", "")
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_089_Athena_Commando_M_RetroGrey", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_085_Athena_Commando_M_Twitch", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaBackpack:BID_029_RetroGrey", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaGlider:Glider_ID_018_Twitch", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaPickaxe:Pickaxe_ID_039_TacticalBlack", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:Emoji_VictoryRoyale", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:Emoji_Wow", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:Emoji_Bush ", 1, "athena"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardTwitchPrime2(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_Twitch", 1, "", "")
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_114_Athena_Commando_F_TacticalWoodland", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaBackpack:BID_049_TacticalWoodland", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaPickaxe:Pickaxe_ID_044_TacticalUrbanHammer", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_HipHop01", 1, "athena"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardSamsungGalaxy(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_SamsungPromo", 1, "", "")
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_175_Athena_Commando_M_Celestial", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaBackpack:BID_138_Celestial", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaGlider:Glider_ID_090_Celestial", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaPickaxe:Pickaxe_ID_116_Celestial", 1, "athena"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardSamsungIkonic(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_SamsungPromo", 1, "", "")
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_313_Athena_Commando_M_KpopFashion", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_KPopDance03", 1, "athena"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardHonorGuard(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_HonorPromo", 1, "", "")
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_342_Athena_Commando_M_StreetRacerMetallic", 1, "athena"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardTwoFactor(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_MfaReward", 1, "", "")
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_BoogieDown", 1, "athena"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardWeeklyBooster(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_FortnitemaresChallenges", 1, "", "THANKS FOR SUPPORTING RETRAC!")
	gift.AddLoot(p.NewItemWithType("Currency:MtxPurchased", 1000, "common_core"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardInitialBooster(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_FortnitemaresChallenges", 1, "", "THANKS FOR SUPPORTING RETRAC!")
	gift.AddLoot(p.NewItemWithType("Currency:MtxPurchased", 2000, "common_core"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_039_Athena_Commando_F_Disco", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_038_Athena_Commando_M_Disco", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaPickaxe:Pickaxe_ID_016_Disco", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_DiscoFever", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaItemWrap:Wrap_009_NewYears", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaGlider:Glider_ID_004_Disco", 1, "athena"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func RemoveRewardInitialBooster(person *p.Person) {
	itemsToRemove := []*p.Item{
		person.AthenaProfile.Items.GetItemByTemplateID("AthenaCharacter:CID_039_Athena_Commando_F_Disco"),
		person.AthenaProfile.Items.GetItemByTemplateID("AthenaCharacter:CID_038_Athena_Commando_M_Disco"),
		person.AthenaProfile.Items.GetItemByTemplateID("AthenaPickaxe:Pickaxe_ID_016_Disco"),
		person.AthenaProfile.Items.GetItemByTemplateID("AthenaDance:EID_DiscoFever"),
		person.AthenaProfile.Items.GetItemByTemplateID("AthenaItemWrap:Wrap_009_NewYears"),
		person.AthenaProfile.Items.GetItemByTemplateID("AthenaGlider:Glider_ID_004_Disco"),
	}

	for _, item := range itemsToRemove {
		if item == nil {
			continue
		}

		person.AthenaProfile.Items.DeleteItem(item.ID)
	}
}

func GrantRewardCustomCosmetics(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_MakeGood", 1, "", "Here are your custom cosmetics!")

	for _, item := range DataClient.FortniteItems {
		if !item.Custom {
			continue
		}

		if person.AthenaProfile.Items.GetItemByTemplateID(item.Type.BackendValue+":"+item.ID) != nil {
			continue
		}

		gift.AddLoot(p.NewItemWithType(item.Type.BackendValue+":"+item.ID, 1, "athena"))
	}

	if len(gift.Loot) == 0 {
		return
	}

	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardCrystalDonator(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_MakeGood", 1, "", "Here are your cosmetics!")

	for _, item := range DataClient.FortniteItems {
		if item.Custom {
			continue
		}

		if person.AthenaProfile.Items.GetItemByTemplateID(item.Type.BackendValue+":"+item.ID) != nil {
			continue
		}

		gift.AddLoot(p.NewItemWithType(item.Type.BackendValue+":"+item.ID, 1, "athena"))
	}

	for key, token := range DataClient.SnowVariantTokens {
		item := person.AthenaProfile.Items.GetItemByTemplateID(token.Item.Type.BackendValue + ":" + token.Item.ID)
		if item == nil {
			continue
		}

		shouldGrant := false
		for _, variant := range item.Variants {
			for _, grant := range token.Grants {
				if grant.Channel != variant.Channel {
					continue
				}

				if !slices.Contains(variant.Owned, grant.Value) {
					shouldGrant = true
				}
			}
		}

		if shouldGrant {
			gift.AddLoot(p.NewItemWithType("CosmeticVariantToken:"+key, 1, "athena"))
		}
	}

	if len(gift.Loot) == 0 {
		return
	}

	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardOG(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_MakeGood", 1, "", "LLama Donator Rewards")
	gift.AddLoot(p.NewItemWithType("AthenaBackpack:BID_235_Heist", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_017_Athena_Commando_M", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_028_Athena_Commando_F", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_022_Athena_Commando_F", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_029_Athena_Commando_F_Halloween", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_030_Athena_Commando_M_Halloween", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaPickaxe:HalloweenScythe", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaPickaxe:Pickaxe_Lockjaw", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaPickaxe:Pickaxe_ID_015_HolidayCandyCane", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaGlider:Umbrella_Snowflake", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaGlider:Glider_ID_001", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_Floss", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_Fresh", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_RideThePony", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_BestMates", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_HipHop01", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("CosmeticVariantToken:VTID_052_Skull_Trooper_RedFlames", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("CosmeticVariantToken:VTID_161_RenegadeRaider_ClothingB", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("Currency:MtxPurchased", 1500, "common_core"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardWeeklyLlama(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_MakeGood", 1, "", "LLama Donator Rewards")
	gift.AddLoot(p.NewItemWithType("Currency:MtxPurchased", 1500, "common_core"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardContentCreator(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_MakeGood", 1, "", "Content Creator Pack")
	gift.AddLoot(p.NewItemWithType("Currency:MtxPurchased", 5000, "common_core"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_362_Athena_Commando_F_BandageNinja", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaPickaxe:Pickaxe_ID_014_WinterCamo", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaItemWrap:Wrap_018_Magma", 1, "athena"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardRetracWeekOne(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_MakeGood", 1, "", "Thank you for subscribing to Retrac+")
	gift.AddLoot(p.NewItemWithType("Token:RetracPlusWeekOne", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_434_Athena_Commando_F_StealthHonor_Retrac", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_SpeedDial_Retrac", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_399_Athena_Commando_F_AshtonBoardwalk", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaBackpack:BID_258_AshtonBoardwalk", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_400_Athena_Commando_M_AshtonSaltLake", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaBackpack:BID_259_Ashton_SaltLake", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaPickaxe:Pickaxe_ID_202_AshtonBoardwalk", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaPickaxe:Pickaxe_ID_203_AshtonSaltLake", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaGlider:Glider_ID_141_AshtonBoardwalk", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaGlider:Glider_ID_142_AshtonSaltLake", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_AshtonBoardwalk", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_AshtonSaltLake", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:SPID_107_Ashton_Jim", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("Currency:MtxPurchased", 2500, "common_core"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
}

func GrantRewardRetracWeekTwo(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_MakeGood", 1, "", "Thank you for subscribing to Retrac+")
	gift.AddLoot(p.NewItemWithType("Token:RetracPlusWeekTwo", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_703_Athena_Commando_M_Cyclone_Retrac", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_Bollywood_Retrac", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("Currency:MtxPurchased", 2500, "common_core"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()

	GrantRewardSamsungGalaxy(person)
	GrantRewardSamsungIkonic(person)
}

func GrantRewardRetracWeekThree(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_MakeGood", 1, "", "Thank you for subscribing to Retrac+")
	gift.AddLoot(p.NewItemWithType("Token:RetracPlusWeek3", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_674_Athena_Commando_F_HoodieBandit_Retrac", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaBackpack:BID_457_HoodieBandit_Retrac", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaPickaxe:Pickaxe_ID_343_HoodieBanditFemale_Retrac", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaDance:EID_HotPink_Retrac", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("Currency:MtxPurchased", 2500, "common_core"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()

	GrantRewardHonorGuard(person)
	GrantRewardTwitchPrime1(person)
}

func GrantRewardRetracWeekFour(person *p.Person) {
	gift := p.NewGift("GiftBox:GB_MakeGood", 1, "", "Thank you for subscribing to Retrac+")
	gift.AddLoot(p.NewItemWithType("Token:RetracPlusWeek4", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaCharacter:CID_PeterGriffin_Retrac", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("AthenaBackpack:CID_ClubPengin_Retrac", 1, "athena"))
	gift.AddLoot(p.NewItemWithType("Currency:MtxPurchased", 2500, "common_core"))
	person.CommonCoreProfile.Gifts.AddGift(gift).Save()
	GrantRewardTwitchPrime2(person)
}


func GrantRewardFNCS(person *p.Person) {
	gift2 := p.NewGift("GiftBox:GB_TournamentReward", 1, "", "")
	gift2.AddLoot(p.NewItemWithType("AthenaCharacter:Character_HitmanFNCS", 1, "athena"))
	gift2.AddLoot(p.NewItemWithType("AthenaPickaxe:Pickaxe_ID_376_FNCS_Retrac", 1, "athena"))
	person.CommonCoreProfile.Gifts.AddGift(gift2).Save()
}