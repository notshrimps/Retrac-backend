package main

import (
	_ "embed"
	"fmt"
	"math/rand"
	"strings"
	"time"

	"github.com/ectrc/snow/aid"
	d "github.com/ectrc/snow/discord"
	"github.com/ectrc/snow/fortnite"
	"github.com/ectrc/snow/handlers"
	"github.com/ectrc/snow/servers"
	"github.com/ectrc/snow/shop"
	"github.com/ectrc/snow/storage"

	"github.com/goccy/go-json"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

//go:embed config.ini
var configFile []byte

func init() {
	aid.LoadConfig(configFile) 
	var device storage.Storage
	switch aid.Config.Database.Type {
	case "postgres":
		postgresStorage := storage.NewPostgresStorage()
		if aid.Config.Database.DropAllTables {
			postgresStorage.DropTables()
			aid.Print("(snow) all tables dropped and reset")
		}
		postgresStorage.MigrateAll()
		device = postgresStorage
	default:
		panic("Invalid database type: " + aid.Config.Database.Type)
	}

	storage.Repo = storage.NewStorage(device)

	if aid.Config.Amazon.Enabled {
		storage.Repo.Amazon = storage.NewAmazonClient(aid.Config.Amazon.BucketURI, aid.Config.Amazon.AccessKeyID, aid.Config.Amazon.SecretAccessKey, aid.Config.Amazon.ClientSettingsBucket)
	}
}

func init() {
	for _, domain := range aid.Config.API.EUHosterDomains {
		servers.EU_Hosters = append(servers.EU_Hosters, servers.NewHosterInteractor(domain))
	}

	for _, domain := range aid.Config.API.NAHosterDomains {
		servers.NA_Hosters = append(servers.NA_Hosters, servers.NewHosterInteractor(domain))
	}

	servers.Manager = servers.NewServerManager()
		
	d.IntialiseClient()
	fortnite.PreloadCosmetics()
	fortnite.PreloadEvents()
	fortnite.CreateGodAccounts()
	aid.SetRandom(rand.New(rand.NewSource(int64(aid.Config.Fortnite.ShopSeed) + aid.CurrentDayUnix())))

	if _, err := storage.Repo.Storage.QueryShop(time.Now().Truncate(24*time.Hour).Format(time.RFC3339)); err != nil {
		randomNumberGenerator := rand.New(rand.NewSource(time.Date(time.Now().Year(), time.Now().Month(), time.Now().Day(), 0, 0, 0, 0, time.Now().Location()).Unix()))
		catalog := shop.GenerateShopForDate(randomNumberGenerator, time.Now().Truncate(24*time.Hour))
		storage.Repo.Storage.SaveShop(catalog)
	}
	// storage.Repo.Storage.DeleteShop(time.Now().Truncate(24*time.Hour).Format(time.RFC3339))
}

func main() {
	// aid.PrintJSON(aid.Config)

	r := fiber.New(fiber.Config{
		DisableStartupMessage: true,
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
	})

	r.Use(aid.FiberLogger())
	r.Use(aid.FiberLimiter(1000))
	r.Use(aid.FiberCors())

	r.Get("/region", handlers.GetRegion)
	r.Get("/content/api/pages/fortnite-game", handlers.GetContentPages)
	r.Get("/waitingroom/api/waitingroom", handlers.GetWaitingRoomStatus)
	r.Get("/affiliate/api/public/affiliates/slug/:slug", handlers.GetAffiliate)
	r.Get("/profile/privacy_settings", handlers.MiddlewareFortnite, handlers.GetPrivacySettings)
	r.Put("/profile/play_region", handlers.AnyNoContent)
	r.Get("/socket", handlers.MiddlewareWebsocket, websocket.New(handlers.WebsocketConnection))
	r.Get("/api/v1/search/:accountId", handlers.GetPersonSearch)
	r.Get("/api/v1/players/Fortnite/:accountId", handlers.MiddlewareFortnite, handlers.GetPlayerEventStatus)
	r.Get("/statsproxy/api/statsv2/account/:accountId", handlers.GetStatsForPlayer)
	r.Get("/statsproxy/api/statsv2/leaderboards/:stat", handlers.MiddlewareFortnite, handlers.GetLeaderboardStat)
	r.Post("/statsproxy/api/statsv2/query", handlers.MiddlewareFortnite, handlers.GetStatsForPlayers)

	account := r.Group("/account/api")
	account.Get("/public/account", handlers.GetPublicAccounts)
	account.Get("/public/account/:accountId", handlers.GetPublicAccount)
	account.Get("/public/account/:accountId/externalAuths", handlers.GetPublicAccountExternalAuths)
	account.Get("/public/account/displayName/:displayName", handlers.GetPublicAccountByDisplayName)
	account.Get("/oauth/verify", handlers.GetTokenVerify)
	account.Get("/oauth/exchange", handlers.MiddlewareFortnite, handlers.GetTokenExchange)
	account.Post("/oauth/token", handlers.PostFortniteToken)
	account.Delete("/oauth/sessions/kill/:token", handlers.DeleteToken)

	exchange := r.Group("/exchange")
	exchange.Get("/", handlers.GetExchangeRedirect)
	
	fortnite := r.Group("/fortnite/api")
	fortnite.Get("/receipts/v1/account/:accountId/receipts", handlers.MiddlewareFortnite, handlers.GetFortniteReceipts)
	fortnite.Get("/v2/versioncheck/:version", handlers.GetFortniteVersion)
	fortnite.Get("/calendar/v1/timeline", handlers.GetFortniteTimeline)
	fortnite.Get("/statsv2/account/:accountId", handlers.GetStatsForPlayer)
	
	storefront := fortnite.Group("/storefront/v2")
	storefront.Use(handlers.MiddlewareFortnite)
	storefront.Get("/catalog", handlers.GetStorefrontCatalog)
	storefront.Get("/keychain", handlers.GetStorefrontKeychain)
	storefront.Get("/gift/check_eligibility/recipient/:accountId/offer/:offerId", handlers.GetStorefrontGiftCheckEligibility)
	r.Get("/catalog/api/shared/bulk/offers", handlers.GetStorefrontCatalogBulkOffers)

	matchmaking := fortnite.Group("/matchmaking")
	matchmaking.Get("/socket", handlers.MiddlewareWebsocket, websocket.New(handlers.WebsocketConnection))
	matchmaking.Get("/session/findPlayer/:accountId", handlers.GetMatchmakingAccountSession)
	matchmaking.Get("/session/:sessionId", handlers.GetMatchmakerSession)
	matchmaking.Post("/session/:sessionId/join", handlers.MiddlewareFortnite, handlers.PostMatchmakerJoinSession)

	cloudstorage := fortnite.Group("/cloudstorage")
	cloudstorage.Get("/system", handlers.GetCloudStorageFiles)
	cloudstorage.Get("/system/config", handlers.GetCloudStorageConfig)
	cloudstorage.Get("/system/:fileName", handlers.GetCloudStorageFile)
	cloudstorage.Get("/user/:accountId", handlers.MiddlewareFortnite, handlers.GetUserStorageFiles)
	cloudstorage.Get("/user/:accountId/:fileName", handlers.MiddlewareFortnite, handlers.GetUserStorageFile)
	cloudstorage.Put("/user/:accountId/:fileName", handlers.MiddlewareFortnite, handlers.PutUserStorageFile)

	friends := r.Group("/friends/api")
	friends.Use(handlers.MiddlewareFortnite)
	friends.Get("/public/friends/:accountId", handlers.GetFriendList)
	friends.Post("/public/friends/:accountId/:wanted", handlers.PostCreateFriend)
	friends.Delete("/public/friends/:accountId/:wanted", handlers.DeleteFriend)
	friends.Get("/:version/:accountId/summary", handlers.GetFriendListSummary)
	friends.Post("/:version/:accountId/friends/:wanted", handlers.PostCreateFriend)
	friends.Delete("/:version/:accountId/friends/:wanted", handlers.DeleteFriend)

	events := r.Group("/api/v1/events/Fortnite")
	events.Use(handlers.MiddlewareFortnite)
	events.Get("/download/:accountId", handlers.GetEvents)
	events.Get("/:eventId/history/:accountId", handlers.GetEventsBulkHistory)
	events.Get("/:eventId/history/:accountId", handlers.GetEventsBulkHistory)

	game := fortnite.Group("/game/v2")
	game.Get("/enabled_features", handlers.GetGameEnabledFeatures)
	game.Post("/tryPlayOnPlatform/account/:accountId", handlers.PostGamePlatform)
	game.Post("/grant_access/:accountId", handlers.PostGameAccess)
	game.Post("/profileToken/verify/:accountId", handlers.AnyNoContent)

	profile := game.Group("/profile/:accountId")
	profile.Use(handlers.MiddlewareFortnite)
	profile.Post("/client/:action", handlers.PostClientProfileAction)
	profile.Post("/dedicated_server/:action", handlers.PostServerProfileAction)

	lightswitch := r.Group("/lightswitch/api")
	lightswitch.Use(handlers.MiddlewareFortnite)
	lightswitch.Get("/service/bulk/status", handlers.GetLightswitchBulkStatus)

	ticketing := game.Group("/matchmakingservice")
	ticketing.Use(handlers.MiddlewareFortnite)
	ticketing.Get("/ticket/player/:accountId", handlers.GetMatchmakerTicket)
	game.Get("/matchmaking/account/:accountId/session/:sessionId", handlers.MiddlewareFortnite, handlers.GetMatchmakerSessionEncryptionKey)

	toxicity := game.Group("/toxicity")
	toxicity.Use(handlers.MiddlewareFortnite)
	toxicity.Post("/account/:accountId/report/:offenderId", handlers.PostToxicityReport)
	fortnite.Post("/feedback/Player", handlers.MiddlewareFortnite, handlers.PostFeedbackPlayer)

	party := r.Group("/party/api/v1/Fortnite")
	party.Use(handlers.MiddlewareFortnite)
	party.Get("/user/:accountId", handlers.GetPartiesForUser)
	party.Get("/user/:accountId/settings/privacy", handlers.GetPartyUserPrivacy)
	party.Get("/user/:accountId/notifications/undelivered/count", handlers.GetPartyNotifications)
	party.Get("/user/:accountId/pings/:friendId/parties", handlers.GetPartyPingsFromFriend)
	party.Post("/user/:accountId/pings/:friendId/join", handlers.PostPartyJoinFromPing)
	party.Delete("/user/:accountId/pings/:friendId", handlers.PostPartyDeletePings)
	party.Get("/parties/:partyId", handlers.GetPartyForMember)
	party.Post("/parties", handlers.PostPartyCreate)
	party.Post("/parties/:partyId/invites/:accountId", handlers.PostPartyInvite)
	party.Post("/parties/:partyId/members/:accountId/join", handlers.PostPartyJoin)
	party.Post("/parties/:partyId/members/:accountId/promote", handlers.PostPartyPromoteMember)
	party.Patch("/parties/:partyId", handlers.PatchPartyUpdateState)
	party.Patch("/parties/:partyId/members/:accountId/meta", handlers.PatchPartyUpdateMemberState)
	party.Delete("/parties/:partyId/members/:accountId", handlers.DeletePartyMember)
	party.Post("/members/:friendId/intentions/:accountId", handlers.PostPartyCreateIntention)

	managers := r.Group("/managers")
	statmanager := managers.Group("/stats")
	statmanager.Use(handlers.MiddlewareServerManager)
	statmanager.Post("/:sessionId/:username/:placement/:eliminations/:totalXP/:score", handlers.AddStatsToPlayer)
	
	servermanager := managers.Group("/servers")
	servermanager.Post("/", handlers.PostServerCreate_DEV_ONLY)
	servermanager.Get("/ws", handlers.MiddlewareWebsocketServer, websocket.New(handlers.WebsocketConnection))
	servermanager.Use(handlers.MiddlewareServerManager)
	servermanager.Get("/:serverId/:accountId", handlers.GetPlayerAllowedInServer)
	servermanager.Patch("/:serverId/:status", handlers.PatchServerUpdate)
	servermanager.Delete("/:serverId", handlers.DeleteServerDelete)
	servermanager.Delete("/", handlers.DeleteServerDeleteAll)

	purchasing := r.Group("/purchase")
	purchasing.Get("/", handlers.MiddlewareFortnite, handlers.GetHtmlPurchasePage)
	purchasing.Get("/offer", handlers.MiddlewareFortnite, handlers.GetPurchaseOffer)
	purchasing.Post("/offer", handlers.MiddlewareFortnite, handlers.PostPurchaseOffer)
	purchasing.Get("/assets", handlers.GetPurchaseAsset)

	admin := r.Group("/admin")
	admin.Use(handlers.MiddlewareAdmin)
	admin.Get("/", handlers.AdminTest)
	admin.Get("/shops", handlers.GetAdminShops)
	admin.Get("/shop/new", handlers.GetNewShopURL)
	admin.Get("/shop/:base64id", handlers.GetAdminShop)
	admin.Post("/shop", handlers.SaveAdminShop)

	snow := r.Group("/snow")
	snow.Post("/log", handlers.PostSnowLog)

	discord := snow.Group("/discord")
	discord.Get("/", handlers.GetDiscordOAuthURL)

	launcher := snow.Group("/launcher")
	launcher.Get("/", handlers.GetLauncherStatus)
	launcher.Get("/sizes", handlers.GetLauncherPaks)

	player := snow.Group("/player")
	player.Get("/ws", handlers.MiddlewareWebsocketPlayer, websocket.New(handlers.WebsocketConnection))
	player.Use(handlers.MiddlewareWeb)
	player.Get("/", handlers.GetPlayer)
	player.Get("/okay", handlers.GetPlayerOkay)
	player.Post("/code", handlers.PostPlayerCreateCode)

	debug := snow.Group("/")
	debug.Use(handlers.MiddlewareOnlyDebug)
	debug.Get("/servers", handlers.GetServerManager)
	debug.Get("/shop", handlers.GetSnowShop)
	debug.Get("/cache", handlers.GetSnowCachedPlayers)
	debug.Get("/sockets", handlers.GetSnowConnectedSockets)
	debug.Get("/cosmetics", handlers.GetSnowPreloadedCosmetics)

	r.Get("/", handlers.RedirectSocket)
	// r.Get("/:asset", handlers.GetAsset)
	r.Get("/assets/:asset", handlers.GetAsset)

	r.Use(func(c *fiber.Ctx) error {
		url := c.OriginalURL()

		matchUrlToFile := map[string][]string{
			"_fake_api": {"_fake_api.json", "application/json",},
			"_fake_shop": {"_fake_shop.json", "application/json",},
			".js": {"index-yPYTloMq.js", "application/javascript",},
			".css": {"index-DF1J250H.css", "text/css",},
			"GeistVariableVF.ttf": {"GeistVariableVF.ttf", "font/ttf",},
			"GeistVariableVF": {"GeistVariableVF.woff2", "font/woff2",},
			"BricolageGrotesque": {"BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf", "font/ttf",},
		}

		for key, value := range matchUrlToFile {
			if !strings.Contains(url, key) {
				continue
			}

			bytes := storage.Asset("site/" + value[0])
			if bytes == nil {
				return c.Status(404).SendString("Not Found")
			}
	
			stringBytes := string(*bytes)
			c.Set("Content-Type", value[1])
			return c.Status(200).SendString(stringBytes)
		}

		bytes := storage.Asset("site/index.html")
		if bytes == nil {
			return c.Status(404).SendString("Not Found")
		}

		stringBytes := string(*bytes)
		c.Set("Content-Type", "text/html")
		return c.Status(200).SendString(stringBytes)
	})

	r.Hooks().OnListen(func(ld fiber.ListenData) error {
		fmt.Printf("[%s] (fiber) listening on port %s!", time.Now().Format(time.RFC3339), ld.Port)
		d.StaticClient.Client.ChannelMessageSendEmbed(aid.Config.Discord.StatusChannelID, d.NewEmbedBuilder().
			SetTitle("Retrac Backend Services Restarted").
			SetDescription("You may be logged out of the game, kicked out of queue or parties. Please rejoin if necessary!").
			SetColor(0x39fe93).Build(),
		)
		return nil
	})

	err := r.Listen("0.0.0.0" + aid.Config.API.Port)
	if err != nil {
		panic(fmt.Sprintf("(fiber) failed to listen: %v", err))
	}
}
