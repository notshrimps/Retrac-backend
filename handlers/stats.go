package handlers

import (
	"strings"

	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/fortnite"
	"github.com/ectrc/snow/person"
	"github.com/ectrc/snow/servers"
	"github.com/ectrc/snow/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func AddStatsToPlayer(c *fiber.Ctx) error {
	player := person.FindByDisplay(c.Params("username"))
	if player == nil {
		// fmt.Println("Player not found")
		return c.Status(404).SendString("Player not found")
	}

	playlist := "playlist_defaultsolo"
	
	activeServer := servers.Manager.GetServer(c.Params("sessionId"))
	if activeServer != nil {
		bucketParts := strings.Split(activeServer.Constraint, ":")
		playlist = bucketParts[len(bucketParts)-1]
	}

	placement, _ := c.ParamsInt("placement")
	eliminations, _ := c.ParamsInt("eliminations")
	totalXP, _ := c.ParamsInt("totalXP")
	score, _ := c.ParamsInt("score")

	if totalXP == 0 {
		return c.Status(400).SendString("Invalid totalXP") // kaedes fat gs sends 2
	}

	var matchResult *storage.DB_MatchResult
	for _, match := range player.CurrentSeasonStats.Matches {
		if match.SessionID == c.Params("sessionId") {
			// return c.Status(400).SendString("Match already exists")
			matchResult = &match
		}
	}

	profileSnapshots := map[string]*person.ProfileSnapshot{
		"athena":        nil,
		"common_core":   nil,
		"common_public": nil,
	}
	for key := range profileSnapshots {
		profileSnapshots[key] = player.GetProfileFromType(key).Snapshot()
	}

	if matchResult == nil {
		matchResult = &storage.DB_MatchResult{
			ID:           uuid.NewString(),
			SessionID:    c.Params("sessionId"),
			SeasonStatID: player.CurrentSeasonStats.ID,
			Playlist:     playlist,
		}
	}

	matchResult.Placement += placement
	matchResult.Eliminations += eliminations
	matchResult.TotalXP += totalXP
	matchResult.Score += score

	player.CurrentSeasonStats.Matches = append(player.CurrentSeasonStats.Matches, *matchResult)
	storage.Repo.SaveMatchResult(matchResult)

	players := aid.Ternary(activeServer != nil, activeServer.GetPlayers(), 100)
	

	fortnite.GrantToPerson(player, fortnite.NewItemGrant("AccountResource:AthenaSeasonalXP", totalXP))
	fortnite.GrantToPerson(player, fortnite.NewItemGrant("Currency:MtxPurchased", eliminations*50))

	// discord.StaticClient.Client.ChannelMessageSend("1225817618011918448", "\\`\\`\\`json\n" + aid.JSONStringify(player.CurrentSeasonStats) + "\\`\\`\\` \n for player: " + player.DisplayName + " (" + player.ID + ")")

	if playlist == "playlist_showdownalt_solo" {
		player.CurrentSeasonStats.Hype += eliminations * fortnite.ScoringRules["PLACEMENT_STAT_INDEX"].RewardTiers[0].Points
		for _, rule := range fortnite.ScoringRules["PLACEMENT_STAT_INDEX"].RewardTiers {
			if placement <= rule.Value && players > rule.Value {
				player.CurrentSeasonStats.Hype += rule.Points
			}
		}
	}

	player.CurrentSeasonStats.Save()

	if placement == 1 {
		fortnite.GrantToPerson(player, fortnite.NewItemGrant("Currency:MtxPurchased", 200))

		gift := person.NewGift("GiftBox:GB_MakeGood", 1, "", "Congratulations on your Victory Royale!")
		if player.AthenaProfile.Items.GetItemByTemplateID("AthenaGlider:Umbrella_Season_14") == nil {
			gift.AddLoot(person.NewItemWithType("AthenaGlider:Umbrella_Season_14", 1, "athena"))
		}
		if player.AthenaProfile.Items.GetItemByTemplateID("AthenaGlider:Umbrella_Silver") == nil {
			gift.AddLoot(person.NewItemWithType("AthenaGlider:Umbrella_Silver", 1, "athena"))
		}
		if len(gift.Loot) > 0 {
			player.CommonCoreProfile.Gifts.AddGift(gift).Save()
		}
	}

	for key, profileSnapshot := range profileSnapshots {
		profile := player.GetProfileFromType(key)
		if profile == nil {
			continue
		}

		if profileSnapshot == nil {
			continue
		}

		profile.Diff(profileSnapshot)
	}
	go player.Save()

	return c.Status(200).SendString("Success")
}

type playlistStat struct {
	CountTopQuarter int
	CountTopTenth   int
	CountTopFirst   int
	Eliminations    int
	Score           int
	MatchesPlayed   int
}

func GetStatsForPlayer(c *fiber.Ctx) error {
	person := person.Find(c.Params("accountId"))
	if person == nil {
		return c.Status(404).SendString("Player not found")
	}

	stats := make(map[string]*playlistStat)
	stats["playlist_defaultsolo"] = &playlistStat{}
	stats["playlist_defaultduo"] = &playlistStat{}
	stats["playlist_defaultsquad"] = &playlistStat{}

	for _, match := range person.CurrentSeasonStats.Matches {
		if match.Playlist == "playlist_vamp_solo" {
			match.Playlist = "playlist_defaultsolo"
		}
		pl := strings.ToLower(match.Playlist)

		if _, ok := stats[pl]; !ok {
			stats[pl] = &playlistStat{}
		}

		stats[pl].Eliminations += match.Eliminations
		stats[pl].Score += match.Placement
		stats[pl].MatchesPlayed++

		if strings.Contains(pl, "solo") {
			if match.Placement <= 25 {
				stats[pl].CountTopQuarter++
			}
			if match.Placement <= 10 {
				stats[pl].CountTopTenth++
			}
			if match.Placement == 1 {
				stats[pl].CountTopFirst++
			}
		}

		if strings.Contains(pl, "duo") {
			if match.Placement <= 12 {
				stats[pl].CountTopQuarter++
			}
			if match.Placement <= 5 {
				stats[pl].CountTopTenth++
			}
			if match.Placement == 1 {
				stats[pl].CountTopFirst++
			}
		}

		if strings.Contains(pl, "squad") {
			if match.Placement <= 6 {
				stats[pl].CountTopQuarter++
			}
			if match.Placement <= 3 {
				stats[pl].CountTopTenth++
			}
			if match.Placement == 1 {
				stats[pl].CountTopFirst++
			}
		}
	}

	return c.Status(200).JSON(aid.JSON{
		"accountId": person.ID,
		"stats": aid.JSON{
			"br_score_keyboardmouse_m0_playlist_DefaultSolo":          stats["playlist_defaultsolo"].Score,
			"br_score_keyboardmouse_m0_playlist_DefaultDuo":           stats["playlist_defaultduo"].Score,
			"br_score_keyboardmouse_m0_playlist_DefaultSquad":         stats["playlist_defaultsquad"].Score,
			"br_kills_keyboardmouse_m0_playlist_DefaultSolo":          stats["playlist_defaultsolo"].Eliminations,
			"br_kills_keyboardmouse_m0_playlist_DefaultDuo":           stats["playlist_defaultduo"].Eliminations,
			"br_kills_keyboardmouse_m0_playlist_DefaultSquad":         stats["playlist_defaultsquad"].Eliminations,
			"br_matchesplayed_keyboardmouse_m0_playlist_DefaultSolo":  stats["playlist_defaultsolo"].MatchesPlayed,
			"br_matchesplayed_keyboardmouse_m0_playlist_DefaultDuo":   stats["playlist_defaultduo"].MatchesPlayed,
			"br_matchesplayed_keyboardmouse_m0_playlist_DefaultSquad": stats["playlist_defaultsquad"].MatchesPlayed,
			"br_placetop25_keyboardmouse_m0_playlist_DefaultSolo":     stats["playlist_defaultsolo"].CountTopQuarter,
			"br_placetop12_keyboardmouse_m0_playlist_DefaultDuo":      stats["playlist_defaultduo"].CountTopQuarter,
			"br_placetop6_keyboardmouse_m0_playlist_DefaultSquad":     stats["playlist_defaultsquad"].CountTopQuarter,
			"br_placetop10_keyboardmouse_m0_playlist_DefaultSolo":     stats["playlist_defaultsolo"].CountTopTenth,
			"br_placetop5_keyboardmouse_m0_playlist_DefaultDuo":       stats["playlist_defaultduo"].CountTopTenth,
			"br_placetop3_keyboardmouse_m0_playlist_DefaultSquad":     stats["playlist_defaultsquad"].CountTopTenth,
			"br_placetop1_keyboardmouse_m0_playlist_DefaultSolo":      stats["playlist_defaultsolo"].CountTopFirst,
			"br_placetop1_keyboardmouse_m0_playlist_DefaultDuo":       stats["playlist_defaultduo"].CountTopFirst,
			"br_placetop1_keyboardmouse_m0_playlist_DefaultSquad":     stats["playlist_defaultsquad"].CountTopFirst,
		},
		"startTime": aid.TimeStartOfDay(),
		"endTime":   aid.TimeEndOfWeekString(),
	})
}

func GetStatsForPlayers(c *fiber.Ctx) error {
	var body struct {
		Owners []string `json:"owners"`
		Stats	[]string `json:"stats"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).SendString("Invalid request")
	}

	players := make([]*person.Person, 0)
	for _, owner := range body.Owners {
		player := person.FindShallow(owner)
		if player != nil {
			players = append(players, player)
		}
	}

	response := make([]aid.JSON, 0)
	for _, player := range players {
		stats := make(map[string]*playlistStat)
		stats["playlist_defaultsolo"] = &playlistStat{}
		stats["playlist_defaultduo"] = &playlistStat{}
		stats["playlist_defaultsquad"] = &playlistStat{}

		for _, match := range player.CurrentSeasonStats.Matches {
			if match.Playlist == "playlist_vamp_solo" {
				match.Playlist = "playlist_defaultsolo"
			}
			pl := strings.ToLower(match.Playlist)

			if _, ok := stats[pl]; !ok {
				stats[pl] = &playlistStat{}
			}

			stats[pl].Eliminations += match.Eliminations
			stats[pl].Score += match.TotalXP / 100
			stats[pl].MatchesPlayed++

			if strings.Contains(pl, "solo") {
				if match.Placement <= 25 {
					stats[pl].CountTopQuarter++
				}
				if match.Placement <= 10 {
					stats[pl].CountTopTenth++
				}
				if match.Placement == 1 {
					stats[pl].CountTopFirst++
				}
			}

			if strings.Contains(pl, "duo") {
				if match.Placement <= 12 {
					stats[pl].CountTopQuarter++
				}
				if match.Placement <= 5 {
					stats[pl].CountTopTenth++
				}
				if match.Placement == 1 {
					stats[pl].CountTopFirst++
				}
			}

			if strings.Contains(pl, "squad") {
				if match.Placement <= 6 {
					stats[pl].CountTopQuarter++
				}
				if match.Placement <= 3 {
					stats[pl].CountTopTenth++
				}
				if match.Placement == 1 {
					stats[pl].CountTopFirst++
				}
			}
		}

		response = append(response, aid.JSON{
			"accountId": player.ID,
			"stats": aid.JSON{
				"br_score_keyboardmouse_m0_playlist_DefaultSolo":          stats["playlist_defaultsolo"].Score,
				"br_score_keyboardmouse_m0_playlist_DefaultDuo":           stats["playlist_defaultduo"].Score,
				"br_score_keyboardmouse_m0_playlist_DefaultSquad":         stats["playlist_defaultsquad"].Score,
				"br_kills_keyboardmouse_m0_playlist_DefaultSolo":          stats["playlist_defaultsolo"].Eliminations,
				"br_kills_keyboardmouse_m0_playlist_DefaultDuo":           stats["playlist_defaultduo"].Eliminations,
				"br_kills_keyboardmouse_m0_playlist_DefaultSquad":         stats["playlist_defaultsquad"].Eliminations,
				"br_matchesplayed_keyboardmouse_m0_playlist_DefaultSolo":  stats["playlist_defaultsolo"].MatchesPlayed,
				"br_matchesplayed_keyboardmouse_m0_playlist_DefaultDuo":   stats["playlist_defaultduo"].MatchesPlayed,
				"br_matchesplayed_keyboardmouse_m0_playlist_DefaultSquad": stats["playlist_defaultsquad"].MatchesPlayed,
				"br_placetop25_keyboardmouse_m0_playlist_DefaultSolo":     stats["playlist_defaultsolo"].CountTopQuarter,
				"br_placetop12_keyboardmouse_m0_playlist_DefaultDuo":      stats["playlist_defaultduo"].CountTopQuarter,
				"br_placetop6_keyboardmouse_m0_playlist_DefaultSquad":     stats["playlist_defaultsquad"].CountTopQuarter,
				"br_placetop10_keyboardmouse_m0_playlist_DefaultSolo":     stats["playlist_defaultsolo"].CountTopTenth,
				"br_placetop5_keyboardmouse_m0_playlist_DefaultDuo":       stats["playlist_defaultduo"].CountTopTenth,
				"br_placetop3_keyboardmouse_m0_playlist_DefaultSquad":     stats["playlist_defaultsquad"].CountTopTenth,
				"br_placetop1_keyboardmouse_m0_playlist_DefaultSolo":      stats["playlist_defaultsolo"].CountTopFirst,
				"br_placetop1_keyboardmouse_m0_playlist_DefaultDuo":       stats["playlist_defaultduo"].CountTopFirst,
				"br_placetop1_keyboardmouse_m0_playlist_DefaultSquad":     stats["playlist_defaultsquad"].CountTopFirst,
			},
			"startTime": aid.TimeStartOfDay(),
			"endTime":   aid.TimeEndOfWeekString(),
		})
	}

	return c.Status(200).JSON(response)
}
func GetLeaderboardStat(c *fiber.Ctx) error {
	stat := c.Params("stat")

	response := make([]aid.JSON, 0)
	var winmap *map[string]int

	if strings.Contains(stat, "solo") {
		winmap = storage.Repo.Storage.GetTop1000Wins("solo")
	} else if strings.Contains(stat, "duo") {
		winmap = storage.Repo.Storage.GetTop1000Wins("duo")
	} else if strings.Contains(stat, "squad") {
		winmap = storage.Repo.Storage.GetTop1000Wins("squad")
	}

	for k, v := range *winmap {
		response = append(response, aid.JSON{
			"account": k,
			"value": v,
		})
	}

	return c.Status(200).JSON(aid.JSON{
		"entries": response,
		"maxSize": 1000,
	})
}