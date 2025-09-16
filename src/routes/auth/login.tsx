import ForgotPasswordDialog from '@/components/dialog/ForgotPasswordDialog'
import Input from '@/components/input/Input'
import { Button } from '@/components/ui/button'
import { getMnemonic, validatePassword } from '@/lib/mnemonic'
import useAuthStore from '@/lib/store/authStore'
import { useWalletStore } from '@/lib/store/walletStore'
import { setAccount } from '@/lib/utils/sign'
import { storage } from '@/lib/utils/storage'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff, University } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
  loader: async () => {
    const mnemonic = await storage.getItem("mnemonic", "local")
    const { isLoggedIn } = useAuthStore.getState()

    if (!mnemonic) {
      throw redirect({ to: '/onboarding' })
    }
    if (mnemonic && isLoggedIn) {
      throw redirect({ to: '/' })
    }

    return null
  }
})

function RouteComponent() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const { setAddress } = useWalletStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const encryptedMnemonic = await storage.getItem("mnemonic", "local")

      const isValid = await validatePassword(password, encryptedMnemonic)

      if (isValid) {
        login()
        const encryptedMnemonic = await storage.getItem("mnemonic", "local")

        const mnemonic = await getMnemonic(password, encryptedMnemonic)

        const address = await setAccount(mnemonic)

        setAddress(address)
        navigate({ to: "/", replace: true })
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
