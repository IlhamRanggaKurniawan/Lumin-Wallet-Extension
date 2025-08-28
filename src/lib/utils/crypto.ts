export const getRandomBytes = (length: number) => {
    const arr = new Uint8Array(length);
    crypto.getRandomValues(arr);
    return arr;
}

export const deriveKey = async (password: string, salt: Uint8Array) => {
    const enc = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    )

    return crypto.subtle.deriveKey({
        name: "PBKDF2",
        salt: salt.buffer as BufferSource,
        iterations: 100000,
        hash: "SHA-256"
    },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    )
}

export const encryptData = async (data: string, key: CryptoKey, iv: Uint8Array) => {
    const enc = new TextEncoder()
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv.buffer as BufferSource },
        key,
        enc.encode(data)
    )

    return new Uint8Array(encrypted)
}

