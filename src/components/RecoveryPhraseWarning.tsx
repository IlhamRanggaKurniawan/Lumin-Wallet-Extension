import { Eye, KeyRound, Laptop, TriangleAlert } from 'lucide-react'

const RecoveryPhraseWarning = () => {
    return (
        <div className='w-full py-8 space-y-8'>
            <div className='w-full flex gap-3'>
                <div className="aspect-square w-12 shrink-0 h-fit rounded-md bg-red-500/20 flex items-center justify-center text-red-500">
                    <TriangleAlert />
                </div>
                <div>
                    <p className='text-red-500'>Before you continue</p>
                    <p className='text-zinc-500 text-sm'>Anyone who knows your recovery phrase can access your wallet and funds</p>
                </div>
            </div>
            <div className='w-full h-fit flex flex-col rounded-xl border p-6 gap-8'>
                <div className='flex gap-6'>
                    <Eye className='text-red-500' />
                    <p>View this in private</p>
                </div>
                <div className='flex gap-6'>
                    <KeyRound className='text-red-500' />
                    <p>Do not share with anyone</p>
                </div>
                <div className='flex gap-6'>
                    <Laptop className='text-red-500' />
                    <p>Never enter it to any websites or applications</p>
                </div>
            </div>
        </div>
    )
}

export default RecoveryPhraseWarning