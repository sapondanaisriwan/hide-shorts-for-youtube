// Chrome API Variables
let data;
const ytDataKey = "shortsSetting";
const browser = chrome || browser;
const runtime = browser.runtime;
const storage = browser.storage.sync;

// Element Variables
const selectors = {
  button: "input[type=checkbox]",
};
const buttons = document.querySelectorAll(selectors.button);

main();

async function main() {
  data = await storage.get(ytDataKey);
  buttons.forEach(
    (button) => (button.checked = data.shortsSetting[button.name])
  );
}

function handleClick(event) {
  const { target } = event;
  data.shortsSetting[target.name] = target.checked;
  storage.set({ shortsSetting: data.shortsSetting });
}

buttons.forEach((button) => button.addEventListener("click", handleClick));