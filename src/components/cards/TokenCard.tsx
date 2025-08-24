type tokenCardProps = {
    name: string,
    symbol: string,
    amount: number,
    imageUrl: string
}

const TokenCard = ({ amount, imageUrl, name, symbol }: tokenCardProps) => {
    return (
        <div className='w-full rounded-md flex gap-2 p-4 bg-background items-center border border-[#FFDE63] transition-all duration-300 cursor-pointer hover:bg-[#FFDE63]/20'>
            <div className='w-12 aspect-square rounded-full overflow-hidden'>
                <img src={imageUrl} />
            </div>
            <div className=''>
                <p className='font-semibold text-base'>{name}</p>
                <p className='text-sm'>{amount} {symbol}</p>
            </div>
        </div>
    )
}

export default TokenCard