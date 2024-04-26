import {
  KeyHideShortsOnChannelFeed,
  KeyHideShortsOnHashtagFeed,
  KeyHideShortsOnHomeFeed,
  KeyHideShortsOnSearchFeed,
  KeyHideShortsOnSubscriptionFeed,
  KeyHideShortsOnWatchFeed,
  KeyHideTab,
  KeyRedirectShorts,
} from "../../../data/storage-keys";
import { optionHideChannelFeed } from "./hideChannelFeed";
import { optionHideHashtagFeed } from "./hideHashtagFeed";
import { optionHideHomeFeed } from "./hideHomeFeed";
import { optionHideSearchFeed } from "./hideSearchFeed";
import { optionHideSubscriptionFeed } from "./hideSubscriptionFeed";
import { optionHideTab } from "./hideTab";
import { optionHideWatchFeed } from "./hideWatchFeed";
import { optionRedirectShorts } from "./redirectShorts";

export const injectAllChanges = (data) => {
  optionRedirectShorts(data[KeyRedirectShorts]);
  optionHideHomeFeed(data[KeyHideShortsOnHomeFeed]);
  optionHideWatchFeed(data[KeyHideShortsOnWatchFeed]);
  optionHideChannelFeed(data[KeyHideShortsOnChannelFeed]);
  optionHideHashtagFeed(data[KeyHideShortsOnHashtagFeed]);
  optionHideSearchFeed(data[KeyHideShortsOnSearchFeed]);
  optionHideSubscriptionFeed(data[KeyHideShortsOnSubscriptionFeed]);
  optionHideTab(data[KeyHideTab]);
};
