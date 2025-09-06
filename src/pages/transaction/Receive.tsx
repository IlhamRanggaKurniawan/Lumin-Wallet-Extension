import Header from "@/components/Header"
import ReceiveAddress from "@/components/ReceiveAddress"

const Receive = () => {
  return (
    <div className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
      <Header title="Receive" />
      <ReceiveAddress />
    </div>
  )
}

export default Receive