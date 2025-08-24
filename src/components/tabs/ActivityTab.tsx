import { TabsContent } from '../ui/tabs'
import Activity from '../Activity'

const ActivityTab = () => {
    return (
        <TabsContent value='activity' className='space-y-2'>
            <Activity />
            <Activity />
            <Activity />
            <Activity />
        </TabsContent>
    )
}

export default ActivityTab