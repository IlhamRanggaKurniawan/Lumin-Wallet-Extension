import { Button } from './ui/button'

const SeedPhrase = () => {
    const phrase = ["daughter", "second", "chuckle", "doll", "cash", "mad", "galaxy", "write", "spider", "gesture", "jelly", "adult"]
    return (
        <div className='w-full rounded-xl bg-accent border relative flex items-center justify-center'>
            <div className='grid grid-cols-2 p-6 pt-10 w-full'>
                <div className='space-y-3'>
                    {phrase.slice(0, phrase.length / 2).map((word, i) => (
                        <div className='flex gap-4' key={i}>
                            <p className='text-zinc-500 w-3'>{i + 1}</p>
                            <p>{word}</p>
                        </div>
                    ))}
                </div>
                <div className='border-l border-black pl-6 space-y-3'>
                    {phrase.slice(phrase.length / 2).map((word, i) => (
                        <div className='flex gap-4' key={i}>
                            <p className='text-zinc-500 w-3'>{i + (phrase.length / 2 + 1)}</p>
                            <p>{word}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Button className='absolute -top-4 rounded-2xl text-sm text-zinc-500 bg-background border hover:bg-muted'>Copy</Button>
        </div>
    )
}

export default SeedPhrase