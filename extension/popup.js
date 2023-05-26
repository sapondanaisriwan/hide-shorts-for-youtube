const settingKeys = [
  "isEnable",
  "toggleHideVideos",
  "toggleHideShelf",
  "toggleHideTabs",
];
const selectors = {
  extension: "[data-extension]",
  videos: "#hide-videos",
  tab: "#hide-tab",
  shelf: "#hide-shelf",
};
const browser = chrome || browser;
const [runtime, storage] = [browser.runtime, browser.storage.sync];

const extensionToggle = document.querySelector(selectors.extension);
const videosToggle = document.querySelector(selectors.videos);
const tabToggle = document.querySelector(selectors.tab);
const shelfToggle = document.querySelector(selectors.shelf);

const checkSetting = () => storage.get(settingKeys);

const run = async () => {
  const { isEnable, toggleHideVideos, toggleHideShelf, toggleHideTabs } =
    await checkSetting();
  videosToggle.checked = toggleHideVideos;
  tabToggle.checked = toggleHideTabs;
  shelfToggle.checked = toggleHideShelf;
  extensionToggle.setAttribute("aria-pressed", isEnable);
};

run();

storage.onChanged.addListener(async (detail) => {
  console.log(detail);
});

videosToggle.addEventListener("change", ({ target }) =>
  storage.set({ toggleHideVideos: target.checked })
);

tabToggle.addEventListener("change", ({ target }) => {
  storage.set({ toggleHideTabs: target.checked });
});

shelfToggle.addEventListener("change", ({ target }) => {
  storage.set({ toggleHideShelf: target.checked });
});

extensionToggle.addEventListener("click", ({ target }) => {
  storage.set({ isEnable: target.ariaPressed == "true" ? false : true });
  target.setAttribute(
    "aria-pressed",
    target.ariaPressed == "true" ? "false" : "true"
  );
});
