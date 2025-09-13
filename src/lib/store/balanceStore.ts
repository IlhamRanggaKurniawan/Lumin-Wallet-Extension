import { create } from "zustand"
import { formatEther, type Hex } from "viem"
import client from "../client"
import { getTokensByWallet } from "../token"
import { getTransactionHistory } from "../transactions"

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
    tokens: token[],
    loading: boolean,
    hasFetched: boolean
    fetchBalances: (address: Hex) => Promise<void>
}

export const useBalanceStore = create<balanceStore>()((set) => ({
    tokens: [],
    loading: false,
    hasFetched: false,
    fetchBalances: async (address) => {
        try {
            set({ loading: true })
            const [ethBal, tokenByWallet] = await Promise.all([
                formatEther(await client.getBalance({ address })),
                getTokensByWallet(address)
            ])

            const eth: token = {
                tokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                tokenBalance: ethBal,
                metadata: {
                    symbol: "ETH",
                    name: "Ethereum",
                    decimals: 18,
                    logo: "token/ethereum.png"
                }
            }

            await getTransactionHistory(address)

            const assets = [eth, ...tokenByWallet]

            set({ tokens: assets })
        } catch (error) {
            console.error(error)
        } finally {
            set({ loading: false, hasFetched: true })
        }
    }
}))