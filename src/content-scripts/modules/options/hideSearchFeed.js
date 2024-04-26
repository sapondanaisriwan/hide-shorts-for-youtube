import styles from "../../css/styles";
import { KeyHideShortsOnSearchFeed, PREFIX } from "../../../data/storage-keys";
import { addStyle } from "../utils/addStyle";
import { isCSSHasSupport, observerConfig } from "../utils/config";
import { queryShortVideoLinks } from "../utils/queryElement";
import { removeElementById } from "../utils/removeElement";

const hideShortsOnSearchFeed = (hideShorts) => {
  queryShortVideoLinks().forEach((shortVideoLink) => {
    const video = shortVideoLink.closest("ytd-search ytd-video-renderer");
    const reelShelf = shortVideoLink.closest(
      "ytd-search ytd-reel-shelf-renderer"
    );

    hideElementIfNotHidden(video, hideShorts);
    hideElementIfNotHidden(reelShelf, hideShorts);
  });
};

const mutationObserver = new MutationObserver(hideShortsOnSearchFeed);

export const optionHideSearchFeed = (value) => {
  // https://www.youtube.com/results?search_query=shorts

  if (!isCSSHasSupport) {
    hideShortsOnSearchFeed(value);
    if (!value) {
      mutationObserver.disconnect();
      return;
    }
    mutationObserver.observe(document.documentElement, observerConfig);
    return;
  }

  if (!value) {
    const styleId = `${PREFIX}${KeyHideShortsOnSearchFeed}`;
    removeElementById(styleId);
    return;
  }
  addStyle(KeyHideShortsOnSearchFeed, styles.hideShortsSearchFeed);
};
