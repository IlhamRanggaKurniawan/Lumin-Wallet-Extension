import { useBalanceStore } from '@/lib/store/balanceStore'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { useTransferStore } from '@/lib/store/transferStore'

const TokenSelect = () => {
    const { tokens } = useBalanceStore()
    const { selectedToken, setSelectedToken } = useTransferStore()

    const selectedValue = selectedToken?.metadata.symbol

    const handleChange = (value: string) => {
        const token = tokens.find((t) => t.tokenAddress === value)
        if (token) setSelectedToken(token)

    }

    return (
        <Select value={selectedValue} onValueChange={handleChange}>
            <SelectTrigger className="cursor-pointer w-full !h-16 rounded-2xl !bg-background border-4">
                {selectedToken && (
                    <div className='flex items-center gap-4'>
                        <div className='aspect-square w-10 rounded-full overflow-hidden'>
                            {selectedToken.metadata.logo ? (
                                <img src={selectedToken.metadata.logo} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary text-background">Logo</div>
                            )}
                        </div>
                        <div className='text-left'>
                            <p className='font-semibold text-base'>{selectedToken.metadata.name}</p>
                            <p className='text-sm'>{selectedToken.metadata.symbol}</p>
                        </div>
                    </div>
                )}
            </SelectTrigger>
            <SelectContent>
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