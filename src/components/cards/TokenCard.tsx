type tokenCardProps = {
    name: string,
    symbol: string,
    amount: string,
    imageUrl: string
}

const TokenCard = ({ amount, imageUrl, name, symbol }: tokenCardProps) => {

    const formatAmount = (val: string) => {
        if (!val.includes(".")) return val
        const [int, dec] = val.split(".")
        return `${int}.${dec.slice(0, 3)}`
    }

    return (
        <div className='w-full rounded-md flex gap-2 p-4 bg-background items-center border transition-all duration-300 cursor-pointer hover:bg-white/10'>
            <div className='w-12 aspect-square rounded-full overflow-hidden'>
                {imageUrl ? (
                    <img src={imageUrl} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-background">Logo</div>
                )}
            </div>
            <div className=''>
                <p className='font-semibold text-base'>{name}</p>
                <p className='text-sm'>{formatAmount(amount)} {symbol}</p>
            </div>
        </div>
    )
}

export default TokenCard