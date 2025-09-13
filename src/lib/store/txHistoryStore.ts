import { create } from "zustand"
import { getTransactionHistory, type normalizedTx } from "../transactions"
import type { Hex } from "viem"


type txHistoryStore = {
    transactions: normalizedTx[],
    loading: boolean,
    hasFetched: boolean
    fetchData: (address: Hex) => Promise<void>
}

export const useTxHistoryStore = create<txHistoryStore>()((set) => ({
    transactions: [],
    loading: false,
    hasFetched: false,
    fetchData: async (address) => {
        try {
            set({ loading: true })

            const tx = await getTransactionHistory(address)

            set({ transactions: tx })
        } catch (error) {
            console.error(error)
        } finally {
            set({ loading: false, hasFetched: true })
        }
    }
}))