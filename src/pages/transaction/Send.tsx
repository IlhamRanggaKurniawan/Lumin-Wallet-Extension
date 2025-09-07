import Header from "@/components/Header"
import RecipientAddressInput from "@/components/input/RecipientAddressInput"
import TransferAmountInput from "@/components/input/TransferAmountInput"
import TokenSelect from "@/components/select/TokenSelect"
import { Button } from "@/components/ui/button"
import { useBalanceStore } from "@/lib/store/balanceStore"
import { useTransferStore } from "@/lib/store/transferStore"
import { useWalletStore } from "@/lib/store/walletStore"
import { sendTransaction } from "@/lib/utils/sign"
import { toast } from "sonner"
import { isAddress } from "viem"

const Send = () => {
  const { amount, recipient, selectedToken, reset } = useTransferStore()
  const { fetchBalances } = useBalanceStore()
  const { address } = useWalletStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedToken) {
      return toast.error("Please select a token")
    }

    if (!isAddress(recipient)) {
      return toast.error("Invalid Address")
    }

    const balance = Number(selectedToken.tokenBalance)
    const numAmount = Number(amount)

    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      return toast.error("Invalid amount")
    }

    if (numAmount > balance) {
      return toast.error("Amount exceeds balance")
    }


    const res = await sendTransaction({ amount, decimals: selectedToken.metadata.decimals, tokenAddress: selectedToken.tokenAddress, recipient })

    if (res.success === true) {
      fetchBalances(address!)
      reset()
      return toast.success("Transaction Success")
    }

    toast.error("Transaction Failed")
  }


  return (
    <form onSubmit={handleSubmit} className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
      <Header title="Send Coins" />
      <div className="space-y-3 pt-6">
        <TokenSelect />
        <RecipientAddressInput />
        <TransferAmountInput />
      </div>
      <Button className="absolute bottom-0 w-full py-6">Send</Button>
    </form>
  )
}

export default Send