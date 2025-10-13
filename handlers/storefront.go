package handlers

import (
	"net/url"

	"github.com/goccy/go-json"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/person"
	"github.com/ectrc/snow/shop"
	"github.com/ectrc/snow/storage"
	"github.com/ectrc/snow/storage/objects"
	"github.com/gofiber/fiber/v2"
)

func GetStorefrontCatalog(c *fiber.Ctx) error {
	return c.Status(200).JSON(shop.Today().RenderFortniteCatalogResponse())
}

func GetStorefrontKeychain(c *fiber.Ctx) error {
	var keychain []string
	err := json.Unmarshal(*storage.Asset("keychain.json"), &keychain)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(aid.JSON{"error":err.Error()})
	}

	return c.Status(200).JSON(keychain)
}

func GetStorefrontCatalogBulkOffers(c *fiber.Ctx) error {
	return c.Status(200).JSON(shop.Today().RenderFortniteBulkOffersResponse(aid.Map(c.Request().URI().QueryArgs().PeekMulti("id"), func(id []byte) string {
		return string(id)
	})))
}

func GetStorefrontGiftCheckEligibility(c *fiber.Ctx) error {
	friend := person.Find(c.Params("accountId"))
	if friend == nil {
		return c.Status(400).JSON(aid.JSON{"error":"Friend not found"})
	}

	catalog := shop.Today()

	offerIdParamParsed, _ := url.QueryUnescape(c.Params("offerId"))
	aid.Print(offerIdParamParsed)
	fetch := catalog.GetOfferByID(offerIdParamParsed)
	if fetch == nil {
		return c.Status(400).JSON(aid.JSON{"error":"Offer not found"})
	}
	if fetch.Type != objects.ShopOfferTypeEnumItem {
		return c.Status(400).JSON(aid.JSON{"error":"Offer is not a item"})
	}
	rendered := fetch.Offer.MustItemOffer().RenderFortniteCatalogOfferResponse()

	return c.Status(200).JSON(aid.JSON{
		"price": rendered["prices"].([]aid.JSON)[0],
		"items": rendered["itemGrants"],
	})
}