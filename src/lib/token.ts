import { formatUnits, type Hex } from "viem"
import { alchemy } from "./alchemy"
import type { token } from "./store/balanceStore"

export const getTokensByWallet = async (address: Hex) => {
    const balance = await alchemy.core.getTokenBalances(address)

    const tokenData = (await Promise.all(
        balance.tokenBalances.slice(0, 10).map(async (token) => {
            if (BigInt(token.tokenBalance!) > 0n) {
                const metadata = await alchemy.core.getTokenMetadata(token.contractAddress)

                return {
                    tokenAddress: token.contractAddress,
                    tokenBalance: formatUnits(BigInt(token.tokenBalance!), metadata.decimals!),
                    metadata
                }
            }
        })
    )).filter(Boolean)

    return tokenData as token[]
}