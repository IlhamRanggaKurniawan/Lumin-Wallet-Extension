import { useTransferStore } from "@/lib/store/transferStore"
import { useEffect, useState } from "react"
import { isAddress } from "viem"
import { Button } from "../ui/button"
import Input from "./Input"

const RecipientAddressInput = () => {
    const [error, setError] = useState("")
    const { recipient, setRecipient } = useTransferStore()

    const handlePaste = async () => {
        setRecipient(await navigator.clipboard.readText())
    }

    useEffect(() => {
        if (!isAddress(recipient)) {
            setError("Invalid Address")
        } else {
            setError("")
        }

        if (recipient === "") {
            setError("")
        }

    }, [recipient])

    return (
        <div className='w-full rounded-xl bg-border p-3 space-y-2'>
            <div className="flex justify-between items-center text-sm">
                <p>Recipient's Address</p>
                <Button variant={"ghost"} onClick={handlePaste} type="button">
                    Paste
                </Button>
            </div>
            <Input className={`bg-background h-12 ${error ? "border-red-500" : "border-border"}`} value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    )
}

export default RecipientAddressInput