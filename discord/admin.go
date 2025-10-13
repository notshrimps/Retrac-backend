package discord

import (
	"fmt"
	"strconv"
	"time"

	"github.com/bwmarrin/discordgo"
	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/fortnite"
	"github.com/ectrc/snow/person"
	"github.com/ectrc/snow/socket"
	"github.com/ectrc/snow/storage"
)

func informationHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	looker := person.FindByDiscord(i.Member.User.ID)
	if looker == nil {
		s.InteractionRespond(i.Interaction, &ErrorNoAccount)
		return
	}

	if !looker.HasPermission(person.PermissionInformation) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	playerCount := storage.Repo.GetPersonsCount()
	totalVbucks := storage.Repo.TotalVBucks()

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{
				NewEmbedBuilder().
					SetTitle("Retrac Information").
					SetColor(0x2b2d31).
					AddField("Players Registered", aid.FormatNumber(playerCount), true).
					AddField("Players Online", aid.FormatNumber(socket.JabberSockets.Len()), true).
					AddField("VBucks in Circulation", aid.FormatNumber(totalVbucks), false).
					Build(),
			},
			Flags: discordgo.MessageFlagsEphemeral,
		},
	})
}

func whoHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
	})

	looker := person.FindByDiscord(i.Member.User.ID)
	if looker == nil {
		s.InteractionRespond(i.Interaction, &ErrorNoAccount)
		return
	}

	if !looker.HasPermission(person.PermissionLookup) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	player := getPersonFromOptions(i.ApplicationCommandData().Options, s)
	if player == nil {
		s.InteractionRespond(i.Interaction, &ErrorInvalidDisplayOrDiscord)
		return
	}

	playerVbucks := player.CommonCoreProfile.Items.GetItemByTemplateID("Currency:MtxPurchased")
	if playerVbucks == nil {
		return
	}

	hardware := storage.Repo.GetHWIDByPerson(player.ID)

	playerEmbed := NewEmbedBuilder().
		SetTitle("Player Lookup").
		SetColor(0x2b2d31).
		AddField("Display Name", player.DisplayName, true).
		AddField("VBucks", aid.FormatNumber(playerVbucks.Quantity), true).
		AddField("Discord Account", "<@"+player.Discord.ID+">", true).
		AddField("Banned?", aid.Ternary(player.GetActiveBan() != nil, "Yes", "No"), true)

	if hardware != nil {
		playerEmbed.AddField("HWID", hardware.ID, true)
	}
	playerEmbed.AddField("ID", player.ID, false)

	embeds := []*discordgo.MessageEmbed{
		playerEmbed.Build(),
	}

	if hardware != nil {
		for _, hwid := range *storage.Repo.GetHWIDs(hardware.ID) {
			aplayer := person.Find(hwid.PersonID)
			if aplayer == nil {
				continue
			}

			if aplayer.ID == player.ID {
				continue
			}

			embeds = append(embeds, NewEmbedBuilder().
				SetColor(0x2b2d31).
				AddField("Display Name", aplayer.DisplayName, true).
				AddField("Discord Account", "<@"+aplayer.Discord.ID+">", true).
				AddField("HWID", hwid.ID, true).
				AddField("Banned?", aid.Ternary(hwid.Banned, "Yes", "No"), true).
				AddField("Retrac ID", hwid.PersonID, false).
				Build())
		}
	}

	s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
		Embeds: &embeds,
	})
}

func bansHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	looker := person.FindByDiscord(i.Member.User.ID)
	if looker == nil {
		s.InteractionRespond(i.Interaction, &ErrorNoAccount)
		return
	}

	if !looker.HasPermission(person.PermissionBansControl) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	if len(i.ApplicationCommandData().Options) <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	subCommand := i.ApplicationCommandData().Options[0]
	if len(subCommand.Options) <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	player := getPersonFromOptions(subCommand.Options, s)
	if player == nil {
		s.InteractionRespond(i.Interaction, &ErrorInvalidDisplayOrDiscord)
		return
	}

	lookup := map[string]func(s *discordgo.Session, i *discordgo.InteractionCreate, looker *person.Person, player *person.Person, options []*discordgo.ApplicationCommandInteractionDataOption){
		"add": addBanHandler,
		"clear": clearBansHandler,
		"list": listBansHandler,
	}

	if handler, ok := lookup[subCommand.Name]; ok {
		handler(s, i, looker, player, subCommand.Options)
		return
	}

	s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
}

func addBanHandler(s *discordgo.Session, i *discordgo.InteractionCreate, looker *person.Person, player *person.Person, options []*discordgo.ApplicationCommandInteractionDataOption) {
	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
	})

	reason := options[0].StringValue()
	if reason == "" {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	var expiry string
	for _, option := range options {
		if option.Name == "expires" {
			expiry = option.StringValue()
			break
		}
	}

	if expiry == "" {
		expiry = "99y"
	}

	ban := player.AddBan(reason, looker.Discord.ID, expiry)
	SendBanLog(player, ban)
	channel, _ := s.UserChannelCreate(player.Discord.ID)
	s.ChannelMessageSendComplex(channel.ID, &discordgo.MessageSend{
		Content: "<@" + player.Discord.ID + ">",
		Embed: NewEmbedBuilder().
			SetTitle("Ban Notification").
			SetColor(0x39fe93).
			SetDescription("You have been banned from the server and all Retrac services.").
			AddField("Reason", reason, true).
			AddField("Expires", "<t:"+fmt.Sprintf("%d", ban.Expiry.Unix())+":D>", true).
			Build(),
	})

	erra := s.GuildBanCreate(i.GuildID, player.Discord.ID, 0, discordgo.WithAuditLogReason(reason))
	if erra != nil {
		aid.Print(erra)
	}
	// s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
	// 	Type: discordgo.InteractionResponseChannelMessageWithSource,
	// 	Data: &discordgo.InteractionResponseData{
	// 		Content: player.DisplayName + " has been banned for `" + reason + "`.",
	// 	},
	// })

	str := player.DisplayName + " has been banned for `" + reason + "`."
	s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
		Content: &str,
	})
}

func clearBansHandler(s *discordgo.Session, i *discordgo.InteractionCreate, looker *person.Person, player *person.Person, options []*discordgo.ApplicationCommandInteractionDataOption) {
	player.ClearBans()
	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: player.DisplayName + " has had all bans cleared.",
		},
	})

	hardware := storage.Repo.GetHWIDByPerson(player.ID)
	if hardware != nil {
		for _, hwid := range *storage.Repo.GetHWIDs(hardware.ID) {
			hwid.Banned = false
			storage.Repo.SaveHWID(&hwid)
		}
	}
}

func listBansHandler(s *discordgo.Session, i *discordgo.InteractionCreate, looker *person.Person, player *person.Person, options []*discordgo.ApplicationCommandInteractionDataOption) {
	embed := NewEmbedBuilder().
		SetTitle("Ban History").
		SetColor(0x2b2d31)

	player.BanHistory.Range(func(key string, ban *storage.DB_BanStatus) bool {
		banIssuer := person.Find(ban.IssuedBy)
		if banIssuer == nil {
			banIssuer = &person.Person{Discord: &storage.DB_DiscordPerson{ID: "0"}}
		}
		
		embed.AddField(ban.Reason, "Banned by <@"+banIssuer.Discord.ID+">, expires <t:"+fmt.Sprintf("%d", ban.Expiry.Unix())+":D>", false)
		return true
	})

	if player.BanHistory.Len() <= 0 {
		embed.SetDescription("No bans found.")
	}

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{embed.Build()},
			Flags: discordgo.MessageFlagsEphemeral,
		},
	})
}

func itemsHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	looker := person.FindByDiscord(i.Member.User.ID)
	if looker == nil {
		s.InteractionRespond(i.Interaction, &ErrorNoAccount)
		return
	}

	if !looker.HasPermission(person.PermissionItemControl) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	if len(i.ApplicationCommandData().Options) <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	subCommand := i.ApplicationCommandData().Options[0]
	if len(subCommand.Options) <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	player := getPersonFromOptions(subCommand.Options, s)
	if player == nil {
		s.InteractionRespond(i.Interaction, &ErrorInvalidDisplayOrDiscord)
		return
	}

	lookup := map[string]func(s *discordgo.Session, i *discordgo.InteractionCreate, looker *person.Person, player *person.Person, options []*discordgo.ApplicationCommandInteractionDataOption){
		"add": addItemHandler,
		"remove": removeItemHandler,
		"fill": fillItemsHandler,
		"clear": clearItemsHandler,
	}

	if handler, ok := lookup[subCommand.Name]; ok {
		handler(s, i, looker, player, subCommand.Options)
		return
	}

	s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
}

func addItemHandler(s *discordgo.Session, i *discordgo.InteractionCreate, looker *person.Person, player *person.Person, options []*discordgo.ApplicationCommandInteractionDataOption) {
	if !looker.HasPermission(person.PermissionItemControl) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	item := options[0].StringValue()
	if item == "" {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	qty := options[1].IntValue()
	if qty <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	profile := options[2].StringValue()
	if profile == "" {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	if player.GetProfileFromType(profile) == nil {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	snapshot := player.GetProfileFromType(profile).Snapshot()
	fortnite.GrantToPerson(player, fortnite.NewItemGrant(item, int(qty)))
	player.GetProfileFromType(profile).Diff(snapshot)

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: player.DisplayName + " has been given or updated `" + item + "` in `" + profile + "`.",
		},
	})
}

func removeItemHandler(s *discordgo.Session, i *discordgo.InteractionCreate, looker *person.Person, player *person.Person, options []*discordgo.ApplicationCommandInteractionDataOption) {
	if !looker.HasPermission(person.PermissionItemControl) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	item := options[0].StringValue()
	if item == "" {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	qty := options[1].IntValue()
	if qty <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	profile := options[2].StringValue()
	if profile == "" {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	if player.GetProfileFromType(profile) == nil {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	snapshot := player.GetProfileFromType(profile).Snapshot()
	foundItem := player.GetProfileFromType(profile).Items.GetItemByTemplateID(item)
	remove := false
	switch (foundItem) {
	case nil:
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	default:
		foundItem.Quantity -= int(qty)
		foundItem.Save()
		if foundItem.Quantity <= 0 {
			player.GetProfileFromType(profile).Items.DeleteItem(foundItem.ID)
			remove = true
		}
	}
	player.GetProfileFromType(profile).Diff(snapshot)

	str := player.DisplayName + " has had `" + aid.FormatNumber(int(qty)) + "` of `" + item + "` removed from `" + profile + "`."
	if remove {
		str = player.DisplayName + " has had `" + item + "` removed from `" + profile + "`."
	}

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: str,
		},
	})
}

func fillItemsHandler(s *discordgo.Session, i *discordgo.InteractionCreate, looker *person.Person, player *person.Person, options []*discordgo.ApplicationCommandInteractionDataOption) {
	if !looker.HasPermission(person.PermissionItemControl) || !looker.HasPermission(person.PermissionLockerControl) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
	})

	snapshot := player.AthenaProfile.Snapshot()
	fortnite.GiveEverything(player)
	player.AthenaProfile.Diff(snapshot)

	str := player.DisplayName + " has been granted all items."
	s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
		Content: &str,
	})
}

func clearItemsHandler(s *discordgo.Session, i *discordgo.InteractionCreate, looker *person.Person, player *person.Person, options []*discordgo.ApplicationCommandInteractionDataOption) {
	if !looker.HasPermission(person.PermissionItemControl) || !looker.HasPermission(person.PermissionLockerControl) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
	})

	snapshot := player.AthenaProfile.Snapshot()
	fortnite.ClearEverything(player)
	player.AthenaProfile.Diff(snapshot)

	str := player.DisplayName + " has had all items cleared."
	s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
		Content: &str,
	})
}

func permissionHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	looker := person.FindByDiscord(i.Member.User.ID)
	if looker == nil {
		s.InteractionRespond(i.Interaction, &ErrorNoAccount)
		return
	}

	if !looker.HasPermission(person.PermissionPermissionControl) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	if len(i.ApplicationCommandData().Options) <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	subCommand := i.ApplicationCommandData().Options[0]
	if len(subCommand.Options) <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	player := getPersonFromOptions(subCommand.Options, s)
	if player == nil {
		s.InteractionRespond(i.Interaction, &ErrorInvalidDisplayOrDiscord)
		return
	}

	permission := person.IntToPermission(subCommand.Options[0].IntValue())
	if permission == 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}
	
	if permission == person.PermissionAll && !looker.HasPermission(person.PermissionOwner) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	if player.HasPermission(person.PermissionOwner) && !looker.HasPermission(person.PermissionOwner) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	if player.HasPermission(person.PermissionAll) && !looker.HasPermission(person.PermissionOwner) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	switch subCommand.Name {
	case "add":
		player.AddPermission(permission)
		s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Content: player.DisplayName + " has been given permission `" + permission.GetName() + "`.",
			},
		})
	case "remove":
		player.RemovePermission(permission)
		s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Content: player.DisplayName + " has had permission `" + permission.GetName() + "` removed.",
			},
		})
	default:
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
}

func rewardHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	looker := person.FindByDiscord(i.Member.User.ID)
	if looker == nil {
		s.InteractionRespond(i.Interaction, &ErrorNoAccount)
		return
	}

	if !looker.HasPermission(person.PermissionItemControl) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	if len(i.ApplicationCommandData().Options) <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	packType := i.ApplicationCommandData().Options[0].StringValue()
	if packType == "" {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	player := getPersonFromOptions(i.ApplicationCommandData().Options, s)
	if player == nil {
		s.InteractionRespond(i.Interaction, &ErrorInvalidDisplayOrDiscord)
		return
	}

	if packType == "custom_cosmetics" && !looker.HasPermission(person.PermissionCustomSkins) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}
 
	funcLookup := map[string]func(*person.Person){
		"twitch_prime_1": fortnite.GrantRewardTwitchPrime1,
		"twitch_prime_2": fortnite.GrantRewardTwitchPrime2,
		"samsung_galaxy": fortnite.GrantRewardSamsungGalaxy,
		"samsung_ikonik": fortnite.GrantRewardSamsungIkonic,
		"honor_guard": fortnite.GrantRewardHonorGuard,
		"mfa": fortnite.GrantRewardTwoFactor,
		"og_bundle": fortnite.GrantRewardOG,
		"custom_cosmetics": fortnite.GrantRewardCustomCosmetics,
		"cc": fortnite.GrantRewardContentCreator,
		"fl": fortnite.GrantRewardCrystalDonator,
		"llama": fortnite.GrantRewardWeeklyLlama,
		"plus1": fortnite.GrantRewardRetracWeekOne,
		"plus2": fortnite.GrantRewardRetracWeekTwo,
		"plus3": fortnite.GrantRewardRetracWeekThree,
		"plus4": fortnite.GrantRewardRetracWeekFour,
		"fncs": fortnite.GrantRewardFNCS,
	}

	nameLookup := map[string]string{
		"twitch_prime_1": "Twitch Prime Drop 1",
		"twitch_prime_2": "Twitch Prime Drop 2",
		"samsung_galaxy": "Samsung Galaxy",
		"samsung_ikonik": "Samsung IKONIK",
		"honor_guard": "Honor Guard",
		"mfa": "Multi Factor Authentication",
		"og_bundle": "OG Bundle",
		"cc": "Content Creator",
		"custom_cosmetics": "Ultimate Donator",
		"fl": "Crystal Donator",
		"llama": "Weekly Llama",
		"plus1": "Retrac Week One",
		"plus2": "Retrac Week Two",
		"plus3": "Retrac Week Three",
		"plus4": "Retrac Week Four",
		"fncs": "Arena Champion",
	}

	if handler, ok := funcLookup[packType]; ok {
		handler(player)
		socket.EmitGiftReceived(player)
		s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Content: player.DisplayName + " has been given the reward `" + nameLookup[packType] + "`.",
			},
		})
		return
	}
}

func changeHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	looker := person.FindByDiscord(i.Member.User.ID)
	if looker == nil {
		s.InteractionRespond(i.Interaction, &ErrorNoAccount)
		return
	}

	if !looker.HasPermission(person.PermissionUsernameChange) {
		s.InteractionRespond(i.Interaction, &ErrorNoPermission)
		return
	}

	if len(i.ApplicationCommandData().Options) <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	subCommand := i.ApplicationCommandData().Options[0]
	if len(subCommand.Options) <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	player := getPersonFromOptions(subCommand.Options, s)
	if player == nil {
		s.InteractionRespond(i.Interaction, &ErrorInvalidDisplayOrDiscord)
		return
	}

	lookup := map[string]func(s *discordgo.Session, i *discordgo.InteractionCreate, looker *person.Person, player *person.Person, options []*discordgo.ApplicationCommandInteractionDataOption){
		"username": changeUsernameHandler,
	}

	if handler, ok := lookup[subCommand.Name]; ok {
		handler(s, i, looker, player, subCommand.Options)
		return
	}

	s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
}

func changeUsernameHandler(s *discordgo.Session, i *discordgo.InteractionCreate, looker *person.Person, player *person.Person, options []*discordgo.ApplicationCommandInteractionDataOption) {
	username := options[0].StringValue()
	if username == "" {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	found := person.FindByDisplay(username)
	if found != nil {
		s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Content: "Someone already has an account with the display name: `" + found.DisplayName + "`, please choose another one.",
			},
		})
		return
	}

	if !isUsernameAllowed(username) {
		s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Content: "Their display name can only contain letters.",
			},
		})
		return
	}

	player.DisplayName = username
	player.Save()

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: "Their display name has been changed to: `" + username + "`.",
		},
	})
}

func loginHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	player := getPersonFromOptions(i.ApplicationCommandData().Options, s)
	if player == nil {
		s.InteractionRespond(i.Interaction, &ErrorInvalidDisplayOrDiscord)
		return
	}

	code := player.ID + "=" + time.Now().Format("2006-01-02T15:04:05.999Z")
	encrypted, sig := aid.KeyPair.EncryptAndSignB64([]byte(code))
	decrypt, err := aid.KeyPair.DecryptAndVerifyB64(encrypted, sig)

	if err || string(decrypt) != code {
		return
	}
	
	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{
				NewEmbedBuilder().
					SetColor(0x2b2d31).
					SetTitle("Login Code for " + player.DisplayName).
					SetDescription("`" + encrypted + "." + sig + "`").
					Build(),
			},
			Flags: discordgo.MessageFlagsEphemeral,
		},
	})
}

func fixHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
	})

	var personToRemove *person.Person
	for _, option := range i.ApplicationCommandData().Options {
		switch option.Type {
		case discordgo.ApplicationCommandOptionUser: 
			if option.Name != "discord" {
				continue
			} 
			personToRemove = person.FindByDiscordShallow(option.UserValue(s).ID)
		case discordgo.ApplicationCommandOptionString:
			if option.Name != "display" {
				continue
			}
			personToRemove = person.FindByDisplayShallow(option.StringValue())
		}
	}

	if personToRemove == nil {
		s.InteractionRespond(i.Interaction, &ErrorInvalidDisplayOrDiscord)
		return
	}
	
	for _, item := range fortnite.DefaultCommonCoreItems {
		if item == "HomebaseBannerIcon:StandardBanner" {
			for i := 1; i < 32; i++ {
				fortnite.GrantToPerson(personToRemove, fortnite.NewItemGrant(item+strconv.Itoa(i), 1))
			}
			continue
		}

		if item == "HomebaseBannerColor:DefaultColor" {
			for i := 1; i < 22; i++ {
				fortnite.GrantToPerson(personToRemove, fortnite.NewItemGrant(item+strconv.Itoa(i), 1))
			}
			continue
		}

		if item == "Currency:MtxPurchased" {
			personToRemove.CommonCoreProfile.Items.AddItem(person.NewItem(item, 0)).Save()
			personToRemove.Profile0Profile.Items.AddItem(person.NewItem(item, 0)).Save()
			continue
		}

		personToRemove.CommonCoreProfile.Items.AddItem(person.NewItem(item, 1)).Save()
	}

	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("mfa_reward_claimed", true)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("rested_xp_overflow", 0)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("lifetime_wins", 0)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("party_assist_quest", "")).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("quest_manager", aid.JSON{})).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("inventory_limit_bonus", 0)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("daily_rewards", []aid.JSON{})).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("competitive_identity", aid.JSON{})).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("permissions", []aid.JSON{})).Save()
	
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("season_update", 0)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("season_num", aid.Config.Fortnite.Season)).Save()
	
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("accountLevel", 1)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("level", 1)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("xp", 0)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("xp_overflow", 0)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("rested_xp", 0)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("rested_xp_mult", 0)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("rested_xp_exchange", 0)).Save()
	
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("book_purchased", false)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("book_level", 1)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("book_xp", 0)).Save()

	seasonStats := person.NewSeasonStats(aid.Config.Fortnite.Season)
	seasonStats.PersonID = personToRemove.ID
	seasonStats.Save()

	character := personToRemove.AthenaProfile.Items.GetItemByTemplateID("AthenaCharacter:CID_001_Athena_Commando_F_Default")
	if character == nil {
		character = person.NewItem("AthenaCharacter:CID_001_Athena_Commando_F_Default", 1)
		personToRemove.AthenaProfile.Items.AddItem(character).Save()
	}

	pickaxe := personToRemove.AthenaProfile.Items.GetItemByTemplateID("AthenaPickaxe:DefaultPickaxe")
	if pickaxe == nil {
		pickaxe = person.NewItem("AthenaPickaxe:DefaultPickaxe", 1)
		personToRemove.AthenaProfile.Items.AddItem(pickaxe).Save()
	}

	glider := personToRemove.AthenaProfile.Items.GetItemByTemplateID("AthenaGlider:DefaultGlider")
	if glider == nil {
		glider = person.NewItem("AthenaGlider:DefaultGlider", 1)
		personToRemove.AthenaProfile.Items.AddItem(glider).Save()
	}

	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("favorite_character", character.ID)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("favorite_backpack", "")).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("favorite_pickaxe", pickaxe.ID)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("favorite_glider", glider.ID)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("favorite_skydivecontrail", "")).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("favorite_dance", make([]string, 6))).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("favorite_itemwraps", make([]string, 7))).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("favorite_loadingscreen", "")).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("favorite_musicpack", "")).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("banner_icon", "StandardBanner1")).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("banner_color", "DefaultColor1")).Save()

	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("mfa_enabled", true)).Save()
	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("mtx_affiliate", "")).Save()
	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("mtx_affiliate_set_time", 0)).Save()
	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("mtx_purchase_history", aid.JSON{
		"refundsUsed": 0,
		"refundCredits": 3,
		"purchases": []any{},
	})).Save()
	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("current_mtx_platform", "EpicPC")).Save()
	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("allowed_to_receive_gifts", true)).Save()
	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("allowed_to_send_gifts", true)).Save()
	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("gift_history", aid.JSON{})).Save()
	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("in_app_purchases", aid.JSON{
		"receipts": []string{},
		"ignoredReceipts": []string{},
		"fulfillmentCounts": map[string]int{},
		"refreshTimers": aid.JSON{},
	})).Save()

	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("party.recieveIntents", "ALL")).Save()
	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("party.recieveInvites", "ALL")).Save()

	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("season.bookFreeClaimedUpTo", 0)).Save()
	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("season.bookPaidClaimedUpTo", 0)).Save()
	personToRemove.CommonCoreProfile.Attributes.AddAttribute(person.NewAttribute("season.levelClaimedUpTo", 0)).Save()

	loadout := person.NewLoadout("PRESET 1", personToRemove.AthenaProfile)
	personToRemove.AthenaProfile.Loadouts.AddLoadout(loadout).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("loadouts", []string{loadout.ID})).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("last_applied_loadout", loadout.ID)).Save()
	personToRemove.AthenaProfile.Attributes.AddAttribute(person.NewAttribute("active_loadout_index", 0)).Save()

	if HasCrystalDonatorRole(personToRemove) {
		fortnite.GiveEverything(personToRemove)
	}
	
	if HasLlamaDonatorRole(personToRemove) {
		fortnite.GrantRewardOG(personToRemove)
	}

	for _, profile := range []*person.Profile{personToRemove.AthenaProfile, personToRemove.Profile0Profile} {
		for _, item := range *storage.Repo.Storage.GetAllItemsForProfile(profile.ID) {
			item := person.FromDatabaseItem(&item)
			profile.Items.AddItem(item)
			item.Save()
		}
	}


	personToRemove.Save()
	personToRemove.AthenaProfile.Save()

	str := personToRemove.DisplayName + " has been fixed."
	s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
		Content: &str,
	})
}