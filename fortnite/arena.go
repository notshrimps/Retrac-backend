package fortnite

import (
	"fmt"
	"time"

	"github.com/ectrc/snow/aid"
)

var (
	// TODO: MOVE THESE TO A DATABASE
	HypeTokens = map[int]struct{
		Token string
		MinRequiredHype int
		Round int
		PointsNeeded int
	}{
		0: {"ARENA_S14_Division1", 0, 0, 250},
		250: {"ARENA_S14_Division2", 250, 1, 500},
		500: {"ARENA_S14_Division3", 500, 2, 1000},
		1000: {"ARENA_S14_Division4", 1000, 3, 1500},
		1500: {"ARENA_S14_Division5", 1500, 4, 2500},
		2500: {"ARENA_S14_Division6", 2500, 5, 4000},
		4000: {"ARENA_S14_Division7", 4000, 6, 6000},
		6000: {"ARENA_S14_Division8", 6000, 7, 12000},
		12000: {"ARENA_S14_Division9", 12000, 8, 16000},
		16000: {"ARENA_S14_Division10", 16000, 9, 9999999999},
	}

	ScoringRules = map[string]struct{
		StatName string
		MatchRule string
		RewardTiers []struct{
			Value int
			Points int
			Multiply bool
		}
	}{
		"PLACEMENT_STAT_INDEX": {
			StatName: "PLACEMENT_STAT_INDEX",
			MatchRule: "lte",
			RewardTiers: []struct{
				Value int
				Points int
				Multiply bool
			}{
				{1, 14, false},
				{2, 8, false},
				{3, 6, false},
				{4, 4, false},
				{5, 6, false},
				{10, 8, false},
				{15, 16, false},
			},
		},
		"TEAM_ELIMS_STAT_INDEX": {
			StatName: "TEAM_ELIMS_STAT_INDEX",
			MatchRule: "gte",
			RewardTiers: []struct{
				Value int
				Points int
				Multiply bool
			}{
				{1, 3, true},
			},
		},
	}
)



type ArenaScoringRule struct {
	StatName string
	MatchRule string
	RewardTiers []struct{
		Value int
		Points int
		Multiply bool
	}
}

func NewScoringRule(stat, rule string) *ArenaScoringRule {
	return &ArenaScoringRule{
		StatName: stat,
		MatchRule: rule,
		RewardTiers: new(ArenaScoringRule).RewardTiers,
	}
}

func (sr *ArenaScoringRule) AddTier(value, points int, multiply bool) *ArenaScoringRule {
	sr.RewardTiers = append(sr.RewardTiers, struct{
		Value int
		Points int
		Multiply bool
	}{
		Value: value,
		Points: points,
		Multiply: multiply,
	})

	return sr
}

func (sr *ArenaScoringRule) GenerateFortniteScoringRule() aid.JSON {
	tiers := make([]aid.JSON, 0)

	for _, tier := range sr.RewardTiers {
		tiers = append(tiers, aid.JSON{
			"keyValue": tier.Value,
			"pointsEarned": tier.Points,
			"multiplicative": tier.Multiply,
		})
	}

	return aid.JSON{
		"trackedStat": sr.StatName,
		"matchRule": sr.MatchRule,
		"rewardTiers": tiers,
	}
}

type ArenaEventTemplate struct {
	ID string
	MatchLimit int
	PlaylistID string
	ScoringRules []*ArenaScoringRule
	DivisonRank int
	PointsNeeded int
}

func NewEventTemplate(id string, limit int, rank int) *ArenaEventTemplate {
	if _, ok := HypeTokens[rank]; !ok {
		rank = 0
	}
	return &ArenaEventTemplate{
		ID: id,
		MatchLimit: limit,
		ScoringRules: make([]*ArenaScoringRule, 0),
		DivisonRank: rank,
		PointsNeeded: HypeTokens[rank].PointsNeeded,
	}
}

func (et *ArenaEventTemplate) AddScoringRules(rule ...*ArenaScoringRule) {
	et.ScoringRules = append(et.ScoringRules, rule...)
}

func (et *ArenaEventTemplate) GenerateFortniteEventTemplate() aid.JSON {
	rules := make([]aid.JSON, 0)

	for _, rule := range et.ScoringRules {
		rules = append(rules, rule.GenerateFortniteScoringRule())
	}

	// lookup := map[int]int{
	// 	0: 250,
	// 	1: 500,	
	// 	2: 1250,
	// 	3: 2000,
	// 	4: 5000,
	// 	5: 10000,
	// 	6: 9999999999,
	// }

	var nextToken string
	for _, token := range HypeTokens {
		if token.Round == et.DivisonRank + 1 {
			nextToken = token.Token
			break
		}
	}
	if nextToken == "" {
		nextToken = "ARENA_S14_Division1"
	}

	return aid.JSON{
		"gameId": "Fortnite",
		"eventTemplateId": et.ID,
		"playlistId": et.PlaylistID,
		"persistentScoreId": "Hype",
		"matchCap": et.MatchLimit,
		"scoringRules": rules,
		"payoutTable": aid.JSON{
			"scoreId": "Hype",
			"scoringType": "value",
			"ranks": []aid.JSON{{
				"threshold": et.PointsNeeded,
				"payouts": []aid.JSON{{
					"rewardType": "token",
					"rewardMode": "rolling",
					"value": nextToken,
					"quantity": 1,
				}},
			}},
		},
	}
}

type ArenaEventWindow struct {
	ID string
	ParentEvent *Event
	Template *ArenaEventTemplate
	Round int
	ToBeDetermined bool
	CanLiveSpectate bool
	Meta struct {
		DivisionRank int
		ThresholdToAdvanceDivision int
	}
}

func NewEventWindow(id string, template *ArenaEventTemplate) *ArenaEventWindow {
	return &ArenaEventWindow{
		ID: id,
		Meta: new(ArenaEventWindow).Meta,
		Template: template,
	}
}

func (ew *ArenaEventWindow) GenerateFortniteEventWindow() aid.JSON {
	meta := aid.JSON{
		"divisionRank": ew.Meta.DivisionRank,
		"ThresholdToAdvanceDivision": ew.Meta.ThresholdToAdvanceDivision,
		"RoundType": "Arena",
	}

	requireAll := []string{}
	requireNone := []string{}

	for _, token := range HypeTokens {
		if token.Round <= ew.Meta.DivisionRank {
			requireAll = append(requireAll, token.Token)
			continue
		}

		if token.Round > ew.Meta.DivisionRank {
			requireNone = append(requireNone, token.Token)
		}
	}

	return aid.JSON{
		"eventWindowId": ew.ID,
		"eventTemplateId": ew.Template.ID,
		"countdownBeginTime": "2023-06-15T15:00:00.000Z",
		"beginTime": time.Now().Add(time.Hour * -24).Format(time.RFC3339),
		"endTime": "9999-12-31T23:59:59.000Z",
		"payoutDelay": 30,
		"round": ew.Round,
		"isTBD": ew.ToBeDetermined,
		"canLiveSpectate": ew.CanLiveSpectate,
		"visibility": "public",
		"scoreLocations": []aid.JSON{
			{
				"scoreMode": "persistent",
				"scoreId": "Hype",
			},
		},
		"blackoutPeriods": []string{},
		"requireAnyTokens": []string{},
		"requireAllTokens": requireAll,
		"requireAllTokensCaller": []string{},
		"requireNoneTokensCaller": requireNone,
		"requireAnyTokensCaller": []string{},
		"additionalRequirements": []string{},
		"teammateEligibility": "any",
		"metadata": meta,
	}
}

type Event struct {
	ID string
	DisplayID string
	Windows []*ArenaEventWindow
}

func NewEvent(id string, displayId string) *Event {
	return &Event{
		ID: id,
		DisplayID: displayId,
		Windows: make([]*ArenaEventWindow, 0),
	}
}

func (e *Event) AddWindow(window *ArenaEventWindow) {
	window.ParentEvent = e
	e.Windows = append(e.Windows, window)
}

func (e *Event) GenerateFortniteEvent() aid.JSON {
	eventWindows := make([]aid.JSON, 0)

	for _, window := range e.Windows {
		eventWindows = append(eventWindows, window.GenerateFortniteEventWindow())
	}

	return aid.JSON{
		"gameId": "Fortnite",
		"eventId": e.ID,
		"eventGroup": "",
		"regions": []string{ "NAE", "ME", "NAW", "OCE", "ASIA", "EU", "BR", },
		"regionMappings": aid.JSON{},
		"platforms": []string{ "PS4", "XboxOne", "Switch", "Android", "IOS", "Windows", },
		"platformMappings": aid.JSON{},
		"displayDataId": e.DisplayID,
		"eventWindows": eventWindows,
		"appId": nil,
		"link": nil,
		"metadata": aid.JSON{
			"minimumAccountLevel": 5,
			"TrackedStats": []string{
				"PLACEMENT_STAT_INDEX",
				"TEAM_ELIMS_STAT_INDEX",
				"MATCH_PLAYED_STAT",
			},
		},
		"environment": nil,
		"announcementTime": time.Now().Format(time.RFC3339),
		"beginTime": time.Now().Add(time.Hour * -24).Format(time.RFC3339),
		"endTime": "9999-12-31T23:59:59.000Z",
	}
}

var (
	ArenaEvents = make([]*Event, 0)
)

func PreloadEvents() {
	ArenaEvents = []*Event{
		// createDuoEvent(),
		createLateGameSoloEvent(),
	}
}

func createLateGameSoloEvent() *Event {
	ArenaSolo := NewEvent("epicgames_Arena_S14_LGSolo", "SnowArenaLategameSolo")

	rules := make([]*ArenaScoringRule, 0)
	for _, rule := range ScoringRules {
		r := NewScoringRule(rule.StatName, rule.MatchRule)
		for _, tier := range rule.RewardTiers {
			r.AddTier(tier.Value, tier.Points, tier.Multiply)
		}
		rules = append(rules, r)
	}

	for _, div := range HypeTokens {
		template := NewEventTemplate(fmt.Sprintf("Retrac_Arena_S14_Division%d_LGSolo", div.Round), -1, div.Round)
		template.PlaylistID = "Playlist_ShowdownAlt_Solo"
		template.AddScoringRules(rules...)

		window := NewEventWindow(fmt.Sprintf("Arena_S14_Division%d_LGSolo", div.Round), template)
		window.ToBeDetermined = false
		window.CanLiveSpectate = false
		window.Round = div.Round - 1
		window.Meta.DivisionRank = div.Round - 1
		window.Meta.ThresholdToAdvanceDivision = div.MinRequiredHype
		ArenaSolo.AddWindow(window)
	}

	return ArenaSolo
}

func createDuoEvent() *Event {
	ArenaDuo := NewEvent("epicgames_Arena_S14_Duos", "SnowArenaDuos")

	
	return ArenaDuo
}