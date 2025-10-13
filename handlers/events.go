// structs from https://github.com/FabianFG/Fortnite-Api/

package handlers

import (
	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/fortnite"
	"github.com/ectrc/snow/person"
	"github.com/gofiber/fiber/v2"
)

func GetEvents(c *fiber.Ctx) error {
	person := c.Locals("person").(*person.Person)

	events := []aid.JSON{}
	templates := []aid.JSON{}
	tokens := []string{}

	for _, event := range fortnite.ArenaEvents {
		events = append(events, event.GenerateFortniteEvent())

		for _, window := range event.Windows {
			templates = append(templates, window.Template.GenerateFortniteEventTemplate())
		}
	}

	for limit, token := range fortnite.HypeTokens {
		if person.CurrentSeasonStats.Hype >= limit {
			tokens = append(tokens, token.Token)
		}
	}

	return c.Status(200).JSON(aid.JSON{
		"player": aid.JSON{
			"gameId": "Fortnite",
			"accountId": person.ID,
			"tokens": tokens,
			"teams": aid.JSON{
				"floating:Hype": []string{person.ID},
				"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division1_LGSolo": []string{person.ID},
				"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division2_LGSolo": []string{person.ID},
				"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division3_LGSolo": []string{person.ID},
				"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division4_LGSolo": []string{person.ID},
				"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division5_LGSolo": []string{person.ID},
				"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division6_LGSolo": []string{person.ID},
				"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division7_LGSolo": []string{person.ID},
				"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division8_LGSolo": []string{person.ID},
				"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division9_LGSolo": []string{person.ID},
				"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division10_LGSolo": []string{person.ID},
			},
			"pendingPayouts": []string{},
			"pendingPenalties": aid.JSON{},
			"persistentScores": aid.JSON{
				"Hype": person.CurrentSeasonStats.Hype,
			},
			"groupIdentity": aid.JSON{},
		},
		"events": events,
		"templates": templates,
	})
}

func GetPlayerEventStatus(c *fiber.Ctx) error {
	person := c.Locals("person").(*person.Person)

	tokens := []string{}
	for limit, token := range fortnite.HypeTokens {
		if person.CurrentSeasonStats.Hype >= limit {
			tokens = append(tokens, token.Token)
		}
	}

	return c.Status(200).JSON(aid.JSON{
		"gameId": "Fortnite",
		"accountId": person.ID,
		"tokens": tokens,
		"teams": aid.JSON{
			"floating:Hype": []string{person.ID},
			"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division1_LGSolo": []string{person.ID},
			"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division2_LGSolo": []string{person.ID},
			"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division3_LGSolo": []string{person.ID},
			"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division4_LGSolo": []string{person.ID},
			"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division5_LGSolo": []string{person.ID},
			"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division6_LGSolo": []string{person.ID},
			"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division7_LGSolo": []string{person.ID},
			"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division8_LGSolo": []string{person.ID},
			"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division9_LGSolo": []string{person.ID},
			"epicgames_Arena_S14_LGSolo:Retrac_Arena_S14_Division10_LGSolo": []string{person.ID},
		},
		"pendingPayouts": []string{},
		"pendingPenalties": aid.JSON{},
		"persistentScores": aid.JSON{
			"Hype": person.CurrentSeasonStats.Hype,
		},
		"groupIdentity": aid.JSON{},
	})
}

func GetEventsBulkHistory(c *fiber.Ctx) error {
	return c.Status(200).JSON([]aid.JSON{})
}