package discord

import (
	"fmt"
	"regexp"
	"time"

	"github.com/bwmarrin/discordgo"
	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/fortnite"
	"github.com/ectrc/snow/person"
	"github.com/ectrc/snow/storage"
)

func createHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	modal := &discordgo.InteractionResponseData{
		CustomID: "create://" + i.Member.User.ID,
		Title:    "Create an account",
		Components: []discordgo.MessageComponent{
			&discordgo.ActionsRow{
				Components: []discordgo.MessageComponent{
					discordgo.TextInput{
						CustomID:    "display",
						Label:       "DISPLAY NAME",
						Style:       discordgo.TextInputShort,
						Placeholder: "Enter your crazy display name here!",
						Required:    true,
						MaxLength:   20,
						MinLength:   2,
					},
				},
			},
		},
	}

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseModal,
		Data: modal,
	})
}

var isUsernameAllowed = regexp.MustCompile(`^[a-zA-Z]+$`).MatchString

func createModalHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	data := i.ModalSubmitData()
	if len(data.Components) <= 0 {
		return
	}

	components, ok := data.Components[0].(*discordgo.ActionsRow)
	if !ok {
		return
	}

	display, ok := components.Components[0].(*discordgo.TextInput)
	if !ok {
		return
	}

	found := person.FindByDiscord(i.Member.User.ID)
	if found != nil {
		s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Content: "You already have an account with the display name: `" + found.DisplayName + "`",
			},
		})
		return
	}

	found = person.FindByDisplay(display.Value)
	if found != nil {
		s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Content: "Someone already has an account with the display name: `" + found.DisplayName + "`, please choose another one.",
			},
		})
		return
	}

	if !isUsernameAllowed(display.Value) {
		s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Content: "Your display name can only contain letters.",
			},
		})
		return
	}

	account := fortnite.NewFortnitePerson(display.Value, false) // or aid.Config.Fortnite.Everything
	discord := &storage.DB_DiscordPerson{
		ID:       i.Member.User.ID,
		PersonID: account.ID,
		Username: i.Member.User.Username,
		Avatar:   i.Member.User.Avatar,
	}
	storage.Repo.SaveDiscordPerson(discord)
	account.Discord = discord
	account.Save()

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: "Your account has been created with the display name: `" + account.DisplayName + "`",
		},
	})
}

func deleteHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	found := person.FindByDiscord(i.Member.User.ID)
	if found == nil {
		s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Content: "You do not have an account with the bot.",
				Flags: discordgo.MessageFlagsEphemeral,
			},
		})
		return
	}

	storage.Repo.DeleteDiscordPerson(found.Discord.ID)
	found.Delete()

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: "Your account has been deleted.",
			Flags: discordgo.MessageFlagsEphemeral,
		},
	})
}

func meHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	player := person.FindByDiscord(i.Member.User.ID)
	if player == nil {
		s.InteractionRespond(i.Interaction, &ErrorNoAccount)
		return
	}

	playerVbucks := player.CommonCoreProfile.Items.GetItemByTemplateID("Currency:MtxPurchased")
	if playerVbucks == nil {
		return
	}

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{
				NewEmbedBuilder().
					SetTitle("Player Lookup").
					SetColor(0x2b2d31).
					AddField("Display Name", player.DisplayName, true).
					AddField("VBucks", aid.FormatNumber(playerVbucks.Quantity), true).
					AddField("Discord Account", "<@"+player.Discord.ID+">", true).
					AddField("ID",  player.ID, true).
					Build(),
			},
			Flags: discordgo.MessageFlagsEphemeral,
		},
	})
}

func codeHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	player := person.FindByDiscord(i.Member.User.ID)
	if player == nil {
		s.InteractionRespond(i.Interaction, &ErrorNoAccount)
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
					SetDescription("`" + encrypted + "." + sig + "`").
					Build(),
			},
			Flags: discordgo.MessageFlagsEphemeral,
		},
	})
}

func leaderboardHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	if len(i.ApplicationCommandData().Options) <= 0 {
		s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
		return
	}

	subCommand := i.ApplicationCommandData().Options[0]
	lookup := map[string]func(s *discordgo.Session, i *discordgo.InteractionCreate, options []*discordgo.ApplicationCommandInteractionDataOption){
		"arena": arenaLeaderboardHandler,
	}

	if handler, ok := lookup[subCommand.Name]; ok {
		handler(s, i, subCommand.Options)
		return
	}

	s.InteractionRespond(i.Interaction, &ErrorInvalidArguments)
}

func arenaLeaderboardHandler(s *discordgo.Session, i *discordgo.InteractionCreate, options []*discordgo.ApplicationCommandInteractionDataOption) {
	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Flags: discordgo.MessageFlagsEphemeral,
		},
	})

	embed := NewEmbedBuilder().
		SetTitle("Arena Leaderboard").
		SetColor(0x39fe93).
		SetDescription("The current top 10 players in the arena leaderboard, ranked by Hype!")

	for i, point := range *storage.Repo.Storage.GetTop10SeasonStats() {
		player := person.Find(point.PersonID)
		if player == nil {
			continue
		}
		embed.SetDescription(fmt.Sprintf("%s\n **%d. <@%s>** - **%d** Hype.", embed.Embed.Description, i+1, player.Discord.ID, point.Hype))
	}

	str := "Arena Leaderboards:"
	s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
		Content: &str,
		Embeds: &[]*discordgo.MessageEmbed{embed.Build()},
	})
}