import {
  KeyHideShortsOnSubscriptionFeed,
  PREFIX,
} from "../../../data/storage-keys";
import styles from "../../css/styles";
import { addStyle } from "../utils/addStyle";
import { isCSSHasSupport, observerConfig } from "../utils/config";
import { hideElementIfNotHidden } from "../utils/hideElement";
import { queryShortVideoLinks } from "../utils/queryElement";
import { removeElementById } from "../utils/removeElement";

const hideShortsOnSubscriptionFeed = (hideShorts) => {
  queryShortVideoLinks().forEach((shortVideoLink) => {
    const itemSection = shortVideoLink.closest(
      `[page-subtype="subscriptions"] ytd-item-section-renderer`
    );
    const richSection = shortVideoLink.closest(
      `[page-subtype="subscriptions"] ytd-rich-section-renderer`
    );
    const gridVideo = shortVideoLink.closest(
      `[page-subtype="subscriptions"] ytd-grid-video-renderer`
    );
    const richItem = shortVideoLink.closest(
      `[page-subtype="subscriptions"] ytd-rich-item-renderer`
    );

    hideElementIfNotHidden(itemSection, hideShorts);
    hideElementIfNotHidden(richSection, hideShorts);
    hideElementIfNotHidden(gridVideo, hideShorts);
    hideElementIfNotHidden(richItem, hideShorts);
  });
};

const mutationObserver = new MutationObserver(hideShortsOnSubscriptionFeed);

export const optionHideSubscriptionFeed = (value) => {
  // https://www.youtube.com/feed/subscriptions

  if (value) {
    addStyle("layoutFixSubscriptionFeed", styles.layoutFixSubscriptionFeed);
  } else {
    removeElementById(`${PREFIX}layoutFixSubscriptionFeed`);
  }

  if (!isCSSHasSupport) {
    hideShortsOnSubscriptionFeed(value);
    if (!value) {
      mutationObserver.disconnect();
      return;
    }

    mutationObserver.observe(document.documentElement, observerConfig);
    return;
  }

  if (!value) {
    const styleId = `${PREFIX}${KeyHideShortsOnSubscriptionFeed}`;
    removeElementById(styleId);
    return;
  }
  addStyle(KeyHideShortsOnSubscriptionFeed, styles.hideShortsSubscriptionFeed);
};
