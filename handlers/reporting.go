package handlers

import (
	"strings"

	"github.com/bwmarrin/discordgo"
	"github.com/ectrc/snow/aid"
	"github.com/ectrc/snow/discord"
	"github.com/ectrc/snow/person"
	"github.com/gofiber/fiber/v2"
)

func PostToxicityReport(c *fiber.Ctx) error {
	var body struct {
		Reason string `json:"reason"`
		Details string `json:"details"`
		PlaylistName string `json:"playlistName"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(err.Error())	
	}

	reporter := c.Locals("person").(*person.Person)
	if c.Params("accountId") != reporter.ID {
		return c.Status(400).JSON("You are not the person")
	}

	offender := person.Find(c.Params("offenderId"))
	if offender == nil {
		return c.Status(400).JSON("Offender not found")
	}

	report := person.NewReport(offender, reporter, body.Reason, body.Details, body.PlaylistName)
	reporter.Reports.AddReport(report)
	offender.Reports.AddReport(report)

	discord.StaticClient.Client.ChannelMessageSendEmbed(aid.Config.Discord.ReportChannelID, discord.NewEmbedBuilder().
		SetTitle("A new report has been submitted").
		SetColor(0x2b2d31).
		AddField("Reporter", "<@" + reporter.Discord.ID + ">", true).
		AddField("Offender", "<@" + offender.Discord.ID + ">", true).
		SetDescription(body.Details).
		AddField("Reason", aid.NiceString(body.Reason), true).
		AddField("Playlist Name", body.PlaylistName, true).Build(),
	)

	return c.SendStatus(204)
}

/*

--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="feedbacktype"

Player
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="accountid"

b7623aa6-25a1-4d10-a708-6c873a8d2893
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="engineversion"

14456520
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="platform"

Windows
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="gamebackend"

Fortnite
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="gamename"

Fortnite
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="subgamename"

Athena
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ReporterGameSessionID"

f24001ea-caec-41ae-b0a0-97b86118b3ec
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_Attached"

true
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_ReporterId"

b7623aa6-25a1-4d10-a708-6c873a8d2893
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_OffenderId"

6881c548-a02c-4794-aba2-1d3a5acc35eb
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_GameSessionId"


--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_PlaylistName"

Playlist_ShowdownAlt_Solo
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_ReporterPlatform"

Windows
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_OffenderPlatform"


--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_CreativeIslandSharingLink"


--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_CreativeIslandGuid"


--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_CreativeIslandOwnerAccountId"


--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_Reason"

TeamingUpWithEnemies
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_Details"


--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_ReporterGameSessionId"

f24001ea-caec-41ae-b0a0-97b86118b3ec
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_SubGameName"

Athena
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="ToxicPlayerReport_Token"

8c8c40d370a0fc13d68131b856d90ae1
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="DisplayedReportIDToPlayer"

9N7CKRBCJSJH6
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="subject"

New Player Report: blurr
--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="feedbackbody"


--f23d9313c25290f9fb1d387c995a78f617533
Content-Disposition: form-data; name="Screenshot.jpg"; filename="Screenshot.jpg"
Content-Type: image/jpg
*/

type Feedback struct {
	FeedbackType string
	AccountID string
	EngineVersion string
	Platform string
	GameBackend string
	GameName string
	SubGameName string
	ReporterGameSessionID string
	ToxicPlayerReport_Attached string
	ToxicPlayerReport_ReporterID string
	ToxicPlayerReport_OffenderID string
	ToxicPlayerReport_GameSessionID string
	ToxicPlayerReport_PlaylistName string
	ToxicPlayerReport_ReporterPlatform string
	ToxicPlayerReport_OffenderPlatform string
	ToxicPlayerReport_CreativeIslandSharingLink string
	ToxicPlayerReport_CreativeIslandGuid string
	ToxicPlayerReport_CreativeIslandOwnerAccountID string
	ToxicPlayerReport_Reason string
	ToxicPlayerReport_Details string
	ToxicPlayerReport_ReporterGameSessionID string
	ToxicPlayerReport_SubGameName string
	ToxicPlayerReport_Token string
	DisplayedReportIDToPlayer string
	Subject string
	FeedbackBody string
}


func PostFeedbackPlayer(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(400).JSON(err.Error())
	}

	feedback := Feedback{}
	for key, value := range form.Value {
		switch key {
		case "feedbacktype":
			feedback.FeedbackType = value[0]
		case "accountid":
			feedback.AccountID = value[0]
		case "engineversion":
			feedback.EngineVersion = value[0]
		case "platform":
			feedback.Platform = value[0]
		case "gamebackend":
			feedback.GameBackend = value[0]
		case "gamename":
			feedback.GameName = value[0]
		case "subgamename":
			feedback.SubGameName = value[0]
		case "ReporterGameSessionID":
			feedback.ReporterGameSessionID = value[0]
		case "ToxicPlayerReport_Attached":
			feedback.ToxicPlayerReport_Attached = value[0]
		case "ToxicPlayerReport_ReporterId":
			feedback.ToxicPlayerReport_ReporterID = value[0]
		case "ToxicPlayerReport_OffenderId":
			feedback.ToxicPlayerReport_OffenderID = value[0]
		case "ToxicPlayerReport_GameSessionId":
			feedback.ToxicPlayerReport_GameSessionID = value[0]
		case "ToxicPlayerReport_PlaylistName":
			feedback.ToxicPlayerReport_PlaylistName = value[0]
		case "ToxicPlayerReport_ReporterPlatform":
			feedback.ToxicPlayerReport_ReporterPlatform = value[0]
		case "ToxicPlayerReport_OffenderPlatform":
			feedback.ToxicPlayerReport_OffenderPlatform = value[0]
		case "ToxicPlayerReport_CreativeIslandSharingLink":
			feedback.ToxicPlayerReport_CreativeIslandSharingLink = value[0]
		case "ToxicPlayerReport_CreativeIslandGuid":
			feedback.ToxicPlayerReport_CreativeIslandGuid = value[0]
		case "ToxicPlayerReport_CreativeIslandOwnerAccountId":
			feedback.ToxicPlayerReport_CreativeIslandOwnerAccountID = value[0]
		case "ToxicPlayerReport_Reason":
			feedback.ToxicPlayerReport_Reason = value[0]
		case "ToxicPlayerReport_Details":
			feedback.ToxicPlayerReport_Details = value[0]
		case "ToxicPlayerReport_ReporterGameSessionId":
			feedback.ToxicPlayerReport_ReporterGameSessionID = value[0]
		case "ToxicPlayerReport_SubGameName":
			feedback.ToxicPlayerReport_SubGameName = value[0]
		case "ToxicPlayerReport_Token":
			feedback.ToxicPlayerReport_Token = value[0]
		case "DisplayedReportIDToPlayer":
			feedback.DisplayedReportIDToPlayer = value[0]
		case "subject":
			feedback.Subject = value[0]
		case "feedbackbody":
			feedback.FeedbackBody = value[0]
		}
	}

	// if file, ok := form.File["Screenshot.jpg"]; ok && len(file) > 0 {
	// 	sc := file[0]
	// 	screenshot := make([]byte, sc.Size)
	// 	scFile, err := sc.Open()
	// 	if err == nil {
	// 		fmt.Println(scFile)
	// 	}

	// 	// read the file into a byte array
	// 	_, err = scFile.Read(screenshot)
	// 	if err == nil {

	// 	}
	// }

	offender := person.Find(feedback.ToxicPlayerReport_OffenderID)
	if offender == nil {
		return c.Status(400).JSON("Offender not found")
	}

	reporter := person.Find(feedback.ToxicPlayerReport_ReporterID)
	if reporter == nil {
		return c.Status(400).JSON("Reporter not found")
	}

	report := person.NewReport(offender, reporter, feedback.ToxicPlayerReport_Reason, feedback.ToxicPlayerReport_Details, feedback.ToxicPlayerReport_PlaylistName)
	reporter.Reports.AddReport(report)
	offender.Reports.AddReport(report)

	discord.StaticClient.Client.ChannelMessageSendComplex(aid.Config.Discord.ReportChannelID, &discordgo.MessageSend{
		Embeds: []*discordgo.MessageEmbed{discord.NewEmbedBuilder().
			SetTitle("A new report has been submitted").
			SetColor(0x2b2d31).
			AddField("Reporter", "<@" + reporter.Discord.ID + ">", true).
			AddField("Offender", "<@" + offender.Discord.ID + ">", true).
			SetDescription(feedback.ToxicPlayerReport_Details).
			AddField("Reason", aid.NiceString(strings.ReplaceAll(feedback.ToxicPlayerReport_Reason, "ReportAPlayerReason_", "")), true).
			AddField("Playlist Name", feedback.ToxicPlayerReport_PlaylistName, true).Build()},
	})

	return err
}