import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { LockKeyhole } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { storage } from '@/lib/utils/storage'

const ForgotPasswordDialog = () => {
    const [warningStep, setWarningStep] = useState(1)
    const navigate = useNavigate()

    const handleReset = async () => {
        await storage.setItem("isLoggedIn", false, "session")
        await storage.removeItem("mnemonic", "local")

        navigate("/onboarding", { replace: true })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full py-6 rounded-xl" variant={"ghost"}>
                    Forgot Password?
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className='!max-w-sm text-base'>
                {warningStep === 1 ? (
                    <>
                        <div className='w-full flex flex-col items-center justify-center gap-5'>
                            <div className='aspect-square bg-accent p-3 rounded-xl'>
                                <LockKeyhole />
                            </div>
                            <p>Forgot password</p>
                            <p className='text-center text-sm text-zinc-500'>Uniswap cannot help recover your password. You need to reset your wallet by re-entering your 12-word recovery phrase.</p>
                        </div>

                        <Button className='mt-8 py-6' onClick={() => setWarningStep(2)}>
                            Reset Wallet
                        </Button>
                    </>
                ) : (
                    <>
                        <div className='w-full flex flex-col items-center justify-center gap-5'>
                            <div className='aspect-square bg-red-500/20 text-red-500 p-3 rounded-xl'>
                                <LockKeyhole />
                            </div>
                            <p>Before you continue</p>
                            <p className='text-center text-sm text-zinc-500'>Make sure you have your 12-word recovery phrase before you reset your wallet. Otherwise you will not be able to recover your funds.</p>
                        </div>

                        <Button className='mt-8 py-6' onClick={() => handleReset()}>
                            Continue
                        </Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ForgotPasswordDialog