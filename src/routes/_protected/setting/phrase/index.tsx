import Header from '@/components/Header'
import SeedPhrase from '@/components/SeedPhrase'
import { Button } from '@/components/ui/button'
import { getMnemonic } from '@/lib/mnemonic'
import { usePasswordStore } from '@/lib/store/passwordStore'
import { storage } from '@/lib/utils/storage'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_protected/setting/phrase/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [mnemonic, setMnemonic] = useState<string[]>([])
  const { password } = usePasswordStore()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMnemonic = async () => {
      if (password === "") {
        return navigate({ to: "/setting/phrase/warning", replace: true })
      }

      const encryptedMnemonic = await storage.getItem("mnemonic", "local")

      const decryptedMnemonic = await getMnemonic(password, encryptedMnemonic)

      setMnemonic(decryptedMnemonic.split(" "))
    }

    fetchMnemonic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
      <Header title="Recovery phrase" href="/setting" />
      <div className="mt-12">
        <SeedPhrase mnemonic={mnemonic} />
      </div>
      <p className="my-5 text-center text-zinc-500">Anyone who knows your recovery phrase can access your wallet and funds.</p>
      <Button variant={"destructive"} className="absolute bottom-0 w-full py-6 rounded-xl" onClick={() => navigate({ to: "/" })}>
        Back to Main page
      </Button>
    </div>
  )
}
