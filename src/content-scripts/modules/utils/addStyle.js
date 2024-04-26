import { PREFIX } from "../../../data/storage-keys";
import { removeElementById } from "./removeElement";

export const addStyle = (id, css) => {
  // remove the existing style element
  const styleId = `${PREFIX}${id}`;
  removeElementById(styleId);

  const style = document.createElement("style");
  style.id = styleId;
  style.type = "text/css";
  style.textContent = css;
  style.className = "HSYT";

  if (document.head) {
    document.head.appendChild(style);
    return;
  }
  document.documentElement.appendChild(style);
};
