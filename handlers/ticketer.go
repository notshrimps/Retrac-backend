package handlers

import (
	"regexp"
	"strings"
	"time"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/discord"
	"github.com/ectrc/snow/person"
	"github.com/ectrc/snow/servers"
	"github.com/ectrc/snow/socket"
	"github.com/gofiber/fiber/v2"
)

func GetMatchmakerTicket(c *fiber.Ctx) error {
	person := c.Locals("person").(*person.Person)
	if c.Params("accountId") != person.ID {
		return c.Status(403).JSON(aid.ErrorBadRequest("accountId does not person id"))
	}

	if person.GetActiveBan() != nil {
		return c.Status(403).JSON(aid.ErrorBadRequest("Account is banned"))
	}

	if aid.Config.Fortnite.OnlyBoostersCanMatchmake {
		if !discord.HasBoosterRole(person) && !person.IsWhitelisted() {
			return c.Status(403).JSON(aid.ErrorBadRequest("Account does not have permission"))
		}
	}

	re := regexp.MustCompile(`Fortnite\+Release-[\d\.]+-CL-\d+`)
	match := re.FindString(c.Get("User-Agent"))
	aid.Print(c.Get("User-Agent"), "Match: ", match)

	// query parser doesnt work for queries with . in them
	options := socket.TicketOptions{
		PartyPlayerIds: c.Query("partyPlayerIds"),
		BucketId: c.Query("bucketId"),
		PlayerPlatform: c.Query("player.platform"),
		PlayerSubregions: c.Query("player.subregions"),
		PlayerOptionFillTeam: c.Query("player.option.fillTeam"),
		PlayerOptionCrossplayOptOut: c.Query("player.option.crossplayOptOut"),
		PlayerOptionCustomKey: c.Query("player.option.customKey"),
		PartyWIN: c.Query("party.WIN"),
		InputKBM: c.Query("input.KBM"),
		PlayerInput: c.Query("player.input"),
		PlayerPlayerGroups: c.Query("player.playerGroups"),
		Version: match + "-Windows",
	}

	bucketIdSplit := strings.Split(options.BucketId, ":")
	bucketIdSplit[2] = aid.Ternary(bucketIdSplit[2] == "NONE", "EU", bucketIdSplit[2]) // fix matchmaker bug
	if bucketIdSplit[3] == "playlist_showdownalt_solo" && !person.IsWhitelisted() {
		return c.Status(403).JSON(aid.ErrorBadRequest("Account does not have permission"))
	}
	options.BucketId = strings.Join(bucketIdSplit, ":")

	party := person.GetCurrentParty()
	if party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("No active party found"))
	}

	jargon, signature := aid.KeyPair.EncryptAndSignB64(aid.StructToBytes[socket.MatchmakerPayload](socket.MatchmakerPayload{
		TicketID: aid.RandomString(32),
		AccountID: person.ID,
		Options: &options,
		Nonce: aid.RandomString(32),
		ExpireAt: time.Now().Add(time.Minute * 5).Format(time.RFC3339),
	}))
	
	return c.Status(200).JSON(aid.JSON{
		"ticketType": "mms-player",
		"serviceUrl": aid.Config.API.MatchmakerDomain + "/fortnite/api/matchmaking/socket?SNOW_SOCKET_CONNECTION",
		"payload": jargon,
		"signature": signature,
	})
}

func GetMatchmakerSession(c *fiber.Ctx) error {
	server := servers.Manager.GetServer(c.Params("sessionId"))
	if server == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Server not found"))
	}

	domainToIp := map[string]string{
		"eu-london01.retrac.site": "20.117.179.202",
		"na-01.retrac.site": "82.165.215.76",
		"82.165.215.76": "82.165.215.76",
	}

	return c.Status(200).JSON(aid.JSON{
		"id": server.ID,
		"serverAddress": domainToIp[server.Address],
		"serverPort": server.Port,
		"serverName": aid.Hash([]byte(server.Constraint)),
		"ownerId": aid.Hash([]byte(server.ID)),
		"ownerName": "server",
		"openPublicPlayers": server.GetPlayers(),
		"openPrivatePlayers": 0,
		"totalPlayers": 0,
		"maxPublicPlayers": 100,
		"maxPrivatePlayers": 0,
		"publicPlayers": []string{},
		"privatePlayers": []string{},
		"attributes": aid.JSON{},
		"allowJoinInProgress": false,
		"shouldAdvertise": false,
		"isDedicated": true,
		"usesStats": false,
		"allowInvites": false,
		"usesPresence": false,
		"allowJoinViaPresence": true,
		"allowJoinViaPresenceFriendsOnly": false,
		"lastUpdated": time.Now().Format("2006-01-02T15:04:05Z"),
		"started": server.Status == servers.GameServerStatusEnumClosed,
		"buildUniqueId": strings.Split(server.Constraint, ":")[0],
	})
}

func GetMatchmakerSessionEncryptionKey(c *fiber.Ctx) error {
	server := servers.Manager.GetServer(c.Params("sessionId"))
	if server == nil {
		return c.Status(404).JSON(aid.ErrorBadRequest("Server not found"))
	}

	personFromParams := person.Find(c.Params("accountId"))
	if personFromParams == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Account not found"))
	}

	person := c.Locals("person").(*person.Person)
	if person.ID != personFromParams.ID {
		return c.Status(403).JSON(aid.ErrorBadRequest("Account does not match"))
	}

	return c.Status(200).JSON(aid.JSON{
		"key": "none",
		"sessionId": server.ID,
		"accountId": person.ID,
	})
}

func PostMatchmakerJoinSession(c *fiber.Ctx) error {
	person := c.Locals("person").(*person.Person)
	if person.GetActiveBan() != nil {
		return c.Status(403).JSON(aid.ErrorBadRequest("Account is banned"))
	}
	
	server := servers.Manager.GetServer(c.Params("sessionId"))
	if server == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Server not found"))
	}

	if person.GetCurrentParty() == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("No active party found"))
	}

	if server.FindTeam(person.GetCurrentParty().ID) == nil {
		return c.Status(403).JSON(aid.ErrorBadRequest("Party not found in server"))
	}

	return c.SendStatus(204)
}