import TokenCard from "../cards/TokenCard"
import { TabsContent } from "../ui/tabs"

const TokenTab = () => {
    return (
        <TabsContent value='token' className='space-y-2'>
            <TokenCard amount={20.1} imageUrl='token/usdc.png' name='USDC' symbol='USDC' />
            <TokenCard amount={0.1} imageUrl='token/ethereum.png' name='Ethereum' symbol='ETH' />
            <TokenCard amount={10} imageUrl='token/usdt.png' name='USDT' symbol='USDT' />
        </TabsContent>
    )
}

export default TokenTab