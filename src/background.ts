/* eslint-disable @typescript-eslint/no-explicit-any */
import { mnemonicToAccount, type HDAccount } from "viem/accounts"
import client from "./lib/client";

let account: HDAccount | null;

chrome.alarms.onAlarm.addListener(() => {

});

chrome.alarms.create("KeepAlive", { periodInMinutes: 0.4 })

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === "SET_ACCOUNT") {
        try {
            account = mnemonicToAccount(message.mnemonic, { accountIndex: 0 })

            sendResponse({ success: true, address: account.address })
        } catch (error: any) {
            throw new Error(error)
        }

        return true
    }

    if (message.type === "SEND_TRANSACTION") {
        const handleSignTransaction = async () => {
            try {
                if (!account) {
                    sendResponse({ error: "you need to loggin first", success: false })
                    return
                }

                const nonce = await client.getTransactionCount({ address: account.address })

                const signedTx = await account.signTransaction({
                    ...message.transaction,
                    value: BigInt(message.transaction.value),
                    gas: BigInt(message.transaction.gas),
                    maxFeePerGas: BigInt(message.transaction.maxFeePerGas),
                    maxPriorityFeePerGas: BigInt(message.transaction.maxPriorityFeePerGas),
                    nonce: BigInt(nonce)
                })

                console.log({ signedTx })

                const txHash = await client.sendRawTransaction({ serializedTransaction: signedTx })

                console.log({ txHash })

                sendResponse({ success: true, txHash })
            } catch (err: any) {
                sendResponse({ success: false, error: err })
            }
        }
        handleSignTransaction()

        return true
    }
})