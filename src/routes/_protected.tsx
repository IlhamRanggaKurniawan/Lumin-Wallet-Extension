/* eslint-disable react-hooks/rules-of-hooks */
import useAuthStore from '@/lib/store/authStore'
import { useBalanceStore } from '@/lib/store/balanceStore'
import { useTxHistoryStore } from '@/lib/store/txHistoryStore'
import { useWalletStore } from '@/lib/store/walletStore'
import { storage } from '@/lib/utils/storage'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'

// only for development purpose
import "@/lib/utils/sign"

const protectedLayout = () => {
  const { fetchBalances } = useBalanceStore.getState()
  const { fetchData } = useTxHistoryStore.getState()
  const { address } = useWalletStore.getState()

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:3000/events/alchemy/${address}`)

    eventSource.onmessage = (event) => {
      const payload = JSON.parse(event.data)

      toast(`Receive ${payload.value} ${payload.asset} from ${payload.fromAddress}`)
    }

    return () => {
      eventSource.close();
    };
  }, [address])

  useEffect(() => {

    fetchBalances(address!)
    fetchData(address!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <Outlet />
  )
}

export const Route = createFileRoute('/_protected')({
  loader: async () => {
    const mnemonic = await storage.getItem("mnemonic", "local")
    const { isLoggedIn } = useAuthStore.getState()
    const { address } = useWalletStore.getState()

    if (!mnemonic) throw redirect({ to: '/onboarding' })
    if (mnemonic && !isLoggedIn) throw redirect({ to: '/auth/login' })

    if (!address) return
  },
  component: protectedLayout
})



