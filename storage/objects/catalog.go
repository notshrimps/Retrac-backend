package objects

import (
	"time"

	"github.com/ectrc/snow/aid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ShopCatalog struct {
	ID       		string         `gorm:"primaryKey;index"`
	Sections 		[]*ShopSection `gorm:"foreignKey:CatalogID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Description string
}

func (c *ShopCatalog) TableName() string {
	return "shops"
}

func (c *ShopCatalog) AfterDelete(tx *gorm.DB) (err error) {
	tx.Clauses(clause.Returning{}).Where("catalog_id = ?", c.ID).Delete(&ShopSection{})
	return nil
}

func NewStorefrontCatalog() *ShopCatalog {
	return &ShopCatalog{
		ID:       time.Now().Truncate(24 * time.Hour).Format(time.RFC3339),
		Sections: make([]*ShopSection, 0),
	}
}

func (c *ShopCatalog) AddSection(section *ShopSection) {
	section.CatalogID = c.ID
	c.Sections = append(c.Sections, section)
}

func (c *ShopCatalog) AddSections(sections ...*ShopSection) {
	for _, section := range sections {
		c.AddSection(section)
	}
}

func (c *ShopCatalog) GetSectionByID(sectionID string) *ShopSection {
	for _, section := range c.Sections {
		if section.ID == sectionID {
			return section
		}
	}

	return nil
}

func (c *ShopCatalog) GetOfferByID(offerID string) *ShopOfferOfferFetchResponse {
	for _, section := range c.Sections {
		found := section.GetOfferByID(offerID)
		if found != nil {
			return found
		}
	}

	return nil
}

func (c *ShopCatalog) RenderFortniteCatalogResponse() aid.JSON {
	sectionsResponse := []aid.JSON{}

	for _, section := range c.Sections {
		sectionsResponse = append(sectionsResponse, section.RenderFortniteCatalogSectionResponse())
	}

	parsedTime, _ := time.Parse(time.RFC3339, c.ID)

	return aid.JSON{
		"storefronts":        sectionsResponse,
		"refreshIntervalHrs": 24,
		"dailyPurchaseHrs":   24,
		"expiration":         time.Date(parsedTime.Year(), parsedTime.Month(), parsedTime.Day(), 23, 59, 59, 0, time.Local).Format("2006-01-02T15:04:05.999Z"),
	}
}

func (c *ShopCatalog) RenderFortniteBulkOffersResponse(ids []string) aid.JSON {
	response := aid.JSON{}

	for _, id := range ids {
		feteched := c.GetOfferByID(id)
		if feteched == nil {
			continue
		}

		switch feteched.Type {
		case ShopOfferTypeEnumMoney:
			offer := feteched.Offer.(*ShopOfferTypeMoney)
			response[id] = offer.RenderFortniteBulkOffersResponse()
		case ShopOfferTypeEnumKit:
			offer := feteched.Offer.(*ShopOfferTypeKit)
			response[id] = offer.RenderFortniteBulkOffersResponse()
		default:
			break
		}
	}

	return response
}