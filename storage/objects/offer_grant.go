package objects

import (
	"github.com/ectrc/snow/aid"
)

func NewShopGrant(backendValue BackendTypeEnum, id string) *ShopOfferGrant {
	return &ShopOfferGrant{
		Grant: *NewGrant(backendValue, id),
	}
}

func NewShopGrantComplex(backendValue BackendTypeEnum, id string, quantity int, profileType ProfileTypeEnum, render bool) *ShopOfferGrant {
	g := &ShopOfferGrant{
		Grant: *NewGrantComplex(backendValue, id, quantity, profileType, aid.Ternary[GrantStatusBitwise](render, 0b0, 0b1)),
	}

	if !render {
		g.Grant.Status.Add(ItemStatusEnumHidden)
	}

	return g
}

func NewGrantFromExisting(grant *Grant) *ShopOfferGrant {
	return &ShopOfferGrant{
		Grant: *grant,
	}
}
