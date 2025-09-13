import { TabsContent } from '../ui/tabs'
import Activity from '../Activity'
import { useTxHistoryStore } from '@/lib/store/txHistoryStore'

const ActivityTab = () => {
    const { transactions } = useTxHistoryStore()

    return (
        <TabsContent value='activity' className='space-y-2'>
            {transactions && transactions.map((tx) => (
                <Activity amount={tx.value} timestamp={tx.timestamp} imgUrl={tx.tokenLogo} symbol={tx.asset!} type={tx.type} from={tx.from} to={tx.to} key={tx.hash}/>
            ))}
        </TabsContent>
    )
}

export default ActivityTab