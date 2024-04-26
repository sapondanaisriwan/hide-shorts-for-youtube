import styles from "../../css/styles";
import { KeyHideShortsOnChannelFeed, PREFIX } from "../../../data/storage-keys";
import { addStyle } from "../utils/addStyle";
import { isCSSHasSupport, observerConfig } from "../utils/config";
import { hideElementIfNotHidden } from "../utils/hideElement";
import { queryShortVideoLinks } from "../utils/queryElement";
import { removeElementById } from "../utils/removeElement";

const hideShortsOnChannelFeed = (hideShorts) => {
  queryShortVideoLinks().forEach((shortVideoLink) => {
    const richGrid = shortVideoLink.closest(
      `[page-subtype="channels"] ytd-rich-grid-renderer`
    );
    const itemSection = shortVideoLink.closest(
      `[page-subtype="channels"] ytd-item-section-renderer`
    );

    hideElementIfNotHidden(richGrid, hideShorts);
    hideElementIfNotHidden(itemSection, hideShorts);
  });
};

const mutationObserver = new MutationObserver(hideShortsOnChannelFeed);

export const optionHideChannelFeed = (value) => {
  // https://www.youtube.com/@MrBeast2/featured

  if (!isCSSHasSupport) {
    hideShortsOnChannelFeed(value);

    if (!value) {
      mutationObserver.disconnect();
      return;
    }
    mutationObserver.observe(document.documentElement, observerConfig);
    return;
  }

  if (!value) {
    const styleId = `${PREFIX}${KeyHideShortsOnChannelFeed}`;
    removeElementById(styleId);
    return;
  }
  addStyle(KeyHideShortsOnChannelFeed, styles.hideShortsChannelFeed);
};
