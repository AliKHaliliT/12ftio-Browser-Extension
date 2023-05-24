const button = document.createElement("button"); // Create a button element
button.id = "overlayButton"; // Assign the id "overlayButton"
button.textContent = "Liberate!"; // Set the button text to "Liberate"

document.body.appendChild(button); // Append the button to the document body


// Add a click event listener to the button
button.addEventListener("click", () => {
    // Send a message to the Chrome runtime when the button is clicked
    chrome.runtime.sendMessage({ action: "buttonClicked" });
});


// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "updateOverlayButton") {

        // Update the button visibility based on the switch value
        if (message.overlayButtonVisible) {
            button.style.display = 'inline-block';
        } else {
            button.style.display = 'none';
        }

        // Save the user's choice in chrome.storage
        chrome.storage.local.set({ overlayButtonVisible: message.overlayButtonVisible });
    }
  
    // Send a response to the message sender
    sendResponse({ received: true });

});

// Retrieve the user's choice from chrome.storage and update the button visibility accordingly
chrome.storage.local.get({ overlayButtonVisible: true }, ({ overlayButtonVisible }) => {
    if (overlayButtonVisible) {
        button.style.display = 'inline-block';
    } else {
        button.style.display = 'none';
    }
});


// Add a fullscreenchange event listener to the document
const handleFullscreenChange = () => {
    if (document.fullscreenElement) {
        button.style.display = 'none';
    } else {
        chrome.storage.local.get({ overlayButtonVisible: true }, ({ overlayButtonVisible }) => {
            if (overlayButtonVisible) {
                button.style.display = 'inline-block';
            } else {
                button.style.display = 'none';
            }
        });
    }
};

// Add a fullscreenchange event listener to the document
document.addEventListener('fullscreenchange', handleFullscreenChange);
