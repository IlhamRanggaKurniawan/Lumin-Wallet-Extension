import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import Input from '../input/Input'
import { Button } from '../ui/button'
import { storage } from '@/lib/utils/storage'
import { validatePassword } from '@/lib/mnemonic'
import { useNavigate } from '@tanstack/react-router'
import { usePasswordStore } from '@/lib/store/passwordStore'

const PhraseValidationDialog = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { setPassword: setStorePassword } = usePasswordStore()

    const validate = async () => {
        try {
            const encryptedMnemonic = await storage.getItem("mnemonic", "local")

            const isValid = await validatePassword(password, encryptedMnemonic)

            if (isValid) {
                setStorePassword(password)
                navigate({ to: "/setting/phrase", replace: true })
            }
        } catch {
            setError("Wrong Password")
        }
    }

    const navigate = useNavigate()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="absolute bottom-0 w-full py-6" variant={"destructive"}>
                    Continue
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className='!max-w-sm text-base'>
                <div className='w-full flex flex-col items-center justify-center gap-5'>
                    <div className='aspect-square bg-accent p-3 rounded-xl'>
                        <LockKeyhole />
                    </div>
                    <p>Enter your password</p>
                </div>
                <Input
                    Icon={showPassword ? EyeOff : Eye}
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    type={showPassword ? "text" : "password"}
                    handleClick={() => setShowPassword(!showPassword)}
                />
                <p className='text-sm font-light text-red-500'>{error}</p>
                <Button className='mt-8 py-6' variant={"destructive"} onClick={() => validate()}>
                    Continue
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default PhraseValidationDialog