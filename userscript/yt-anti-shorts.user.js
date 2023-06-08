// ==UserScript==
// @name        YouTube Anti-Shorts
// @version     1.0.2
// @author      sapondanaisriwan
// @namespace   https://github.com/sapondanaisriwan/youtube-anti-shorts
// @description Remove all shorts
// @match       https://www.youtube.com/*
// @grant       none
// @license      MIT
// @homepageURL https://github.com/sapondanaisriwan/youtube-anti-shorts
// @updateURL   https://github.com/sapondanaisriwan/youtube-anti-shorts/raw/main/anti-shorts.user.js
// @supportURL  https://github.com/sapondanaisriwan/youtube-anti-shorts/issues
// @icon        https://i.imgur.com/I9uDrsq.png
// ==/UserScript==

/*
If you want to submit a bug or request a feature please report via github issue. Since I receive so many emails, I can't reply to them all.
Contact: sapondanaisriwan@gmail.com
Support me: https://ko-fi.com/sapondanaisriwan 
Support me: https://ko-fi.com/sapondanaisriwan
Support me: https://ko-fi.com/sapondanaisriwan
Support me: https://ko-fi.com/sapondanaisriwan
Support me: https://ko-fi.com/sapondanaisriwan
*/

"use strict";

// Customize the way you like :)
const settings = {
  Hide_Shorts_Videos: true,
  Hide_Reel_Shorts: true,
  Hide_Shorts_Tab: true,
};

const config = { childList: true, subtree: true, attributes: true };
const selectors = {
  tabs: {
    parent: "tp-yt-paper-tab",
    element: "tp-yt-paper-tab .tab-title",
  },
  navbar: {
    collapse: 'a.ytd-mini-guide-entry-renderer[title="Shorts"]',
    expanded: `
      #endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"],
      a.ytd-mini-guide-entry-renderer[title="Shorts"]
    `,
  },
  filterBar: {
    parent: "yt-chip-cloud-chip-renderer",
    element: "yt-chip-cloud-chip-renderer #text[title='Shorts']",
  },
  searchPage: {
    reel: "ytd-search ytd-reel-shelf-renderer",
    videos: {
      parent: "ytd-video-renderer[is-search]",
      element: "ytd-search #thumbnail[href^='/shorts/']",
    },
  },
  homePage: {
    reel: {
      parent: "ytd-rich-section-renderer",
      element: "[page-subtype='home'] ytd-rich-shelf-renderer[is-shorts]",
    },
  },
  subscriptionPage: {
    reel: {
      parent: "ytd-rich-section-renderer",
      element:
        "[page-subtype='subscriptions'] ytd-rich-shelf-renderer[is-shorts]",
    },
    videos: {
      parent: "ytd-grid-video-renderer, ytd-rich-item-renderer",
      element: "[page-subtype='subscriptions'] #thumbnail[href^='/shorts/']",
    },
  },
  channelPage: {
    reel: {
      parent: "ytd-item-section-renderer",
      element: '[page-subtype="channels"] ytd-reel-shelf-renderer',
    },
    feed: {
      element:
        "[page-subtype='channels'] ytd-rich-grid-renderer[is-shorts-grid]",
    },
  },
  watchPage: {
    reel: "ytd-watch-flexy ytd-reel-shelf-renderer",
  },
  hashtagePage: {
    video: {
      parent: "ytd-rich-item-renderer",
      element:
        "[page-subtype='hashtag-landing-page'] #thumbnail[href^='/shorts/']",
    },
  },
};

const tab = selectors.tabs;
const tabNav = selectors.navbar;
const filterBar = selectors.filterBar;

const sp = selectors.searchPage;
const hp = selectors.homePage;
const subp = selectors.subscriptionPage;
const wp = selectors.watchPage;
const chp = selectors.channelPage;
const hashP = selectors.hashtagePage;

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

function run() {
  if (settings.Hide_Shorts_Tab) {
    // Tabs
    hideShortsText(tab.element, tab.parent);
    hideShorts(tabNav.expanded);
    hideShorts(tabNav.collapse);

    // Hashtag Page
    hideShorts(filterBar.element, filterBar.parent);
  }

  if (settings.Hide_Shorts_Videos) {
    // Hashtag Page
    hideShorts(hashP.video.element, hashP.video.parent);

    // Search Page
    hideShorts(sp.videos.element, sp.videos.parent);

    // Subscription Page
    hideShorts(subp.videos.element, subp.videos.parent);

    // Channel Page
    hideShorts(chp.feed.element);
  }

  if (settings.Hide_Reel_Shorts) {
    // Home Page
    hideShorts(hp.reel.element, hp.reel.parent);

    // Subscription Page
    hideShorts(subp.reel.element, hp.reel.parent);

    // Channel Page
    hideShorts(chp.reel.element, chp.reel.parent);

    // Watch Page
    hideShorts(wp.reel);

    // Search Page
    hideShorts(sp.reel);
  }
}

const observer = new MutationObserver(run);
observer.observe(document.documentElement, config);