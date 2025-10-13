package handlers

import (
	"net/url"
	"strings"

	"github.com/ectrc/snow/aid"
	p "github.com/ectrc/snow/person"
	"github.com/ectrc/snow/storage"
	"github.com/gofiber/fiber/v2"
)

func RedirectSocket(c *fiber.Ctx) error {
	if g := c.Request().Header.Peek("Sec-WebSocket-Protocol"); g != nil {
		return c.Redirect("/socket")
	}

	bytes := storage.Asset("site/index.html")
	if bytes == nil {
		return c.Status(404).SendString("Not Found")
	}

	stringBytes := string(*bytes)
	c.Set("Content-Type", "text/html")
	return c.Status(200).SendString(stringBytes)
}

func GetAsset(c *fiber.Ctx) error {
	assetName, _ := url.QueryUnescape(c.Params("asset"))
	bytes := storage.Asset("site/"+assetName)
	if bytes == nil {
		bytes = storage.Asset(assetName)
		if bytes == nil {
			return c.Status(404).SendString("Not Found")
		}
	}

	typeof := strings.Split(assetName, ".")[1]
	typeofLookup := map[string]string{
		"css": "text/css",
		"js": "application/javascript",
		"png": "image/png",
		"jpg": "image/jpeg",
		"jpeg": "image/jpeg",
		"ttf": "font/ttf",
		"woff": "font/woff",
		"woff2": "font/woff2",
		"html": "text/html",
	}

	c.Set("Content-Type", typeofLookup[typeof])
	return c.Status(200).Send(*bytes)
}

func AnyNoContent(c *fiber.Ctx) error {
	return c.SendStatus(204)
}

func PostGamePlatform(c *fiber.Ctx) error {
	return c.Status(200).SendString("true")
}

func GetGameEnabledFeatures(c *fiber.Ctx) error {
	return c.Status(200).JSON([]string{})
}

func PostGameAccess(c *fiber.Ctx) error {
	return c.Status(200).SendString("true")
}

func GetFortniteReceipts(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	receipts := []aid.JSON{}

	person.Receipts.RangeReceipts(func(key string, value *p.Receipt) bool {
		if value.State == "OK" {
			return true
		}
		
		receipts = append(receipts, value.GenerateFortniteReceiptEntry())
		return true
	})

	return c.Status(200).JSON(receipts)
}

func GetMatchmakingAccountSession(c *fiber.Ctx) error {
	return c.Status(200).Send([]byte{})
}

func GetFortniteVersion(c *fiber.Ctx) error {
	return c.Status(200).JSON(aid.JSON{
		"type": "NO_UPDATE",
	})
}

func GetWaitingRoomStatus(c *fiber.Ctx) error {
	return c.SendStatus(204)
}

func GetAffiliate(c *fiber.Ctx) error {
	slugger := p.FindByDisplay(c.Params("slug"))
	if slugger == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid affiliate slug"))
	}

	return c.Status(200).JSON(aid.JSON{
		"id": slugger.ID,
		"displayName": slugger.DisplayName,
		"slug": slugger.DisplayName,
		"status": "ACTIVE",
		"verified": false,
	})
}

func GetRegion(c *fiber.Ctx) error {
	return c.Status(200).JSON(aid.JSON{
		"continent": aid.JSON{
			"code": "EU",
		},
		"country": aid.JSON{
			"iso_code": "GB",
		},
		"subdivisions": []aid.JSON{},
	})
}

func SendJSONResponseFromAsset(c *fiber.Ctx, asset string) error {
	bytes := storage.Asset(asset)
	if bytes == nil {
		return c.Status(404).JSON(aid.JSON{})
	}

	stringBytes := string(*bytes)
	c.Set("Content-Type", "application/json")
	return c.Status(200).SendString(stringBytes)
}