import Profile from '@/components/Profile'
import ActivityTab from '@/components/tabs/ActivityTab'
import TokenTab from '@/components/tabs/TokenTab'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CircleArrowDown, Send } from 'lucide-react'

export const Route = createFileRoute('/_protected/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="w-full">
            <Profile />
            {/* <WalletBalance /> */}
            <div className='grid grid-cols-2 gap-2 pt-4 pb-8'>
                <Link to={"/transaction/send"} className="contents">
                    <Button className='p-8 flex items-center font-semibold justify-center gap-2 text-base'>
                        <Send className='size-5' />
                        Send
                    </Button>
                </Link>
                <Link to={"/transaction/receive"} className="contents">
                    <Button className='p-8 flex items-center font-semibold justify-center gap-2 text-base'>
                        <CircleArrowDown className='size-5' />
                        Receive
                    </Button>
                </Link>
            </div>
            <Tabs defaultValue='token'>
                <TabsList className='w-full mb-3'>
                    <TabsTrigger value='token'>Token</TabsTrigger>
                    {/* <TabsTrigger value='nft'>NFTs</TabsTrigger> */}
                    <TabsTrigger value='activity'>Activity</TabsTrigger>
                </TabsList>
                <TokenTab />
                {/* <NFTTab /> */}
                <ActivityTab />
            </Tabs>
        </div>
    )
}
