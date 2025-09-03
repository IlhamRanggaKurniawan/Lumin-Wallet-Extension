import Header from "@/components/Header"
import Input from "@/components/Input"
import { Button } from "@/components/ui/button"
import { importOrCreateWallet } from "@/lib/mnemonic"
import useAuthStore from "@/lib/store/authStore"
import { useWalletStore } from "@/lib/store/walletStore"
import { storage } from "@/lib/utils/storage"
import { Eye, EyeOff, LockKeyhole } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

const NewWallet = () => {
    const [error, setError] = useState("")
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    })
    const navigate = useNavigate()
    const { login } = useAuthStore()
    const { setAddress } = useWalletStore()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password.newPassword.length < 8) {
            return setError("Password should be minimum 8 characters")
        }

        if (password.newPassword !== password.confirmPassword) {
            return setError("Password doen't match")
        }

        const data = await importOrCreateWallet(password.newPassword)

        login()

        await storage.setItem("mnemonic", data, "local")
        setAddress("0xcD2bE3b031a88445ff28e99685eEf01B24833399")

        navigate("/")
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col justify-between h-full min-h-[calc(100vh-32px)]">
            <div>
                <Header title="Create Account" />
                <div className="pt-12">
                    <div className="aspect aspect-square w-fit p-4 bg-accent rounded-xl mx-auto">
                        <LockKeyhole />
                    </div>
                    <p className="text-zinc-500 text-center text-sm w-[80%] mx-auto py-4">You’ll need this to unlock your wallet and access your recovery phrase</p>
                </div>
                <div className="space-y-5">
                    <Input
                        Icon={showPassword.newPassword ? EyeOff : Eye}
                        value={password.newPassword}
                        placeholder='New Password'
                        required
                        onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                        autoFocus
                        type={showPassword.newPassword ? "text" : "password"}
                        handleClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}
                    />
                    <Input
                        Icon={showPassword.confirmPassword ? EyeOff : Eye}
                        value={password.confirmPassword}
                        placeholder='Confirm Password'
                        required
                        onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                        type={showPassword.confirmPassword ? "text" : "password"}
                        handleClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                    />
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
            <Button className="py-6" variant={"outline"}>
                Continue
            </Button>
        </form>
    )
}

export default NewWallet