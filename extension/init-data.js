initData();

// Function to add any missing data to the storage.
function addMissingData(data) {
  for (const key in settings) {
    if (!data[ytDataKey].hasOwnProperty(key)) {
      data[ytDataKey][key] = settings[key];
      console.log(`Added ${key}: ${settings[key]}`);
    }
  }
  storage.set({ shortsSetting: data.shortsSetting });
}

async function initData() {
  let data = await storage.get([ytDataKey]);

  // Get all the keys from the 'data' object
  const dataKeys = Object.keys(data);
  const isDataEmpty = dataKeys.length === 0;

  // Check if the 'data' object is empty
  if (isDataEmpty) {
    // storage.set({ shortsSetting: oldSettings });
    storage.set({ shortsSetting: settings });
    // console.log("✅ Added setting");
    return;
  }

  // console.log("Checking data is updated or not");
  addMissingData(data);
  // storage.get(console.log);
}
