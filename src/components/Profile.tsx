import Avatar from './Avatar'
import { Copy, Settings } from 'lucide-react'

const Profile = () => {
    return (
        <div className='w-full space-y-2 pb-4'>
            <div className='flex justify-between items-center'>
                <Avatar />
                <Settings className='transition-all duration-500 hover:rotate-180 hover:text-[#FFBC4C] size-6 cursor-pointer'/>
            </div>
            <div>
                <h2 className='text-lg font-semibold'>Ilham Rangga</h2>
                <div className='text-zinc-500 flex items-center gap-2 text-base cursor-pointer'>
                    <p>0xcD2b...3399</p>
                    <Copy className='size-4'/>
                </div>
            </div>
        </div>
    )
}

export default Profile