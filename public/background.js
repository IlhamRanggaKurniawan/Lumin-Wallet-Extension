let account;

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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