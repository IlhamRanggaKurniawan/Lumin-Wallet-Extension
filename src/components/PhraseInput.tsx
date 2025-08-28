import React from 'react'

type inputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    number: number,
    handleClick?: () => void
}

const PhraseInput = ({ number, ...props }: inputProps) => {
    return (
        <div className="w-full h-full relative">
            <div className="flex items-center h-full">
                <input
                    {...props}
                    className='h-12 text-xs w-full rounded-xl pr-4 pl-8 border bg-accent duration-300 border-zinc-500 focus:outline-none focus:bg-background'
                />
                <p className="left-4 cursor-pointer absolute text-sm font-semibold">{number}</p>
            </div>
        </div>
    )
}

export default PhraseInput