// Todo: Hide shorts on subscription page

"use strict";
let data;

function checkDisplay(ele) {
  return ele.style.display === "none";
}

function setHide(ele) {
  ele.style.display = "none";
}

function hideEle(ele) {
  const isEleHide = checkDisplay(ele);
  !isEleHide && setHide(ele);
}

function hideParentEle(ele, parent) {
  const parentEle = ele.closest(parent);
  if (parentEle) {
    const isParentHide = checkDisplay(parentEle);
    !isParentHide && setHide(parentEle);
  }
}

function hideShorts(selector, parent = "") {
  [...document.querySelectorAll(selector)].forEach((ele) =>
    parent ? hideParentEle(ele, parent) : hideEle(ele)
  );
}

function hideShortsText(selector, parent = "") {
  [...document.querySelectorAll(selector)].forEach(
    (ele) =>
      ele.textContent.toLowerCase() === "shorts" && hideParentEle(ele, parent)
  );
}

// Function to remove DOM element
const removeEle = (id) => {
  const ele = document.getElementById(id);
  ele && ele.remove();
};

// Function to inject a style into the webpage
const injectStyle = (id, css) => {
  // Remove before adding
  removeEle(id);

  const style = document.createElement("style");
  style.type = "text/css";
  style.id = id;
  style.textContent = css;
  document.documentElement.appendChild(style);
};

function hideShortsCSS() {
  storage.get(console.log);

  data.shortsSetting.homePage
    ? injectStyle("homePage", styles.homePage)
    : removeEle("homePage");
  data.shortsSetting.channelPage
    ? injectStyle("channelPage", styles.channelPage)
    : removeEle("channelPage");
  data.shortsSetting.watchPage
    ? injectStyle("watchPage", styles.watchPage)
    : removeEle("watchPage");
  data.shortsSetting.searchPage
    ? injectStyle("searchPage", styles.searchPage)
    : removeEle("searchPage");
  data.shortsSetting.hashtagPage
    ? injectStyle("hashtagPage", styles.hashtagPage)
    : removeEle("hashtagPage");
  data.shortsSetting.hideTab
    ? injectStyle("hideTab", styles.tabs)
    : removeEle("hideTab");
}

function hideShortsJS() {
  // Home Page
  if (data.shortsSetting.homePage) {
    hideShorts(hp.reel.element, hp.reel.parent);
  }

  // Channel Page
  if (data.shortsSetting.channelPage) {
    hideShorts(chp.feed.element);
    hideShorts(chp.reel.element, chp.reel.parent);
  }

  // Watch Page
  if (data.shortsSetting.watchPage) {
    hideShorts(wp.reel);
  }

  // Search Page
  if (data.shortsSetting.searchPage) {
    hideShorts(sp.reel);
    hideShorts(sp.videos.element, sp.videos.parent);
  }

  // Subscription Page
  // if (data.shortsSetting.Subscription_Page.Hide_Shorts) {
  //   hideShorts(subp.videos.element, subp.videos.parent);
  //   hideShorts(subp.reel.element, hp.reel.parent);
  // }

  // Hashtag Page
  if (data.shortsSetting.hashtagPage) {
    hideShorts(hashP.video.element, hashP.video.parent);
  }

  if (data.shortsSetting.hideTab) {
    // Tabs
    hideShortsText(tab.element, tab.parent);
    hideShorts(tabNav.expanded);
    hideShorts(tabNav.collapse);

    // Hashtag Page
    hideShorts(filterBar.element, filterBar.parent);
  }
}

// Update data when the ui changes
storage.onChanged.addListener(async (changes, areaName) => {
  data = await storage.get(ytDataKey);
  hideShortsCSS();
});

async function main() {
  data = await storage.get(ytDataKey);

  // if the browser doesn't support has pseudo selectors execute the code below and return
  if (!supportHas) {
    const observer = new MutationObserver(hideShortsJS);
    observer.observe(document.documentElement, config);
    return;
  }
  hideShortsCSS();
}
main();
