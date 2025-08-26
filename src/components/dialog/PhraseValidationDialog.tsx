import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import Input from '../Input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'

const PhraseValidationDialog = ({ children }: { children: React.ReactNode }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
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
                <Button className='mt-8 py-6' variant={"destructive"} onClick={() => navigate("/setting/phrase")}>
                    Continue
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default PhraseValidationDialog