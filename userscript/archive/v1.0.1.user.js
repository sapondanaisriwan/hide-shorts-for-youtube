// ==UserScript==
// @name        YouTube Anti-Shorts
// @version     1.0.1
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

const cLogStyles = "color: red; font-size: 16px";
const config = { childList: true, subtree: true };

const messages = {
  reel: "Hide: Reel Shelf",
  rich: "Hide: Rich Section",
  navbar: "Hide: Navbar Short",
  tab: "Hide: Tab Short",
  video: "Hide: Video Short",
  filterBar: "Hide: Filter Bar",
};

const selectors = {
  ytd: "#content.ytd-app",
  videos: {
    video: 'a[href^="/shorts/"]',
    parent: "ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-grid-row",
  },
  tabs: {
    tab: "tp-yt-paper-tab .tab-title",
    parent: "tp-yt-paper-tab",
  },
  reelShelf: "ytd-reel-shelf-renderer",
  richShelf: {
    parent: ".ytd-rich-grid-renderer",
    shelf: "ytd-rich-shelf-renderer[is-shorts]",
  },
  navbar: {
    collapse: 'a.ytd-mini-guide-entry-renderer[title="Shorts"]',
    expanded: `
      #endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"],
      a.ytd-mini-guide-entry-renderer[title="Shorts"]
    `,
  },
  filterBar: {
    parent: "yt-chip-cloud-chip-renderer.ytd-feed-filter-chip-bar-renderer",
    bar: "#text.yt-chip-cloud-chip-renderer",
  },
};

const cLog = (msg) => console.log(`%c${msg}`, cLogStyles);

const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

const loopEle = (elements, msg) =>
  elements.forEach((element) => hideElement(element, msg));
const loopFindParent = (elements, msg, selector) =>
  elements.forEach((element) => hideElement(element.closest(selector), msg));

const loopCheckText = (elements, msg, selector) => {
  elements.forEach((element) => {
    if (element.textContent === "Shorts") {
      hideElement(element.closest(selector), msg);
    }
  });
};

const hideElement = (element, msg) => {
  if (!element || element.hidden) {
    return;
  }
  element.hidden = true;
  cLog(msg);
};

function waitForElement(selector) {
  return new Promise((resolve) => {
    const element = select(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = select(selector);
      if (element) {
        resolve(element);
        observer.disconnect();
      }
    });

    observer.observe(document.body, config);
  });
}

const hideShorts = () => {
  const navbarExpanded = select(selectors.navbar?.expanded);
  const navbarCollapse = select(selectors.navbar?.collapse);
  const reelShelfs = selectAll(selectors.reelShelf);
  const richShelfs = selectAll(selectors.richShelf?.shelf);
  const videos = selectAll(selectors.videos?.video);
  const tabs = selectAll(selectors.tabs?.tab);
  const bars = selectAll(selectors.filterBar?.bar);

  hideElement(navbarExpanded, messages.navbar);
  hideElement(navbarCollapse, messages.navbar);

  loopEle(reelShelfs, messages.reel);
  loopCheckText(tabs, messages.tab, selectors.tabs?.parent);
  loopCheckText(bars, messages.filterBar, selectors.filterBar?.parent);

  loopFindParent(richShelfs, messages.rich, selectors.richShelf?.parent);
  loopFindParent(videos, messages.video, selectors.videos?.parent);
};

const run = async () => {
  const ytd = await waitForElement(selectors.ytd);
  const observer = new MutationObserver(hideShorts);
  observer.observe(ytd, config);
};

run();