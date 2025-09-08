import PhraseValidationDialog from '@/components/dialog/PhraseValidationDialog'
import Header from '@/components/Header'
import RecoveryPhraseWarning from '@/components/RecoveryPhraseWarning'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/setting/phrase/warning')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full text-base h-full min-h-[calc(100vh-32px)] relative">
      <Header title='Recovery Phrase' />
      <RecoveryPhraseWarning />
      <PhraseValidationDialog />
    </div>
  )
}
