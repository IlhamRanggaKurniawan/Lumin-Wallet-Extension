import Header from '@/components/Header'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { Eye, LockKeyhole } from 'lucide-react'
import { useNavigate } from 'react-router'

const NewPassword = () => {

        const navigate = useNavigate()

    
    return (
        <div className="flex flex-col justify-between h-full min-h-[calc(100vh-32px)]">
            <div>
                <Header title="Create Password" />
                <div className="pt-12">
                    <div className="aspect aspect-square w-fit p-4 bg-accent rounded-xl mx-auto">
                        <LockKeyhole />
                    </div>
                    <p className="text-zinc-500 text-center text-sm w-[80%] mx-auto py-4">You’ll need this to unlock your wallet and access your recovery phrase</p>
                </div>
                <div className="space-y-5">
                    <Input Icon={Eye} placeholder="New Password" />
                    <Input Icon={Eye} placeholder="Confirm Password" />
                </div>
            </div>
            <Button className="py-6" variant={"outline"} onClick={() => navigate("/")}>
                Continue
            </Button>
        </div>
    )
}

export default NewPassword