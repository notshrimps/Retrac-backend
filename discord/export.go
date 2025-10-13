package discord

import (
	"fmt"
	"slices"

	"github.com/bwmarrin/discordgo"
	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/person"
	"github.com/ectrc/snow/storage"
)

func SendBanLog(person *person.Person, ban *storage.DB_BanStatus) {
	channel, _ := StaticClient.Client.Channel(aid.Config.Discord.LogsChannelID)
	StaticClient.Client.ChannelMessageSendComplex(channel.ID, &discordgo.MessageSend{
		Embed: NewEmbedBuilder().
			SetTitle("Ban Notification").
			SetColor(0x39fe93).
			SetDescription("<@" + person.Discord.ID + "> has been banned from the server.").
			AddField("Reason", ban.Reason, false).
			AddField("Expires", "<t:"+fmt.Sprintf("%d", ban.Expiry.Unix())+":D>", true).
			AddField("Moderator", "<@" + ban.IssuedBy + ">", true).
			AddField("Display Name", person.DisplayName, true).
			AddField("Retrac ID", person.ID, true).
			SetFooter(ban.ID).
			Build(),
	})
}

func SendBanLogWithHWIDS(p *person.Person, ban *storage.DB_BanStatus, bannedHwid string, all []storage.DB_HWID) {
	embeds := []*discordgo.MessageEmbed{}

	embeds = append(embeds, NewEmbedBuilder().
		SetTitle("Ban Notification").
		SetColor(0x39fe93).
		SetDescription("<@" + p.Discord.ID + "> has been banned from the server.").
		AddField("Reason", ban.Reason, false).
		AddField("HWID", bannedHwid, false).
		AddField("Expires", "<t:"+fmt.Sprintf("%d", ban.Expiry.Unix())+":D>", true).
		AddField("Moderator", "<@" + ban.IssuedBy + ">", true).
		AddField("Display Name", p.DisplayName, true).
		AddField("Retrac ID", p.ID, true).
		SetFooter(ban.ID + " - Below are linked accounts:").
		Build())

	for _, hwid := range all {
		player := person.Find(hwid.PersonID)
		if player == nil {
			continue
		}

		if player.Discord.ID == p.Discord.ID {
			continue
		}

		embeds = append(embeds, NewEmbedBuilder().
			SetColor(0x2b2d31).
			AddField("Display Name", player.DisplayName, true).
			AddField("Discord Account", "<@"+player.Discord.ID+">", true).
			AddField("HWID", hwid.ID, true).
			AddField("Banned?", aid.Ternary(hwid.Banned, "Yes", "No"), true).
			AddField("Retrac ID", hwid.PersonID, false).
			Build())
	}

	channel, _ := StaticClient.Client.Channel(aid.Config.Discord.LogsChannelID)
	StaticClient.Client.ChannelMessageSendComplex(channel.ID, &discordgo.MessageSend{
		Embeds: embeds,
	})
}

func HasBoosterRole(person *person.Person) bool {
	guild, err := StaticClient.Client.Guild(aid.Config.Discord.Guild)
	if err != nil {
		return false
	}

	member, err := StaticClient.Client.GuildMember(guild.ID, person.Discord.ID)
	if err != nil {
		return false
	}

	return slices.Contains[[]string](member.Roles, aid.Config.Discord.BoosterRoleID)
}

func HasCrystalDonatorRole(person *person.Person) bool {
	guild, err := StaticClient.Client.Guild(aid.Config.Discord.Guild)
	if err != nil {
		return false
	}

	member, err := StaticClient.Client.GuildMember(guild.ID, person.Discord.ID)
	if err != nil {
		return false
	}

	return slices.Contains[[]string](member.Roles, aid.Config.Discord.CrystalRoleID)
}

func HasLlamaDonatorRole(person *person.Person) bool {
	guild, err := StaticClient.Client.Guild(aid.Config.Discord.Guild)
	if err != nil {
		return false
	}

	member, err := StaticClient.Client.GuildMember(guild.ID, person.Discord.ID)
	if err != nil {
		return false
	}

	return slices.Contains[[]string](member.Roles, aid.Config.Discord.LlamaRoleID)
}

func HasContentCreatorRole(person *person.Person) bool {
	guild, err := StaticClient.Client.Guild(aid.Config.Discord.Guild)
	if err != nil {
		return false
	}

	member, err := StaticClient.Client.GuildMember(guild.ID, person.Discord.ID)
	if err != nil {
		return false
	}

	return slices.Contains[[]string](member.Roles, aid.Config.Discord.CCRoleID)
}

func HasRetracPlusRole(person *person.Person) bool {
	guild, err := StaticClient.Client.Guild(aid.Config.Discord.Guild)
	if err != nil {
		return false
	}

	member, err := StaticClient.Client.GuildMember(guild.ID, person.Discord.ID)
	if err != nil {
		return false
	}

	return slices.Contains[[]string](member.Roles, aid.Config.Discord.RetracPlusID)
}

func HasRetracUltimateRole(person *person.Person) bool {
	guild, err := StaticClient.Client.Guild(aid.Config.Discord.Guild)
	if err != nil {
		return false
	}

	member, err := StaticClient.Client.GuildMember(guild.ID, person.Discord.ID)
	if err != nil {
		return false
	}

	return slices.Contains[[]string](member.Roles, aid.Config.Discord.UltimateRoleID)
}

func HasStaffRole(person *person.Person) bool {
	guild, err := StaticClient.Client.Guild(aid.Config.Discord.Guild)
	if err != nil {
		return false
	}

	member, err := StaticClient.Client.GuildMember(guild.ID, person.Discord.ID)
	if err != nil {
		return false
	}

	return slices.Contains[[]string](member.Roles, aid.Config.Discord.StaffRoleID)
}