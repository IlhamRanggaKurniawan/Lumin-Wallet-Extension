import { english, generateMnemonic } from "viem/accounts"
import { deriveKey, encryptData, getRandomBytes } from "./utils/crypto"
import { toHex } from "./utils/hex"


export const importOrCreateWallet = async (password: string, phrase?: string) => {
    if (!phrase) {
        phrase = generateMnemonic(english)
    }

    const salt = getRandomBytes(16)

    const key = await deriveKey(password, salt)

    const iv = getRandomBytes(12)

    const encrypted = await encryptData(phrase, key, iv)

    return {
        ciphertext: toHex(encrypted),
        iv: toHex(iv),
        salt: toHex(salt),
    }
}

export const validateMnemonicPhrase = (phrase: string) => {
    const words = phrase.trim().toLowerCase().split(/\s+/)

    if (words.length < 12) {
        return false
    }

    return words.every((w) => english.includes(w))
}