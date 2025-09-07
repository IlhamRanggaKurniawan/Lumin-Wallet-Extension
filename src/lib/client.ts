import { createPublicClient, http } from 'viem'
import { sepolia } from "viem/chains"

const client = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`)
})

export default client