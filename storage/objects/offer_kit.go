package objects

import (
	"fmt"

	"github.com/ectrc/snow/aid"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ShopOfferTypeKit struct {
	ID            string `gorm:"primaryKey;index"`
	ShopSectionID string
	Type          ShopOfferTypeEnum
	Rewards       []*ShopOfferGrant        `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Price         *ShopOfferPriceRealMoney `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Display       *OfferDisplay            `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Meta          *ShopOfferMeta           `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}

func (o *ShopOfferTypeKit) TableName() string {
	return "shop_offers_kit"
}

func (o *ShopOfferTypeKit) AfterDelete(tx *gorm.DB) (err error) {
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferGrant{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferMeta{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferPriceRealMoney{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&OfferDisplay{})
	return nil
}

func NewKitOffer(offerId string) *ShopOfferTypeKit {
	return &ShopOfferTypeKit{
		ID:      offerId,
		Type:    ShopOfferTypeEnumKit,
		Rewards: make([]*ShopOfferGrant, 0),
		Price:   NewShopOfferPriceRealMoney(uuid.NewString()),
		Display: NewOfferDisplay(uuid.NewString()),
		Meta:    NewShopOfferMeta(uuid.NewString()),
	}
}

func (o *ShopOfferTypeKit) OfferID() string {
	return fmt.Sprintf("kit://%s", o.ID)
}

func (o *ShopOfferTypeKit) OfferType() ShopOfferTypeEnum {
	return o.Type
}

func (o *ShopOfferTypeKit) OfferRewards() []*ShopOfferGrant {
	return o.Rewards
}

func (o *ShopOfferTypeKit) AddReward(reward *ShopOfferGrant) *ShopOfferTypeKit {
	reward.ShopOfferID = o.ID
	o.Rewards = append(o.Rewards, reward)
	return o
}

func (o *ShopOfferTypeKit) SetSectionID(id string) {
	o.ShopSectionID = id
}

func (o *ShopOfferTypeKit) SetPriorityShop(priority int) {
	o.Meta.PriorityShop = priority
}

func (o *ShopOfferTypeKit) RenderFortniteCatalogOfferResponse() aid.JSON {
	return aid.JSON{
		"offerId":    o.OfferID(),
		"offerType":  "StaticPrice",
		"devName":    fmt.Sprintf("[STARTER KIT] %s", o.Display.Title),
		"itemGrants": []aid.JSON{},
		"requirements": []aid.JSON{{
			"requirementType": "DenyOnFulfillment",
			"requiredId":      o.OfferID(),
			"minQuantity":     1,
		}},
		"categories": o.Meta.Categories,
		"metaInfo":   o.Meta.RenderFortniteCatalogOfferMetaInfoResponse(),
		"meta":       o.Meta.RenderFortniteCatalogOfferMetaResponse(),
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

func (o *ShopOfferTypeKit) RenderFortniteBulkOffersResponse() aid.JSON {
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

func (o *ShopOfferTypeKit) MustItemOffer() *ShopOfferTypeItem {
	return nil
}

func (o *ShopOfferTypeKit) MustMoneyOffer() *ShopOfferTypeMoney {
	return nil
}

func (o *ShopOfferTypeKit) MustKitOffer() *ShopOfferTypeKit {
	return o
}

func (o *ShopOfferTypeKit) MustBookOffer() *ShopOfferTypeBook {
	return nil
}
