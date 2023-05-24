document.addEventListener("DOMContentLoaded", () => {

    const overlayButton = document.getElementById("buttonPopup");

    overlayButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

            const newUrl = 'https://12ft.io/' + tabs[0].url;
            chrome.tabs.update(tabs[0].id, { url: newUrl });

        });
    });


    const switchButton = document.getElementById("switchButton");

    // Retrieve the user's choice from chrome.storage and update the switch state accordingly
    chrome.storage.local.get({ overlayButtonVisible: true }, ({ overlayButtonVisible }) => {
        switchButton.checked = overlayButtonVisible;
    });

    // Add a change event listener to the switch button
    switchButton.addEventListener("change", () => {

        const overlayButtonVisible = switchButton.checked;
        
        // Send a message to the content script to update the button visibility
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "updateOverlayButton", overlayButtonVisible });
        });

        // Save the user's choice in chrome.storage
        chrome.storage.local.set({ overlayButtonVisible });

    });

});