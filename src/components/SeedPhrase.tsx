import { Button } from './ui/button'

const SeedPhrase = ({ mnemonic }: { mnemonic: string[] }) => {

    const handleCopy = () => {
        const data = mnemonic.join(" ")

        navigator.clipboard.writeText(data)
    }

    return (
        <div className='w-full rounded-xl bg-accent border relative flex items-center justify-center'>
            <div className='grid grid-cols-2 p-6 pt-10 w-full'>
                <div className='space-y-3'>
                    {mnemonic.slice(0, mnemonic.length / 2).map((word, i) => (
                        <div className='flex gap-4' key={i}>
                            <p className='text-zinc-500 w-3'>{i + 1}</p>
                            <p>{word}</p>
                        </div>
                    ))}
                </div>
                <div className='border-l border-black pl-6 space-y-3'>
                    {mnemonic.slice(mnemonic.length / 2).map((word, i) => (
                        <div className='flex gap-4' key={i}>
                            <p className='text-zinc-500 w-3'>{i + (mnemonic.length / 2 + 1)}</p>
                            <p>{word}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Button
                className='absolute -top-4 rounded-2xl text-sm text-zinc-500 bg-background border hover:bg-muted'
                onClick={handleCopy}
            >
                Copy
            </Button>
        </div>
    )
}

export default SeedPhrase