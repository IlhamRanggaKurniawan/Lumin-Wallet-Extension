import PhraseValidationDialog from "@/components/dialog/PhraseValidationDialog"
import Header from "@/components/Header"
import RecoveryPhraseWarning from "@/components/RecoveryPhraseWarning"
import { Button } from "@/components/ui/button"

const Warning = () => {
    return (
        <div className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
            <Header title='Recovery Phrase' />
            <RecoveryPhraseWarning />
            <PhraseValidationDialog>
                <Button className="absolute bottom-0 w-full py-6" variant={"destructive"}>
                    Continue
                </Button>
            </PhraseValidationDialog>
        </div>
    )
}

export default Warning