export const PREFIX = "HSYT-";

export const KeyExtensionStatus = "extensionStatus";

export const KeyHideTab = "KeyHideTab";

export const KeyHideShortsOnHomeFeed = "hideShortsOnHomeFeed";
export const KeyHideShortsOnWatchFeed = "hideShortsOnWatchFeed";
export const KeyHideShortsOnSearchFeed = "hideShortsOnSearchFeed";
export const KeyHideShortsOnChannelFeed = "hideShortsOnChannelFeed";
export const KeyHideShortsOnSubscriptionFeed = "hideShortsOnSubscriptionFeed";
export const KeyHideShortsOnHashtagFeed = "hideShortsOnHashtagFeed";
export const KeyRedirectShorts = "redirectShorts";

export const settingKeys = {
  KeyExtensionStatus,

  KeyHideShortsOnHomeFeed,
  KeyHideShortsOnWatchFeed,
  KeyHideShortsOnSearchFeed,

  KeyHideShortsOnChannelFeed,
  KeyHideShortsOnSubscriptionFeed,
  KeyHideShortsOnHashtagFeed,

  KeyRedirectShorts,
  KeyHideTab,
};

export const defaultSetting = {
  [KeyExtensionStatus]: true,

  [KeyHideShortsOnHomeFeed]: true,
  [KeyHideShortsOnWatchFeed]: true,
  [KeyHideShortsOnSearchFeed]: true,

  [KeyHideShortsOnChannelFeed]: true,
  [KeyHideShortsOnSubscriptionFeed]: true,
  [KeyHideShortsOnHashtagFeed]: true,

  [KeyRedirectShorts]: false,
  [KeyHideTab]: true,
};
