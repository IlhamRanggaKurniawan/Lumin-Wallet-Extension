let account;

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "LOGIN") {
        chrome.storage.session.set({ isLoggedIn: true }, () => {
            sendResponse({ success: true });
        })
        return true
    }

    if (message.type === "LOGOUT") {
        chrome.storage.session.set({ isLoggedIn: false }, () => {
            sendResponse({ success: true });
        })
        return true
    }

    if (message.type === "GET_SESSION") {
        chrome.storage.session.get(["isLoggedIn"], (result) => {
            sendResponse({ value: result.isLoggedIn || false });
        });
        return true;
    }

    if (message.type === "SET_MNEMONIC") {
        chrome.storage.local.set({ mnemonic: message.value }, () => {
            sendResponse({ success: true })
        })
        return true
    }

    if (message.type === "GET_MNEMONIC") {
        chrome.storage.local.get(["mnemonic"], (result) => {
            sendResponse({ value: result.mnemonic, success: true })
        })
        return true
    }

    if (message.type === "SET_ACCOUNT") {
        account = message.account
    }

    if (message.type === "SIGN_MESSAGE") {
        if (!account) {
            sendResponse({ error: "you need to loggin first", success: false })
            return
        }


        // account.signMessage({ message: message.payload })
        //   .then(signature => sendResponse({ success: true, signature }))
        //   .catch(err => sendResponse({ success: false, error: err.message }))


    }
})