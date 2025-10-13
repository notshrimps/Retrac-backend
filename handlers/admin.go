package handlers

import (
	"fmt"
	"math/rand"
	"regexp"
	"time"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/fortnite"
	p "github.com/ectrc/snow/person"
	"github.com/ectrc/snow/shop"
	"github.com/ectrc/snow/storage"
	"github.com/ectrc/snow/storage/objects"
	"github.com/gofiber/fiber/v2"
)

func MiddlewareAdmin(c *fiber.Ctx) error {
	snowId, err := aid.GetSnowFromToken(c.Get("Authorization"))
	if err != nil {
		return c.Status(406).JSON(aid.JSON{"error": "Invalid Access Token"})
	}

	person := p.Find(snowId)
	if person == nil {
		return c.Status(405).JSON(aid.JSON{"error": "Invalid Access Token"})
	}

	if !person.HasPermission(p.PermissionItemControl) {
		return c.Status(403).JSON(aid.JSON{"error": "You do not have permission to access this resource"})
	}

	c.Locals("person", person)
	return c.Next()
}

func AdminTest(c *fiber.Ctx) error {
	return c.SendString("kay!")
}

func GetAdminShops(c *fiber.Ctx) error {
	shops, err := storage.Repo.Storage.QueryShops()
	if err != nil {
		shops = []objects.ShopCatalog{}
	}

	return c.JSON(shops)
}

func GetAdminShop(c *fiber.Ctx) error {
	base64Id := c.Params("base64id")
	id, failed := aid.Base64Decode(base64Id)
	if failed {
		return c.Status(400).JSON(aid.JSON{"error": "Invalid Base64 ID"})
	}

	parsedTime, err := time.Parse(time.RFC3339, string(id))
	if err != nil {
		return c.Status(400).JSON(aid.JSON{"error": "Invalid Base64 ID"})
	}

	catalog, err := storage.Repo.Storage.QueryShop(string(id))
	if err != nil {
		randomNumberGenerator := rand.New(rand.NewSource(time.Date(parsedTime.Year(), parsedTime.Month(), parsedTime.Day(), 0, 0, 0, 0, parsedTime.Location()).Unix()))
		catalog = shop.GenerateShopForDate(randomNumberGenerator, parsedTime.Truncate(24*time.Hour))
		storage.Repo.Storage.SaveShop(catalog)
	}

	return c.JSON(catalog)
}

func GetNewShopURL(c *fiber.Ctx) error {
	tomorrow := time.Now().Add(24*time.Hour).Truncate(24*time.Hour).Format(time.RFC3339)
	base64Id := aid.Base64Encode([]byte(tomorrow))
	return c.SendString(aid.Config.API.FrontendDomain + "/panel/shop/" + base64Id)
}

func SaveAdminShop(c *fiber.Ctx) error {
	type bodySection struct {
		ID string
		CatalogID string
		Name string
		ItemOffers       []struct {
			ID            string 
			ShopSectionID string
			Type          string
			Rewards       []struct {
				ID           string 
				Template     string
				BackendValue string
				Quantity     int
				ProfileType  string
				Status       int
				ShopOfferID string
			}      
			Price         struct {
				ID            string 
				ShopOfferID   string
				PriceType     string
				SaleType      string
				OriginalPrice int
				FinalPrice    int
			} 
			Display    struct{
				ID               string
				ShopOfferID      string
				Title            string
				Description      string
				ShortDescription string
				LongDescription  string
			}      
			Meta          struct {
				ID                    string
				ShopOfferID           string
				TileSize              string
				SectionID             string
				DisplayAssetPath      string
				NewDisplayAssetPath   string
				BannerOverride        string
				Giftable              bool
				Refundable            bool
				PriorityShop          int
				PriorityCategory      int
				OnlyOnce              bool
				OriginalOffer         int
				ExtraBonus            int
				FeaturedImageURL      string
				ReleaseSeason         int
				IconSize              string
				CurrencyAnalyticsName string
				Categories            []string
			}
		} `json:"itemOffers"`
	}

	shop := struct {
		ID string
		Sections []bodySection
		Description string
	}{}

	
	err := c.BodyParser(&shop)
	if err != nil {
		fmt.Println(err)
		return c.Status(400).JSON(aid.JSON{"error": "Invalid Shop Data"})
	}
	aid.PrintJSON(shop)

	realShop, err := storage.Repo.Storage.QueryShop(shop.ID)
	if err != nil {
		return c.Status(400).JSON(aid.JSON{"error": "Shop not found"})
	}

	// for all items in the realSHop, if the item is not in the new shop, delete it
	for _, section := range realShop.Sections {
		var realSection bodySection
		for _, s := range shop.Sections {
			if s.ID == section.ID {
				realSection = s
				break
			}
		}

		if realSection.ID == "" {
			storage.Repo.Storage.DeleteSection(section)
			continue
		}

		for _, item := range section.DB_itemOffers {
			found := false
			for _, newItem := range realSection.ItemOffers {
				if newItem.ID == item.ID {
					found = true
					break
				}
			}

			if !found {
				storage.Repo.Storage.DeleteOfferMeta(item.Meta)
				storage.Repo.Storage.DeleteOfferPrice(item.Price)
				storage.Repo.Storage.DeleteOfferDisplay(item.Display)
				storage.Repo.Storage.DeleteItemOffer(item)
			}

			for _, reward := range item.Rewards {
				found := false
				for _, newReward := range realSection.ItemOffers {
					if newReward.ID == reward.ID {
						found = true
						break
					}
				}

				if !found {
					storage.Repo.Storage.DeleteOfferGrant(reward)
				}
			}
		}
	}

	realShop.Description = shop.Description
	for _, section := range shop.Sections {
		realSection := realShop.GetSectionByID(section.ID)
		if realSection == nil {
			continue
		}

		realSection.Name = section.Name
		realSection.DB_itemOffers = make([]*objects.ShopOfferTypeItem, 0)
		// convert our new items to the old items

		for _, item := range section.ItemOffers {
			realItem := objects.NewItemOffer(item.ID)
			realItem.ShopSectionID = section.ID
			realItem.Type = objects.ShopOfferTypeEnum(item.Type)

			for _, reward := range item.Rewards {
				realReward := objects.NewShopGrant(objects.BackendTypeEnum(reward.BackendValue), reward.Template)
				realReward.ShopOfferID = item.ID
				realReward.Quantity = reward.Quantity
				realReward.ProfileType = objects.ProfileTypeEnum(reward.ProfileType)
				realReward.Status = objects.GrantStatusBitwise(reward.Status)
				realItem.AddReward(realReward)
			}

			realItem.Price = objects.NewShopOfferPriceMtxCurrency(item.ID)
			realItem.Price.PriceType = objects.ShopOfferPriceEnum(item.Price.PriceType)
			realItem.Price.SaleType = objects.ShopOfferPriceSaleEnum(item.Price.SaleType)
			realItem.Price.OriginalPrice = item.Price.OriginalPrice
			realItem.Price.FinalPrice = item.Price.FinalPrice

			realItem.Display = objects.NewOfferDisplay(item.ID)
			realItem.Display.Title = item.Display.Title
			realItem.Display.Description = item.Display.Description
			realItem.Display.ShortDescription = item.Display.ShortDescription
			realItem.Display.LongDescription = item.Display.LongDescription

			realItem.Meta = objects.NewShopOfferMeta(item.ID)
			realItem.Meta.TileSize = item.Meta.TileSize
			realItem.Meta.SectionID = item.Meta.SectionID
			realItem.Meta.Giftable = item.Meta.Giftable
			realItem.Meta.Refundable = item.Meta.Refundable
			realItem.Meta.PriorityShop = item.Meta.PriorityShop
			realItem.Meta.PriorityCategory = item.Meta.PriorityCategory
			realItem.Meta.OnlyOnce = item.Meta.OnlyOnce
			realItem.Meta.OriginalOffer = item.Meta.OriginalOffer
			realItem.Meta.ExtraBonus = item.Meta.ExtraBonus
			realItem.Meta.FeaturedImageURL = item.Meta.FeaturedImageURL
			realItem.Meta.ReleaseSeason = item.Meta.ReleaseSeason
			realItem.Meta.IconSize = item.Meta.IconSize
			realItem.Meta.CurrencyAnalyticsName = item.Meta.CurrencyAnalyticsName
			realItem.Meta.Categories = item.Meta.Categories
			realItem.Meta.BannerOverride = item.Meta.BannerOverride
			
			realItem.Meta.DisplayAssetPath = item.Meta.DisplayAssetPath
			realItem.Meta.NewDisplayAssetPath = item.Meta.NewDisplayAssetPath
			if realItem.Meta.NewDisplayAssetPath == "" || realItem.Meta.DisplayAssetPath == "" {
				firstReward := realItem.Rewards[0]
				fortniteItem := fortnite.GetItemByTemplate(firstReward.Template)
				if fortniteItem != nil {
					realItem.Meta.NewDisplayAssetPath = aid.Ternary[string](fortniteItem.NewDisplayAssetPath != "", "/Game/Catalog/NewDisplayAssets/" + fortniteItem.NewDisplayAssetPath + "." + fortniteItem.NewDisplayAssetPath, "")
					realItem.Meta.DisplayAssetPath = aid.Ternary[string](regexp.MustCompile(`[^/]+$`).FindString(fortniteItem.DisplayAssetPath) != "", "/Game/Catalog/DisplayAssets/" + regexp.MustCompile(`[^/]+$`).FindString(fortniteItem.DisplayAssetPath) + "." + regexp.MustCompile(`[^/]+$`).FindString(fortniteItem.DisplayAssetPath), "")
				}
			}

			realSection.DB_itemOffers = append(realSection.DB_itemOffers, realItem)
		}


		realSection.Offers = make([]objects.ShopOffer, 0)
		for _, item := range realSection.DB_itemOffers {
			realSection.Offers = append(realSection.Offers, item)
		}

		for _, item := range realSection.DB_currencyOffers {
			realSection.Offers = append(realSection.Offers, item)
		}

		for _, item := range realSection.DB_starterKitOffers {
			realSection.Offers = append(realSection.Offers, item)
		}

		for _, item := range realSection.DB_battlePassOffers {
			realSection.Offers = append(realSection.Offers, item)
		}
	}
	storage.Repo.Storage.SaveShop(realShop)
	return c.JSON(realShop)
}