import Header from '@/components/Header'
import useAuthStore from '@/lib/store/authStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import SettingItem from "@/components/setting/Setting"
import { BookLock, ChartNoAxesColumn, Coins, KeyRound, Languages, Lock, Palette } from 'lucide-react'
import ThemeSelect from '@/components/select/ThemeSelect'
import CurrencySelect from '@/components/select/CurrencySelect'
import LanguageSelect from '@/components/select/LanguageSelect'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_protected/setting/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleClick = () => {
    logout()
    navigate({ to: "/auth/login" })
  }

  return (
    <div className="text-base h-full min-h-[calc(100vh-32px)] relative">
      <Header title="Settings" href="/" />
      <div className="pt-6">
        <h3 className="text-zinc-500 font-bold">Preferences</h3>
        <div>
          <SettingItem Icon={Palette} title="Theme" Select={ThemeSelect} />
          <SettingItem Icon={Coins} title="Currency" Select={CurrencySelect} />
          <SettingItem Icon={Languages} title="Language" Select={LanguageSelect} />
          <SettingItem Icon={ChartNoAxesColumn} title="Portofolio Balance" />
        </div>
      </div>
      <div className="pt-6">
        <h3 className="text-zinc-500 font-bold">Privacy and security</h3>
        <div className="space-y-1">
          <SettingItem Icon={KeyRound} title="Change Password" href="/setting/password" />
          <SettingItem Icon={BookLock} title="Recovery Phrase" href="/setting/phrase/warning" />
        </div>
      </div>
      <p className="text-zinc-500 font-semibold text-xs py-4">Version 1.0.0</p>
      <Button className="absolute bottom-0 w-full py-6" onClick={handleClick}>
        <Lock />
        Lock Wallet
      </Button>
    </div>
  )
}
