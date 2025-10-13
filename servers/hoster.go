package servers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/ectrc/snow/aid"
)

type HosterServer struct {
	ID string
	MatchmakeStatus int
	RuntimeStatus int
	Install struct {
		Version string
		RootPath string
		RelativeRedirectLibrary string
		RelativeServerLibrary string
		RelativeGamePath string
	}
	ReservedPort int
	ContraintKey string
	Unregistered bool
}

type HosterError struct {
	Error string `json:"error"`
}

type HosterInteractor struct {
	h *http.Client
	Domain string
}

func NewHosterInteractor(domain string) *HosterInteractor {
	return &HosterInteractor{
		h: &http.Client{
			Timeout: time.Second * 5,
		},
		Domain: domain,
	}
}

var EU_Hosters []*HosterInteractor
var NA_Hosters []*HosterInteractor

// returns a map of port to server
func (hi *HosterInteractor) GetServers() (map[string]HosterServer, error) {
	serverRequest, err := http.NewRequest("GET", hi.Domain + "/", nil)
	if err != nil {
		return nil, err
	}
	serverRequest.Header.Add("Authorization", "Basic BMKDTQtVECLYG3B7ayImQhVsH83PuqaIpwRdADP3pvhD3y")
	userResponse, err := hi.h.Do(serverRequest)
	if err != nil {
		return nil, err
	}

	if userResponse.StatusCode != 200 {
		var errorResponse HosterError
		err = json.NewDecoder(userResponse.Body).Decode(&errorResponse)
		if err != nil {
			return nil, err
		}

		return nil, fmt.Errorf("Hoster API Error: %s", errorResponse.Error)
	}

	var body map[string]HosterServer
	err = json.NewDecoder(userResponse.Body).Decode(&body)
	if err != nil {
		return nil, err
	}
	return body, nil
}

func (hi *HosterInteractor) GetServerByID(id string) (*HosterServer, error) {
	servers, err := hi.GetServers()
	if err != nil {
		return nil, err
	}

	for _, server := range servers {
		if server.ID == id {
			return &server, nil
		}
	}

	return nil, nil
}

func (hi *HosterInteractor) CreateServer(version, key string) (*HosterServer, error) {
	serverRequest, err := http.NewRequest("POST", hi.Domain + "/make", nil)
	if err != nil {
		return nil, err
	}

	serverRequest.Header.Add("Content-Type", "application/json")

	jsonBody, err := json.Marshal(aid.JSON{
		"version": version,
		"contraint_key": key,
	})
	if err != nil {
		return nil, err
	}
	serverRequest.Body = io.NopCloser(bytes.NewReader(jsonBody))
	serverRequest.Header.Add("Authorization", "Basic BMKDTQtVECLYG3B7ayImQhVsH83PuqaIpwRdADP3pvhD3y")

	userResponse, err := hi.h.Do(serverRequest)
	if err != nil {
		return nil, err
	}

	if userResponse.StatusCode != 200 {
		var errorResponse HosterError
		err = json.NewDecoder(userResponse.Body).Decode(&errorResponse)
		if err != nil {
			return nil, err
		}

		return nil, fmt.Errorf("Hoster API Error: %s", errorResponse.Error)
	}

	var server HosterServer
	err = json.NewDecoder(userResponse.Body).Decode(&server)
	if err != nil {
		return nil, err
	}

	return &server, nil
}