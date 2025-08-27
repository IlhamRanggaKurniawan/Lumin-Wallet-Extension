import Header from "@/components/Header"
import SeedPhrase from "@/components/SeedPhrase"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

const Phrase = () => {

    const navigate = useNavigate()
    return (
        <div className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
            <Header title="Recovery phrase" href="/setting"/>
            <div className="mt-12">
                <SeedPhrase />
            </div>
            <p className="my-5 text-center text-zinc-500">Anyone who knows your recovery phrase can access your wallet and funds.</p>
            <Button variant={"destructive"} className="absolute bottom-0 w-full py-6 rounded-xl" onClick={() => navigate("/")}>
                Back to Main page
            </Button>
        </div>
    )
}

export default Phrase