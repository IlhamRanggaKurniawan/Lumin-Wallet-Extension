/* eslint-disable @typescript-eslint/no-explicit-any */
const environment = import.meta.env.VITE_ENVIRONMENT

type StorageType = "local" | "session"

export const storage = {
    setItem: async (key: string, value: any, type: StorageType) => {

        console.log(environment)
        if (environment === "Website") {
            const str = JSON.stringify(value)
            if (type === "local") {
                console.log("wlocal")
                localStorage.setItem(key, str)
            } else {
                console.log("wsession")
                sessionStorage.setItem(key, str)
            }
        } else {
            if (type === "local") {
                return new Promise<void>((resolve) => {
                    console.log("elocal")
                    chrome.storage.local.set({ [key]: value }, () => resolve())
                })
            } else {
                return new Promise<void>((resolve) => {
                    console.log("esession")
                    chrome.storage.session.set({ [key]: value }, () => resolve())
                })
            }
        }
    },

    getItem: async <T = any>(key: string, type: StorageType): Promise<T | null> => {
        if (environment === "Website") {
            const raw = type === "local" ? localStorage.getItem(key) : sessionStorage.getItem(key)
            return raw ? JSON.parse(raw) : null
        } else {
            return new Promise<T | null>((resolve) => {
                if (type === "local") {
                    chrome.storage.local.get([key], (result) => resolve(result[key] ?? null))
                } else {
                    chrome.storage.session.get([key], (result) => resolve(result[key] ?? null))
                }
            })
        }
    },

    removeItem: async (key: string, type: StorageType) => {
        if (environment === "Website") {
            if (type === "local") {
                localStorage.removeItem(key)
            } else {
                sessionStorage.removeItem(key)
            }
        } else {
            return new Promise<void>((resolve) => {
                if (type === "local") {
                    chrome.storage.local.remove([key], () => resolve())
                } else {
                    chrome.storage.session.remove([key], () => resolve())
                }
            })
        }
    }
}
