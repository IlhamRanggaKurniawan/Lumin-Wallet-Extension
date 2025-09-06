import { create } from "zustand"
import type { token } from "./balanceStore"

type transferStore = {
    selectedToken: token | null,
    recipient: string,
    amount: string,
    setSelectedToken: (token: token) => void,
    setRecipient: (addr: string) => void,
    setAmount: (amount: string) => void,
    reset: () => void
}

export const useTransferStore = create<transferStore>()((set) => ({
    selectedToken: null,
    amount: "",
    recipient: "",
    setSelectedToken: (token) => {
        set({ selectedToken: token })
    },
    setRecipient: (addr) => {
        set({ recipient: addr })
    },
    setAmount: (amount) => {
        set({ amount })
    },
    reset: () => {
        set({
            selectedToken: null,
            recipient: "",
            amount: "",
        })
    }

}))