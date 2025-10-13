package servers

import (
	"strings"

	"github.com/ectrc/snow/aid"
)

var playlistSwap = map[string]string{
	"playlist_vamp_solo": "Playlist_Vamp_Solo",
	"playlist_defaultsolo": "Playlist_DefaultSolo",
	"playlist_defaultduo": "Playlist_DefaultDuo",
	"playlist_defaultsquad": "Playlist_DefaultSquad",
	"playlist_showdownalt_solo":"Playlist_ShowdownAlt_Solo",
	"playlist_showdownalt_duos":"Playlist_ShowdownAlt_Duos",
	"playlist_showdownalt_trios":"Playlist_ShowdownAlt_Trios",
	"playlist_showdownalt_squads":"Playlist_ShowdownAlt_Squads",
}

func TryCreateAndAddServer(hoster *HosterInteractor, constraintKey string, customKey string, version string) *GameServer {
	servers, err := hoster.GetServers()
	if err != nil {
		aid.Print("Failed to get servers from hoster: " + hoster.Domain, err)
		return nil
	}
	
	if len(servers) > 2 {
		aid.Print("Too many servers already active for hoster: " + hoster.Domain)
		return nil
	}

	parts := strings.Split(constraintKey, ":")
	playlist := parts[len(parts)-1]
	if val, ok := playlistSwap[playlist]; ok {
		playlist = val
	}
	parts[len(parts)-1] = playlist
	realConstraintKey := strings.Join(parts, ":")

	hosterServer, err := hoster.CreateServer(version, realConstraintKey)
	if err != nil {
		aid.Print("Failed to create server for constraint key: " + realConstraintKey, err)
		return nil
	}

	domain := strings.ReplaceAll(hoster.Domain, "http://", "")
	domain = strings.ReplaceAll(domain, "https://", "")
	split := strings.Split(domain, ":")
	
	server := NewGameServer(hosterServer.ID, constraintKey)
	server.Bind(split[0], hosterServer.ReservedPort)
	
	bucket := Manager.GetBucket(constraintKey, customKey)
	if bucket == nil {
		bucket = NewBucket(constraintKey)
		bucket.CustomKey = customKey
		bucket.Version = version
		Manager.AddBucket(bucket)
	}
	bucket.AddServer(server)

	return server
}