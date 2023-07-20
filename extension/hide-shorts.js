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
  data.shortsSetting?.homePage
    ? injectStyle("hs-home-page", styles.homePage)
    : removeEle("hs-home-page");
  data.shortsSetting?.channelPage
    ? injectStyle("hs-channel-page", styles.channelPage)
    : removeEle("hs-channel-page");
  data.shortsSetting?.watchPage
    ? injectStyle("hs-watch-page", styles.watchPage)
    : removeEle("hs-watch-page");
  data.shortsSetting?.searchPage
    ? injectStyle("hs-search-page", styles.searchPage)
    : removeEle("hs-search-page");
  data.shortsSetting?.subscriptionPage
    ? injectStyle("hs-subscription-page", styles.subscriptionPage)
    : removeEle("hs-subscription-page");
  data.shortsSetting?.hashtagPage
    ? injectStyle("hs-hashtag-page", styles.hashtagPage)
    : removeEle("hs-hashtag-page");
  data.shortsSetting?.hideTab
    ? injectStyle("hs-tab", styles.tabs)
    : removeEle("hs-tab");
}

function hideShortsJS() {
  // Home Page
  if (data.shortsSetting?.homePage) {
    hideShorts(hp.reel.element, hp.reel.parent);
  }

  // Channel Page
  if (data.shortsSetting?.channelPage) {
    hideShorts(chp.feed.element);
    hideShorts(chp.reel.element, chp.reel.parent);
  }

  // Watch Page
  if (data.shortsSetting?.watchPage) {
    hideShorts(wp.reel);
  }

  // Search Page
  if (data.shortsSetting?.searchPage) {
    hideShorts(sp.reel);
    hideShorts(sp.videos.element, sp.videos.parent);
  }

  // Subscription Page
  if (data.shortsSetting?.subscriptionPage) {
    hideShorts(subp.videos.element, subp.videos.parent);
    hideShorts(subp.reel.element, subp.reel.parent);
    hideShorts(subp.reelList.element, subp.reelList.parent);
  }

  // Hashtag Page
  if (data.shortsSetting?.hashtagPage) {
    hideShorts(hashP.video.element, hashP.video.parent);
  }

  if (data.shortsSetting?.hideTab) {
    // Tabs
    hideShortsText(tab.element, tab.parent);
    hideShorts(tabNav.expanded);
    hideShorts(tabNav.collapse);

    // Hashtag Page
    hideShorts(filterBar.element, filterBar.parent);
  }
}

// Update data when the ui changes
storage.onChanged.addListener(async () => {
  data = await storage.get(ytDataKey);
  hideShortsCSS();
});

async function main() {
  data = await storage.get(ytDataKey);

  // if the browser doesn't support has pseudo selectors execute the code below and return
  if (!supportHas) {
    const observer = new MutationObserver(hideShortsJS);
    observer.observe(document.documentElement, config);
    injectStyle("hs-layout-fix", styles.layoutFix);
    return;
  }
  hideShortsCSS();
}
main();
