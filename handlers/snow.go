package handlers

import (
	"strings"
	"time"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/fortnite"
	p "github.com/ectrc/snow/person"
	"github.com/ectrc/snow/shop"
	"github.com/ectrc/snow/socket"
	"github.com/ectrc/snow/storage"
	"github.com/gofiber/fiber/v2"
)

func MiddlewareOnlyDebug(c *fiber.Ctx) error {
	if aid.Config.API.Debug {
		return c.Next()
	}

	return c.SendStatus(403)
}

func GetSnowPreloadedCosmetics(c *fiber.Ctx) error {
	return c.JSON(fortnite.DataClient)
}

func GetSnowCachedPlayers(c *fiber.Ctx) error {
	persons := p.AllFromCache()
	players := make([]p.PersonSnapshot, len(persons))

	for i, person := range persons {
		players[i] = *person.Snapshot()
	}

	return c.Status(200).JSON(players)
}

func GetSnowShop(c *fiber.Ctx) error {
	catalog := shop.Today()
	return c.Status(200).JSON(catalog)
}

func PostSnowLog(c *fiber.Ctx) error {
	var body struct {
		JSON aid.JSON `json:"json"`
		URL	string `json:"url"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(err.Error())	
	}

	aid.PrintJSON(body.JSON)
	return c.JSON(body)
}

func GetPlayer(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	return c.Status(200).JSON(aid.JSON{
		"snapshot": person.Snapshot(),
		"season": aid.JSON{
			"level": fortnite.DataClient.SnowSeason.GetSeasonLevel(person.CurrentSeasonStats),
			"xp": fortnite.DataClient.SnowSeason.GetRelativeSeasonXP(person.CurrentSeasonStats),
			"bookLevel": fortnite.DataClient.SnowSeason.GetBookLevel(person.CurrentSeasonStats),
			"bookXp": fortnite.DataClient.SnowSeason.GetRelativeBookXP(person.CurrentSeasonStats),
		},
	})
}

func GetPlayerOkay(c *fiber.Ctx) error {
	return c.Status(200).SendString("okay")
}

func MiddlewareWebsocketPlayer(c *fiber.Ctx) error {
	c.Locals("protocol", "player")
	c.Locals("identifier", "ws-"+aid.RandomString(18))
	// fmt.Println("SERVER SOCKET INBETWEEN")
	return c.Next()
}

func PostPlayerCreateCode(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	code := person.ID + "=" + time.Now().Format("2006-01-02T15:04:05.999Z")
	encrypted, sig := aid.KeyPair.EncryptAndSignB64([]byte(code))	
	exchange := encrypted + "." + sig
	return c.Status(200).SendString(exchange)
}

func GetLauncherStatus(c *fiber.Ctx) error {
	return c.Status(200).JSON(aid.JSON{
		"CurrentSeason": aid.Config.Fortnite.Season,
		"CurrentBuild": aid.Config.Fortnite.Build,
		"PlayersOnline": aid.FormatNumber(int(float32(socket.JabberSockets.Len()) * 1.25)),
	})
}

func GetLauncherPaks(c *fiber.Ctx) error {
	paks, err := storage.Repo.Amazon.ListAllFiles("data")
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}

	dlls, err := storage.Repo.Amazon.ListAllFiles("dlls")
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}

	files := aid.JSON{}
	for key, size := range paks {
		keySplit := strings.Split(key, "/")
		files[keySplit[len(keySplit)-1]] = size
	}
	for key, size := range dlls {
		keySplit := strings.Split(key, "/")
		files[keySplit[len(keySplit)-1]] = size
	}

	return c.JSON(files)
}