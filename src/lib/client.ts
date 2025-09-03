import { createPublicClient, http } from 'viem'
import { sepolia } from "viem/chains"

const client = createPublicClient({
    chain: sepolia,
    transport: http("https://eth-sepolia.g.alchemy.com/v2/-ec5oAkgC16e5k9ERMfFx")
})

export default client