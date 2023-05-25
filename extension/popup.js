const settingKeys = [
  "isEnable",
  "toggleHideVideos",
  "toggleHideShelf",
  "toggleHideTabs",
];
const selectors = {
  videos: "#hide-videos",
  tab: "#hide-tab",
  shelf: "#hide-shelf",
};
const browser = chrome || browser;
const [runtime, storage] = [browser.runtime, browser.storage.sync];

const videosToggle = document.querySelector(selectors.videos);
const tabToggle = document.querySelector(selectors.tab);
const shelfToggle = document.querySelector(selectors.shelf);

const checkSetting = () => storage.get(settingKeys);

const run = async () => {
  const { toggleHideVideos, toggleHideShelf, toggleHideTabs } =
    await checkSetting();
  videosToggle.checked = toggleHideVideos;
  tabToggle.checked = toggleHideTabs;
  shelfToggle.checked = toggleHideShelf;
};

run();

videosToggle.addEventListener("change", ({ target }) =>
  storage.set({ toggleHideVideos: target.checked })
);

tabToggle.addEventListener("change", ({ target }) => {
  storage.set({ toggleHideTabs: target.checked });
});

shelfToggle.addEventListener("change", ({ target }) => {
  storage.set({ toggleHideShelf: target.checked });
});
