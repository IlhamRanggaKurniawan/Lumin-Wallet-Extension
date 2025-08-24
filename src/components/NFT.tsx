
const NFT = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className='w-full aspect-square rounded-md overflow-hidden'>
            <img src={imageUrl} className='object-cover w-full h-full' />
        </div>
    )
}

export default NFT