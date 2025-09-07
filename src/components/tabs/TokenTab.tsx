import { useBalanceStore } from "@/lib/store/balanceStore"
import TokenCard from "../cards/TokenCard"
import { TabsContent } from "../ui/tabs"

const TokenTab = () => {
    const { tokens } = useBalanceStore()

    return (
        <TabsContent value='token' className='space-y-2'>
            {tokens.length > 0 && tokens.map((token) => (
                <TokenCard key={token.tokenAddress} amount={token.tokenBalance} imageUrl={token.metadata.logo || ""} name={token.metadata.name} symbol={token.metadata.symbol} />
            ))}
        </TabsContent>
    )
}

export default TokenTab