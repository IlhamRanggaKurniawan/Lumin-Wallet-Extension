import Header from '@/components/Header'
import ReceiveAddress from '@/components/ReceiveAddress'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/transaction/receive')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
      <Header title="Receive" />
      <ReceiveAddress />
    </div>
  )
}
