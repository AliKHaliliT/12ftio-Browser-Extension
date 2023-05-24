// Event listener for runtime message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the received message action is "buttonClicked"
    if (message.action === "buttonClicked") {
        // Use the sender.tab property to get the active tab's URL
        const newUrl = "https://12ft.io/" + sender.tab.url;
        // Update the tab's URL to the new URL
        chrome.tabs.update(sender.tab.id, { url: newUrl });
    }

    // Send a response to the message sender
    sendResponse({ received: true });
});