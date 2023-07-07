async function getKeywords() {
  const result = await chrome.storage.local.get(["StopWastingTimeKeywords"]);
  if (result && result.StopWastingTimeKeywords) {
    return result.StopWastingTimeKeywords.split("\n");
  }
}

// Update tabs when they change
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Get current keywords
  const keywords = await getKeywords();
  if (keywords && changeInfo.title) {
    const { title } = changeInfo;
    const containsKeyword = keywords.some(keyword => title.toLowerCase().includes(keyword));
    if (containsKeyword) {
      chrome.tabs.update(tabId, { url: "https://www.google.com" });
    }
  }
});

// When form changes, loop through all tabs and verify them
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({}, async (tabs) => {
    const keywords = await getKeywords();
    tabs.forEach((tab) => {
      const containsKeyword = keywords.some(keyword => tab.title.toLowerCase().includes(keyword));
      if (containsKeyword) {
        chrome.tabs.update(tab.id, { url: "https://www.google.com" });
      }
    });
  });
});


    
  

