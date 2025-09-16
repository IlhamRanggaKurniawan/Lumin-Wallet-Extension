import { useBalanceStore } from "@/lib/store/balanceStore"
import { TabsContent } from "../ui/tabs"
import TokenCardSkeleton from "../skeleton/TokenCardSkeleton"
import TokenCard from "../cards/TokenCard"

const TokenTab = () => {
    const { tokens } = useBalanceStore()

    return (
        <TabsContent value='token' className='space-y-2'>
                {tokens.length === 0 ? (
                    [...Array(4)].map((_, i) => <TokenCardSkeleton key={i} />)
                ) : (
                    tokens.map((token) => (
                        <TokenCard
                            key={token.tokenAddress}
                            amount={token.tokenBalance}
                            imageUrl={token.metadata.logo || ""}
                            name={token.metadata.name}
                            symbol={token.metadata.symbol}
                        />
                    ))
                )}
        </TabsContent >
    )
}

export default TokenTab