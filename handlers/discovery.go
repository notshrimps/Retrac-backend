package handlers

import (
	"regexp"
	"strconv"
	"strings"

	"github.com/ectrc/snow/aid"
	"github.com/gofiber/fiber/v2"
)

func GetContentPages(c *fiber.Ctx) error {
	re := regexp.MustCompile(`Release-(\d+\.\d+)`)
	matches := re.FindStringSubmatch(c.Get("User-Agent"))
	if len(matches) > 1 {
		floatVersion, err := strconv.ParseFloat(matches[1], 8)
		if err != nil {
			c.Locals("season_str", "0")
			c.Locals("season", 0)
			c.Locals("version", 0.0)
		}

		season, err := strconv.Atoi(strings.Split(matches[1], ".")[0])
		if err != nil {
			c.Locals("season_str", "0")
			c.Locals("season", 0)
			c.Locals("version", 0.0)
		}

		c.Locals("season_str", strings.Split(matches[1], ".")[0])
		c.Locals("season", season)
		c.Locals("version", floatVersion)
	} else {
		c.Locals("season_str", "0")
		c.Locals("season", 0)
		c.Locals("version", 0.0)
	}

	seasonString := c.Locals("season_str").(string)

	playlists := aid.Ternary(seasonString == "14", []aid.JSON{
		{
			"image": "https://cdn.snows.rocks/playlist/squads_s14.png",
			"playlist_name": "Playlist_DefaultSquad",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/duos_s14.png",
			"playlist_name": "Playlist_DefaultDuo",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/solo_s14.png",
			"playlist_name": "Playlist_DefaultSolo",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/arena_solo_s14.png",
			"playlist_name": "Playlist_ShowdownAlt_Solo",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/arena_duos.png",
			"playlist_name": "Playlist_ShowdownAlt_Duos",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/lategame_solo.png",
			"playlist_name": "Playlist_Vamp_Solo",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/getaway.jpg",
			"playlist_name": "Playlist_Bling_Solo",
			"hidden": false,
		},
	}, []aid.JSON{
		{
			"image": "https://cdn.snows.rocks/playlist/squads.png",
			"playlist_name": "Playlist_DefaultSquad",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/duos.png",
			"playlist_name": "Playlist_DefaultDuo",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/solo.png",
			"playlist_name": "Playlist_DefaultSolo",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/arena_solo.png",
			"playlist_name": "Playlist_ShowdownAlt_Solo",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/arena_duos.png",
			"playlist_name": "Playlist_ShowdownAlt_Duos",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/lategame_solo.png",
			"playlist_name": "Playlist_Vamp_Solo",
			"hidden": false,
		},
		{
			"image": "https://cdn.snows.rocks/playlist/getaway.jpg",
			"playlist_name": "Playlist_Bling_Solo",
			"hidden": false,
		},
	})

	backgrounds := []aid.JSON{}
	switch aid.Config.Fortnite.Season {
	case 11:
		backgrounds = append(backgrounds, aid.JSON{
			"key": "lobby",
			"stage": "Winter19",
		})
	default:
		backgrounds = append(backgrounds, aid.JSON{
			"key": "lobby",
			"stage": "season" + seasonString,
		})
	}

	return c.Status(fiber.StatusOK).JSON(aid.JSON{
		"subgameselectdata": aid.JSON{
			"saveTheWorldUnowned": aid.JSON{
				"message": aid.JSON{
					"title": "Co-op PvE",
					"body": "Cooperative PvE storm-fighting adventure!",
					"spotlight": false,
					"hidden": true,
					"messagetype": "normal",
					"image": "https://cdn.snows.rocks/playlist/loading_stw.png",
				},
			},
			"saveTheWorld": aid.JSON{
				"message": aid.JSON{
					"title": "Co-op PvE",
					"body": "Cooperative PvE storm-fighting adventure!",
					"spotlight": false,
					"hidden": true,
					"messagetype": "normal",
					"image": "https://cdn.snows.rocks/playlist/loading_stw.png",
				},
			},
			"battleRoyale": aid.JSON{
				"message": aid.JSON{
					"title": "100 Player PvP",
					"body": "100 Player PvP Battle Royale.\n\nPvE progress does not affect Battle Royale.",
					"spotlight": false,
					"hidden": true,
					"messagetype": "normal",
					"image": "https://cdn.snows.rocks/playlist/loading_br.png",
				},
			},
			"creative": aid.JSON{
				"message": aid.JSON{
					"title": "New Featured Islands!",
					"body": "Your Island. Your Friends. Your Rules.\n\nDiscover new ways to play Fortnite, play community made games with friends and build your dream island.",
					"spotlight": false,
					"hidden": true,
					"messagetype": "normal",
				},
			},
			"lastModified": "0000-00-00T00:00:00.000Z",
		},
		"dynamicbackgrounds": aid.JSON{
			"backgrounds": aid.JSON{"backgrounds": backgrounds},
			"lastModified": "0000-00-00T00:00:00.000Z",
		},
		"shopSections": aid.JSON{
			"sectionList": aid.JSON{
				"sections": []aid.JSON{
					{
            "bSortOffersByOwnership": false,
            "bShowIneligibleOffersIfGiftable": false,
            "bEnableToastNotification": true,
            "background":  aid.JSON{
              "stage": "default",
              "_type": "DynamicBackground",
              "key": "vault",
            },
            "_type": "ShopSection",
            "landingPriority": 99,
            "bHidden": false,
            "sectionId": "Retrac",
            "bShowTimer": true,
            "sectionDisplayName": "Thanks for playing Retrac!",
            "bShowIneligibleOffers": true,
          },
          {
            "bSortOffersByOwnership": false,
            "bShowIneligibleOffersIfGiftable": false,
            "bEnableToastNotification": true,
            "background":  aid.JSON{
              "stage": "default",
              "_type": "DynamicBackground",
              "key": "vault",
            },
            "_type": "ShopSection",
            "landingPriority": 0,
            "bHidden": false,
            "sectionId": "Featured",
            "bShowTimer": true,
            "sectionDisplayName": "Featured",
            "bShowIneligibleOffers": true,
          },
          {
            "bSortOffersByOwnership": false,
            "bShowIneligibleOffersIfGiftable": false,
            "bEnableToastNotification": true,
            "background":  aid.JSON{
              "stage": "default",
              "_type": "DynamicBackground",
              "key": "vault",
            },
            "_type": "ShopSection",
            "landingPriority": 1,
            "bHidden": false,
            "sectionId": "Daily",
            "bShowTimer": true,
            "sectionDisplayName": "Daily",
            "bShowIneligibleOffers": true,
          },
          {
            "bSortOffersByOwnership": false,
            "bShowIneligibleOffersIfGiftable": false,
            "bEnableToastNotification": false,
            "background":  aid.JSON{
              "stage": "default",
              "_type": "DynamicBackground",
              "key": "vault",
            },
            "_type": "ShopSection",
            "landingPriority": 2,
            "bHidden": false,
            "sectionId": "Battlepass",
            "bShowTimer": false,
            "sectionDisplayName": "Battle Pass",
            "bShowIneligibleOffers": false,
          },
        },
			},
			"lastModified": "0000-00-00T00:00:00.000Z",
		},
		"playlistinformation": aid.JSON{
			"conversion_config": aid.JSON{
				"enableReferences": true,
				"containerName": "playlist_info",
				"contentName": "playlists",
			},
			"playlist_info": aid.JSON{
				"playlists": playlists,
			},
			"is_tile_hidden": false,
			"show_ad_violator": false,
			"frontend_matchmaking_header_style": "Basic",
			"frontend_matchmaking_header_text_description": "Watch @ 3PM EST",
			"frontend_matchmaking_header_text": "ECS Qualifiers",
			"lastModified": "0000-00-00T00:00:00.000Z",
		},
		"tournamentinformation": aid.JSON{
			"tournament_info": aid.JSON{
				"tournaments": []aid.JSON{
					{
						"tournament_display_id": "SnowArenaLategameSolo",
						"playlist_tile_image": "https://cdn.snows.rocks/playlist/arena_solo_s14.png",
						"title_line_2" : "LATEGAME ARENA",
					},
					{
						"tournament_display_id": "SnowArenaDuos",
						"playlist_tile_image": "https://cdn.snows.rocks/playlist/arena_duos.png",
						"title_line_2" : "ARENA",
					},
				},
			},
			"lastModified": "0000-00-00T00:00:00.000Z",
		},
		// "emergencynotice": aid.JSON{
		// 	"news": aid.JSON{
		// 		"messages": []aid.JSON{
		// 			{
		// 				"hidden": false,
		// 				"_type": "CommonUI Simple Message Base",
		// 				"title": "Lategame Solos",
		// 				"body": "We're currently experiencing issues with lategame solos. We're working on a fix and will update you when we have more information.",
		// 				"spotlight": true,
		// 			},
		// 		},
		// 	},
		// 	"alwaysShow": true,
		// 	"lastModified": "0000-00-00T00:00:00.000Z",
		// },
		// "battleroyalenews": aid.JSON{
		// 	"news": aid.JSON{
		// 		"messages": []aid.JSON{
		// 			{
		// 				"title": "Retrac",
		// 				"body": "Thank you for playing Retrac! We hope you enjoy the game. Please report any bugs or issues to our Discord server. Have fun!",
		// 				"spotlight": false,
		// 				"image": "https://cdn.snows.rocks/images/news1.png",
		// 				"hidden": false,
		// 				"messagetype": "normal",
		// 			},
		// 			{
		// 				"title": "Player Reporting",
		// 				"body": "We have added a new player reporting system. You can now report players for cheating, teaming, or other rule violations. Please use this system responsibly.",
		// 				"spotlight": false,
		// 				"image": "https://cdn.snows.rocks/images/news2.png",
		// 				"hidden": false,
		// 				"messagetype": "normal",
		// 			},
		// 		},
		// 	},
		// 	"header": "",
		// 	"style": "None",
		// 	"alwaysShow": true,
		// 	"lastModified": "0000-00-00T00:00:00.000Z",
		// },
		"battleroyalenewsv2": aid.JSON{
			"news": aid.JSON{
				"motds": []aid.JSON{
					/*
					struct FAthenaNewsEntry
						{
						public:
							enum class EAthenaNewsEntryType              EntryType;                                         // 0x0(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							uint8                                        Pad_3BE4[0x7];                                     // Fixing Size After Last Property  [ Dumper-7 ]
							class FString                                ID;                                                // 0x8(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                TabTitleOverride;                                  // 0x18(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                Title;                                             // 0x28(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                Body;                                              // 0x38(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                Image;                                             // 0x48(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                TileImage;                                         // 0x58(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                ButtonTextOverride;                                // 0x68(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                AdSpace;                                           // 0x78(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							bool                                         SpotLight;                                         // 0x88(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							bool                                         bHidden;                                           // 0x89(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							uint8                                        Pad_3BE5[0x2];                                     // Fixing Size After Last Property  [ Dumper-7 ]
							enum class ESubGameFilter                    SubGameFilter;                                     // 0x8C(0x4)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                PlaylistId;                                        // 0x90(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							bool                                         bHasCustomColor;                                   // 0xA0(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							uint8                                        Pad_3BE6[0x3];                                     // Fixing Size After Last Property  [ Dumper-7 ]
							struct FColor                                CustomDarkColor;                                   // 0xA4(0x4)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							struct FColor                                CustomLightColor;                                  // 0xA8(0x4)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							uint8                                        Pad_3BE7[0x4];                                     // Fixing Size After Last Property  [ Dumper-7 ]
							int64                                        SortingPriority;                                   // 0xB0(0x8)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							int32                                        ExperimentPercent;                                 // 0xB8(0x4)(ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							int32                                        ExperimentId;                                      // 0xBC(0x4)(ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                OfferId;                                           // 0xC0(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							enum class EItemShopNavigationAction         OfferAction;                                       // 0xD0(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							uint8                                        Pad_3BE8[0x7];                                     // Fixing Size After Last Property  [ Dumper-7 ]
							class FString                                OfferButtonText;                                   // 0xD8(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                ChallengeCategoryTag;                              // 0xE8(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                WebsiteURL;                                        // 0xF8(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                WebsiteButtonText;                                 // 0x108(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							enum class EFortUIFeature                    NavigateToTabValue;                                // 0x118(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							uint8                                        Pad_3BE9[0x7];                                     // Fixing Size After Last Property  [ Dumper-7 ]
							class FString                                NavigateToTabButtonText;                           // 0x120(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                STWUpsellButtonText;                               // 0x130(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							uint8                                        Pad_3BEA[0x30];                                    // Fixing Size After Last Property  [ Dumper-7 ]
							class FString                                VideoButtonText;                                   // 0x170(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                VideoVideoString;                                  // 0x180(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                VideoStreamingVideoID;                             // 0x190(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                VideoFallbackVideoID;                              // 0x1A0(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                VideoProdLinkID;                                   // 0x1B0(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							class FString                                VideoGamedevLinkID;                                // 0x1C0(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							bool                                         VideoAutoplay;                                     // 0x1D0(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							bool                                         VideoForceAutoplay;                                // 0x1D1(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							bool                                         VideoLoop;                                         // 0x1D2(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							bool                                         VideoMute;                                         // 0x1D3(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							bool                                         VideoFullscreen;                                   // 0x1D4(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							bool                                         VideoStreamingEnabled;                             // 0x1D5(0x1)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, IsPlainOldData, NoDestructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							uint8                                        Pad_3BEB[0x2];                                     // Fixing Size After Last Property  [ Dumper-7 ]
							class FString                                VideoUID;                                          // 0x1D8(0x10)(BlueprintVisible, BlueprintReadOnly, ZeroConstructor, HasGetValueTypeHash, NativeAccessSpecifierPublic)
							uint8                                        Pad_3BEC[0x8];                                     // Fixing Size Of Struct [ Dumper-7 ]
						};*/
					{
						"id": "news1",
						/*
						enum class EAthenaNewsEntryType : uint8
						{
							Text                           = 0,
							Item                           = 1,
							RMTItem                        = 2,
							Website                        = 3,
							NavigateToTab                  = 4,
							SmallNews                      = 5,
							STWUpsell                      = 6,
							Challenge                      = 7,
							SpatialBattlePass              = 8,
							BattlePassPurchaseScreen       = 9,
							Setting                        = 10,
							Playlist                       = 11,
							NavigateToSpatialScreen        = 12,
							EAthenaNewsEntryType_MAX       = 13,
						};*/
						"entryType": "Text",
						"image": "https://cdn.snows.rocks/images/news1.png",
						"tileImage": "https://cdn.snows.rocks/images/newstile2.png",
						"hidden": false,
						"title": "Thank you for playing Retrac!",
						"body": "Thank you for playing Retrac! We hope you enjoy the game. Please report any bugs or issues to our Discord server. Have fun!",
						"sortingPriority": 0,
						"spotlight": false,
					},
					{
						"id": "news2",
						"entryType": "Text",
						"image": "https://cdn.snows.rocks/images/news2.png",
						"tileImage": "https://cdn.snows.rocks/images/newstile1.png",
						"hidden": true,
						"title": "Player Reporting",
						"body": "We have added a new player reporting system. You can now report players for cheating, teaming, or other rule violations. Please use this system responsibly.",
						"sortingPriority": 1,
						"spotlight": true,
					},
				},
			},
			"alwaysShow": true,
			"lastModified": "0000-00-00T00:00:00.000Z",
		},
		"lastModified": "0000-00-00T00:00:00.000Z",
	})
}