package handlers

import (
	"net/http"
	"net/url"
	"time"

	"github.com/ectrc/snow/aid"
	p "github.com/ectrc/snow/person"
	"github.com/ectrc/snow/storage"

	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
)

func GetDiscordOAuthURL(c *fiber.Ctx) error {
	code := c.Query("code")
	extra := aid.Ternary(c.Query("panel") != "", "?panel=true", "")
	if code == "" {
		return c.Status(200).SendString("https://discord.com/oauth2/authorize?client_id="+ aid.Config.Discord.ID +"&redirect_uri="+ url.QueryEscape(aid.Config.API.DiscordDomain +"/snow/discord"+extra) + "&response_type=code&scope=identify")
	}

	client := &http.Client{}

	oauthRequest, err := client.PostForm("https://discord.com/api/v10/oauth2/token", url.Values{
		"client_id": {aid.Config.Discord.ID},
		"client_secret": {aid.Config.Discord.Secret},
		"grant_type": {"authorization_code"},
		"code": {code},
		"redirect_uri": {aid.Config.API.DiscordDomain +"/snow/discord"+extra},
	})
	if err != nil {
		return c.Status(500).JSON(aid.JSON{"error":err.Error()})
	}

	var body struct {
		AccessToken string `json:"access_token"`
		RenewToken string `json:"refresh_token"`
	}
	err = json.NewDecoder(oauthRequest.Body).Decode(&body)
	if err != nil {
		return c.Status(500).JSON(aid.JSON{"error":err.Error()})
	}

	userRequest, err := http.NewRequest("GET", "https://discord.com/api/v10/users/@me", nil)
	if err != nil {
		return c.Status(500).JSON(aid.JSON{"error":err.Error()})
	}
	userRequest.Header.Set("Authorization", "Bearer " + body.AccessToken)
	userResponse, err := client.Do(userRequest)
	if err != nil {
		return c.Status(500).JSON(aid.JSON{"error":err.Error()})
	}

	var user struct {
		ID string `json:"id"`
		Username string `json:"username"`
		Avatar string `json:"avatar"`
		Banner string `json:"banner"`
	}
	err = json.NewDecoder(userResponse.Body).Decode(&user)
	if err != nil {
		return c.Status(500).JSON(aid.JSON{"error":err.Error()})
	}

	person := p.FindByDiscord(user.ID)
	if person == nil {
		html := `<html><head><title>Not Found</title></head><body><h1>Account Not Found</h1><p>Please go to #bots in <a href="https://discord.com/invite/retrac">our discord server</a> and create an account with the /create command.</p></body></html>`
		c.Set("Content-Type", "text/html")
		return c.Status(404).SendString(html)
	}

	person.Discord.AccessToken = body.AccessToken
	person.Discord.RefreshToken = body.RenewToken
	person.Discord.Username = user.Username
	person.Discord.Avatar = user.Avatar
	person.Discord.Banner = user.Banner
	storage.Repo.SaveDiscordPerson(person.Discord)

	access, err := aid.JWTSign(aid.JSON{
		"snow_id": person.ID, // custom
		"frontend": true,
		"creation_date": time.Now().Format("2006-01-02T15:04:05.999Z"),
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(aid.ErrorInternalServer)
	}

	if extra != "" {
		return c.Redirect(aid.Config.API.FrontendDomain + "/credentials?token=" + access)
	}

	return c.Redirect("snow://auth:" + access)
}