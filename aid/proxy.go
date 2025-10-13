package aid

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type ip2locationResponse struct {
	IP          string  `json:"ip"`
	CountryCode string  `json:"country_code"`
	CountryName string  `json:"country_name"`
	RegionName  string  `json:"region_name"`
	CityName    string  `json:"city_name"`
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
	ZipCode     string  `json:"zip_code"`
	TimeZone    string  `json:"time_zone"`
	ASN         string  `json:"asn"`
	AS          string  `json:"as"`
	IsProxy     bool    `json:"is_proxy"`
}

func IsAddressProxy(ip string) bool {
	req, err := http.NewRequest("GET", "https://api.ip2location.io?key=7CEC85BC4B615DB85AA6D5F92776BF2B&format=json&ip=" + ip, nil)
	if err != nil {
		fmt.Println(err)
		return false
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
		return false
	}

	if resp.StatusCode != 200 {
		fmt.Println("status code: ", resp.StatusCode)
		return false
	}

	defer resp.Body.Close()

	var data ip2locationResponse
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		return false
	}

	if data.IsProxy {
		return true
	}

	return false
}