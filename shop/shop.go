package shop

import (
	"fmt"
	"math/rand"
	"regexp"
	"slices"
	"time"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/fortnite"
	"github.com/ectrc/snow/storage"
	"github.com/ectrc/snow/storage/objects"
)

func GenerateShopForDate(rand *rand.Rand, date time.Time) *objects.ShopCatalog {
	shop := objects.NewStorefrontCatalog()
	shop.ID = date.Format(time.RFC3339)

	dailyStorefront := objects.NewShopSection("BRDailyStorefront")
	shop.AddSection(dailyStorefront)

	weeklyStorefront := objects.NewShopSection("BRWeeklyStorefront")
	shop.AddSection(weeklyStorefront)

	bookStorefront := objects.NewShopSection(fmt.Sprintf("BRSeason%d", aid.Config.Fortnite.Season))
	shop.AddSection(bookStorefront)

	moneyStorefront := objects.NewShopSection("CurrencyStorefront")
	shop.AddSection(moneyStorefront)

	kitStorefront := objects.NewShopSection("BRStarterKits")
	shop.AddSections(kitStorefront)

	extra := []*objects.ShopOfferTypeItem{}
	for len(dailyStorefront.Offers) + len(extra) <= fortnite.DataClient.GetStorefrontDailyItemCount(aid.Config.Fortnite.Season) {
		all := dailyStorefront.GetOffersGroupedByType()
		if len(all["AthenaCharacter"]) < 4 {
			item := fortnite.GetRandomItemWithDisplayAssetOfType("AthenaCharacter")
			offer := objects.NewItemOffer(aid.Hash(rand.Int()))
			offer.Price.PriceType = objects.ShopOfferPriceEnumMtxCurrency
			offer.Price.SaleType = objects.ShopOfferPriceSaleEnumNone
			offer.Price.OriginalPrice = fortnite.DataClient.GetStorefrontCosmeticOfferPrice(item.Rarity.BackendValue, item.Type.BackendValue)
			offer.Price.FinalPrice = offer.Price.OriginalPrice
			offer.Meta.Refundable = true
			offer.Meta.Giftable = true
			offer.Meta.TileSize = "Normal"
			offer.Meta.NewDisplayAssetPath = aid.Ternary[string](item.NewDisplayAssetPath != "", "/Game/Catalog/NewDisplayAssets/" + item.NewDisplayAssetPath + "." + item.NewDisplayAssetPath, "")
			offer.Meta.DisplayAssetPath = aid.Ternary[string](regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath) != "", "/Game/Catalog/DisplayAssets/" + regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath) + "." + regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath), "")
			offer.Meta.SectionID = "Daily"
			offer.AddReward(objects.NewShopGrant(objects.BackendTypeEnum(item.Type.BackendValue), item.ID))
			dailyStorefront.AddOffer(offer)
			continue
		}

		maxedOutBackendTypes := []string{"AthenaCharacter"}
		for backendType, offers := range all {
			if len(offers) >= 4 {
				maxedOutBackendTypes = append(maxedOutBackendTypes, backendType)
			}
		}

		item := fortnite.GetRandomItemWithDisplayAssetOfNotTypes(maxedOutBackendTypes...)
		switch item.Type.BackendValue {
			default:
				if all[item.Type.BackendValue] != nil && len(all[item.Type.BackendValue]) >= 4 {
					continue
				}
		}

		offer := objects.NewItemOffer(aid.Hash(rand.Int()))
		offer.Price.PriceType = objects.ShopOfferPriceEnumMtxCurrency
		offer.Price.SaleType = objects.ShopOfferPriceSaleEnumNone
		offer.Price.OriginalPrice = fortnite.DataClient.GetStorefrontCosmeticOfferPrice(item.Rarity.BackendValue, item.Type.BackendValue)
		offer.Price.FinalPrice = offer.Price.OriginalPrice
		offer.Meta.Refundable = true
		offer.Meta.Giftable = true
		offer.Meta.TileSize = "Small"
		offer.Meta.NewDisplayAssetPath = aid.Ternary[string](item.NewDisplayAssetPath != "", "/Game/Catalog/NewDisplayAssets/" + item.NewDisplayAssetPath + "." + item.NewDisplayAssetPath, "")
		offer.Meta.DisplayAssetPath = aid.Ternary[string](regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath) != "", "/Game/Catalog/DisplayAssets/" + regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath) + "." + regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath), "")
		offer.Meta.SectionID = "Daily"
		offer.AddReward(objects.NewShopGrant(objects.BackendTypeEnum(item.Type.BackendValue), item.ID))
		extra = append(extra, offer)
	}

	if len(extra) % 2 != 0 {
		extra = extra[:len(extra)-1]
	}
	for _, item := range extra {
		item.Meta.PriorityShop = 99
		dailyStorefront.AddOffer(item)
	}

	for len(weeklyStorefront.GetOffersGroupedBySet()) < fortnite.DataClient.GetStorefrontWeeklySetCount(aid.Config.Fortnite.Season) {
		set := fortnite.GetRandomSet()

		for _, item := range set.Items {
			if item.Type.BackendValue != "AthenaCharacter" {
				continue
			}

			if !fortnite.DataClient.AllowedInFeatured(item) {
				continue
			}

			if slices.ContainsFunc(dailyStorefront.GetOffersGroupedByType()["AthenaCharacter"], func(offer *objects.ShopOfferTypeItem) bool {
				return slices.ContainsFunc(offer.Rewards, func(reward *objects.ShopOfferGrant) bool {
					return reward.TemplateID() == item.Type.BackendValue + ":" + item.ID
				})
			}) {
				continue
			}

			offer := objects.NewItemOffer(aid.Hash(rand.Int()))
			offer.Price.PriceType = objects.ShopOfferPriceEnumMtxCurrency
			offer.Price.SaleType = objects.ShopOfferPriceSaleEnumNone
			offer.Price.OriginalPrice = fortnite.DataClient.GetStorefrontCosmeticOfferPrice(item.Rarity.BackendValue, item.Type.BackendValue)
			offer.Price.FinalPrice = offer.Price.OriginalPrice
			offer.Meta.Refundable = true
			offer.Meta.Giftable = true
			offer.Meta.TileSize = "Normal"
			offer.Meta.NewDisplayAssetPath = aid.Ternary[string](item.NewDisplayAssetPath != "", "/Game/Catalog/NewDisplayAssets/" + item.NewDisplayAssetPath + "." + item.NewDisplayAssetPath, "")
			offer.Meta.DisplayAssetPath = aid.Ternary[string](regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath) != "", "/Game/Catalog/DisplayAssets/" + regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath) + "." + regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath), "")
			offer.Meta.SectionID = "Featured"
			offer.Meta.Categories = []string{item.Set.BackendValue}
			offer.Meta.PriorityCategory = 99
			offer.AddReward(objects.NewShopGrant(objects.BackendTypeEnum(item.Type.BackendValue), item.ID))
			weeklyStorefront.AddOffer(offer)
		}

		extra = []*objects.ShopOfferTypeItem{}
		for _, item := range set.Items {
			if weeklyStorefront.GetOffersGroupedByType()["AthenaCharacter"] == nil || len(weeklyStorefront.GetOffersGroupedByType()["AthenaCharacter"]) == 0 {
				continue
			}

			if item.Type.BackendValue == "AthenaCharacter" || item.Type.BackendValue == "AthenaBackpack" {
				continue
			}

			if !fortnite.DataClient.AllowedInFeatured(item) {
				continue
			}

			offer := objects.NewItemOffer(aid.Hash(rand.Int()))
			offer.Price.PriceType = objects.ShopOfferPriceEnumMtxCurrency
			offer.Price.SaleType = objects.ShopOfferPriceSaleEnumNone
			offer.Price.OriginalPrice = fortnite.DataClient.GetStorefrontCosmeticOfferPrice(item.Rarity.BackendValue, item.Type.BackendValue)
			offer.Price.FinalPrice = offer.Price.OriginalPrice
			offer.Meta.Refundable = true
			offer.Meta.Giftable = true
			offer.Meta.TileSize = "Small"
			offer.Meta.NewDisplayAssetPath = aid.Ternary[string](item.NewDisplayAssetPath != "", "/Game/Catalog/NewDisplayAssets/" + item.NewDisplayAssetPath + "." + item.NewDisplayAssetPath, "")
			offer.Meta.DisplayAssetPath = aid.Ternary[string](regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath) != "", "/Game/Catalog/DisplayAssets/" + regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath) + "." + regexp.MustCompile(`[^/]+$`).FindString(item.DisplayAssetPath), "")
			offer.Meta.SectionID = "Featured"
			offer.Meta.Categories = []string{item.Set.BackendValue}
			offer.AddReward(objects.NewShopGrant(objects.BackendTypeEnum(item.Type.BackendValue), item.ID))
			extra = append(extra, offer)
		}

		if len(extra) % 2 != 0 {
			extra = extra[:len(extra)-1]
		}
		for _, item := range extra {
			weeklyStorefront.AddOffer(item)
		}
	}

	for _, data := range [][]interface{}{
		{13500, "https://cdn1.epicgames.com/offer/fn/EGS_VBucks_13500_1200x1600-39489a289769bc6c1d14f4a8b53b48f4", 3500},
		{7500, "https://cdn1.epicgames.com/offer/fn/EGS_VBucks_5000_1200x1600-8ea53bb4ea3d75821153075df8e3ca95", 1500},
		{2800, "https://cdn1.epicgames.com/fn/offer/EGS_2800VBucks_1920x1080-1920x1080-eb673b1a86e31de680720a1a35446f04adf987ea.png", 300},
		{1000, "https://cdn1.epicgames.com/offer/fn/EGS_VBucks_1000_1200x1600-c8a13f66ba88744d5216f884855e2a4d", 0},
	} {
		offer := objects.NewMoneyOffer(aid.Hash(rand.Int()))
		offer.Price.PriceType = objects.ShopOfferPriceEnumRealMoney
		offer.Price.SaleType = objects.ShopOfferPriceSaleEnumNone
		offer.Price.BasePrice = float64(fortnite.DataClient.GetStorefrontCurrencyOfferPrice("USD", data[0].(int)))
		offer.Price.LocalPrice = float64(fortnite.DataClient.GetStorefrontCurrencyOfferPrice("USD", data[0].(int)))
		offer.Meta.FeaturedImageURL = data[1].(string)
		offer.Meta.OriginalOffer = data[0].(int) - data[2].(int)
		offer.Meta.ExtraBonus = data[2].(int)
		offer.Meta.DisplayAssetPath = fmt.Sprintf("/Game/Catalog/DisplayAssets/DA_MtxPack%d.DA_MtxPack%d", data[0].(int), data[0].(int))
		offer.Meta.CurrencyAnalyticsName = fmt.Sprintf("MtxPack%d", data[0].(int))
		offer.Display.Title = fmt.Sprintf("%s V-Bucks", aid.FormatNumber(data[0].(int)))
		offer.Display.Description = fmt.Sprintf("Buy %s Fortnite V-Bucks, the in-game currency that can be spent in Fortnite Battle Royale and Creative modes. You can purchase new customization items like Outfits, Gliders, Pickaxes, Emotes, Wraps and the latest season's Battle Pass! Gliders and Contrails may not be used in Save the World mode.", aid.FormatNumber(data[0].(int)))
		offer.Display.LongDescription = fmt.Sprintf("Buy %s Fortnite V-Bucks, the in-game currency that can be spent in Fortnite Battle Royale and Creative modes. You can purchase new customization items like Outfits, Gliders, Pickaxes, Emotes, Wraps and the latest season's Battle Pass! Gliders and Contrails may not be used in Save the World mode.\n\nAll V-Bucks purchased on the Epic Games Store are not redeemable or usable on Nintendo Switch™.", aid.FormatNumber(data[0].(int)))
		offer.AddReward(objects.NewShopGrantComplex(objects.BackendTypeEnumCurrency, "MtxPurchased", data[0].(int), objects.ProfileTypeEnumCommonCore, true))
		moneyStorefront.AddOffer(offer)
	}

	bookDefaultOffer := storage.Repo.Storage.GetShopBookOfferByID(aid.Ternary[string](fortnite.DataClient.SnowSeason.DefaultOfferID != "", fortnite.DataClient.SnowSeason.DefaultOfferID, aid.Hash(rand.Int())))
	aid.PrintJSON(bookDefaultOffer)
	if bookDefaultOffer == nil {
		bookDefaultOffer = objects.NewBookOffer(aid.Ternary[string](fortnite.DataClient.SnowSeason.DefaultOfferID != "", fortnite.DataClient.SnowSeason.DefaultOfferID, aid.Hash(rand.Int())))
		bookDefaultOffer.Price.PriceType = objects.ShopOfferPriceEnumMtxCurrency
		bookDefaultOffer.Price.SaleType = objects.ShopOfferPriceSaleEnumStrikethrough
		bookDefaultOffer.Price.OriginalPrice = 950
		bookDefaultOffer.Price.FinalPrice = 0
		bookDefaultOffer.Meta.TileSize = "DoubleWide"
		bookDefaultOffer.Meta.SectionID = "BattlePass"
		bookDefaultOffer.Meta.PriorityShop = 99
		bookDefaultOffer.Meta.DisplayAssetPath = fmt.Sprintf("/Game/Catalog/DisplayAssets/DA_BR_Season%d_BattlePass.DA_BR_Season%d_BattlePass", aid.Config.Fortnite.Season, aid.Config.Fortnite.Season)
		bookDefaultOffer.Meta.NewDisplayAssetPath = fmt.Sprintf("/Game/Catalog/NewDisplayAssets/DAv2_BR_Season%d_BattlePass.DAv2_BR_Season%d_BattlePass", aid.Config.Fortnite.Season, aid.Config.Fortnite.Season)
		bookDefaultOffer.Display.Title = "Battle Pass"
		bookDefaultOffer.Display.ShortDescription = fmt.Sprintf("Claim your Season %d Battle Pass!", aid.Config.Fortnite.Season)
		bookDefaultOffer.Display.Description = fmt.Sprintf("Claim your Season %d Battle Pass!\n\nInstantly get these items <Bold>valued at over 10,000 V-Bucks</>.", aid.Config.Fortnite.Season)
		bookDefaultOffer.AddReward(objects.NewShopGrantComplex(objects.BackendTypeEnumSnow, "BattlePass", 1, objects.ProfileTypeEnumAthena, true))
	}
	bookStorefront.AddOffer(bookDefaultOffer)


	bookBundleOffer := storage.Repo.Storage.GetShopBookOfferByID(aid.Ternary[string](fortnite.DataClient.SnowSeason.BundleOfferID != "", fortnite.DataClient.SnowSeason.BundleOfferID, aid.Hash(rand.Int())))
	if bookBundleOffer == nil {
		bookBundleOffer = objects.NewBookOffer(aid.Ternary[string](fortnite.DataClient.SnowSeason.BundleOfferID != "", fortnite.DataClient.SnowSeason.BundleOfferID, aid.Hash(rand.Int())))
		bookBundleOffer.Price.PriceType = objects.ShopOfferPriceEnumMtxCurrency
		bookBundleOffer.Price.SaleType = objects.ShopOfferPriceSaleEnumStrikethrough
		bookBundleOffer.Price.OriginalPrice = 2800
		bookBundleOffer.Price.FinalPrice = 1850
		bookBundleOffer.Meta.TileSize = "DoubleWide"
		bookBundleOffer.Meta.SectionID = "BattlePass"
		bookBundleOffer.Meta.PriorityShop = 1
		bookBundleOffer.Meta.DisplayAssetPath = fmt.Sprintf("/Game/Catalog/DisplayAssets/DA_BR_Season%d_BattlePassWithLevels.DA_BR_Season%d_BattlePassWithLevels", aid.Config.Fortnite.Season, aid.Config.Fortnite.Season)
		bookBundleOffer.Meta.NewDisplayAssetPath = fmt.Sprintf("/Game/Catalog/NewDisplayAssets/DAv2_BR_Season%d_BattlePassWithLevels.DAv2_BR_Season%d_BattlePassWithLevels", aid.Config.Fortnite.Season, aid.Config.Fortnite.Season)
		bookBundleOffer.Display.Title = "Battle Bundle"
		bookBundleOffer.Display.ShortDescription = fmt.Sprintf("Buy the Season %d Battle Pass + 25 Levels!", aid.Config.Fortnite.Season)
		bookBundleOffer.Display.Description = fmt.Sprintf("Buy the Season %d Battle Pass + 25 Levels!\n\nInstantly get these items <Bold>valued at over 10,000 V-Bucks</>.", aid.Config.Fortnite.Season)
		bookBundleOffer.AddReward(objects.NewShopGrantComplex(objects.BackendTypeEnumSnow, "BattlePass", 1, objects.ProfileTypeEnumAthena, true))
		bookBundleOffer.AddReward(objects.NewShopGrantComplex(objects.BackendTypeEnumPersistentResource, "AthenaBattleStar", 250, objects.ProfileTypeEnumAthena, true))
	}
	bookStorefront.AddOffer(bookBundleOffer)

	bookTierOffer := storage.Repo.Storage.GetShopBookOfferByID(aid.Ternary[string](fortnite.DataClient.SnowSeason.TierOfferID != "", fortnite.DataClient.SnowSeason.TierOfferID, aid.Hash(rand.Int())))
	if bookTierOffer == nil {
		bookTierOffer = objects.NewBookOffer(aid.Ternary[string](fortnite.DataClient.SnowSeason.TierOfferID != "", fortnite.DataClient.SnowSeason.TierOfferID, aid.Hash(rand.Int())))
		bookTierOffer.Price.PriceType = objects.ShopOfferPriceEnumMtxCurrency
		bookTierOffer.Price.SaleType = objects.ShopOfferPriceSaleEnumStrikethrough
		bookTierOffer.Price.OriginalPrice = 150
		bookTierOffer.Price.FinalPrice = 150
		bookTierOffer.AddReward(objects.NewShopGrantComplex(objects.BackendTypeEnumPersistentResource, "AthenaBattleStar", 10, objects.ProfileTypeEnumAthena, true))
	}
	bookStorefront.AddOffer(bookTierOffer)

	return shop
}

func Today() *objects.ShopCatalog {
	catalog, err := storage.Repo.Storage.QueryShop(time.Now().Truncate(24*time.Hour).Format(time.RFC3339))
	if err != nil {
		randomNumberGenerator := rand.New(rand.NewSource(time.Date(time.Now().Year(), time.Now().Month(), time.Now().Day(), 0, 0, 0, 0, time.Now().Location()).Unix()))
		catalog = GenerateShopForDate(randomNumberGenerator, time.Now().Truncate(24*time.Hour))
		storage.Repo.Storage.SaveShop(catalog)
	}

	return catalog
}