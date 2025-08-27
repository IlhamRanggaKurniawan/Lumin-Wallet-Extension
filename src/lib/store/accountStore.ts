import { create } from 'zustand'
import { persist } from 'zustand/middleware'


type accountStore = {
    pubKey: string,
    address: string,
    setPubKey: (key: string) => void;
    setAddress: (address: string) => void;
}

const useAccountStore = create<accountStore>()(
    persist(
        (set) => ({
            address: "",
            pubKey: "",
            setAddress: (address) => {
                set({ address })
            },
            setPubKey: (key) => {
                set({ pubKey: key })
            }
        }),
        { 
            name: "account-storage"
        }
    )
)

export default useAccountStore