package handlers

import (
	"fmt"
	"slices"
	"strings"

	"github.com/bwmarrin/discordgo"
	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/discord"
	"github.com/ectrc/snow/parties"
	"github.com/ectrc/snow/person"
	"github.com/ectrc/snow/servers"
	"github.com/ectrc/snow/socket"
	"github.com/gofiber/fiber/v2"
)

func MiddlewareServerManager(c *fiber.Ctx) error {
	authorization := c.Get("Authorization")
	parts := strings.Split(authorization, " ")
	if len(parts) != 2 {
		return c.Status(401).SendString("Invalid Authorization Header")
	}

	if parts[0] != "Basic" {
		return c.Status(401).SendString("Invalid Authorization Header")
	}

	if !slices.Contains[[]string](aid.Config.Accounts.Codes, parts[1]) {
		return c.Status(401).SendString("Invalid Authorization Header")
	}

	return c.Next()
}

func GetServerManager(c *fiber.Ctx) error {
	return c.JSON(servers.Manager)
}

func PostServerCreate_DEV_ONLY(c *fiber.Ctx) error {
	if !aid.Config.API.Debug {
		return c.Status(404).SendString("cannot POST /servers/create in production")
	}

	var body servers.GameServer
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).SendString("Invalid Body")
	}

	if body.ID == "" {
		return c.Status(400).SendString("Invalid Body")
	}

	if body.Constraint == "" {
		return c.Status(400).SendString("Invalid Body")
	}

	bucket := servers.Manager.GetBucket(body.Constraint, "")
	if bucket == nil {
		bucket = servers.NewBucket(body.Constraint)
		servers.Manager.AddBucket(bucket)
	}

	server := servers.Manager.GetServer(body.ID)
	if server != nil {
		return c.Status(400).SendString("Server Already Exists")
	}

	server = servers.NewGameServer(body.ID, body.Constraint)
	server.Bind("127.0.0.1", body.Port)
	bucket.AddServer(server)

	return c.Status(201).SendString("Server Created")
}

func GetPlayerAllowedInServer(c *fiber.Ctx) error {
	server := servers.Manager.GetServer(c.Params("serverId"))
	if server == nil {
		return c.Status(403).SendString("Player Not Allowed")
	}

	person := person.Find(c.Params("accountId"))
	if person == nil {
		return c.Status(403).SendString("Player Not Allowed")
	}

	if server.FindTeam(person.GetCurrentParty().ID) == nil {
		return c.Status(403).SendString("Player Not Allowed")
	}

	return c.Status(200).SendString("Player Allowed")
}

func PatchServerUpdate(c *fiber.Ctx) error {
	server := servers.Manager.GetServer(c.Params("serverId"))
	if server == nil {
		return c.Status(404).SendString("Server not found")
	}

	bucket := servers.Manager.GetBucketByServer(server.ID)
	if bucket == nil {
		return c.Status(404).SendString("Server not found")
	}

	status, err := c.ParamsInt("status")
	if err != nil {
		return c.Status(400).SendString("Invalid Status")
	}

	server.Status = servers.GameServerStatusEnum(status)

	var playlist_name = map[string]string{
		"playlist_vamp_solo": "A **lategame solos**",
		"playlist_defaultsolo": "A **solos**",
		"playlist_defaultduo": "A **duos**",
		"playlist_defaultsquad": "a **squads**",
		"playlist_showdownalt_solo":"An **arena lategame solos**",
		"playlist_showdownalt_duos":"An **arena duos**",
		"playlist_showdownalt_trios":"An **arena trios**",
		"playlist_showdownalt_squads":"An **arena squads**",
	}

	s := strings.Split(server.Constraint, ":")
	playlist := s[len(s)-1]
	name := "A new"
	if val, ok := playlist_name[playlist]; ok {
		name = val
	}

	roles := map[string]string{
		"EU": aid.Config.Discord.EUServersRoleID,
		"NA": aid.Config.Discord.NAServersRoleID,
	}
	region := strings.Split(bucket.Constraint, ":")[2]
	role := roles[region]

	if bucket.CustomKey == "" {
		switch server.Status {
		case servers.GameServerStatusEnumAvailable:
			discord.StaticClient.Client.ChannelMessageSendComplex(aid.Config.Discord.StatusChannelID, &discordgo.MessageSend{
				Content: "<@&" + role + ">",
				Embeds: []*discordgo.MessageEmbed{discord.NewEmbedBuilder().
					SetTitle(fmt.Sprintf("%s Server Joinable", region)).
					SetColor(0x39fe93).
					SetDescription(name + " game is ready to join!").
					SetFooter(fmt.Sprintf("%s • %s", bucket.Version, server.ID)).Build()},
			})
		case servers.GameServerStatusEnumClosed:
			discord.StaticClient.Client.ChannelMessageSendEmbed(aid.Config.Discord.StatusChannelID, discord.NewEmbedBuilder().
				SetTitle(fmt.Sprintf("%s Server Closed", region)).
				SetColor(0xfa573e).
				SetDescription(name + " game has started with **" + fmt.Sprint(server.GetPlayers()) + "** players!").
				SetFooter(fmt.Sprintf("%s • %s", bucket.Version, server.ID)).Build(),
			)
		}
	}

	return c.Status(200).SendString("Server Updated")
}

func DeleteServerDelete(c *fiber.Ctx) error {
	server := servers.Manager.GetServer(c.Params("serverId"))
	if server == nil {
		return c.Status(404).SendString("Server not found")
	}

	bucket := servers.Manager.GetBucketByServer(server.ID)
	if bucket == nil {
		return c.Status(404).SendString("Server not found")
	}
	bucket.RemoveServer(server)
	
	for _, team := range server.Parties {
		party := parties.PartyManager.GetParty(team)
		if party == nil {
			continue
		}

		for _, member := range party.Members {
			go socket.EmitMatchmakerQueueUpdate(member.Person, bucket)
		}
	}

	var playlist_name = map[string]string{
		"playlist_vamp_solo": "A **lategame solos**",
		"playlist_defaultsolo": "A **solos**",
		"playlist_defaultduo": "A **duos**",
		"playlist_defaultsquad": "a **squads**",
		"playlist_showdownalt_solo":"An **arena lategame solos**",
		"playlist_showdownalt_duos":"An **arena duos**",
		"playlist_showdownalt_trios":"An **arena trios**",
		"playlist_showdownalt_squads":"An **arena squads**",
	}
	
	s := strings.Split(server.Constraint, ":")
	playlist_n := s[len(s)-1]
	name := "A new"
	if val, ok := playlist_name[playlist_n]; ok {
		name = val
	}
	
	if bucket.CustomKey == "" {		
			discord.StaticClient.Client.ChannelMessageSendEmbed(aid.Config.Discord.StatusChannelID, discord.NewEmbedBuilder().
			SetTitle(fmt.Sprintf("%s Server Restarting", strings.Split(bucket.Constraint, ":")[2])).
			SetColor(0xfa573e).
			SetDescription(name + " game has ended. Server is restarting.").
			SetFooter(fmt.Sprintf("%s • %s", bucket.Version, server.ID)).Build(),
		)
	}

	return c.Status(200).SendString("Server Deleted")
}

func DeleteServerDeleteAll(c *fiber.Ctx) error {
	servers.Manager.DeleteAllServers()
	return c.Status(200).SendString("All servers deleted")
}

func MiddlewareWebsocketServer(c *fiber.Ctx) error {
	c.Locals("protocol", "server")
	c.Locals("identifier", "ws-"+aid.RandomString(18))
	// fmt.Println("SERVER SOCKET INBETWEEN")
	return c.Next()
}