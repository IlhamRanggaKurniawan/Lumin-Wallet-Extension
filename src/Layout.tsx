/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from 'react-router'
import { useEffect } from 'react'
import useAuthStore from './lib/store/authStore'

export const PrivateLayout = () => {
    const { isLoggedIn } = useAuthStore()
    const navigate = useNavigate()

    console.log(`layout: ${isLoggedIn}`)

    useEffect(() => {
        if (!isLoggedIn && isLoggedIn !== null) {
            navigate("/onboarding", { replace: true })
        }
    }, [isLoggedIn])

    if (isLoggedIn === null) {
        return null
    }

    return (
        <div className='w-full h-full flex p-4 justify-center'>
            <div className='max-w-md w-full'>
                <Outlet />
            </div>
        </div>
    )
}

export const GuestLayout = () => {
    const navigate = useNavigate()
    const { isLoggedIn } = useAuthStore()

    console.log(`layout: ${isLoggedIn}`)

    useEffect(() => {
        if (isLoggedIn && isLoggedIn !== null) {
            navigate("/", { replace: true })
        }
    }, [isLoggedIn])

    if (isLoggedIn === null) {
        return null
    }

    return (
        <div className='w-full h-full flex p-4 justify-center'>
            <div className='max-w-md w-full'>
                <Outlet />
            </div>
        </div>
    )
}