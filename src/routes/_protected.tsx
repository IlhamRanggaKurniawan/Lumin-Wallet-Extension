/* eslint-disable react-hooks/rules-of-hooks */
import useAuthStore from '@/lib/store/authStore'
import { useBalanceStore } from '@/lib/store/balanceStore'
import { useTxHistoryStore } from '@/lib/store/txHistoryStore'
import { useWalletStore } from '@/lib/store/walletStore'
import { storage } from '@/lib/utils/storage'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'

const protectedLayout = () => {
  const { fetchBalances } = useBalanceStore.getState()
  const { fetchData } = useTxHistoryStore.getState()
  const { address } = useWalletStore.getState()

  useEffect(() => {
    if (!address) return
    fetchBalances(address)
    fetchData(address)

    const eventSource = new EventSource(`http://localhost:3000/events/alchemy/${address}`)

    eventSource.onmessage = (event) => {
      const payload = JSON.parse(event.data)

      console.log(`Receive ${payload.value} ${payload.asset} from ${payload.fromAddress}`)
      toast(`Receive ${payload.value} ${payload.asset} from ${payload.fromAddress}`)
    }

    return () => {
      eventSource.close();
    };
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

    if (!mnemonic) throw redirect({ to: '/onboarding' })
    if (mnemonic && !isLoggedIn) throw redirect({ to: '/auth/login' })
  },
  component: protectedLayout
})



