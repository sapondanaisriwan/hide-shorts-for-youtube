import styles from "../../css/styles";
import { KeyHideShortsOnWatchFeed, PREFIX } from "../../../data/storage-keys";
import { addStyle } from "../utils/addStyle";
import { removeElementById } from "../utils/removeElement";

export const optionHideWatchFeed = (value) => {
  // https://www.youtube.com/watch?v=TXzfQ0cP1P0
  // https://www.youtube.com/watch?v=fCpacv1cNZk

  if (!value) {
    const styleId = `${PREFIX}${KeyHideShortsOnWatchFeed}`;
    removeElementById(styleId);
    return;
  }
  addStyle(KeyHideShortsOnWatchFeed, styles.hideShortsWatchFeed);
};
