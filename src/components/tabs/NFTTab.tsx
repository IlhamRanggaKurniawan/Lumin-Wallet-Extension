import { TabsContent } from '../ui/tabs'
import NFT from '../NFT'

const NFTTab = () => {
    return (
        <TabsContent value='nft' className='grid grid-cols-2 gap-2'>
            <NFT imageUrl='nft/monkey1.png' />
            <NFT imageUrl='nft/monkey2.png' />
            <NFT imageUrl='nft/monkey3.png' />
            <NFT imageUrl='nft/monkey4.png' />
        </TabsContent>
    )
}

export default NFTTab