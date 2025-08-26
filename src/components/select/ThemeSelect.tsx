import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useTheme } from "../theme-provider"

const ThemeSelect = () => {
    const { setTheme, theme } = useTheme()

    return (
        <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="cursor-pointer w-fit">
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default ThemeSelect
