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
            setPubKey: (key) => {
                set({ pubKey: key })
            },
            setAddress: (address) => {
                set({ address })
            }
        }),
        {
            name: "account-storage"
        }
    )
)

export default useAccountStore