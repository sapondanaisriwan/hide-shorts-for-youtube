// const youtubeURL = "https://www.youtube.com/*";
// const browser = chrome || browser;
// const runtime = browser.runtime;
// const storage = browser.storage.sync;

// // // https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
// runtime.onInstalled.addListener(({ reason }) => {
//   console.log(reason);
//   if (reason === "install" || reason === "update") {
//     // storage.clear();
//     // storage.set(oldSettings);

//     // Go through all tabs in current window
//     // browser.tabs.query({ currentWindow: true }, function (tabs) {
//     //   // Iterate through each tab
//     //   tabs.forEach(function (tab) {
//     //     console.log(tab);
//     //   });
//     // });
//     reloadTabs();
//     // fetchAllStorage();
//   }
// });

// const fetchAllStorage = () => storage.get();
// const fetchTabs = () => browser.tabs.query({ url: youtubeURL });

// const reloadTabs = async () => {
//   const tabs = await fetchTabs();
//   tabs.forEach((tab) => browser.tabs.reload(tab.id));
//   console.log("Reloaded all tabs");
// };
