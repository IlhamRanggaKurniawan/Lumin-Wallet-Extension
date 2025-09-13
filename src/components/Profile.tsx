import Avatar from './Avatar'
import { Copy, Settings } from 'lucide-react'
import { useWalletStore } from '@/lib/store/walletStore'
import { Link } from '@tanstack/react-router'
import { handleCopy } from '@/lib/utils/utils'

const Profile = () => {
    const { address } = useWalletStore()

    return (
        <div className='w-full space-y-2 pb-4'>
            <div className='flex justify-between items-center'>
                <Avatar />
                <Link to={"/setting"}>
                    <Settings className='transition-all duration-500 hover:rotate-180 hover:text-[#FFBC4C] size-6 cursor-pointer' />
                </Link>
            </div>
            <div>
                <h2 className='text-lg font-semibold'>Wallet 1</h2>
                <div onClick={() => handleCopy(address || "")} className='text-zinc-500 flex items-center gap-2 text-base cursor-pointer'>
                    <p>{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                    <Copy className='size-4' />
                </div>
            </div>
        </div>
    )
}

export default Profile