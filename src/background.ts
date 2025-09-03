/* eslint-disable @typescript-eslint/no-explicit-any */
import { mnemonicToAccount, type HDAccount } from "viem/accounts"
import { getMnemonic, type encryptedMnemonic } from "../src/lib/mnemonic"
import type { TransactionSerializable } from "viem";

let account: HDAccount | null;

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === "SET_ACCOUNT") {
        chrome.storage.local.get(["mnemonic"], async (result) => {
            try {
                const password = message.password

                const mnemonic = await getMnemonic(password, result.mnemonic as encryptedMnemonic)

                account = mnemonicToAccount(mnemonic, { accountIndex: 0 })

                sendResponse({ success: true, address: account.address })
            } catch (error: any) {
                throw new Error(error)
            }
        })


        return true
    }

    if (message.type === "SIGN_TRANSACTION") {
        const handleSignTransaction = async () => {
            try {
                if (!account) {
                    sendResponse({ error: "you need to loggin first", success: false })
                    return
                }

                const signedTx = await account.signTransaction(message.transaction as TransactionSerializable)

                sendResponse({ success: true, signedTx })
            } catch (err: any) {
                throw new Error(err)
            }

        }


        handleSignTransaction()
        return true
    }
})