import ForgotPasswordDialog from "@/components/dialog/ForgotPasswordDialog"
import Input from "@/components/Input"
import { Button } from "@/components/ui/button"
import { validatePassword } from "@/lib/account"
import useAuthStore from "@/lib/store/authStore"
import { storage } from "@/lib/utils/storage"
import { Eye, EyeOff, University } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

const Login = () => {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const {login : loginFunction} = useAuthStore()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            const encryptedMnemonic = await storage.getItem("mnemonic", "local")

            const isValid = await validatePassword(password, encryptedMnemonic)

            loginFunction()

            if (isValid) {
                navigate("/", { replace: true })
            }
        } catch {
            setError("Wrong Password")
        }

    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="w-full text-base h-full min-h-[calc(100vh-32px)] flex flex-col justify-between">
            <div className="w-full h-full flex flex-col items-center justify-center gap-10">
                <div className="aspect-square bg-accent rounded-md p-4">
                    <University className="size-10" />
                </div>
                <div className="text-center">
                    <p className="text-lg font-medium">Welcome Back</p>
                    <p className="text-zinc-500">Enter your password to unlock</p>
                </div>
                <div className="w-full">
                    <Input
                        Icon={showPassword ? EyeOff : Eye}
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                        type={showPassword ? "text" : "password"}
                        handleClick={() => setShowPassword(!showPassword)}
                    />
                     <p className="text-red-500 text-center text-sm font-light">{error}</p>
                </div>
            </div>
            <div className="space-y-3">
                <Button className="w-full py-6 rounded-xl" type="submit">
                    Unlock
                </Button>
                <ForgotPasswordDialog />
            </div>
        </form>
    )
}

export default Login