import { Outlet } from 'react-router'
import { ThemeProvider } from './components/theme-provider'

const Layout = () => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className='w-full h-full flex p-4 justify-center'>
                <div className='max-w-md w-full'>
                    <Outlet />
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Layout