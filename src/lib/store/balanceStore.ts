import { create } from "zustand"
import { formatEther, type Hex } from "viem"
import axios from "axios"
import client from "../client"

export type token = {
    tokenAddress: Hex
    tokenBalance: string,
    metadata: {
        decimals: number,
        logo: string | null,
        name: string,
        symbol: string
    }
}

type balanceStore = {
    ethBalance: string,
    tokens: token[],
    loading: boolean,
    fetchBalances: (address: Hex) => Promise<void>
}

export const useBalanceStore = create<balanceStore>()((set) => ({
    ethBalance: "",
    tokens: [],
    loading: false,
    fetchBalances: async (address) => {
        try {
            set({ loading: true })
            const [ethBal, tokenByWallet] = await Promise.all([
                formatEther(await client.getBalance({ address })),
                axios.get(`https://crypto-data-pi.vercel.app/api/tokens?address=${address}`)
            ])   

            set({
                ethBalance: ethBal,
                tokens: tokenByWallet.data
            })

        } catch (error) {
            console.error(error)
        } finally {
            set({ loading: false })
        }
    }
}))