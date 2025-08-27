import React from 'react'

const PhraseInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className="w-full h-full relative">
            <div className="flex items-center h-full">
                <input
                    {...props}
                    className='h-12 text-xs w-full rounded-xl pr-4 pl-8 border bg-accent duration-300 border-zinc-500 focus:outline-none focus:bg-background'
                />
                <p className="left-4 cursor-pointer absolute text-sm font-semibold">1</p>
            </div>
        </div>
    )
}

export default PhraseInput