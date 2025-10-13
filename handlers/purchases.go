package handlers

import (
	"slices"
	"strings"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/person"
	p "github.com/ectrc/snow/person"
	"github.com/ectrc/snow/shop"
	"github.com/ectrc/snow/storage"
	"github.com/ectrc/snow/storage/objects"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func GetHtmlPurchasePage(c *fiber.Ctx) error {
	c.Set("X-UEL", "DEFAULT")
	c.Set("X-Download-Options", "noopen")
	c.Set("X-DNS-Prefetch-Control", "off")
	c.Set("x-epic-correlation-id", uuid.New().String())
	c.Set("X-Frame-Options", "SAMEORIGIN")

	if c.Locals("person") == nil {
		return c.SendStatus(401)
	}

	fileBytes := storage.Asset("purchase.html")
	if fileBytes == nil {
		return c.SendStatus(404)
	}
	data := strings.ReplaceAll(string(*fileBytes), "{{URL}}", aid.Config.API.DiscordDomain)

	c.Set("content-type", "text/html")
	return c.SendString(data)
}

func GetPurchaseAsset(c *fiber.Ctx) error {
	asset := c.Query("asset")

	type_ := strings.Split(asset, ".")
	fileBytes := storage.Asset(asset)
	if fileBytes == nil {
		return c.SendStatus(404)
	}
	data := strings.ReplaceAll(string(*fileBytes), "{{URL}}", aid.Config.API.DiscordDomain)
	
	c.Set("content-type", "text/" + type_[1])
	return c.SendString(data)
}

func GetPurchaseOffer(c *fiber.Ctx) error {
	player := c.Locals("person").(*person.Person)
	offerId := c.Query("offerId")
	if offerId == "" {
		return c.SendStatus(400)
	}

	catalog := shop.Today()

	fetch := catalog.GetOfferByID(offerId)
	if fetch == nil {
		return c.SendStatus(404)
	}

	response := aid.JSON{
		"user": aid.JSON{
			"displayName": player.DisplayName,
		},	
	}

	switch fetch.Type {
	case objects.ShopOfferTypeEnumMoney:
		offer := fetch.Offer.MustMoneyOffer()
		response["offer"] = aid.JSON{
			"id": offer.OfferID(),
			"price": aid.FormatPrice(int(offer.Price.LocalPrice)),
			"name": offer.Display.Title,
			"imageUrl": offer.Meta.FeaturedImageURL,
			"type": "currency",
		}
	case objects.ShopOfferTypeEnumKit:
		offer := fetch.Offer.MustKitOffer()
		response["offer"] = aid.JSON{
			"id": offer.OfferID(),
			"price": aid.FormatPrice(int(offer.Price.LocalPrice)),
			"name": offer.Display.Title,
			"imageUrl": offer.Meta.FeaturedImageURL,
			"type": "starterpack",
		}
	default:
		break
	}

	return c.Status(200).JSON(response)
}

func PostPurchaseOffer(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	
	var body struct {
		OfferId string `json:"offerId" binding:"required"`
		Type string `json:"type" binding:"required"` // "currency" or "starterpack"
	}

	if err := c.BodyParser(&body); err != nil {
		return c.SendStatus(400)
	}

	if !slices.Contains[[]string](aid.Config.Fortnite.WhitelistedUsers, person.DisplayName) {
		return c.SendStatus(401)
	}

	lookup := map[string]func(*fiber.Ctx, *p.Person, string) error{
		"currency": purchaseCurrency,
		"starterpack": purchaseStarterPack,
	}

	if handler, ok := lookup[body.Type]; ok {
		return handler(c, person, body.OfferId)
	}

	return c.SendStatus(400)
}

func purchaseCurrency(c *fiber.Ctx, person *p.Person, offerId string) error {
	catalog := shop.Today()
	fetch := catalog.GetOfferByID(offerId)
	if fetch == nil {
		return c.Status(404).JSON(aid.ErrorNotFound)
	}

	if fetch.Type != objects.ShopOfferTypeEnumMoney {
		return c.Status(400).JSON(aid.ErrorBadRequest)
	}
	offer := fetch.Offer.MustMoneyOffer()

	receipt := p.NewReceipt(offerId, int(offer.Price.BasePrice))
	for _, grant := range offer.Rewards {
		item := p.NewItem(grant.TemplateID(), grant.Quantity)
		item.ProfileType = string(grant.ProfileType)
		receipt.AddLoot(item)
	}
	person.Receipts.AddReceipt(receipt).Save()
 
	return c.Status(200).JSON(aid.JSON{
		"receipt": receipt.GenerateUnrealReceiptEntry(),
	})
}

func purchaseStarterPack(c *fiber.Ctx, person *p.Person, offerId string) error {
	catalog := shop.Today()
	fetch := catalog.GetOfferByID(offerId)
	if fetch == nil {
		return c.Status(404).JSON(aid.ErrorNotFound)
	}

	if fetch.Type != objects.ShopOfferTypeEnumKit {
		return c.Status(400).JSON(aid.ErrorBadRequest)
	}
	offer := fetch.Offer.MustMoneyOffer()

	receipt := p.NewReceipt(offerId, int(offer.Price.BasePrice))
	for _, grant := range offer.Rewards {
		item := p.NewItem(grant.TemplateID(), grant.Quantity)
		item.ProfileType = string(grant.ProfileType)
		receipt.AddLoot(item)
	}
	person.Receipts.AddReceipt(receipt).Save()
 
	return c.Status(200).JSON(aid.JSON{
		"receipt": receipt.GenerateUnrealReceiptEntry(),
	})
}