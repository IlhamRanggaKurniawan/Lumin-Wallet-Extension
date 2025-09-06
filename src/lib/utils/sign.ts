import type { TransactionSerializable } from "viem"
import { sendMessage } from "./message"

export const sendTransaction = async (transaction: TransactionSerializable) => {
    const tes = await sendMessage({ type: "SEND_TRANSACTION", transaction })

    console.log(tes)
}