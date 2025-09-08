import Header from '@/components/Header'
import Input from '@/components/input/Input'
import { Button } from '@/components/ui/button'
import { validatePassword } from '@/lib/mnemonic'
import { usePasswordStore } from '@/lib/store/passwordStore'
import { storage } from '@/lib/utils/storage'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_protected/setting/password/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { setPassword: setStorePassword } = usePasswordStore()


    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const encryptedMnemonic = await storage.getItem("mnemonic", "local")

        const isValid = await validatePassword(password, encryptedMnemonic)

        if (isValid) {
            setStorePassword(password)
            navigate({ to: "/setting/password/update", replace: true })
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
            <Header title="Change Password" />
            <div className='flex flex-col items-center justify-center py-12 gap-3'>
                <p className='text-zinc-500'>Enter your current password</p>
                <Input
                    Icon={showPassword ? EyeOff : Eye}
                    value={password}
                    placeholder='Current Password'
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    type={showPassword ? "text" : "password"}
                    handleClick={() => setShowPassword(!showPassword)}
                />
            </div>
            <Button className="absolute bottom-0 w-full py-6">
                Continue
            </Button>
        </form>
    )
}
