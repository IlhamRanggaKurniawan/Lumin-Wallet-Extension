import type { Hex } from "viem";
import { create } from "zustand";
import { storage } from "../utils/storage";


type walletStore = {
    address: Hex | null,
    setAddress: (addr: Hex) => void,
    clearAddress: () => void,
    initialize: () => Promise<void>
}

export const useWalletStore = create<walletStore>()((set) => ({
    address: null,
    setAddress: (addr) => {
        storage.setItem("address", addr, "session")
        set({ address: addr })
    },
    clearAddress: () => {
        storage.removeItem("address", "session")
        set({ address: null })
    },
    initialize: async () => {
        const addr = await storage.getItem("address", "session")

        if (addr) {
            set({ address: addr })
        }
    }
}))

useWalletStore.getState().initialize()