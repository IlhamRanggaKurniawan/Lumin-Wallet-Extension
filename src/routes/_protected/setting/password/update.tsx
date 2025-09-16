import Header from '@/components/Header'
import Input from '@/components/input/Input'
import { Button } from '@/components/ui/button'
import { getMnemonic } from '@/lib/mnemonic'
import { usePasswordStore } from '@/lib/store/passwordStore'
import { storage } from '@/lib/utils/storage'
import { createFileRoute, useLocation, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_protected/setting/password/update')({
  component: RouteComponent,
})

function RouteComponent() {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  })
  const [error, setError] = useState("")
  const { password: storePassword } = usePasswordStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (location.state === null) {
      return navigate({ to: "/setting/password", replace: true })
    }

    if (password.confirmPassword !== password.newPassword) {
      return setError("Passwords don’t match")
    }

    if (password.newPassword.length < 8) {
      return setError("Password should be at least 8 character")
    }

    const encryptedMnemonic = await storage.getItem("mnemonic", "local")

    const mnemonic = await getMnemonic(storePassword, encryptedMnemonic)

    encryptedMnemonic(password.newPassword, mnemonic)

    navigate({ to: "/", replace: true })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
      <Header title="Change Password" href="/setting" />
      <div className='flex flex-col items-center justify-center py-12 gap-4'>
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
        <p className="text-sm font-light text-red-500">{error}</p>
      </div>
      <Button className="absolute bottom-0 w-full py-6">
        Save
      </Button>
    </form>
  )
}
