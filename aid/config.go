package aid

import (
	"strconv"
	"strings"

	"gopkg.in/ini.v1"
)

type CS struct {
	Accounts struct {
		Gods []string
		Owners []string
		Codes []string
	}
	Database struct {
		URI  string
		Type string
		DropAllTables bool
	}
	Discord struct {
		ID string
		Secret string
		Token string
		Guild string
		BoosterRoleID string
		CrystalRoleID string
		LlamaRoleID string
		CCRoleID string
		RetracPlusID string
		UltimateRoleID string
		StaffRoleID string
		EUServersRoleID string
		NAServersRoleID string
		ReportChannelID string
		StatusChannelID string
		LogsChannelID string
	}
	Amazon struct {
		Enabled bool
		BucketURI string
		AccessKeyID string
		SecretAccessKey string
		ClientSettingsBucket string
	}
	Output struct {
		Level string
	}
	API struct {
		Port string
		// FrontendPort string
		Debug bool
		XmppDomain string
		DiscordDomain string
		FrontendDomain string
		MatchmakerDomain string
		// HosterDomain string
		EUHosterDomains []string
		NAHosterDomains []string
	}
	JWT struct {
		Secret string
	}
	Fortnite struct {
		AllowedSeasons []int
		Version string
		Season int
		Build float64
		Everything bool
		Password bool
		DisableClientCredentials bool
		ShopSeed int
		EnableVBucks bool
		WhitelistedUsers []string
		OnlyBoostersCanMatchmake bool
	}
}

var (
	Config *CS
)

func LoadConfig(file []byte) {
	Config = &CS{}
	
	cfg, err := ini.Load(file)
	if err != nil {
		panic(err)
	}

	Config.Accounts.Gods = cfg.Section("accounts").Key("gods").Strings(",")
	Config.Accounts.Owners = cfg.Section("accounts").Key("owners").Strings(",")
	Config.Accounts.Codes = cfg.Section("accounts").Key("codes").Strings(",")

	Config.Database.DropAllTables = cfg.Section("database").Key("drop").MustBool(false)
	Config.Database.URI = cfg.Section("database").Key("uri").String()
	if Config.Database.URI == "" {
		panic("Database URI is empty")
	}
	Config.Database.Type = cfg.Section("database").Key("type").String()
	if Config.Database.Type == "" {
		panic("Database Type is empty")
	}

	Config.Output.Level = cfg.Section("output").Key("level").String()
	if Config.Output.Level == "" {
		panic("Output Level is empty")
	}

	if Config.Output.Level != "dev" && Config.Output.Level != "prod" && Config.Output.Level != "time" && Config.Output.Level != "info" {
		panic("Output Level must be either dev or prod")
	}

	Config.Discord.ID = cfg.Section("discord").Key("id").String()
	if Config.Discord.ID == "" {
		panic("Discord Client ID is empty")
	}

	Config.Discord.Secret = cfg.Section("discord").Key("secret").String()
	if Config.Discord.Secret == "" {
		panic("Discord Client Secret is empty")
	}

	Config.Discord.Token = cfg.Section("discord").Key("token").String()
	if Config.Discord.Token == "" {
		panic("Discord Bot Token is empty")
	}

	Config.Discord.Guild = cfg.Section("discord").Key("guild").String()
	if Config.Discord.Guild == "" {
		panic("Discord Guild ID is empty")
	}

	Config.Discord.BoosterRoleID = cfg.Section("discord").Key("boost_role_id").String()
	if Config.Discord.BoosterRoleID == "" {
		panic("Discord Booster Role ID is empty")
	}

	Config.Discord.CrystalRoleID = cfg.Section("discord").Key("crystal_donator_role_id").String()
	if Config.Discord.CrystalRoleID == "" {
		panic("Discord Crystal Donator Role ID is empty")
	}

	Config.Discord.LlamaRoleID = cfg.Section("discord").Key("llama_donator_role_id").String()
	if Config.Discord.LlamaRoleID == "" {
		panic("Discord Llama Donator Role ID is empty")
	}

	Config.Discord.CCRoleID = cfg.Section("discord").Key("cc_role_id").String()
	if Config.Discord.CCRoleID == "" {
		panic("Discord CC Role ID is empty")
	}

	Config.Discord.RetracPlusID = cfg.Section("discord").Key("retrac_plus_role_id").String()
	if Config.Discord.RetracPlusID == "" {
		panic("Discord Retrac Plus Role ID is empty")
	}

	Config.Discord.UltimateRoleID = cfg.Section("discord").Key("ultimate_role_id").String()
	if Config.Discord.UltimateRoleID == "" {
		panic("Discord Ultimate Role ID is empty")
	}

	Config.Discord.StaffRoleID = cfg.Section("discord").Key("staff_role_id").String()
	if Config.Discord.StaffRoleID == "" {
		panic("Discord Staff Role ID is empty")
	}

	Config.Discord.EUServersRoleID = cfg.Section("discord").Key("eu_servers_role_id").String()
	if Config.Discord.EUServersRoleID == "" {
		panic("Discord EU Servers Role ID is empty")
	}

	Config.Discord.NAServersRoleID = cfg.Section("discord").Key("na_servers_role_id").String()
	if Config.Discord.NAServersRoleID == "" {
		panic("Discord NA Servers Role ID is empty")
	}


	Config.Discord.ReportChannelID = cfg.Section("discord").Key("report_channel_id").String()
	if Config.Discord.ReportChannelID == "" {
		panic("Discord Report Channel ID is empty")
	}

	Config.Discord.StatusChannelID = cfg.Section("discord").Key("status_channel_id").String()
	if Config.Discord.StatusChannelID == "" {
		panic("Discord Status Channel ID is empty")
	}

	Config.Discord.LogsChannelID = cfg.Section("discord").Key("logs_channel_id").String()
	if Config.Discord.LogsChannelID == "" {
		panic("Discord Logs Channel ID is empty")
	}

	Config.Amazon.Enabled = true
	Config.Amazon.BucketURI = cfg.Section("amazon").Key("uri").String()
	if Config.Amazon.BucketURI == "" {
		Config.Amazon.Enabled = false
	}

	Config.Amazon.AccessKeyID = cfg.Section("amazon").Key("id").String()
	if Config.Amazon.AccessKeyID == "" {
		Config.Amazon.Enabled = false
	}

	Config.Amazon.SecretAccessKey = cfg.Section("amazon").Key("key").String()
	if Config.Amazon.SecretAccessKey == "" {
		Config.Amazon.Enabled = false
	}

	Config.Amazon.ClientSettingsBucket = cfg.Section("amazon").Key("bucket").String()
	if Config.Amazon.ClientSettingsBucket == "" {
		Config.Amazon.Enabled = false
	}


	Config.API.Port = cfg.Section("api").Key("port").String()
	if Config.API.Port == "" {
		panic("API Port is empty")
	}
	
	Config.API.Debug = cfg.Section("api").Key("debug").MustBool(false)

	Config.API.XmppDomain = cfg.Section("api").Key("xmpp_domain").String()
	if Config.API.XmppDomain == "" {
		panic("API XMPP Host is empty")
	}

	Config.API.DiscordDomain = cfg.Section("api").Key("discord_domain").String()
	if Config.API.DiscordDomain == "" {
		panic("API Discord Host is empty")
	}

	Config.API.FrontendDomain = cfg.Section("api").Key("frontend_domain").String()
	if Config.API.DiscordDomain == "" {
		panic("Frontend Domain is empty")
	}


	Config.API.MatchmakerDomain = cfg.Section("api").Key("matchmaker_domain").String()
	if Config.API.MatchmakerDomain == "" {
		panic("API Matchmaker Host is empty")
	}

	Config.API.EUHosterDomains = cfg.Section("api").Key("eu_hoster_domains").Strings(",")
	if len(Config.API.EUHosterDomains) == 0 {
		panic("API EU Hoster Domains is empty")
	}

	Config.API.NAHosterDomains = cfg.Section("api").Key("na_hoster_domains").Strings(",")
	if len(Config.API.NAHosterDomains) == 0 {
		panic("API NA Hoster Domains is empty")
	}

	Config.JWT.Secret = cfg.Section("jwt").Key("secret").String()
	if Config.JWT.Secret == "" {
		panic("JWT Secret is empty")
	}

	Config.Fortnite.Version = cfg.Section("fortnite").Key("version").String()
	if Config.Fortnite.Version == "" {
		panic("Fortnite Version is empty")
	}

	build, err := cfg.Section("fortnite").Key("build").Float64()
	if err != nil {
		panic("Fortnite Build is empty")
	}

	Config.Fortnite.Build = build

	buildStr := strconv.FormatFloat(build, 'f', -1, 64)
	if buildStr == "" {
		panic("Fortnite Build is empty")
	}

	buildInfo := strings.Split(buildStr, ".")
	if len(buildInfo) < 2 {
		panic("Fortnite Build is invalid")
	}

	parsedSeason, err := strconv.Atoi(buildInfo[0])
	if err != nil {
		panic("Fortnite Season is invalid")
	}

	allowedSeasons := cfg.Section("fortnite").Key("allowed_seasons").Strings(",")
	if len(allowedSeasons) == 0 {
		panic("Fortnite Allowed Seasons is empty")
	}

	Config.Fortnite.AllowedSeasons = make([]int, len(allowedSeasons))
	for i, season := range allowedSeasons {
		parsedSeason, err := strconv.Atoi(season)
		if err != nil {
			panic("Fortnite Allowed Seasons is invalid")
		}

		Config.Fortnite.AllowedSeasons[i] = parsedSeason
	}

	Config.Fortnite.Season = parsedSeason
	Config.Fortnite.Everything = cfg.Section("fortnite").Key("everything").MustBool(false)
	Config.Fortnite.Password = !(cfg.Section("fortnite").Key("disable_password").MustBool(false))
	Config.Fortnite.DisableClientCredentials = cfg.Section("fortnite").Key("disable_client_credentials").MustBool(false)
	Config.Fortnite.ShopSeed = cfg.Section("fortnite").Key("shop_seed").MustInt(0)
	Config.Fortnite.EnableVBucks = cfg.Section("fortnite").Key("enable_vbucks").MustBool(false)

	Config.Fortnite.WhitelistedUsers = cfg.Section("fortnite").Key("whitelisted_users_who_can_matchmake").Strings(",")
	Config.Fortnite.OnlyBoostersCanMatchmake = cfg.Section("fortnite").Key("only_discord_boosters_can_matchmake").MustBool(false)
}