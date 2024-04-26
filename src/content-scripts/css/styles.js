const styles = {};

// ---- Home Feed ---- //
styles.hideShortsHomeFeed = `
[page-subtype='home'] ytd-rich-section-renderer:has(a[href^="/shorts/"]) {
  display: none;
}
`;

// ---- Watch Feed ---- //

styles.hideShortsWatchFeed = `
ytd-watch-grid ytd-rich-shelf-renderer[is-shorts],
ytd-watch-flexy ytd-rich-shelf-renderer[is-shorts],
ytd-watch-flexy ytd-reel-shelf-renderer {
  display: none;
}
`;

// ---- Subscription Feed ---- //

styles.hideShortsSubscriptionFeed = `
[page-subtype="subscriptions"] ytd-item-section-renderer:has(a[href^="/shorts/"]),
[page-subtype="subscriptions"] ytd-rich-section-renderer:has(a[href^="/shorts/"]),
[page-subtype="subscriptions"] ytd-grid-video-renderer:has(a[href^="/shorts/"]),
[page-subtype="subscriptions"] ytd-rich-item-renderer:has(a[href^="/shorts/"]) {
  display: none;
}
`;

styles.layoutFixSubscriptionFeed = `
[page-subtype="subscriptions"] ytd-rich-grid-row,
[page-subtype="subscriptions"] ytd-rich-grid-row #contents {
  display: contents;
}

[page-subtype="subscriptions"] ytd-rich-grid-renderer {
  margin-inline: 16px;
}

[page-subtype="subscriptions"] #content.ytd-rich-section-renderer {
  max-width: calc(var(--ytd-rich-grid-items-per-row) * (var(--ytd-rich-grid-item-max-width) + var(--ytd-rich-grid-item-margin)));
  margin: 0 8px; // 24px = 16 + 8
}
`;

// ---- Hashtag Feed ---- //

styles.hideShortsHashTagFeed = `
[page-subtype="hashtag-landing-page"] ytd-rich-item-renderer:has(a[href^="/shorts/"]) {
  display: none;
}
`;

styles.layoutFixHashtagFeed = `
[page-subtype="hashtag-landing-page"] ytd-rich-grid-renderer[is-shorts-grid] #contents.ytd-rich-grid-renderer {
  display: none;
}
[page-subtype="hashtag-landing-page"] ytd-rich-grid-row,
[page-subtype="hashtag-landing-page"] ytd-rich-grid-row #contents {
  display: contents;
}

[page-subtype="hashtag-landing-page"] ytd-rich-grid-renderer {
  margin-inline: 16px;
}

[page-subtype="hashtag-landing-page"] #content.ytd-rich-section-renderer {
  max-width: calc(var(--ytd-rich-grid-items-per-row) * (var(--ytd-rich-grid-item-max-width) + var(--ytd-rich-grid-item-margin)));
  margin: 0 8px; // 24px = 16 + 8
}
`;

// ---- Channel Feed ---- //

styles.hideShortsChannelFeed = `
[page-subtype="channels"] ytd-item-section-renderer:has(a[href^="/shorts/"]),
[page-subtype="channels"] ytd-rich-grid-renderer:has(a[href^="/shorts/"]) {
  display: none;
}
`;

//  ---- Search Feed ---- //
styles.hideShortsSearchFeed = `
ytd-search ytd-reel-shelf-renderer:has(a[href^="/shorts/"]),
ytd-search ytd-video-renderer:has(a[href^="/shorts/"]) {
  display: none;
}
`;

export default styles;
