package storage

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/ectrc/snow/aid"
)

func GetDefaultEngine() []byte {
	portNumber, err := strconv.Atoi(aid.Config.API.Port[1:])
	if err != nil {
		return nil
	}
	portNumber++
	realPort := fmt.Sprintf("%d", portNumber)

	str := `
[XMPP]
bEnableWebsockets=true

[OnlineSubsystem]
bHasVoiceEnabled=true

[ConsoleVariables]
Store.EnableCatabaScreen=1
Store.EnableCatabaHighlights=1

[ConsoleVariables]
n.VerifyPeer=0
FortMatchmakingV2.ContentBeaconFailureCancelsMatchmaking=0
Fort.ShutdownWhenContentBeaconFails=0
FortMatchmakingV2.EnableContentBeacon=0

[Core.Log]
LogPurchaseFlow=verbose

[/Script/Qos.QosRegionManager]
NumTestsPerRegion=5
PingTimeout=3.0
!RegionDefinitions=ClearArray
+RegionDefinitions=(DisplayName=NSLOCTEXT("MMRegion", "Europe", "Europe"), RegionId="EU", bEnabled=true, bVisible=true, bAutoAssignable=true)
+RegionDefinitions=(DisplayName=NSLOCTEXT("MMRegion", "North America", "North America"), RegionId="NA", bEnabled=true, bVisible=true, bAutoAssignable=true)
+RegionDefinitions=(DisplayName=NSLOCTEXT("MMRegion", "Oceania", "Oceania"), RegionId="OCE", bEnabled=true, bVisible=true, bAutoAssignable=true)
!DatacenterDefinitions=ClearArray
+DatacenterDefinitions=(Id="DE", RegionId="EU", bEnabled=true, Servers[0]=(Address="142.132.145.234", Port=22222))
+DatacenterDefinitions=(Id="VA", RegionId="NA", bEnabled=true, Servers[0]=(Address="69.10.34.38", Port=22222))
;+DatacenterDefinitions=(Id="SYD", RegionId="OCE", bEnabled=true, Servers[0]=(Address="139.99.209.91", Port=22222))
!Datacenters=ClearArray
+Datacenters=(DisplayName=NSLOCTEXT("MMRegion", "Europe", "Europe"), RegionId="EU", bEnabled=true, bVisible=true, bBeta=false, Servers[0]=(Address="142.132.145.234", Port=22222))
+Datacenters=(DisplayName=NSLOCTEXT("MMRegion", "North America", "North America"), RegionId="NA", bEnabled=true, bVisible=true, bBeta=false, Servers[0]=(Address="69.10.34.38", Port=22222))
;+Datacenters=(DisplayName=NSLOCTEXT("MMRegion", "Oceania", "Oceania"), RegionId="OCE", bEnabled=true, bVisible=true, bBeta=false, Servers[0]=(Address="139.99.209.91", Port=22222))`

	if aid.Config.Fortnite.Season <= 2 {
		str += `
[OnlineSubsystemMcp.Xmpp]
bUsePlainTextAuth=true
bUseSSL=false
Protocol=tcp
ServerAddr="` + strings.ReplaceAll(aid.Config.API.XmppDomain, "ws://", "") + `"
ServerPort=` + realPort + `

[OnlineSubsystemMcp.Xmpp Prod]
bUsePlainTextAuth=true
bUseSSL=false
Protocol=tcp
ServerAddr="` + strings.ReplaceAll(aid.Config.API.XmppDomain, "ws://", "") + `"
ServerPort=` + realPort
	} else {
		str += `
[OnlineSubsystemMcp.Xmpp]
bUseSSL=false
Protocol=ws
ServerAddr="ws://` + strings.ReplaceAll(aid.Config.API.XmppDomain, "ws://", "") + `/?SNOW_SOCKET_CONNECTION"

[OnlineSubsystemMcp.Xmpp Prod]
bUseSSL=false
Protocol=ws
ServerAddr="ws://` + strings.ReplaceAll(aid.Config.API.XmppDomain, "ws://", "") + `/?SNOW_SOCKET_CONNECTION"`
	}

	return []byte(str)
}

func GetDefaultGame() []byte {
	return []byte(`
[/Script/Engine.AssetManagerSettings]
+PrimaryAssetTypesToScan=(PrimaryAssetType="AthenaCharacter",AssetBaseClass=/Script/FortniteGame.AthenaCharacterItemDefinition,bHasBlueprintClasses=False,bIsEditorOnly=False,Directories=((Path="/Game/Athena/Items/Cosmetics/Characters"),(Path="/Game/Retrac/Items/Cosmetics/Characters")),SpecificAssets=,Rules=(Priority=20,bApplyRecursively=True,ChunkId=1,CookRule=AlwaysCook)

[/Script/FortniteGame.FortGlobals]
bAllowLogout=false
bEnableCreativeMode=false
bTwitchEnabled=false
bEnableAccountLinkingUIURLButton=true
bUploadAthenaStats=true
bUploadAthenaStatsV2=true

[/Script/FortniteGame.FortChatManager]
bShouldRequestGeneralChatRooms=false
bShouldJoinGlobalChat=false
bShouldJoinFounderChat=false
bIsAthenaGlobalChatEnabled=false

[/Script/FortniteGame.FortOnlineAccount]
bEnableEulaCheck=false
bShouldCheckIfPlatformAllowed=false
!WebCreateEpicAccountUrl=ClearArray
+WebCreateEpicAccountUrl=("https://retrac.site")

[/Script/FortniteGame.FortTextHotfixConfig]
; lategame gamemode frotnend swap
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="C37042DB4C4F5AE15CB9999C67869AB1", NativeString="Siphon", LocalizedStrings=(("en","Lategame")))
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="EB35C2D1457494740BA86FA27F922402", NativeString="All healing items have been removed in this mode. The only way to gain health or shields is to eliminate your opponents!", LocalizedStrings=(("en","All loadouts are randomised, storm circles move a lot faster and start very small. Go and test your skills in this fast-paced mode!")))

;lategame loading swap ;6DBE8B5848ADF7160F4C859FC521CB39
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="C45E55E44651471AFC07068F98546283", NativeString="Siphon", LocalizedStrings=(("en","Lategame")))
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="0C6895884EFF128AAD75DFA9E059AE63", NativeString="No Healing Items", LocalizedStrings=(("en","Fast Storm Circles")))
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="85CA91444D4C2AC56CBDC7ABB0D84996", NativeString="Don't bother searching for bandages or shield pots - eliminations are the only way to gain health.", LocalizedStrings=(("en","Storm circles move a lot faster and start very small, make sure to keep moving!")))
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="63B94DA0479A3B1687CDA589E5CA350D", NativeString="Guns... lots of Guns", LocalizedStrings=(("en","Random Loadouts")))
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="BB812BFA4276FF5A95668A893B41FDC6", NativeString="No healing items means lots of room in your inventory for weapons. " LocalizedStrings=(("en","Randomised loadouts mean you'll have to adapt to whatever you're given!")))

; boost pack
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="68ADE44C49B20BFF78677799BE68B0EE", NativeString="FORTNITEMARES", LocalizedStrings=(("en","BOOST REWARDS")))
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="BE6B17BD456F3F13EEB2998AF91DC717", NativeString="THANKS FOR PLAYING!", LocalizedStrings=(("en","THANKS FOR SUPPORTING RETRAC!")))

; battle pass
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="54C9718147D3D3B3348A48AB947C505A", NativeString="PURCHASE", LocalizedStrings=(("en","CLAIM")))
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="3700E1CC4D2EE557556D8EA7E342999F", NativeString="You can purchase the Battle Pass to claim all the rewards you’ve earned.", LocalizedStrings=(("en","Claim a free Season 8 Battle Pass to collect the rewards you’ve earned!")))

; arena A4EB1D3F49DBBC0B9EE9DC8D3F6A6196
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="38E78EA54967AD3E123D289F41C0CFB7", NativeString="Congratulations on your excellent performance in a recent tournament event!", LocalizedStrings=(("en","Congratulations on your excellent performance in arena!")))
+TextReplacements=(Category=Game, bIsMinimalPatch=True, Namespace="", Key="A4EB1D3F49DBBC0B9EE9DC8D3F6A6196", NativeString="{0} {0}|plural(one=Elimination,other=Eliminations)", LocalizedStrings=(("en","{0}|plural(one=Each Elimination,other=Every {0} Eliminations)")))

[/Script/FortniteGame.FortGameInstance]
!FrontEndPlaylistData=ClearArray
+FrontEndPlaylistData=(PlaylistName=Playlist_DefaultSolo, PlaylistAccess=(bEnabled=False, bIsDefaultPlaylist=True, bVisibleWhenDisabled=True, bDisplayAsNew=False, CategoryIndex=0, bDisplayAsLimitedTime=False, DisplayPriority=0))
+FrontEndPlaylistData=(PlaylistName=Playlist_DefaultDuo, PlaylistAccess=(bEnabled=False, bIsDefaultPlaylist=False, bVisibleWhenDisabled=True, bDisplayAsNew=False, CategoryIndex=0, bDisplayAsLimitedTime=False, DisplayPriority=1))
+FrontEndPlaylistData=(PlaylistName=Playlist_DefaultSquad, PlaylistAccess=(bEnabled=False, bIsDefaultPlaylist=False, bVisibleWhenDisabled=True, bDisplayAsNew=False, CategoryIndex=0, bDisplayAsLimitedTime=False, DisplayPriority=2))
+FrontEndPlaylistData=(PlaylistName=Playlist_Vamp_Solo, PlaylistAccess=(bEnabled=True, bIsDefaultPlaylist=True, bVisibleWhenDisabled=True, bDisplayAsNew=True, CategoryIndex=1, bDisplayAsLimitedTime=False, DisplayPriority=1))
;+FrontEndPlaylistData=(PlaylistName=Playlist_Bling_Solo, PlaylistAccess=(bEnabled=False, bIsDefaultPlaylist=True, bVisibleWhenDisabled=True, bDisplayAsNew=True, CategoryIndex=1, bDisplayAsLimitedTime=True, DisplayPriority=0))

;+FrontEndPlaylistData=(PlaylistName=Playlist_ShowdownAlt_Solo, PlaylistAccess=(bEnabled=False, bIsDefaultPlaylist=False, bVisibleWhenDisabled=True, bDisplayAsNew=False, CategoryIndex=1, bDisplayAsLimitedTime=False, DisplayPriority=0))
;+FrontEndPlaylistData=(PlaylistName=Playlist_ShowdownAlt_Duos, PlaylistAccess=(bEnabled=False, bIsDefaultPlaylist=False, bVisibleWhenDisabled=True, bDisplayAsNew=False, CategoryIndex=1, bDisplayAsLimitedTime=False, DisplayPriority=1))

CosmeticsBlacklistedByHotfix=("AthenaCharacter:CID_VIP_Athena_Commando_M_GalileoGondola_SG", "AthenaCharacter:CID_637_Athena_Commando_M_GalileoOutrigger_7Q0YU", "AthenaCharacter:CID_636_Athena_Commando_M_GalileoGondola_78MFZ", "BID_TBD_MechanicalEngineer_Owl", "CID_TBD_Athena_Commando_M_Banana_CINE")
`)
}

func GetDefaultRuntime() []byte {
	return []byte(`
[/Script/FortniteGame.FortRuntimeOptions]
!DisabledFrontendNavigationTabs=ClearArray
+DisabledFrontendNavigationTabs=(TabName="AthenaChallenges",TabState=EFortRuntimeOptionTabState::Hidden)
+DisabledFrontendNavigationTabs=(TabName="Showdown",TabState=EFortRuntimeOptionTabState::Hidden)
;+DisabledFrontendNavigationTabs=(TabName="AthenaStore",TabState=EFortRuntimeOptionTabState::Hidden)
bShowStoreBanner=true
bEnableCatabaDynamicBackground=true
NewMtxStoreCohortSampleSet=100
+ExperimentalCohortPercent=(CohortPercent=100,ExperimentNum=14)
+ExperimentalCohortPercent=(CohortPercent=100,ExperimentNum=15)
bForceBRMode=True
bSkipSubgameSelect=True
bLoadDirectlyIntoLobby=True
bEnableInGameMatchmaking=True
MinimumAccountLevelForTournamentPlay=0
bSkipTrailerMovie=true
bAlwaysPlayTrailerMovie=false
ShowdownTournamentCacheExpirationHours=1
TournamentRefreshPlayerMaxRateSeconds=60
TournamentRefreshEventsMaxRateSeconds=60
TournamentRefreshPayoutMaxRateSeconds=60
bEnableGlobalChat=true
bDisableGifting=false
bDisableGiftingPC=false
bDisableGiftingPS4=false
bDiableGiftingXB=false
CreateAccountUrl="https://retrac.site"
MaxPartySizeAthena=16
MaxPartySizeCampaign=16
MaxSquadSize=16
bAllowMimicingEmotes=true
+ExperimentalCohortPercent=(CohortPercent=100,ExperimentNum=20)
+ExperimentalCohortPercent=(CohortPercent=100,ExperimentNum=14)
+ExperimentalCohortPercent=(CohortPercent=100,ExperimentNum=15)`)
}
