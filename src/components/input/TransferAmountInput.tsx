/* eslint-disable react-hooks/exhaustive-deps */
import { useTransferStore } from "@/lib/store/transferStore"
import Input from "./Input"
import { useEffect, useState } from "react"

const TransferAmountInput = () => {
  const [error, setError] = useState("")
  const { selectedToken, setAmount, amount } = useTransferStore()

  const formatAmount = (val: string) => {
    if (!val.includes(".")) return val
    const [int, dec] = val.split(".")
    return `${int}.${dec.slice(0, 3)}`
  }

  const handleChange = (val: string) => {
    if (!/^\d*\.?\d*$/.test(val)) return
    setAmount(val)
  }

  useEffect(() => {
    if (!amount) {
      setError("")
      return
    }

    const num = Number(amount)
    const balance = selectedToken ? Number(selectedToken.tokenBalance) : 0

    if (isNaN(num)) {
      setError("Invalid Number")
    } else if (num > balance) {
      setError("Amount exceeds balance")
    } else if (num <= 0) {
      setError("Amount must be greater than 0")
    } else {
      setError("")
    }
  }, [amount])

  return (
    <div className="w-full rounded-xl bg-border p-3 space-y-3">
      <div className="relative">
        <div className="flex items-center justify-center">
          <Input className={`h-10 bg-background pr-20 ${error ? "border-red-500" : "border-border"}`} onChange={(e) => handleChange(e.target.value)} value={amount} />
          <p className="absolute right-4">{selectedToken?.metadata.symbol}</p>
        </div>
      </div>
      <div className="text-xs flex justify-between text-zinc-500 px-1 py-1">
        <p>Enter the total amount</p>
        <p>Balance: <span className="text-primary">{selectedToken ? formatAmount(selectedToken.tokenBalance) : ""}</span></p>
      </div>
      {error && <p className="text-red-500 text-xs px-1">{error}</p>}
    </div>
  )
}

export default TransferAmountInput