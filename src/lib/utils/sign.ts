import { encodeFunctionData, erc20Abi, parseEther, parseUnits, type Hex } from "viem"
import { sendMessage } from "./message"
import type { HDAccount } from "viem"
import { mnemonicToAccount } from "viem/accounts"
import client from "../client"

type sendTransactionsProps = {
    recipient: Hex,
    amount: string,
    tokenAddress: Hex,
    decimals: number
}

// only for development purpose
const isExtension = typeof chrome !== "undefined" && !!chrome.runtime && !!chrome.runtime.id

let account: HDAccount | null

if (!isExtension) {
    const existing = sessionStorage.getItem("devMnemonic")
    if (existing) {
        account = mnemonicToAccount(existing, { accountIndex: 0 })
    }
}

export const setAccount = async (mnemonic: string) => {
    if (!isExtension) {
        sessionStorage.setItem("devMnemonic", mnemonic)
        account = mnemonicToAccount(mnemonic, { accountIndex: 0 })

        return account.address
    } else {
        const { address } = await sendMessage({ type: "SET_ACCOUNT", mnemonic })

        return address
    }
}

export const buildTx = ({ recipient, tokenAddress, amount, decimals }: sendTransactionsProps) => {
    if (tokenAddress === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        return {
            chainId: 11155111,
            to: recipient,
            value: parseEther(amount).toString(),
            gas: 21_000,
            maxFeePerGas: 20_000_000_000,
            maxPriorityFeePerGas: 1_500_000_000
        }
    } else {
        return {
            chainId: 11155111,
            to: tokenAddress,
            value: 0,
            data: encodeFunctionData({
                abi: erc20Abi,
                functionName: "transfer",
                args: [recipient, parseUnits(amount, decimals)]
            }),
            gas: 100_000,
            maxFeePerGas: 20_000_000_000,
            maxPriorityFeePerGas: 1_500_000_000
        }
    }
}

export const sendTransaction = async ({ recipient, tokenAddress, amount, decimals }: sendTransactionsProps) => {
    const tx = buildTx({ recipient, amount, decimals, tokenAddress });

    if (isExtension) {
        return await sendMessage({ type: "SEND_TRANSACTION", transaction: tx })
    }

    if (!account) throw new Error("No account set")

    const nonce = await client.getTransactionCount({ address: account.address })

    const signedTx = await account.signTransaction({
        ...tx,
        value: BigInt(tx.value),
        gas: BigInt(tx.gas),
        maxFeePerGas: BigInt(tx.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(tx.maxPriorityFeePerGas),
        nonce: nonce
    })

    const txHash = await client.sendRawTransaction({ serializedTransaction: signedTx })

    return { success: true, txHash }
}