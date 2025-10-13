package objects

import (
	"fmt"

	"github.com/ectrc/snow/aid"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ShopOfferTypeBook struct {
	ID            string `gorm:"primaryKey;index"`
	ShopSectionID string
	Type          ShopOfferTypeEnum
	Rewards       []*ShopOfferGrant          `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Price         *ShopOfferPriceMtxCurrency `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Display       *OfferDisplay              `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Meta          *ShopOfferMeta             `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}

func (o *ShopOfferTypeBook) TableName() string {
	return "shop_offers_book"
}

func (o *ShopOfferTypeBook) AfterDelete(tx *gorm.DB) (err error) {
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferGrant{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferPriceMtxCurrency{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&OfferDisplay{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferMeta{})
	return nil
}

func NewBookOffer(offerId string) *ShopOfferTypeBook {
	return &ShopOfferTypeBook{
		ID:      offerId,
		Type:    ShopOfferTypeEnumBook,
		Rewards: make([]*ShopOfferGrant, 0),
		Price:   NewShopOfferPriceMtxCurrency(uuid.NewString()),
		Display: NewOfferDisplay(uuid.NewString()),
		Meta:    NewShopOfferMeta(uuid.NewString()),
	}
}

func (o *ShopOfferTypeBook) OfferID() string {
	return aid.Ternary(len(o.ID) == 32, o.ID, fmt.Sprintf("book://%s", o.ID))
}

func (o *ShopOfferTypeBook) OfferType() ShopOfferTypeEnum {
	return o.Type
}

func (o *ShopOfferTypeBook) OfferRewards() []*ShopOfferGrant {
	return o.Rewards
}

func (o *ShopOfferTypeBook) AddReward(reward *ShopOfferGrant) *ShopOfferTypeBook {
	reward.ShopOfferID = o.ID
	o.Rewards = append(o.Rewards, reward)
	return o
}

func (o *ShopOfferTypeBook) SetSectionID(id string) {
	o.ShopSectionID = id
}

func (o *ShopOfferTypeBook) SetPriorityShop(priority int) {
	o.Meta.PriorityShop = priority
}

func (o *ShopOfferTypeBook) RenderFortniteCatalogOfferResponse() aid.JSON {
	return aid.JSON{
		"offerId":    o.OfferID(),
		"offerType":  "StaticPrice",
		"devName":    fmt.Sprintf("[BOOK] %s", o.Display.ShortDescription),
		"itemGrants": []string{},
		"requirements": aid.Ternary[[]aid.JSON](o.Meta.OnlyOnce, []aid.JSON{{
			"requirementType": "DenyOnFulfillment",
			"requiredId":      o.OfferID(),
			"minQuantity":     1,
		}}, []aid.JSON{}),
		"fulfillmentIds": []string{o.OfferID()},
		"categories":     o.Meta.Categories,
		"metaInfo":       o.Meta.RenderFortniteCatalogOfferMetaInfoResponse(),
		"meta":           o.Meta.RenderFortniteCatalogOfferMetaResponse(),
		"giftInfo": aid.JSON{
			"bIsEnabled":              false,
			"forcedGiftBoxTemplateId": "",
			"purchaseRequirements":    []string{},
			"giftRecordIds":           []string{},
		},
		"prices": []aid.JSON{{
			"currencyType":        "MtxCurrency",
			"currencySubType":     "Currency",
			"regularPrice":        o.Price.OriginalPrice,
			"dynamicRegularPrice": -1,
			"finalPrice":          o.Price.FinalPrice,
			"basePrice":           o.Price.OriginalPrice,
			"saleType":            o.Price.SaleType,
			"saleExpiration":      "9999-12-31T23:59:59.999Z",
		}},
		"displayAssetPath":     o.Meta.DisplayAssetPath,
		"refundable":           false,
		"title":                o.Display.Title,
		"description":          o.Display.Description,
		"shortDescription":     o.Display.ShortDescription,
		"appStoreId":           []string{},
		"dailyLimit":           -1,
		"weeklyLimit":          -1,
		"monthlyLimit":         -1,
		"sortPriority":         o.Meta.PriorityShop,
		"catalogGroupPriority": o.Meta.PriorityCategory,
		"filterWeight":         0,
	}
}

func (o *ShopOfferTypeBook) RenderFortniteBulkOffersResponse() aid.JSON {
	return aid.JSON{}
}

func (o *ShopOfferTypeBook) MustItemOffer() *ShopOfferTypeItem {
	return nil
}

func (o *ShopOfferTypeBook) MustMoneyOffer() *ShopOfferTypeMoney {
	return nil
}

func (o *ShopOfferTypeBook) MustKitOffer() *ShopOfferTypeKit {
	return nil
}

func (o *ShopOfferTypeBook) MustBookOffer() *ShopOfferTypeBook {
	return o
}
