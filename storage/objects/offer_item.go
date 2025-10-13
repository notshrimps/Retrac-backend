package objects

import (
	"fmt"

	"github.com/ectrc/snow/aid"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ShopOfferTypeItem struct {
	ID            string `gorm:"primaryKey;index"`
	ShopSectionID string
	Type          ShopOfferTypeEnum
	Rewards       []*ShopOfferGrant          `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Price         *ShopOfferPriceMtxCurrency `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Display       *OfferDisplay              `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Meta          *ShopOfferMeta             `gorm:"foreignKey:ShopOfferID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}

func (o *ShopOfferTypeItem) TableName() string {
	return "shop_offers_item"
}

func (o *ShopOfferTypeItem) AfterDelete(tx *gorm.DB) (err error) {
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferGrant{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferPriceMtxCurrency{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&OfferDisplay{})
	tx.Clauses(clause.Returning{}).Where("shop_offer_id = ?", o.ID).Delete(&ShopOfferMeta{})
	return nil
}

func NewItemOffer(offerId string) *ShopOfferTypeItem {
	return &ShopOfferTypeItem{
		ID:      offerId,
		Type:    ShopOfferTypeEnumItem,
		Rewards: make([]*ShopOfferGrant, 0),
		Price:   NewShopOfferPriceMtxCurrency(uuid.NewString()),
		Display: NewOfferDisplay(uuid.NewString()),
		Meta:    NewShopOfferMeta(uuid.NewString()),
	}
}

func (o *ShopOfferTypeItem) OfferID() string {
	return fmt.Sprintf("item://%s", o.ID)
}

func (o *ShopOfferTypeItem) OfferType() ShopOfferTypeEnum {
	return o.Type
}

func (o *ShopOfferTypeItem) OfferRewards() []*ShopOfferGrant {
	return o.Rewards
}

func (o *ShopOfferTypeItem) AddReward(reward *ShopOfferGrant) *ShopOfferTypeItem {
	reward.ShopOfferID = o.ID
	o.Rewards = append(o.Rewards, reward)
	return o
}

func (o *ShopOfferTypeItem) SetSectionID(id string) {
	o.ShopSectionID = id
}

func (o *ShopOfferTypeItem) SetPriorityShop(priority int) {
	o.Meta.PriorityShop = priority
}

func (o *ShopOfferTypeItem) RenderFortniteCatalogOfferResponse() aid.JSON {
	itemGrantResponse := []aid.JSON{}
	purchaseRequirementsResponse := []aid.JSON{}
	developerNameResponse := "[ITEM]"

	for _, reward := range o.Rewards {
		if reward.Grant.Status.Has(ItemStatusEnumHidden) {
			continue
		}

		itemGrantResponse = append(itemGrantResponse, aid.JSON{
			"templateId": reward.TemplateID(),
			"quantity":   reward.Quantity,
		})

		purchaseRequirementsResponse = append(purchaseRequirementsResponse, aid.JSON{
			"requirementType": "DenyOnItemOwnership",
			"requiredId":      reward.TemplateID(),
			"minQuantity":     1,
		})

		developerNameResponse += fmt.Sprintf(" %dx %s", reward.Quantity, reward.TemplateID())
	}

	return aid.JSON{
		"offerId":      o.OfferID(),
		"offerType":    "StaticPrice",
		"devName":      fmt.Sprintf("%s for %d MtxCurrency", developerNameResponse, o.Price.FinalPrice),
		"itemGrants":   itemGrantResponse,
		"requirements": purchaseRequirementsResponse,
		"categories":   o.Meta.Categories,
		"metaInfo":     o.Meta.RenderFortniteCatalogOfferMetaInfoResponse(),
		"meta":         o.Meta.RenderFortniteCatalogOfferMetaResponse(),
		"giftInfo": aid.JSON{
			"bIsEnabled":              o.Meta.Giftable,
			"forcedGiftBoxTemplateId": "",
			"purchaseRequirements":    purchaseRequirementsResponse,
			"giftRecordIds":           []string{},
		},
		"prices": []aid.JSON{{
			"currencyType":        "MtxCurrency",
			"currencySubType":     "Currency",
			"regularPrice":        o.Price.OriginalPrice,
			"dynamicRegularPrice": -1,
			"finalPrice":          o.Price.FinalPrice,
			"basePrice":           o.Price.OriginalPrice,
			"saleExpiration":      "9999-12-31T23:59:59.999Z",
		}},
		"bannerOverride":       o.Meta.BannerOverride,
		"displayAssetPath":     o.Meta.DisplayAssetPath,
		"refundable":           o.Meta.Refundable,
		"title":                o.Display.Title,
		"description":          o.Display.Description,
		"shortDescription":     o.Display.ShortDescription,
		"appStoreId":           []string{},
		"fulfillmentIds":       []string{},
		"dailyLimit":           -1,
		"weeklyLimit":          -1,
		"monthlyLimit":         -1,
		"sortPriority":         o.Meta.PriorityShop,
		"catalogGroupPriority": o.Meta.PriorityCategory,
		"filterWeight":         0,
	}
}

func (o *ShopOfferTypeItem) RenderFortniteBulkOffersResponse() aid.JSON {
	return aid.JSON{}
}

func (o *ShopOfferTypeItem) MustItemOffer() *ShopOfferTypeItem {
	return o
}

func (o *ShopOfferTypeItem) MustMoneyOffer() *ShopOfferTypeMoney {
	return nil
}

func (o *ShopOfferTypeItem) MustKitOffer() *ShopOfferTypeKit {
	return nil
}

func (o *ShopOfferTypeItem) MustBookOffer() *ShopOfferTypeBook {
	return nil
}
