const ytDataKey = "shortsSetting";
const browser = chrome || browser;
const runtime = browser.runtime;
const storage = browser.storage.sync;

// for testing
// const oldSettings = {
//   homePage: true,
//   channelPage: true,
// };

const settings = {
  hideTab: true, // Hide Tabs that named "SHORT"
  homePage: true,
  channelPage: true,
  watchPage: true,
  searchPage: true,
  hashtagPage: true,
  subscriptionPage: true,
};

const supportHas = CSS.supports("selector(:has(*))");
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
        "[page-subtype='subscriptions'] ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer",
    },
    reelList: {
      parent: "ytd-item-section-renderer[page-subtype='subscriptions']",
      element: "ytd-reel-shelf-renderer",
    },
    videos: {
      parent:
        "ytd-grid-video-renderer, ytd-rich-item-renderer, ytd-item-section-renderer",
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
  hashtagPage: {
    video: {
      parent: "ytd-rich-item-renderer",
      element:
        "[page-subtype='hashtag-landing-page'] #thumbnail[href^='/shorts/']",
    },
  },
};

// Stolen from AdashimaaTube
const styles = {
  tabs: `
  a.ytd-mini-guide-entry-renderer[title=Shorts],
  #endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title=Shorts] {
    display: none;
  }
  `,
  homePage: `
  [page-subtype='home'] ytd-rich-section-renderer:has(a[href^="/shorts/"]) {
    display: none;
  }
  `,
  searchPage: `
  ytd-search ytd-reel-shelf-renderer:has(a[href^="/shorts/"]),
  ytd-search ytd-video-renderer:has(a[href^="/shorts/"]) {
    display: none;
  }
  `,
  channelPage: `
  [page-subtype="channels"] ytd-item-section-renderer:has(a[href^="/shorts/"]),
  [page-subtype="channels"] ytd-rich-grid-renderer:has(a[href^="/shorts/"]) {
    display: none;
  }
  `,
  watchPage: `
  ytd-watch-flexy ytd-reel-shelf-renderer {
    display: none;
  } 
  `,
  hashtagPage: `
  [page-subtype="hashtag-landing-page"] ytd-rich-item-renderer:has(a[href^="/shorts/"]) {
    display: none;
  }
  [page-subtype="hashtag-landing-page"] ytd-rich-grid-renderer[is-shorts-grid] #contents.ytd-rich-grid-renderer {
    display: none;
  }
  [page-subtype="hashtag-landing-page"] #contents {
    width: 88.1%;
  }
  [page-subtype="hashtag-landing-page"] ytd-rich-grid-row,
  [page-subtype="hashtag-landing-page"] ytd-rich-grid-row #contents {
    display: contents;
  }
  `,
  subscriptionPage: `
  [page-subtype="subscriptions"] ytd-item-section-renderer:has(a[href^="/shorts/"]),
  [page-subtype="subscriptions"] ytd-rich-section-renderer:has(a[href^="/shorts/"]),
  [page-subtype="subscriptions"] ytd-grid-video-renderer:has(a[href^="/shorts/"]),
  [page-subtype="subscriptions"] ytd-rich-item-renderer:has(a[href^="/shorts/"]) {
    display: none;
  }
  [page-subtype="subscriptions"] #contents {
    width: 88.1%;
  }
  [page-subtype="subscriptions"] ytd-rich-grid-row,
  [page-subtype="subscriptions"] ytd-rich-grid-row #contents {
    display: contents;
  }
  `,
  layoutFix: `
  [page-subtype="hashtag-landing-page"] #contents {
    width: 88.1%;
  }
  [page-subtype="hashtag-landing-page"] ytd-rich-grid-row,
  [page-subtype="hashtag-landing-page"] ytd-rich-grid-row #contents {
    display: contents;
  }
  
  [page-subtype="subscriptions"] #contents {
    width: 88.1%;
  }
  [page-subtype="subscriptions"] ytd-rich-grid-row,
  [page-subtype="subscriptions"] ytd-rich-grid-row #contents {
    display: contents;
  }
  `
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
