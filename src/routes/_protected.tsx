import useAuthStore from '@/lib/store/authStore'
import { useBalanceStore } from '@/lib/store/balanceStore'
import { useWalletStore } from '@/lib/store/walletStore'
import { storage } from '@/lib/utils/storage'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  loader: async () => {
    const mnemonic = await storage.getItem("mnemonic", "local")
    const { isLoggedIn } = useAuthStore.getState()
    const { fetchBalances } = useBalanceStore.getState()
    const { address } = useWalletStore.getState()

    if (!mnemonic) {
      throw redirect({ to: '/onboarding' })
    }
    if (mnemonic && !isLoggedIn) {
      throw redirect({ to: '/auth/login' })
    }

    fetchBalances(address!)
    
    return null
  }
})

