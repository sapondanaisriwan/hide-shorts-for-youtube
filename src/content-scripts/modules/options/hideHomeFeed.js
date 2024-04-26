import styles from "../../css/styles";
import { KeyHideShortsOnHomeFeed, PREFIX } from "../../../data/storage-keys";
import { addStyle } from "../utils/addStyle";
import { isCSSHasSupport, observerConfig } from "../utils/config";
import { hideElementIfNotHidden } from "../utils/hideElement";
import { queryShortVideoLinks } from "../utils/queryElement";
import { removeElementById } from "../utils/removeElement";

const hideShortsOnHomeFeed = (hideShorts) => {
  queryShortVideoLinks().forEach((shortVideoLink) => {
    const richSection = shortVideoLink.closest(
      "[page-subtype='home'] ytd-rich-section-renderer"
    );

    hideElementIfNotHidden(richSection, hideShorts);
  });
};

const mutationObserver = new MutationObserver(hideShortsOnHomeFeed);

export const optionHideHomeFeed = (value) => {
  // https://www.youtube.com/

  if (!isCSSHasSupport) {
    hideShortsOnHomeFeed(value);
    if (!value) {
      mutationObserver.disconnect();
      return;
    }
    mutationObserver.observe(document.documentElement, observerConfig);
    return;
  }

  if (!value) {
    const styleId = `${PREFIX}${KeyHideShortsOnHomeFeed}`;
    removeElementById(styleId);
    return;
  }
  addStyle(KeyHideShortsOnHomeFeed, styles.hideShortsHomeFeed);
};
