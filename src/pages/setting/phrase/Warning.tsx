import PhraseValidationDialog from "@/components/dialog/PhraseValidationDialog"
import Header from "@/components/Header"
import RecoveryPhraseWarning from "@/components/RecoveryPhraseWarning"

const Warning = () => {
    return (
        <div className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
            <Header title='Recovery Phrase' />
            <RecoveryPhraseWarning />
            <PhraseValidationDialog /> 
        </div>
    )
}

export default Warning