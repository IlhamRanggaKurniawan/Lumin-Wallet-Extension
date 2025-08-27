import { Button } from "@/components/ui/button"
import { University } from "lucide-react"
import { useNavigate } from "react-router"

const Onboarding = () => {

    const navigate = useNavigate()

    return (
        <div className="w-full text-base h-full min-h-[calc(100vh-32px)] flex flex-col justify-between">
            <div className="w-full h-full flex items-center justify-center">
                <div className="aspect-square bg-accent rounded-md p-4 mb-40">
                    <University className="size-10" />
                </div>
            </div>
            <div className="space-y-3">
                <Button className="w-full py-6 rounded-xl" onClick={() => navigate("/onboarding/create")}>
                    Create a new wallet
                </Button>
                <Button className="w-full py-6 rounded-xl" variant={"ghost"} onClick={() => navigate("/onboarding/import")}>
                    Import an existing wallet
                </Button>
            </div>
        </div>
    )
}

export default Onboarding