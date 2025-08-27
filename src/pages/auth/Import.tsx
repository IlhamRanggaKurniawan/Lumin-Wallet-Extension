import Header from '@/components/Header'
import PhraseInput from '@/components/PhraseInput'
import { Button } from '@/components/ui/button'
import { FileLock2 } from 'lucide-react'
import { useNavigate } from 'react-router'

const Import = () => {
    
    const navigate = useNavigate()

    return (
        <div className="flex flex-col justify-between h-full min-h-[calc(100vh-32px)]">
            <div>
                <Header title="Enter your recovery phrase" />
                <div className="pt-12">
                    <div className="aspect aspect-square w-fit p-4 bg-accent rounded-xl mx-auto">
                        <FileLock2 />
                    </div>
                    <p className="text-zinc-500 text-center text-sm w-[80%] mx-auto py-4">Type or paste your 12-word recovery phrase</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <PhraseInput />
                    <PhraseInput />
                    <PhraseInput />
                    <PhraseInput />
                    <PhraseInput />
                    <PhraseInput />
                    <PhraseInput />
                    <PhraseInput />
                    <PhraseInput />
                    <PhraseInput />
                    <PhraseInput />
                    <PhraseInput />
                </div>
            </div>
            <Button className="py-6" variant={"outline"} onClick={() => navigate("/onboarding/import/password")}>
                Continue
            </Button>
        </div>
    )
}

export default Import