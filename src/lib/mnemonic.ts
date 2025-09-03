import { english, generateMnemonic } from "viem/accounts"
import { decryptData, deriveKey, encryptData, getRandomBytes } from "./utils/crypto"
import { fromHex, toHex } from "./utils/hex"

export type encryptedMnemonic = {
    ciphertext: string,
    iv: string,
    salt: string
}


export const importOrCreateWallet = async (password: string, phrase?: string): Promise<encryptedMnemonic> => {
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

export const getMnemonic = async (password: string, encrypted: encryptedMnemonic) => {
    const key = await deriveKey(password, fromHex(encrypted.salt))
    const decrypted = await decryptData(fromHex(encrypted.ciphertext), key, fromHex(encrypted.iv))

    if (!validateMnemonicPhrase(decrypted)) {
        throw new Error("Invalid mnemonic")
    }

    return decrypted
}

export const validatePassword = async (password: string, encrypted: encryptedMnemonic) => {
    const key = await deriveKey(password, fromHex(encrypted.salt))
    const decrypted = await decryptData(fromHex(encrypted.ciphertext), key, fromHex(encrypted.iv))

    if (!validateMnemonicPhrase(decrypted)) {
        throw new Error("Invalid mnemonic")
    }

    return validateMnemonicPhrase(decrypted)
}

export const validateMnemonicPhrase = (phrase: string) => {
    const words = phrase.trim().toLowerCase().split(/\s+/)

    if (words.length < 12) {
        return false
    }

    return words.every((w) => english.includes(w))
}