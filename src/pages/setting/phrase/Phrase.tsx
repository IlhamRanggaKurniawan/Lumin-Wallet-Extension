import Header from "@/components/Header"
import SeedPhrase from "@/components/SeedPhrase"
import { Button } from "@/components/ui/button"
import { getMnemonic } from "@/lib/account"
import { storage } from "@/lib/utils/storage"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

const Phrase = () => {
    const [mnemonic, setMnemonic] = useState<string[]>([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetchMnemonic = async () => {
            
            if (location.state === null) {
                return navigate("/setting/phrase/warning", { replace: true })
            }

            const encryptedMnemonic = await storage.getItem("mnemonic", "local")

            const decryptedMnemonic = await getMnemonic(location.state.password, encryptedMnemonic)

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
            <Button variant={"destructive"} className="absolute bottom-0 w-full py-6 rounded-xl" onClick={() => navigate("/")}>
                Back to Main page
            </Button>
        </div>
    )
}

export default Phrase