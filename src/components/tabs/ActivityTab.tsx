/* eslint-disable react-hooks/exhaustive-deps */
import { TabsContent } from '../ui/tabs'
import Activity from '../Activity'
import { useTxHistoryStore } from '@/lib/store/txHistoryStore'
import { useWalletStore } from '@/lib/store/walletStore'
import { useEffect } from 'react'

const ActivityTab = () => {
    const { fetchData, transactions } = useTxHistoryStore()
    const { address } = useWalletStore()

    useEffect(() => {
        fetchData(address!)
    }, [address])
    return (
        <TabsContent value='activity' className='space-y-2'>
            {transactions && transactions.map((tx) => (
                <Activity amount={tx.value} timestamp={tx.timestamp} imgUrl={tx.tokenLogo} symbol={tx.asset!} type={tx.type} from={tx.from} to={tx.to} key={tx.hash}/>
            ))}
        </TabsContent>
    )
}

export default ActivityTab