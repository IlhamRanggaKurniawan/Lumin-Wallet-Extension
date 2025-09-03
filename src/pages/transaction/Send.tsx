import Header from "@/components/Header"
import TokenSelect from "@/components/select/TokenSelect"
import { Button } from "@/components/ui/button"

const Send = () => {
  return (
    <div className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
      <Header title="Send Coins"/>
      <TokenSelect />
      <Button className="absolute bottom-0 w-full py-6">Send</Button>
    </div>
  )
}

export default Send