import { KeyExtensionStatus, settingKeys } from "../data/storage-keys";
import { injectAllChanges } from "./modules/options/optionChanges";
import { getAllStorage } from "./modules/utils/storage";

let data;

chrome.storage.onChanged.addListener(async (changes) => {
  if (changes[KeyExtensionStatus]) {
    window.location.reload();
    return;
  }

  data = await getAllStorage(Object.values(settingKeys));

  injectAllChanges(data);
});

const run = async () => {
  data = await getAllStorage(Object.values(settingKeys));

  const extensionStatus = data[KeyExtensionStatus];
  if (!extensionStatus) {
    return;
  }

  injectAllChanges(data);
};

run();
