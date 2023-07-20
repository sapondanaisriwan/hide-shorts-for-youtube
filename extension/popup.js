// Chrome API Variables
let data;
const ytDataKey = "shortsSetting";
const browser = chrome || browser;
const runtime = browser.runtime;
const storage = browser.storage.sync;
const { version } = runtime.getManifest();

// Element Variables
const selectors = {
  checkbox: "input[type=checkbox]",
  version: "[data-version]",
};

const checkboxes = document.querySelectorAll(selectors.checkbox);

main();
displayVersion();

async function main() {
  data = await storage.get(ytDataKey);

  const dataKeys = Object.keys(data);
  const isDataEmpty = dataKeys.length === 0;

  // Check if the 'data' object is empty
  if (isDataEmpty) {
    return;
  }

  checkboxes.forEach(
    (checkbox) => (checkbox.checked = data.shortsSetting[checkbox.name])
  );
  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("click", handleClick)
  );
}

function handleClick(event) {
  const { target } = event;
  data.shortsSetting[target.name] = target.checked;
  storage.set({ shortsSetting: data.shortsSetting });
}

function displayVersion() {
  document.querySelector(
    selectors.version
  ).textContent = `Anti Shorts ${version}`;
}
