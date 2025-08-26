import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const CurrencySelect = () => {
    const [currency, setCurrency] = useState("USD")

    return (
        <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="cursor-pointer w-fit">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="SGD">SGD</SelectItem>
                <SelectItem value="IDR">IDR</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default CurrencySelect