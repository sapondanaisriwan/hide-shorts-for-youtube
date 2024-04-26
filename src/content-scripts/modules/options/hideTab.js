import { observerConfig } from "../utils/config";
import { hideElementIfNotHidden } from "../utils/hideElement";

const hideTab = (hideShortsTab) => {
  const tabs = [...document.querySelectorAll("tp-yt-paper-tab .tab-title")];
  const navbarExpanded = [
    ...document.querySelectorAll(`#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"],
  a.ytd-mini-guide-entry-renderer[title="Shorts"]`),
  ];
  const navbarCollapse = [
    ...document.querySelectorAll(
      `a.ytd-mini-guide-entry-renderer[title="Shorts"]`
    ),
  ];

  const filterBars = [
    ...document.querySelectorAll(
      `yt-chip-cloud-chip-renderer #text[title='Shorts']`
    ),
  ];

  tabs.forEach((tab) => {
    if (tab.textContent.toLowerCase() === "shorts") {
      const paperTab = tab.closest(`tp-yt-paper-tab`);
      hideElementIfNotHidden(paperTab, hideShortsTab);
    }
  });

  navbarExpanded.forEach((navbarExpanded) =>
    hideElementIfNotHidden(navbarExpanded, hideShortsTab)
  );
  navbarCollapse.forEach((navbarCollapse) =>
    hideElementIfNotHidden(navbarCollapse, hideShortsTab)
  );

  // Hashtag Page
  filterBars.forEach((bar) => {
    const chip = bar.closest("yt-chip-cloud-chip-renderer");
    chip && hideElementIfNotHidden(navbarCollapse, hideShortsTab);
  });
};

const mutationObserver = new MutationObserver(hideTab);

export const optionHideTab = (value) => {
  hideTab(value);
  if (!value) {
    mutationObserver.disconnect();
    return;
  }
  mutationObserver.observe(document.documentElement, observerConfig);
};
