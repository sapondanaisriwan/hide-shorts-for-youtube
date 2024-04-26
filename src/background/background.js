import { KeyExtensionStatus } from "../data/storage-keys";

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.set({ [KeyExtensionStatus]: true });
    chrome.tabs.create({
      url: "https://github.com/sapondanaisriwan/youtube-anti-shorts",
    });
  }
});
