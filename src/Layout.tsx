import { Outlet } from 'react-router'

const Layout = () => {
    return (
        <div className='w-full h-full flex p-4 justify-center'>
            <div className='max-w-md w-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout