package objects

import (
	"github.com/ectrc/snow/aid"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ShopSection struct {
	ID        string `gorm:"primaryKey;index"`
	CatalogID string
	Name      string
	Offers    []ShopOffer `gorm:"-"`
	//
	DB_itemOffers       []*ShopOfferTypeItem  `json:"itemOffers" gorm:"foreignKey:ShopSectionID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	DB_currencyOffers   []*ShopOfferTypeMoney `json:"moneyOffers" gorm:"foreignKey:ShopSectionID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	DB_starterKitOffers []*ShopOfferTypeKit   `json:"kitOffers" gorm:"foreignKey:ShopSectionID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	DB_battlePassOffers []*ShopOfferTypeBook  `json:"passOffers" gorm:"foreignKey:ShopSectionID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}

func (s *ShopSection) TableName() string {
	return "shop_sections"
}

func (s *ShopSection) BeforeSave(tx *gorm.DB) error {
	s.DB_itemOffers = []*ShopOfferTypeItem{}
	s.DB_currencyOffers = []*ShopOfferTypeMoney{}
	s.DB_starterKitOffers = []*ShopOfferTypeKit{}
	s.DB_battlePassOffers = []*ShopOfferTypeBook{}

	for _, item := range s.Offers {
		switch item.OfferType() {
		case ShopOfferTypeEnumItem:
			s.DB_itemOffers = append(s.DB_itemOffers, item.MustItemOffer())
		case ShopOfferTypeEnumMoney:
			s.DB_currencyOffers = append(s.DB_currencyOffers, item.MustMoneyOffer())
		case ShopOfferTypeEnumKit:
			s.DB_starterKitOffers = append(s.DB_starterKitOffers, item.MustKitOffer())
		case ShopOfferTypeEnumBook:
			s.DB_battlePassOffers = append(s.DB_battlePassOffers, item.MustBookOffer())
		}
	}

	return nil
}

func (s *ShopSection) AfterDelete(tx *gorm.DB) (err error) {
	tx.Clauses(clause.Returning{}).Where("shop_section_id = ?", s.ID).Delete(&ShopOfferTypeItem{})
	tx.Clauses(clause.Returning{}).Where("shop_section_id = ?", s.ID).Delete(&ShopOfferTypeMoney{})
	tx.Clauses(clause.Returning{}).Where("shop_section_id = ?", s.ID).Delete(&ShopOfferTypeKit{})
	tx.Clauses(clause.Returning{}).Where("shop_section_id = ?", s.ID).Delete(&ShopOfferTypeBook{})

	return nil
}

func (s *ShopSection) AfterFind(tx *gorm.DB) error {
	s.Offers = make([]ShopOffer, 0)

	for _, item := range s.DB_itemOffers {
		s.Offers = append(s.Offers, item)
	}

	for _, item := range s.DB_currencyOffers {
		s.Offers = append(s.Offers, item)
	}

	for _, item := range s.DB_starterKitOffers {
		s.Offers = append(s.Offers, item)
	}

	for _, item := range s.DB_battlePassOffers {
		s.Offers = append(s.Offers, item)
	}

	return nil
}

func NewShopSection(name string) *ShopSection {
	return &ShopSection{
		ID:     uuid.NewString(),
		Name:   name,
		Offers: make([]ShopOffer, 0),
	}
}

func (s *ShopSection) RenderFortniteCatalogSectionResponse() aid.JSON {
	catalogEntiresResponse := []aid.JSON{}

	for _, entry := range s.Offers {
		catalogEntiresResponse = append(catalogEntiresResponse, entry.RenderFortniteCatalogOfferResponse())
	}

	return aid.JSON{
		"name":           s.Name,
		"catalogEntries": catalogEntiresResponse,
	}
}

func (s *ShopSection) GetOffersGroupedByCategory() map[string][]*ShopOfferTypeItem {
	newOffers := []*ShopOfferTypeItem{}
	for _, offer := range s.Offers {
		if offer.OfferType() != ShopOfferTypeEnumItem {
			continue
		}

		newOffers = append(newOffers, offer.MustItemOffer())
	}

	groupedOffers := map[string][]*ShopOfferTypeItem{}
	for _, offer := range newOffers {
		if _, ok := groupedOffers[offer.Meta.Categories[0]]; !ok {
			groupedOffers[offer.Meta.Categories[0]] = []*ShopOfferTypeItem{}
		}

		groupedOffers[offer.Meta.Categories[0]] = append(groupedOffers[offer.Meta.Categories[0]], offer)
	}

	return groupedOffers
}

func (s *ShopSection) GetOffersGroupedByType() map[string][]*ShopOfferTypeItem {
	newOffers := []*ShopOfferTypeItem{}
	for _, offer := range s.Offers {
		if offer.OfferType() != ShopOfferTypeEnumItem {
			continue
		}

		newOffers = append(newOffers, offer.MustItemOffer())
	}

	groupedOffers := map[string][]*ShopOfferTypeItem{}
	for _, offer := range newOffers {
		if _, ok := groupedOffers[string(offer.OfferRewards()[0].BackendValue)]; !ok {
			groupedOffers[string(offer.OfferRewards()[0].BackendValue)] = []*ShopOfferTypeItem{}
		}

		groupedOffers[string(offer.OfferRewards()[0].BackendValue)] = append(groupedOffers[string(offer.OfferRewards()[0].BackendValue)], offer)
	}

	return groupedOffers

}

func (s *ShopSection) GetOffersGroupedBySet() map[string][]*ShopOfferTypeItem {
	newOffers := []*ShopOfferTypeItem{}
	for _, offer := range s.Offers {
		if offer.OfferType() != ShopOfferTypeEnumItem {
			continue
		}

		newOffers = append(newOffers, offer.MustItemOffer())
	}

	groupedOffers := map[string][]*ShopOfferTypeItem{}
	for _, offer := range newOffers {
		if _, ok := groupedOffers[offer.Meta.Categories[0]]; !ok {
			groupedOffers[offer.Meta.Categories[0]] = []*ShopOfferTypeItem{}
		}

		groupedOffers[offer.Meta.Categories[0]] = append(groupedOffers[offer.Meta.Categories[0]], offer)
	}

	return groupedOffers
}

func (s *ShopSection) AddOffer(offer ShopOffer) {
	offer.SetSectionID(s.ID)
	if offer.OfferType() == ShopOfferTypeEnumItem {
		if offer.MustItemOffer().Meta.PriorityShop == 0 {
			offer.SetPriorityShop(len(s.Offers))
		}
	} else {
		offer.SetPriorityShop(len(s.Offers))
	}
	s.Offers = append(s.Offers, offer)
}

func (s *ShopSection) GetOfferByID(offerID string) *ShopOfferOfferFetchResponse {
	for _, offer := range s.Offers {
		if offer.OfferID() == offerID {
			return &ShopOfferOfferFetchResponse{
				Offer: offer,
				Type:  offer.OfferType(),
			}
		}
	}

	return nil
}
