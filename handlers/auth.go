package handlers

import (
	"regexp"
	"slices"
	"strconv"
	"strings"
	"time"

	"github.com/bwmarrin/discordgo"
	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/discord"
	"github.com/ectrc/snow/fortnite"
	p "github.com/ectrc/snow/person"
	"github.com/ectrc/snow/storage"
	"github.com/gofiber/fiber/v2"
)

// var RETARDED_CODES map[string]string = make(map[string]string, 0)

var (
	oauthTokenGrantTypes = map[string]func(c *fiber.Ctx, body *FortniteTokenBody) error{
		"client_credentials": PostTokenClientCredentials, // spams the api?? like wtf
		"password":           PostTokenPassword,
		"exchange_code":      PostTokenExchangeCode,
		"refresh_token":      PostTokenRefreshToken,
	}
)

type FortniteTokenBody struct {
	GrantType    string `form:"grant_type" binding:"required"`
	ExchangeCode string `form:"exchange_code"`
	Username     string `form:"username"`
	Password     string `form:"password"`
	TokenType    string `form:"token_type"`
	RefreshToken string `form:"refresh_token"`
}

func PostFortniteToken(c *fiber.Ctx) error {
	var body FortniteTokenBody

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Request Body"))
	}

	if action, ok := oauthTokenGrantTypes[body.GrantType]; ok {
		return action(c, &body)
	}

	return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Grant Type"))
}

func PostTokenClientCredentials(c *fiber.Ctx, body *FortniteTokenBody) error {
	if aid.Config.Fortnite.DisableClientCredentials {
		return c.Status(400).JSON(aid.ErrorBadRequest("Client Credentials is disabled."))
	}

	clientCredentials, err := aid.JWTSign(aid.JSON{
		"creation_date": time.Now().Format("2006-01-02T15:04:05.999Z"),
		"clsvc":         "prod-fn",
		"t":             "s",
		"mver":          false,
		"clid":          aid.Hash([]byte(c.IP())),
		"ic":            true,
		"exp":           1707772234,
		"iat":           1707757834,
		"jti":           "snow-revoke",
		"pfpid":         "prod-fn",
		"am":            "client_credentials",
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(aid.ErrorInternalServer)
	}

	return c.Status(200).JSON(aid.JSON{
		"access_token":    clientCredentials,
		"application_id":  "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
		"token_type":      "bearer",
		"client_id":       aid.Hash([]byte(c.IP())),
		"client_service":  "prod-fn",
		"internal_client": true,
		"product_id":      "prod-fn",
		"expires_in":      3600,
		"expires_at":      time.Now().Add(time.Hour).Format("2006-01-02T15:04:05.999Z"),
	})
}

func PostTokenExchangeCode(c *fiber.Ctx, body *FortniteTokenBody) error {
	if body.ExchangeCode == "" {
		return c.Status(400).JSON(aid.ErrorBadRequest("Exchange Code is empty"))
	}

	if slices.Contains[[]string](aid.Config.Accounts.Codes, body.ExchangeCode) {
		return sendOAuthResponse(c, p.Find("server"))
	}

	codeParts := strings.Split(body.ExchangeCode, ".")
	if len(codeParts) != 2 {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Exchange Code"))
	}

	code, failed := aid.KeyPair.DecryptAndVerifyB64(codeParts[0], codeParts[1])
	if failed {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Exchange Code"))
	}

	personParts := strings.Split(string(code), "=")
	if len(personParts) != 2 {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Exchange Code"))
	}

	personId := personParts[0]
	expire, err := time.Parse("2006-01-02T15:04:05.999Z", personParts[1])
	if err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Exchange Code"))
	}

	if expire.Add(20 * time.Minute).Before(time.Now()) {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Exchange Code"))
	}

	person := p.Find(personId)
	if person == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Exchange Code"))
	}

	// delete(RETARDED_CODES, body.ExchangeCode)
	return sendOAuthResponse(c, person)
}

func PostTokenPassword(c *fiber.Ctx, body *FortniteTokenBody) error {
	if body.Username == "" || body.Password == "" {
		return c.Status(400).JSON(aid.ErrorBadRequest("Username/Password is empty"))
	}

	if strings.Contains(body.Password, "code://") {
		return PostTokenExchangeCode(c, body)
	}

	if aid.Config.Fortnite.Password {
		return c.Status(400).JSON(aid.ErrorBadRequest("Username and password authentication is disabled for security reasons. Please use an exchange code given by the discord bot."))
	}

	person := p.FindByDisplay(strings.Split(body.Username, "@")[0])
	if person == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("No Account Found"))
	}

	return sendOAuthResponse(c, person)
}

func PostTokenRefreshToken(c *fiber.Ctx, body *FortniteTokenBody) error {
	if body.RefreshToken == "" {
		return c.Status(400).JSON(aid.ErrorBadRequest("Refresh Token is empty"))
	}

	body.RefreshToken = strings.ReplaceAll(body.RefreshToken, "bearer ", "")
	body.RefreshToken = strings.ReplaceAll(body.RefreshToken, "eg1~", "")

	id, err := aid.GetSnowFromToken(body.RefreshToken)
	if err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Refresh Token"))
	}

	person := p.Find(id)
	if person == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Refresh Token"))
	}

	return sendOAuthResponse(c, person)
}

func sendOAuthResponse(c *fiber.Ctx, person *p.Person) error {
	access, err := aid.JWTSign(aid.JSON{
		"snow_id":       person.ID, // custom
		"creation_date": time.Now().Format("2006-01-02T15:04:05.999Z"),
		"am":            "access_token",
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(aid.ErrorInternalServer)
	}

	refresh, err := aid.JWTSign(aid.JSON{
		"snow_id":       person.ID,
		"creation_date": time.Now().Format("2006-01-02T15:04:05.999Z"),
		"am":            "refresh_token",
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(aid.ErrorInternalServer)
	}

	hardwares := []string{
		c.Get("X-Epic-Device-ID"),
		c.Get("hwid"),
	}

	if person.ID != "server" {
		for _, hardware := range hardwares {
			exists := storage.Repo.GetHWIDByPerson(person.ID)
			if exists == nil {
				hwid := &storage.DB_HWID{
					ID:       hardware,
					IP:       aid.Ternary[string](c.Get("X-Real-IP") != "", c.Get("X-Real-IP"), c.IP()),
					PersonID: person.ID,
					Banned:   false,
				}
				storage.Repo.SaveHWID(hwid)
				exists = hwid
			}

			if exists.Banned {
				for _, hwid := range *storage.Repo.GetHWIDs(hardware) {
					hwid.Banned = true
					storage.Repo.SaveHWID(&hwid)
				}

				return c.Status(400).JSON(aid.ErrorBadRequest("f"))
			}

			a := *storage.Repo.GetHWIDs(hardware)
			for _, hwid := range *storage.Repo.GetHWIDs(hardware) {
				if hwid.Banned {
					storage.Repo.BanHWID(exists.ID)
					discord.SendBanLogWithHWIDS(person, &storage.DB_BanStatus{
						ID:       aid.Hash([]byte(time.Now().Format("2006-01-02T15:04:05.999Z"))),
						PersonID: person.ID,
						IssuedBy: "1180540902284992602",
						Expiry:   time.Now().Add(time.Hour * 24 * 365),
						Reason:   "Ban Evading",
					}, hwid.ID, a)
					err := discord.StaticClient.Client.GuildBanCreate(aid.Config.Discord.Guild, person.Discord.ID, 0, discordgo.WithAuditLogReason("Ban Evading"))
					if err != nil {
						// fmt.Println(err)
					}
					return c.Status(400).JSON(aid.ErrorBadRequest("b"))
				}
			}
		}

		if len(hardwares) == 0 {
			return c.Status(400).JSON(aid.ErrorBadRequest("e"))
		}
	}

	// if aid.IsAddressProxy(aid.Ternary[string](c.Get("X-Real-IP") != "", c.Get("X-Real-IP"), c.IP())) {
	// 	return c.Status(400).JSON(aid.ErrorBadRequest("p"))
	// }

	return c.Status(200).JSON(aid.JSON{
		"access_token":       "eg1~" + access,
		"account_id":         person.ID,
		"client_id":          c.IP(),
		"client_service":     "fortnite",
		"app":                "fortnite",
		"device_id":          "default",
		"display_name":       person.DisplayName,
		"expires_at":         time.Now().Add(time.Hour * 24).Format("2006-01-02T15:04:05.999Z"),
		"expires_in":         86200,
		"internal_client":    true,
		"refresh_expires":    86200,
		"refresh_expires_at": time.Now().Add(time.Hour * 24).Format("2006-01-02T15:04:05.999Z"),
		"refresh_token":      "eg1~" + refresh,
		"token_type":         "bearer",
		"product_id":         "prod-fn",
		"sandbox_id":         "fn",
	})
}

func GetTokenVerify(c *fiber.Ctx) error {
	snowId, err := aid.GetSnowFromToken(c.Get("Authorization"))
	if err != nil {
		return c.Status(fiber.StatusForbidden).JSON(aid.ErrorBadRequest("Invalid Access Token"))
	}

	person := p.Find(snowId)
	if person == nil {
		return c.Status(fiber.StatusForbidden).JSON(aid.ErrorBadRequest("Invalid Access Token"))
	}

	return c.Status(200).JSON(aid.JSON{
		"app":             "fortnite",
		"token":           strings.ReplaceAll(c.Get("Authorization"), "bearer eg1~", ""),
		"token_type":      "bearer",
		"expires_at":      time.Now().Add(time.Hour * 24).Format("2006-01-02T15:04:05.999Z"),
		"expires_in":      86200,
		"client_id":       c.IP(),
		"session_id":      "0",
		"device_id":       "default",
		"internal_client": true,
		"client_service":  "fortnite",
		"in_app_id":       person.ID,
		"account_id":      person.ID,
		"displayName":     getUsernameFromPerson(person),
		"product_id":      "prod-fn",
		"sandbox_id":      "fn",
	})
}

func GetTokenExchange(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("No Account Found"))
	}

	access, err := aid.JWTSign(aid.JSON{
		"snow_id":       person.ID, // custom
		"creation_date": time.Now().Format("2006-01-02T15:04:05.999Z"),
		"am":            "exchange_code",
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(aid.ErrorInternalServer)
	}

	return c.JSON(aid.JSON{
		"expiresInSeconds": 299,
		"code":             access,
		"creatingClientId": aid.Hash([]byte(c.IP())),
	})
}

func GetExchangeRedirect(c *fiber.Ctx) error {
	var queries struct {
		ExchangeCode string `query:"exchangeCode"`
		RedirectURL  string `query:"redirectUrl"`
	}

	if err := c.QueryParser(&queries); err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Query Parameters"))
	}

	if queries.ExchangeCode == "" || queries.RedirectURL == "" {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Query Parameters"))
	}

	snowId, err := aid.GetSnowFromToken(queries.ExchangeCode)
	if err != nil {
		return c.Status(fiber.StatusForbidden).JSON(aid.ErrorBadRequest("Invalid Access Token"))
	}

	person := p.Find(snowId)
	if person == nil {
		return c.Status(fiber.StatusForbidden).JSON(aid.ErrorBadRequest("Invalid Access Token"))
	}

	if person.GetActiveBan() != nil {
		return c.Status(fiber.StatusForbidden).JSON(aid.ErrorBadRequest("Account is banned"))
	}

	urlRegex := regexp.MustCompile(`^(https?)://([^/]+)(/.*)$`)
	result := urlRegex.ReplaceAllString(queries.RedirectURL, aid.Config.API.DiscordDomain+"$3")
	result += aid.Ternary[string](strings.Contains(result, "?"), "&", "?") + "exchangeCode=" + queries.ExchangeCode

	return c.Redirect(result)
}

func DeleteToken(c *fiber.Ctx) error {
	token := c.Params("token")
	if token == "" {
		return c.Status(400).JSON(aid.ErrorBadRequest("No Token Provided"))
	}

	id, err := aid.GetSnowFromToken(strings.ReplaceAll(token, "eg1~", ""))
	if err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Token"))
	}

	person := p.Find(id)
	if person == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Token"))
	}

	// party := person.GetCurrentParty()
	// if party != nil {
	// 	member := party.GetMember(person)
	// 	if member != nil {
	// 		socket.EmitPartyMemberLeft(party, member)
	// 		party.RemoveMember(person)

	// 		if len(party.Members) > 0 && party.Captain.Person.ID == person.ID {
	// 			party.Captain = party.GetFirstMember()
	// 			socket.EmitPartyNewCaptain(party)
	// 		}
	// 	}
	// }

	return c.Status(200).JSON(aid.JSON{})
}

func MiddlewareFortnite(c *fiber.Ctx) error {
	re := regexp.MustCompile(`Release-(\d+\.\d+)`)
	matches := re.FindStringSubmatch(c.Get("User-Agent"))
	if len(matches) > 1 {
		floatVersion, err := strconv.ParseFloat(matches[1], 8)
		if err != nil {
			c.Locals("season_str", "0")
			c.Locals("season", 0)
			c.Locals("version", 0.0)
		}

		season, err := strconv.Atoi(strings.Split(matches[1], ".")[0])
		if err != nil {
			c.Locals("season_str", "0")
			c.Locals("season", 0)
			c.Locals("version", 0.0)
		}

		c.Locals("season_str", strings.Split(matches[1], ".")[0])
		c.Locals("season", season)
		c.Locals("version", floatVersion)
	} else {
		c.Locals("season_str", "0")
		c.Locals("season", 0)
		c.Locals("version", 0.0)
	}

	var t string
	tokens := []string{
		c.Get("Authorization"),
		c.Get("EPIC_BEARER_TOKEN"),
		c.Query("exchangeCode"),
	}

	for _, token := range tokens {
		if token == "" {
			continue
		}
		t = token
		break
	}

	snowId, err := aid.GetSnowFromToken(t)
	if err != nil {
		return c.Status(fiber.StatusForbidden).JSON(aid.ErrorBadRequest("Invalid Access Token"))
	}

	person := p.Find(snowId)
	if person == nil {
		return c.Status(fiber.StatusForbidden).JSON(aid.ErrorBadRequest("Invalid Access Token"))
	}

	person.DisplayName = aid.StripEverythingButLetters(person.DisplayName)
	// person.SaveShallow()

	if person.ID != "server" && person.GetActiveBan() != nil {
		// fmt.Println(person.DisplayName)
		// fmt.Println(person.GetActiveBan().ID)
		return c.Status(fiber.StatusForbidden).JSON(aid.ErrorBadRequest("Account is banned"))
	}

	//User-Agent: Fortnite/++Fortnite+Release-8.51-CL-6165369 Windows/10.0.22631.1.256.64bit
	//User-Agent: FortniteGame/++Fortnite+Release-14.30-CL-14456520 Windows/10.0.22631.1.256.64bit

	// if aid.IsAddressProxy(aid.Ternary[string](c.Get("X-Real-IP") != "", c.Get("X-Real-IP"), c.IP())) {
	// 	return c.Status(400).JSON(aid.ErrorBadRequest("k"))
	// }

	if person.CurrentSeasonStats == nil || person.CurrentSeasonStats.Season != c.Locals("season") {
		found, ok := person.AllSeasonsStats.Get(c.Locals("season_str").(string))
		if !ok {
			found = p.NewSeasonStats(c.Locals("season").(int))
			found.PersonID = person.ID
			found.Save()
			person.AllSeasonsStats.Set(c.Locals("season_str").(string), found)
		}

		person.CurrentSeasonStats = found
		// person.Save()

		person.AthenaProfile.Attributes.GetAttributeByKey("season_num").SetValue(person.CurrentSeasonStats.Season).Save()
		person.AthenaProfile.Attributes.GetAttributeByKey("level").SetValue(fortnite.DataClient.SnowSeason.GetSeasonLevel(person.CurrentSeasonStats)).Save()
		person.AthenaProfile.Attributes.GetAttributeByKey("accountLevel").SetValue(fortnite.DataClient.SnowSeason.GetSeasonLevel(person.CurrentSeasonStats)).Save()
		person.AthenaProfile.Attributes.GetAttributeByKey("xp").SetValue(fortnite.DataClient.SnowSeason.GetRelativeSeasonXP(person.CurrentSeasonStats)).Save()
		person.AthenaProfile.Attributes.GetAttributeByKey("book_purchased").SetValue(person.CurrentSeasonStats.BookPurchased).Save()
		person.AthenaProfile.Attributes.GetAttributeByKey("book_level").SetValue(fortnite.DataClient.SnowSeason.GetBookLevel(person.CurrentSeasonStats)).Save()
		person.AthenaProfile.Attributes.GetAttributeByKey("book_xp").SetValue(fortnite.DataClient.SnowSeason.GetRelativeBookXP(person.CurrentSeasonStats)).Save()
	}

	if !slices.Contains(aid.Config.Fortnite.AllowedSeasons, c.Locals("season").(int)) {
		if !slices.Contains(aid.Config.Fortnite.WhitelistedUsers, person.DisplayName) {
			//return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Season"))
		}
	}

	c.Locals("person", person)
	return c.Next()
}

func MiddlewareWeb(c *fiber.Ctx) error {
	snowId, err := aid.GetSnowFromToken(c.Get("Authorization"))
	if err != nil {
		return c.Status(fiber.StatusForbidden).JSON(aid.JSON{"error": "Invalid Access Token"})
	}

	person := p.Find(snowId)
	if person == nil {
		return c.Status(fiber.StatusForbidden).JSON(aid.JSON{"error": "Invalid Access Token"})
	}

	c.Locals("person", person)
	return c.Next()
}

func getUsernameFromPerson(person *p.Person) string {
	u := ""

	// if discord.HasContentCreatorRole(person) {
	// 	u = "[Creator] "
	// }

	// if discord.HasLlamaDonatorRole(person) {
	// 	u = "[Llama] "
	// }

	// if discord.HasRetracPlusRole(person) {
	// 	u = "[Crystal] "
	// }

	// if discord.HasCrystalDonatorRole(person) {
	// 	u = "[Retrac+] "
	// }

	// if discord.HasRetracUltimateRole(person) {
	// 	u = "[Ultimate] "
	// }

	//if discord.HasStaffRole(person) {
	//	u = "[RETRAC]"
	//}

	return u + person.DisplayName
}

func GetPublicAccount(c *fiber.Ctx) error {
	person := p.Find(c.Params("accountId"))
	if person == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("No Account Found"))
	}

	person.DisplayName = aid.StripEverythingButLetters(person.DisplayName)
	person.SaveShallow()

	return c.Status(200).JSON(aid.JSON{
		"id":            person.ID,
		"displayName":   getUsernameFromPerson(person),
		"externalAuths": []aid.JSON{},
	})
}

func GetPublicAccounts(c *fiber.Ctx) error {
	response := []aid.JSON{}

	accountIds := c.Request().URI().QueryArgs().PeekMulti("accountId")
	for _, accountIdSlice := range accountIds {
		person := p.Find(string(accountIdSlice))
		if person == nil {
			continue
		}

		person.DisplayName = aid.StripEverythingButLetters(person.DisplayName)
		person.SaveShallow()

		response = append(response, aid.JSON{
			"id":            person.ID,
			"displayName":   getUsernameFromPerson(person),
			"externalAuths": []aid.JSON{},
		})
	}

	return c.Status(200).JSON(response)
}

func GetPublicAccountExternalAuths(c *fiber.Ctx) error {
	person := p.Find(c.Params("accountId"))
	if person == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("No Account Found"))
	}

	return c.Status(200).JSON([]aid.JSON{})
}

func GetPublicAccountByDisplayName(c *fiber.Ctx) error {
	person := p.FindByDisplay(c.Params("displayName"))
	if person == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("No Account Found"))
	}

	person.DisplayName = aid.StripEverythingButLetters(person.DisplayName)
	person.SaveShallow()

	return c.Status(200).JSON(aid.JSON{
		"id":            person.ID,
		"displayName":   getUsernameFromPerson(person),
		"externalAuths": []aid.JSON{},
	})
}

func GetPrivacySettings(c *fiber.Ctx) error {
	return c.Status(200).JSON(aid.JSON{
		"privacySettings": aid.JSON{
			"playRegion": "PUBLIC",
			"badges":     "PUBLIC",
			"languages":  "PUBLIC",
		},
	})
}
