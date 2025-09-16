import type { Hex } from "viem";
import { alchemy } from "./alchemy";
import { AssetTransfersCategory, SortingOrder } from "alchemy-sdk";

export type normalizedTx = {
    type: "Received" | "Sent"
    hash: string
    from: string
    to: string
    category: string
    asset: string | null
    tokenAddress: string
    decimals: number
    timestamp: string
    value: number
    tokenLogo: string
}

// const tokenCache: Record<string, { name: string | null; logo: string | null }> = {};


// const getTokenInfo = async (address: string) => {
//     if (tokenCache[address]) return tokenCache[address];
//     const meta = await alchemy.core.getTokenMetadata(address);
//     tokenCache[address] = { name: meta.name, logo: meta.logo };
//     return tokenCache[address];
// }

export const getTransactionHistory = async (address: Hex) => {
    const category = [
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.INTERNAL,
    ]

    const params = {
        fromBlock: "0x0",
        toBlock: "latest",
        order: SortingOrder.DESCENDING,
        category: category,
        withMetadata: true,
    }

    const [fromTx, toTx] = await Promise.all([
        alchemy.core.getAssetTransfers({ ...params, fromAddress: address, }),
        alchemy.core.getAssetTransfers({ ...params, toAddress: address, })
    ])

    const rawTx = [...fromTx.transfers, ...toTx.transfers]

    // const uniqueAddresses = [...new Set(rawTx.map((tx) => tx.rawContract.address))];

    // const metaMap = Object.fromEntries(
    //     await Promise.all(
    //         uniqueAddresses.map(async (addr) => {
    //             const meta = await getTokenInfo(addr!);
    //             return [addr, meta];
    //         })
    //     )
    // );

    const tx: normalizedTx[] = rawTx.map((tx) => {
        return {
            category: tx.category!,
            from: tx.from!,
            to: tx.to!,
            hash: tx.hash!,
            decimals: Number(tx.rawContract.decimal!),
            asset: tx.asset!,
            tokenAddress: tx.rawContract.address ? tx.rawContract.address : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            timestamp: tx.metadata.blockTimestamp!,
            value: tx.value!,
            type: tx.to === address ? "Received" : "Sent",
            // tokenLogo: tx.category === "erc20" ? metaMap[tx.rawContract.address!]?.logo : "token/ethereum.png",
            tokenLogo: ""
        }
    })

    return tx
}