/* eslint-disable @typescript-eslint/no-explicit-any */
const isExtension = typeof chrome !== "undefined" && !!chrome.runtime && !!chrome.runtime.id


type StorageType = "local" | "session"

export const storage = {
    setItem: async (key: string, value: any, type: StorageType) => {
        if (!isExtension) {
            const str = JSON.stringify(value)
            if (type === "local") {
                localStorage.setItem(key, str)
            } else {
                sessionStorage.setItem(key, str)
            }
        } else {
            if (type === "local") {
                return new Promise<void>((resolve) => {
                    chrome.storage.local.set({ [key]: value }, () => resolve())
                })
            } else {
                return new Promise<void>((resolve) => {
                    chrome.storage.session.set({ [key]: value }, () => resolve())
                })
            }
        }
    },

    getItem: async <T = any>(key: string, type: StorageType): Promise<T | null> => {
        if (!isExtension) {
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
        if (!isExtension) {
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
