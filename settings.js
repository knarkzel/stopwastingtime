// Set values of form if it exists
chrome.storage.local.get(["StopWastingTimeKeywords"]).then((result) => {
  const textArea = document.getElementById("StopWastingTimeKeywords");
  if (textArea && result && result.StopWastingTimeKeywords) {
    textArea.innerHTML = result.StopWastingTimeKeywords;
  }
});

// Save settings to localStorage
const form = document.getElementById("StopWastingTimeSettings");
if (form) {
  form.addEventListener("submit", (event) => {
    // Get form
    event.preventDefault();
    const formData = new FormData(event.target);
    const keywords = formData.get("StopWastingTimeKeywords");
    
    // Save to localStorage
    chrome.storage.local.set({ StopWastingTimeKeywords: keywords });

    // Send message to serviceWorker
    (async () => {
      const response = await chrome.runtime.sendMessage({greeting: "hello"});
    })();
    
    // Display saved
    const saveButton = document.getElementById("StopWastingTimeSave");
    saveButton.innerHTML = "Saved!";
    setTimeout(() => {
      saveButton.innerHTML = "Save";
    }, 250);
  });
}
