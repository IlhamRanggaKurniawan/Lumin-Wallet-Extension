import { create } from "zustand"


type passwordStore = {
    password: string,
    setPassword: (password: string) => void
}

export const usePasswordStore = create<passwordStore>()((set) => ({
    password: "",
    setPassword: (password) => set({ password })
}))