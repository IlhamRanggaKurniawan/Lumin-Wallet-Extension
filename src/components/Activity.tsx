const Activity = () => {
    return (
        <div className='flex w-full items-center gap-2 cursor-pointer transition-all duration-300 py-2 px-4 rounded-md hover:bg-[#FFDE63]/20'>
            <div className='w-12 aspect-square rounded-full overflow-hidden'>
                <img src='token/usdc.png' />
            </div>
            <div className='font-semibold w-full'>
                <div className='flex justify-between items-center'>
                    <p className='text-lg'>Received</p>
                    <p className='text-zinc-500 text-sm'>Aug 21</p>
                </div>
                <p className='text-zinc-500 text-base'>20.1 USDC from 0xcD2b...3399</p>
            </div>
        </div>
    )
}

export default Activity