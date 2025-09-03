import { useBalanceStore, type token } from '@/lib/store/balanceStore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useState } from 'react'

const TokenSelect = () => {
    const [token, setToken] = useState("")
    const { ethBalance, tokens } = useBalanceStore()

    return (
        <Select value={token} onValueChange={setToken}>
            <SelectTrigger className="cursor-pointer w-fit">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"eth"}>
                    Ethereum
                </SelectItem>
                {tokens.map((token) => (
                    <SelectItem value={token.tokenAddress} key={token.tokenAddress}>
                        {token.metadata.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default TokenSelect