package objects

import (
	"github.com/ectrc/snow/aid"
	"github.com/google/uuid"
	"github.com/lib/pq"
)

type ShopOfferMeta struct {
	ID                    string `gorm:"primaryKey;index"`
	ShopOfferID           string
	TileSize              string
	SectionID             string
	DisplayAssetPath      string
	NewDisplayAssetPath   string
	BannerOverride        string
	Giftable              bool
	Refundable            bool
	PriorityShop          int
	PriorityCategory      int
	OnlyOnce              bool
	OriginalOffer         int
	ExtraBonus            int
	FeaturedImageURL      string
	ReleaseSeason         int
	IconSize              string
	CurrencyAnalyticsName string
	Categories            pq.StringArray `gorm:"type:text[]"`
}

func (m *ShopOfferMeta) TableName() string {
	return "shop_offer_metas"
}

func NewShopOfferMeta(offerId string) *ShopOfferMeta {
	return &ShopOfferMeta{
		ID:          uuid.New().String(),
		ShopOfferID: offerId,
		Categories:  pq.StringArray{},
	}
}

func (o *ShopOfferMeta) RenderFortniteCatalogOfferMetaResponse() aid.JSON {
	meta := aid.JSON{}

	if o.TileSize != "" {
		meta["TileSize"] = o.TileSize
	}

	if o.SectionID != "" {
		meta["SectionId"] = o.SectionID
	}

	if o.DisplayAssetPath != "" {
		meta["DisplayAssetPath"] = o.DisplayAssetPath
	}

	if o.NewDisplayAssetPath != "" {
		meta["NewDisplayAssetPath"] = o.NewDisplayAssetPath
	}

	if o.BannerOverride != "" {
		meta["BannerOverride"] = o.BannerOverride
	}

	if o.OriginalOffer != 0 {
		meta["MtxQuantity"] = o.OriginalOffer + o.ExtraBonus
	}

	if o.ExtraBonus != 0 {
		meta["MtxBonus"] = o.ExtraBonus
	}

	if o.IconSize != "" {
		meta["IconSize"] = o.IconSize
	}

	if o.CurrencyAnalyticsName != "" {
		meta["CurrencyAnalyticsName"] = o.CurrencyAnalyticsName
	}

	return meta
}

func (o *ShopOfferMeta) RenderFortniteCatalogOfferMetaInfoResponse() []aid.JSON {
	meta := []aid.JSON{}
	if o.TileSize != "" {
		meta = append(meta, aid.JSON{
			"Key":   "TileSize",
			"Value": o.TileSize,
		})
	}
	if o.SectionID != "" {
		meta = append(meta, aid.JSON{
			"Key":   "SectionId",
			"Value": o.SectionID,
		})
	}
	if o.DisplayAssetPath != "" {
		meta = append(meta, aid.JSON{
			"Key":   "DisplayAssetPath",
			"Value": o.DisplayAssetPath,
		})
	}
	if o.NewDisplayAssetPath != "" {
		meta = append(meta, aid.JSON{
			"Key":   "NewDisplayAssetPath",
			"Value": o.NewDisplayAssetPath,
		})
	}
	if o.BannerOverride != "" {
		meta = append(meta, aid.JSON{
			"Key":   "BannerOverride",
			"Value": o.BannerOverride,
		})
	}
	if o.OriginalOffer != 0 {
		meta = append(meta, aid.JSON{
			"Key":   "MtxQuantity",
			"Value": o.OriginalOffer + o.ExtraBonus,
		})
	}
	if o.ExtraBonus != 0 {
		meta = append(meta, aid.JSON{
			"Key":   "MtxBonus",
			"Value": o.ExtraBonus,
		})
	}
	if o.IconSize != "" {
		meta = append(meta, aid.JSON{
			"Key":   "IconSize",
			"Value": o.IconSize,
		})
	}
	if o.CurrencyAnalyticsName != "" {
		meta = append(meta, aid.JSON{
			"Key":   "CurrencyAnalyticsName",
			"Value": o.CurrencyAnalyticsName,
		})
	}
	return meta
}

type ShopOfferGrant struct {
	Grant
	ShopOfferID string
}

func (g *ShopOfferGrant) TableName() string {
	return "shop_offer_grants"
}

type ShopOfferPriceEnum string

const ShopOfferPriceEnumMtxCurrency ShopOfferPriceEnum = "MtxCurrency"
const ShopOfferPriceEnumRealMoney ShopOfferPriceEnum = "RealMoney"

type ShopOfferPriceSaleEnum string

const ShopOfferPriceSaleEnumNone ShopOfferPriceSaleEnum = ""
const ShopOfferPriceSaleEnumAmountOff ShopOfferPriceSaleEnum = "AmountOff"
const ShopOfferPriceSaleEnumStrikethrough ShopOfferPriceSaleEnum = "Strikethrough"

type ShopOfferPriceMtxCurrency struct {
	ID            string `gorm:"primaryKey;index"`
	ShopOfferID   string
	PriceType     ShopOfferPriceEnum
	SaleType      ShopOfferPriceSaleEnum
	OriginalPrice int
	FinalPrice    int
}

func (p *ShopOfferPriceMtxCurrency) TableName() string {
	return "shop_offer_prices_mtxcurrency"
}

func NewShopOfferPriceMtxCurrency(offerId string) *ShopOfferPriceMtxCurrency {
	return &ShopOfferPriceMtxCurrency{
		ID:          uuid.New().String(),
		ShopOfferID: offerId,
	}
}

type ShopOfferPriceRealMoney struct {
	ID          string `gorm:"primaryKey;index"`
	ShopOfferID string
	PriceType   ShopOfferPriceEnum
	SaleType    ShopOfferPriceSaleEnum
	BasePrice   float64
	LocalPrice  float64
}

func (p *ShopOfferPriceRealMoney) TableName() string {
	return "shop_offer_prices_realmoney"
}

func NewShopOfferPriceRealMoney(offerId string) *ShopOfferPriceRealMoney {
	return &ShopOfferPriceRealMoney{
		ID:          uuid.New().String(),
		ShopOfferID: offerId,
	}
}

type OfferDisplay struct {
	ID               string `gorm:"primaryKey;index"`
	ShopOfferID      string
	Title            string
	Description      string
	ShortDescription string
	LongDescription  string
}

func (d *OfferDisplay) TableName() string {
	return "shop_offer_displays"
}

func NewOfferDisplay(offerId string) *OfferDisplay {
	return &OfferDisplay{
		ID:          uuid.New().String(),
		ShopOfferID: offerId,
	}
}

type ShopOfferTypeEnum string

const ShopOfferTypeEnumItem ShopOfferTypeEnum = "item"
const ShopOfferTypeEnumMoney ShopOfferTypeEnum = "money"
const ShopOfferTypeEnumKit ShopOfferTypeEnum = "kit"
const ShopOfferTypeEnumBook ShopOfferTypeEnum = "book"

type ShopOfferOfferFetchResponse struct {
	Offer ShopOffer
	Type  ShopOfferTypeEnum
}

type ShopOffer interface {
	OfferID() string
	OfferType() ShopOfferTypeEnum
	OfferRewards() []*ShopOfferGrant

	SetSectionID(string)
	SetPriorityShop(int)

	RenderFortniteCatalogOfferResponse() aid.JSON
	RenderFortniteBulkOffersResponse() aid.JSON

	MustItemOffer() *ShopOfferTypeItem
	MustMoneyOffer() *ShopOfferTypeMoney
	MustKitOffer() *ShopOfferTypeKit
	MustBookOffer() *ShopOfferTypeBook
}
