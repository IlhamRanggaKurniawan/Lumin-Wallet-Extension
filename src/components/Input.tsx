import { type LucideProps } from "lucide-react"

type inputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    handleClick?: () => void
}

const Input = ({ Icon, handleClick, ...props }: inputProps) => {
    return (
        <>
            {Icon ? (
                <div className="w-full h-full relative">
                    <div className="flex items-center h-full">
                        <input
                            {...props}
                            className='h-14 w-full rounded-xl pl-4 pr-12  border bg-accent duration-300 text-sm border-zinc-500 focus:outline-none focus:bg-background'
                        />
                        <Icon className="right-4 cursor-pointer absolute size-5" onClick={handleClick} />
                    </div>
                </div>
            ) : (
                <input
                    {...props}
                    className='h-14 w-full rounded-xl px-4 border bg-accent duration-300 text-sm border-zinc-500 focus:outline-none focus:bg-background'
                />
            )}
        </>
    )
}

export default Input