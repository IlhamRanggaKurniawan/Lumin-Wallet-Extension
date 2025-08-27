import Profile from '@/components/Profile'
import ActivityTab from '@/components/tabs/ActivityTab'
import NFTTab from '@/components/tabs/NFTTab'
import TokenTab from '@/components/tabs/TokenTab'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CircleArrowDown, Send } from 'lucide-react'

const Home = () => {


    return (
        <div className="w-full">
            <Profile />
            {/* <WalletBalance /> */}
            <div className='grid grid-cols-2 gap-2 pt-4 pb-8'>
                <Button className='p-8 flex items-center font-semibold justify-center gap-2 text-base'>
                    <Send className='size-5' />
                    Send
                </Button>
                <Button className='p-8 flex items-center font-semibold justify-center gap-2 text-base'>
                    <CircleArrowDown className='size-5' />
                    Receive
                </Button>
            </div>
            <Tabs defaultValue='token'>
                <TabsList className='w-full mb-3'>
                    <TabsTrigger value='token'>Token</TabsTrigger>
                    <TabsTrigger value='nft'>NFTs</TabsTrigger>
                    <TabsTrigger value='activity'>Activity</TabsTrigger>
                </TabsList>
                <TokenTab />
                <NFTTab />
                <ActivityTab />
            </Tabs>
        </div>
    )
}

export default Home