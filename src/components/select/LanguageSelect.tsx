import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const LanguageSelect = () => {
    const [language, setLanguage] = useState("English")

    return (
        <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="cursor-pointer w-fit">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Indonesia">Indonesia</SelectItem>
                <SelectItem value="Tahiti">Tahiti</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default LanguageSelect