import { create } from "zustand"

type authStore = {
    isLoggedIn: boolean | null,
    toggleLoggedIn: () => void,
    initialize: () => void;
}

const useAuthStore = create<authStore>()((set, get) => ({
    isLoggedIn: null,
    toggleLoggedIn: () => {
        const { isLoggedIn } = get()
        if (isLoggedIn === false) {
            chrome.runtime.sendMessage({ type: "LOGIN" })
            set({ isLoggedIn: true })
        } else {
            chrome.runtime.sendMessage({ type: "LOGOUT" })
            set({ isLoggedIn: false })
        }
    },
    initialize: () => {
        chrome.runtime.sendMessage({ type: "GET_SESSION" }, (res) => {
            set({ isLoggedIn: res.value });
        });
    }
}))

useAuthStore.getState().initialize();

export default useAuthStore