type activityProps = {
    imgUrl: string | null,
    type: "Received" | "Sent"
    amount: number
    timestamp: string
    from?: string
    to?: string
    symbol: string
}


const TransactionCard = ({ amount, imgUrl, symbol, type, from, to, timestamp }: activityProps) => {
    const date = new Date(timestamp)

    const formatted = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
    })

    return (
        <div className='flex w-full h-16 items-center gap-2 cursor-pointer transition-all duration-300 py-2 px-4 rounded-md hover:bg-primary/10'>
            <div className='w-12 aspect-square rounded-full overflow-hidden'>
                {imgUrl ? (
                    <img src={imgUrl} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-background">Logo</div>
                )}
            </div>
            <div className='font-semibold w-full'>
                <div className='flex justify-between items-center'>
                    <p className='text-lg'>Received</p>
                    <p className='text-zinc-500 text-sm'>{formatted}</p>
                </div>
                <p className='text-zinc-500 text-sm'>{amount} {symbol} {type === "Received" ? "from" : "to"} {type === "Received" ? `${to?.slice(0, 6)}...${to?.slice(-4)}` : `${from?.slice(0, 6)}...${from?.slice(-4)}`}</p>
            </div>
        </div>
    )
}

export default TransactionCard