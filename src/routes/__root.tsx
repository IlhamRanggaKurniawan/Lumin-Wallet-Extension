import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router'


const Layout = () => {
    return (
        <>
            <div className='w-full h-full flex p-4 justify-center'>
                <div className='max-w-md w-full'>
                    <Outlet />
                </div>
            </div>
            <TanStackRouterDevtools />
        </>
    )
}


export const Route = createRootRoute({
    component: Layout,
})

