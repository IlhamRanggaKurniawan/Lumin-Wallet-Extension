import { create } from "zustand"
import { storage } from "../utils/storage";

type authStore = {
    isLoggedIn: boolean | null,
    login: () => void
    logout: () => void,
    initialize: () => void;
}

const useAuthStore = create<authStore>()((set) => ({
    isLoggedIn: null,
    login: () => {
        storage.setItem("isLoggedIn", true, "session")
        set({ isLoggedIn: true })
    },
    logout: () => {
        storage.setItem("isLoggedIn", false, "session")
        set({ isLoggedIn: false })
    },
    initialize: async () => {
        const data = await storage.getItem<boolean>("isLoggedIn", "session")

        if (data === null) {
            storage.setItem("isLoggedIn", false, "session")
            set({ isLoggedIn: false })
            return
        }

        set({ isLoggedIn: data })
    }
}))

useAuthStore.getState().initialize();

export default useAuthStore