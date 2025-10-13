package objects

import (
	"fmt"

	"github.com/ectrc/snow/aid"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ShopOfferTypeMoney struct {
	ID            string `gorm:"primaryKey;index"`
	ShopSectionID string
	Type          ShopOfferTypeEnum
	Rewards       []*ShopOfferGrant        `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Price         *ShopOfferPriceRealMoney `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Display       *OfferDisplay            `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Meta          *ShopOfferMeta           `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}

func (o *ShopOfferTypeMoney) TableName() string {
	return "shop_offers_money"
}

func (o *ShopOfferTypeMoney) AfterDelete(tx *gorm.DB) (err error) {
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferGrant{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferPriceRealMoney{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&OfferDisplay{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferMeta{})
	return nil
}

func NewMoneyOffer(offerId string) *ShopOfferTypeMoney {
	return &ShopOfferTypeMoney{
		ID:      offerId,
		Type:    ShopOfferTypeEnumMoney,
		Rewards: make([]*ShopOfferGrant, 0),
		Price:   NewShopOfferPriceRealMoney(uuid.NewString()),
		Display: NewOfferDisplay(uuid.NewString()),
		Meta:    NewShopOfferMeta(uuid.NewString()),
	}
}

func (o *ShopOfferTypeMoney) OfferID() string {
	return fmt.Sprintf("money://%s", o.ID)
}

func (o *ShopOfferTypeMoney) OfferType() ShopOfferTypeEnum {
	return o.Type
}

func (o *ShopOfferTypeMoney) OfferRewards() []*ShopOfferGrant {
	return o.Rewards
}

func (o *ShopOfferTypeMoney) AddReward(reward *ShopOfferGrant) *ShopOfferTypeMoney {
	reward.ShopOfferID = o.ID
	o.Rewards = append(o.Rewards, reward)
	return o
}

func (o *ShopOfferTypeMoney) SetSectionID(id string) {
	o.ShopSectionID = id
}

func (o *ShopOfferTypeMoney) SetPriorityShop(priority int) {
	o.Meta.PriorityShop = priority
}

func (o *ShopOfferTypeMoney) RenderFortniteCatalogOfferResponse() aid.JSON {
	return aid.JSON{
		"offerId":        o.OfferID(),
		"offerType":      "StaticPrice",
		"devName":        fmt.Sprintf("[CURRENCY] %s", o.Display.Title),
		"itemGrants":     []aid.JSON{},
		"requirements":   []aid.JSON{},
		"fulfillmentIds": []string{o.OfferID()},
		"categories":     o.Meta.Categories,
		"metaInfo":       o.Meta.RenderFortniteCatalogOfferMetaInfoResponse(),
		"meta":           o.Meta.RenderFortniteCatalogOfferMetaResponse(),
		"giftInfo": aid.JSON{
			"bIsEnabled":              false,
			"forcedGiftBoxTemplateId": "",
			"purchaseRequirements":    []aid.JSON{},
			"giftRecordIds":           []string{},
		},
		"prices": []aid.JSON{{
			"currencyType":        "RealMoney",
			"currencySubType":     "",
			"regularPrice":        -1,
			"dynamicRegularPrice": -1,
			"finalPrice":          -1,
			"basePrice":           -1,
			"saleExpiration":      "9999-12-31T23:59:59.999Z",
		}},
		"bannerOverride":   o.Meta.BannerOverride,
		"displayAssetPath": o.Meta.DisplayAssetPath,
		"refundable":       false,
		"title":            o.Display.Title,
		"description":      o.Display.Description,
		"shortDescription": o.Display.ShortDescription,
		"appStoreId": []string{
			"",
			o.OfferID(),
		},
		"dailyLimit":           -1,
		"weeklyLimit":          -1,
		"monthlyLimit":         -1,
		"sortPriority":         o.Meta.PriorityShop,
		"catalogGroupPriority": o.Meta.PriorityCategory,
		"filterWeight":         0,
	}
}

func (o *ShopOfferTypeMoney) RenderFortniteBulkOffersResponse() aid.JSON {
	return aid.JSON{
		"id":                    o.OfferID(),
		"title":                 o.Display.Title,
		"shortDescription":      o.Display.ShortDescription,
		"longDescription":       o.Display.LongDescription,
		"creationDate":          "0000-00-00T00:00:00.000Z",
		"price":                 o.Price.LocalPrice,
		"currentPrice":          o.Price.LocalPrice,
		"currencyCode":          "USD",
		"basePrice":             o.Price.BasePrice,
		"basePriceCurrencyCode": "GBP",
	}
}

func (o *ShopOfferTypeMoney) MustItemOffer() *ShopOfferTypeItem {
	return nil
}

func (o *ShopOfferTypeMoney) MustMoneyOffer() *ShopOfferTypeMoney {
	return o
}

func (o *ShopOfferTypeMoney) MustKitOffer() *ShopOfferTypeKit {
	return nil
}

func (o *ShopOfferTypeMoney) MustBookOffer() *ShopOfferTypeBook {
	return nil
}
