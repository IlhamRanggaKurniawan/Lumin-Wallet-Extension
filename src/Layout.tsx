/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import useAuthStore from './lib/store/authStore'
import { storage } from './lib/utils/storage'

export const Layout = () => {
    const { isLoggedIn } = useAuthStore()
    const [mnemonic, setMnemonic] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            const data = await storage.getItem("mnemonic", "local")

            setMnemonic(data)
        }
        getData()
    }, [])

    useEffect(() => {
        if (mnemonic && (isLoggedIn && isLoggedIn !== null)) {
            navigate("/", { replace: true })
        } else if (mnemonic && (!isLoggedIn && isLoggedIn !== null)) {
            navigate("/login", { replace: true })
        } else if (!mnemonic) {
            navigate("/onboarding", { replace: true })
        }
    }, [isLoggedIn, mnemonic])

    if (isLoggedIn === null) {
        console.log({isLoggedIn})
        console.log({mnemonic})
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