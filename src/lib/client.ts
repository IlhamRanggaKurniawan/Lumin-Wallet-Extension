import { createWalletClient, http, publicActions } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { sepolia } from "viem/chains"

const mnemonicPhrase = import.meta.env.VITE_MNEMONIC_PHRASE as string

const account = mnemonicToAccount(
    mnemonicPhrase,
    {
        accountIndex: 0
    }
)

const client = createWalletClient({
    chain: sepolia,
    account,
    transport: http("https://eth-sepolia.g.alchemy.com/v2/-ec5oAkgC16e5k9ERMfFx")
}).extend(publicActions)

export default client