chrome.commands.onCommand.addListener(function (command) {
    if (command === "open_chatgpt") {
        chrome.tabs.create({ url: "https://chat.openai.com/" });
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentTab = tabs[0];
            if (currentTab.url.startsWith("https://chat.openai.com")) {
                if (command === "focus_on_prompt_textarea") {
                    chrome.tabs.executeScript(currentTab.id, { code: 'document.getElementById("prompt-textarea").focus();' });
                } else if (command === "blur_on_prompt_textarea") {
                    chrome.tabs.executeScript(currentTab.id, { code: 'document.getElementById("prompt-textarea").blur();' });
                } else if (command == "open_new_chat") {
                    chrome.tabs.update(currentTab.id, { url: "https://chat.openai.com/" })
                }
            }
        })
    }
});