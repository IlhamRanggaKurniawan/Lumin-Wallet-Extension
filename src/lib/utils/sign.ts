import { encodeFunctionData, erc20Abi, parseEther, parseUnits, type Hex } from "viem"
import { sendMessage } from "./message"

type sendTransactionsProps = {
    recipient: Hex,
    amount: string,
    tokenAddress: Hex,
    decimals: number
}

export const sendTransaction = async ({ recipient, tokenAddress, amount, decimals }: sendTransactionsProps) => {
    let tx;

    if (tokenAddress === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        tx = {
            chainId: 11155111,
            to: recipient,
            value: parseEther(amount).toString(),
            gas: 21_000,
            maxFeePerGas: 20_000_000_000,
            maxPriorityFeePerGas: 1_500_000_000
        }
    } else {
        tx = {
            chainId: 11155111,
            to: tokenAddress,
            value: 0,
            data: encodeFunctionData({
                abi: erc20Abi,
                functionName: "transfer",
                args: [recipient, parseUnits(amount, decimals || 18)]
            }),
            gas: 100_000,
            maxFeePerGas: 20_000_000_000,
            maxPriorityFeePerGas: 1_500_000_000
        }
    }



    const res = await sendMessage({ type: "SEND_TRANSACTION", transaction: tx })

    return res
}