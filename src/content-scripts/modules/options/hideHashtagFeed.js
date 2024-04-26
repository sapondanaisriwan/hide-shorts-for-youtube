import styles from "../../css/styles";
import { KeyHideShortsOnHashtagFeed, PREFIX } from "../../../data/storage-keys";
import { addStyle } from "../utils/addStyle";
import { isCSSHasSupport, observerConfig } from "../utils/config";
import { removeElementById } from "../utils/removeElement";
import { queryShortVideoLinks } from "../utils/queryElement";
import { hideElementIfNotHidden } from "../utils/hideElement";

const hideShortsOnHashtagFeed = (hideShorts) => {
  queryShortVideoLinks().forEach((shortVideoLink) => {
    const richItem = shortVideoLink.closest(
      `[page-subtype="hashtag-landing-page"] ytd-rich-item-renderer`
    );
    hideElementIfNotHidden(richItem, hideShorts);
  });
};

const mutationObserver = new MutationObserver(hideShortsOnHashtagFeed);

export const optionHideHashtagFeed = (value) => {
  // https://www.youtube.com/hashtag/shorts

  if (value) {
    addStyle("layoutFixHashtagFeed", styles.layoutFixHashtagFeed);
  } else {
    removeElementById(`${PREFIX}layoutFixHashtagFeed`);
  }

  if (!isCSSHasSupport) {
    hideShortsOnHashtagFeed(value);
    if (!value) {
      mutationObserver.disconnect();
      return;
    }
    mutationObserver.observe(document.documentElement, observerConfig);
    return;
  }

  if (!value) {
    const styleId = `${PREFIX}${KeyHideShortsOnHashtagFeed}`;
    removeElementById(styleId);
    return;
  }
  addStyle(KeyHideShortsOnHashtagFeed, styles.hideShortsHashTagFeed);
};
