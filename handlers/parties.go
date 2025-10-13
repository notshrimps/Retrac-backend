package handlers

import (
	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/parties"
	p "github.com/ectrc/snow/person"
	"github.com/ectrc/snow/socket"
	"github.com/gofiber/fiber/v2"
)

func GetPartiesForUser(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)

	response := aid.JSON{
		"current": []aid.JSON{},
		"invites": []aid.JSON{},
		"pending": []aid.JSON{},
		"pings": []aid.JSON{},
	}

	if person.Party != nil {
		response["current"] = append(response["current"].([]aid.JSON), person.Party.GenerateFortniteParty())
	}

	person.Invites.Range(func(key string, invite *p.PartyInvite) bool {
		response["invites"] = append(response["invites"].([]aid.JSON), invite.GenerateFortnitePartyInvite())
		return true
	})

	return c.Status(200).JSON(response)
}

func GetPartyUserPrivacy(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)

	recieveIntents := person.CommonCoreProfile.Attributes.GetAttributeByKey("party.recieveIntents")
	if recieveIntents == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("No Privacy Found"))
	}

	recieveInvites := person.CommonCoreProfile.Attributes.GetAttributeByKey("party.recieveInvites")
	if recieveIntents == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("No Privacy Found"))
	}
	
	return c.Status(200).JSON(aid.JSON{
		"recieveIntents": aid.JSONParse(recieveIntents.ValueJSON),
		"recieveInvites": aid.JSONParse(recieveInvites.ValueJSON),
	})
}

func GetPartyNotifications(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	return c.Status(200).JSON(aid.JSON{
		"pings": 0,
		"invites": person.Invites.Len(),
	})
}

func GetPartyForMember(c *fiber.Ctx) error {
	// party, ok := p.Parties.Get(c.Params("partyId"))
	party := parties.PartyManager.GetParty(c.Params("partyId"))
	if party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}

	return c.Status(200).JSON(party.GenerateFortniteParty())
}

func GetPartyPingsFromFriend(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person.Party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}

	friend := p.Find(c.Params("friendId"))
	if friend == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Friend Not Found"))
	}

	pings := []aid.JSON{}
	person.Invites.Range(func(key string, ping *p.PartyInvite) bool {
		if ping.Inviter.ID == friend.ID {
			pings = append(pings, ping.Party.GenerateFortniteParty())
		}
		return true
	})

	return c.Status(200).JSON(pings)
}

func PostPartyCreate(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person.Party != nil {
		person.Party.RemoveMember(person)
	}
	
	var body struct {
		Config map[string]interface{} `json:"config"`
		Meta map[string]interface{} `json:"meta"`
		JoinInformation struct {
			Meta map[string]interface{} `json:"meta"`
			Connection aid.JSON `json:"connection"`
		} `json:"join_info"`
	}
	
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Request"))
	}
	
	party := p.NewParty()
	party.UpdateMeta(body.Meta)
	party.UpdateConfig(body.Config)
	
	party.AddMember(person)
	party.UpdateMemberMeta(person, body.JoinInformation.Meta)
	party.UpdateMemberConnection(person, body.JoinInformation.Connection)
	
	member := party.GetMember(person)
	party.PromoteMember(member)
	socket.EmitPartyMemberJoined(party, member)

	parties.PartyManager.AddParty(party)
	
	return c.Status(200).JSON(party.GenerateFortniteParty())
}

func PatchPartyUpdateState(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person.Party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}

	var body struct {
		Config map[string]interface{} `json:"config"`
		Meta struct {
			Update map[string]interface{} `json:"update"`
			Delete []string `json:"delete"`
		} `json:"meta"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Request"))
	}

	member := person.Party.GetMember(person)
	if member == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Not in Party"))
	}

	if member.Role != "CAPTAIN" {
		return c.Status(400).JSON(aid.ErrorBadRequest("Not Captain"))
	}

	person.Party.UpdateConfig(body.Config)
	person.Party.UpdateMeta(body.Meta.Update)
	person.Party.DeleteMeta(body.Meta.Delete)
	socket.EmitPartyMetaUpdated(person.Party, body.Meta.Update, body.Meta.Delete, body.Meta.Update)

	return c.SendStatus(204)
}

func PatchPartyUpdateMemberState(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person.Party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}

	var body struct {
		Update map[string]interface{} `json:"update"`
		Delete []string `json:"delete"`
	}
	
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Request"))
	}

	member := person.Party.GetMember(person)
	if member == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Not in Party"))
	}

	if c.Params("accountId") != person.ID {
		return c.Status(400).JSON(aid.ErrorBadRequest("Not owner of person"))
	}

	person.Party.UpdateMemberMeta(person, body.Update)
	person.Party.DeleteMemberMeta(person, body.Delete)
	socket.EmitPartyMemberMetaUpdated(person.Party, member, body.Update, body.Delete)

	return c.SendStatus(204)
}

func DeletePartyMember(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person.Party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}
	
	if person.Party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}
	member := person.Party.GetMember(person)
	if member == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Not in Party"))
	}
	socket.EmitPartyMemberLeft(person.Party, person.Party.GetMember(person))
	person.Party.RemoveMember(person)
	if len(person.Party.Members) == 0 {
		// Parties.Delete(p.ID)
		// delete(PartiesUnsynced, p.ID)
		parties.PartyManager.DeleteParty(person.Party.ID)
	}
	person.Party = nil

	// if person.Party.Captain != nil && person.Party.Captain.Person.ID == person.ID && len(person.Party.Members) > 0 {
	// 	if person.Party.GetFirstMember() != nil {
	// 		person.Party.PromoteMember(person.Party.GetFirstMember())
	// 		socket.EmitPartyNewCaptain(person.Party)
	// 	}
	// }

	// for _, member := range person.Party.Members {
	// 	if member == nil {
	// 		continue
	// 	}

	// 	memberSocket, ok := socket.JabberSockets.Get(member.Person.ID)
	// 	if !ok {
	// 		continue
	// 	}
	// 	memberSocket.JabberNotifyFriends()
	// }

	// s, ok := socket.JabberSockets.Get(person.ID)
	// if ok {
	// 	s.JabberNotifyFriends()
	// }
	
	return c.SendStatus(204)
}

func PostPartyInvite(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person.Party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}

	var body map[string]interface{}
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Request"))
	}

	towards := p.Find(c.Params("accountId"))
	if towards == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Person Not Found"))
	}
	
	invite := p.NewPartyInvite(person.Party, person, towards, body)
	person.Party.AddInvite(invite)
	towards.Invites.Set(person.Party.ID, invite)
	socket.EmitPartyInvite(invite)

	if c.QueryBool("sendPing", false) {
		socket.EmitPartyPingFromInvite(invite)
	}

	return c.SendStatus(204)
}

func PostPartyJoin(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person.Party != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Already in a party"))
	}

	// party, ok := p.Parties.Get(c.Params("partyId"))
	// party, ok := p.PartiesUnsynced[c.Params("partyId")]
	// if !ok {
	// 	return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	// }

	party := parties.PartyManager.GetParty(c.Params("partyId"))
	if party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}

	if party.Config["joinability"] != "OPEN" {
		invite := party.GetInvite(person)
		if invite == nil {
			return c.Status(400).JSON(aid.ErrorBadRequest("No Invite Found"))
		}

		party.RemoveInvite(invite)
		person.Invites.Delete(party.ID)
	}

	var body struct {
		Meta map[string]interface{} `json:"meta"`
		Connection aid.JSON `json:"connection"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Request"))
	}

	party.AddMember(person)
	party.UpdateMemberMeta(person, body.Meta)
	party.UpdateMemberConnection(person, body.Connection)
	
	member := party.GetMember(person)
	socket.EmitPartyMemberJoined(party, member)
	socket.EmitPartyMemberMetaUpdated(party, party.GetMember(person), body.Meta, []string{})
	socket.EmitPartyMetaUpdated(party, party.Meta, []string{}, map[string]interface{}{})

	return c.Status(200).JSON(aid.JSON{
		"party_id": party.ID,
		"status": "JOINED",
	})
}

func PostPartyPromoteMember(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person.Party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}

	member := person.Party.GetMember(p.Find(c.Params("accountId")))
	if member == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Member Not Found"))
	}

	if person.Party.Captain.Person.ID != person.ID {
		return c.Status(400).JSON(aid.ErrorBadRequest("Not Captain"))
	}

	person.Party.PromoteMember(member)
	socket.EmitPartyNewCaptain(person.Party)

	return c.SendStatus(204)
}

func PostPartyCreateIntention(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person.Party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}

	var body map[string]interface{}
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Request"))
	}

	towards := p.Find(c.Params("friendId"))
	if towards == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Person Not Found"))
	}

	if towards.Party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}

	intention := p.NewPartyIntention(towards.Party, person, towards, body)
	towards.Party.AddIntention(intention)
	person.Intentions.Set(towards.ID, intention)
	socket.EmitPartyIntention(intention)

	return c.Status(204).JSON(intention.GenerateFortnitePartyIntention())
}

func PostPartyJoinFromPing(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person.Party != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Already in a party"))
	}

	// party, ok := p.Parties.Get(c.Params("partyId"))
	// party, ok := p.PartiesUnsynced[c.Params("partyId")]
	// if !ok {
	// 	return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	// }
	party := parties.PartyManager.GetParty(c.Params("partyId"))
	if party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}

	intention, ok := person.Intentions.Get(c.Params("friendId"))
	if !ok {
		return c.Status(400).JSON(aid.ErrorBadRequest("Intention Not Found"))
	}

	if intention.Party.ID != party.ID {
		return c.Status(400).JSON(aid.ErrorBadRequest("Intention Not for this party"))
	}

	var body struct {
		Meta map[string]interface{} `json:"meta"`
		Connection aid.JSON `json:"connection"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Invalid Request"))
	}

	party.AddMember(person)
	party.UpdateMemberMeta(person, body.Meta)
	party.UpdateMemberConnection(person, body.Connection)
	party.RemoveIntention(intention)
	
	member := party.GetMember(person)
	socket.EmitPartyMemberJoined(party, member)
	socket.EmitPartyMemberMetaUpdated(party, party.GetMember(person), body.Meta, []string{})
	socket.EmitPartyMetaUpdated(party, party.Meta, []string{}, map[string]interface{}{})

	return c.Status(200).JSON(aid.JSON{
		"party_id": party.ID,
		"status": "JOINED",
	})
}

func PostPartyDeletePings(c *fiber.Ctx) error {
	person := c.Locals("person").(*p.Person)
	if person.Party == nil {
		return c.Status(400).JSON(aid.ErrorBadRequest("Party Not Found"))
	}
	
	friend := p.Find(c.Params("friendId"))
	if friend == nil {
		c.Status(400).JSON(aid.ErrorBadRequest("Friend Not Found"))
		return nil
	}

	person.Intentions.Delete(friend.ID)
	friend.Party.RemoveIntention(friend.Party.GetIntention(person))

	return c.SendStatus(204)
}