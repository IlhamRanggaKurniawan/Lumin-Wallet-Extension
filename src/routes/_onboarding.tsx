import useAuthStore from '@/lib/store/authStore'
import { storage } from '@/lib/utils/storage'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding')({
  loader: async () => {
    const mnemonic = await storage.getItem("mnemonic", "local")
    const { isLoggedIn } = useAuthStore.getState()

    if (mnemonic) {
      throw redirect({ to: '/' })
    }
    if (mnemonic && !isLoggedIn) {
      throw redirect({ to: '/auth/login' })
    }

    return null
  }
})
