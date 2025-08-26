import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

const Header = ({ title, href }: { title: string, href?: string }) => {
    return (
        <div className='flex items-center justify-between'>
            {href ? (
                <Link to={href}>
                    <ArrowLeft className='cursor-pointer transition-all duration-300 hover:text-[#FFDE63]' />
                </Link>
            ) : (
                <ArrowLeft
                    onClick={() => window.history.back()}
                    className='cursor-pointer transition-all duration-300 hover:text-[#FFDE63]' />
            )}
            <p className='text-lg font-semibold'>{title}</p>
            <ArrowLeft className='invisible' />
        </div>
    )
}

export default Header