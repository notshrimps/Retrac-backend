package objects

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/google/uuid"
)

type ProfileTypeEnum string
const (
	ProfileTypeEnumAthena     ProfileTypeEnum = "athena"
	ProfileTypeEnumCreative   ProfileTypeEnum = "creative"
	ProfileTypeEnumCommonCore ProfileTypeEnum = "common_core"
)

type ItemTypeEnum string
const (
	ItemTypeEnumCosmetic ItemTypeEnum = "Cosmetic"
	ItemTypeEnumCurrency ItemTypeEnum = "Currency"
	ItemTypeEnumLoot     ItemTypeEnum = "Loot"
	ItemTypeEnumGift     ItemTypeEnum = "Gift"
	ItemTypeEnumLoadout  ItemTypeEnum = "Loadout"
	ItemTypeEnumPurchase ItemTypeEnum = "Purchase"
)

type BackendTypeEnum string
const (
	BackendTypeEnumCharacter            BackendTypeEnum = "AthenaCharacter"
	BackendTypeEnumBackpack             BackendTypeEnum = "AthenaBackpack"
	BackendTypeEnumPickaxe              BackendTypeEnum = "AthenaPickaxe"
	BackendTypeEnumGlider               BackendTypeEnum = "AthenaGlider"
	BackendTypeEnumDance                BackendTypeEnum = "AthenaDance"
	BackendTypeEnumEmoji                BackendTypeEnum = "AthenaDance"
	BackendTypeEnumSpray                BackendTypeEnum = "AthenaDance"
	BackendTypeEnumToy                  BackendTypeEnum = "AthenaDance"
	BackendTypeEnumWrap                 BackendTypeEnum = "AthenaItemWrap"
	BackendTypeEnumMusicPack            BackendTypeEnum = "AthenaMusicPack"
	BackendTypeEnumLoadingScreen        BackendTypeEnum = "AthenaLoadingScreen"
	BackendTypeEnumContrail             BackendTypeEnum = "AthenaSkyDiveContrail"
	BackendTypeEnumLocker               BackendTypeEnum = "AthenaCosmeticLocker"
	BackendTypeEnumPersistentResource   BackendTypeEnum = "AccountResource"
	BackendTypeEnumCurrency             BackendTypeEnum = "Currency"
	BackendTypeEnumToken                BackendTypeEnum = "Token"
	BackendTypeEnumCosmeticVariantToken BackendTypeEnum = "CosmeticVariatnToken"
	BackendTypeEnumChallengeSchedule    BackendTypeEnum = "ChallengeBundleSchedule"
	BackendTypeEnumGiftBox              BackendTypeEnum = "GiftBox"
	BackendTypeEnumBannerIcon           BackendTypeEnum = "HomebaseBannerIcon"
	BackendTypeEnumBannerColor          BackendTypeEnum = "HomebaseBannerColor"
	BackendTypeEnumPurchase             BackendTypeEnum = "Purchase"
	BackendTypeEnumSnow             		BackendTypeEnum = "Snow"
)

var backendTypePaths = map[string]BackendTypeEnum{
	"Game/Athena/Items/Cosmetics/Characters":     BackendTypeEnumCharacter,
	"Game/Athena/Items/Cosmetics/Backpacks":      BackendTypeEnumBackpack,
	"Game/Athena/Items/Cosmetics/PetCarriers":    BackendTypeEnumBackpack,
	"Game/Athena/Items/Cosmetics/Pets":           BackendTypeEnumBackpack,
	"Game/Athena/Items/Cosmetics/Pickaxes":       BackendTypeEnumPickaxe,
	"Game/Athena/Items/Cosmetics/Gliders":        BackendTypeEnumGlider,
	"Game/Athena/Items/Cosmetics/Dances":         BackendTypeEnumDance,
	"Game/Athena/Items/Cosmetics/Sprays":         BackendTypeEnumSpray,
	"Game/Athena/Items/Cosmetics/Toys":           BackendTypeEnumToy,
	"Game/Athena/Items/Cosmetics/ItemWraps":      BackendTypeEnumWrap,
	"Game/Athena/Items/Cosmetics/MusicPacks":     BackendTypeEnumMusicPack,
	"Game/Athena/Items/Cosmetics/LoadingScreens": BackendTypeEnumLoadingScreen,
	"Game/Athena/Items/Cosmetics/Contrails":      BackendTypeEnumContrail,
	"Game/Items/PersistentResource":              BackendTypeEnumPersistentResource,
	"Game/Items/Currency":                        BackendTypeEnumCurrency,
	"Game/Items/Tokens":                          BackendTypeEnumToken,
	"Game/Athena/Items/CosmeticVariantTokens":    BackendTypeEnumCosmeticVariantToken,
	"Game/Athena/Items/ChallengeBundleSchedules": BackendTypeEnumChallengeSchedule,
}

type GrantStatusBitwise int
const (
	ItemStatusEnumHidden GrantStatusBitwise = 0b1 << iota
	ItemStatusEnumFavorite
	ItemStatusEnumSeen
	ItemStatusEnumStackable
)

func (s *GrantStatusBitwise) Add(status GrantStatusBitwise) {
	*s |= status
}

func (s *GrantStatusBitwise) Remove(status GrantStatusBitwise) {
	*s &= ^status
}

func (s GrantStatusBitwise) Has(status GrantStatusBitwise) bool {
	return s&status == status
}

type Grant struct {
	ID           string `gorm:"primaryKey;index"`
	Template     string
	BackendValue BackendTypeEnum
	Quantity     int
	ProfileType  ProfileTypeEnum
	Status       GrantStatusBitwise
}

func NewGrant(backendValue BackendTypeEnum, template string) *Grant {
	return &Grant{
		ID:           uuid.NewString(),
		Template:     template,
		BackendValue: backendValue,
		Quantity:     1,
		ProfileType:  ProfileTypeEnumAthena,
	}
}

func NewGrantComplex(backendValue BackendTypeEnum, template string, quantity int, profileType ProfileTypeEnum, status GrantStatusBitwise) *Grant {
	return &Grant{
		ID:           uuid.NewString(),
		Template:     template,
		BackendValue: backendValue,
		Quantity:     quantity,
		ProfileType:  profileType,
		Status:       status,
	}
}

func NewGrantFromFullPath(path string) *Grant {
	var pathRegex = regexp.MustCompile(`\.(.*)`)
	assetPathParts := pathRegex.FindStringSubmatch(path)
	if len(assetPathParts) <= 1 {
		return nil
	}

	for path, backendValue := range backendTypePaths {
		if strings.Contains(path, path) {
			return NewGrant(backendValue, assetPathParts[1])
		}
	}

	return nil
}

func (s *Grant) TemplateID() string {
	return fmt.Sprintf("%s:%s", s.BackendValue, s.Template)
}
