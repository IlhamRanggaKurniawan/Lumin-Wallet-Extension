/* eslint-disable @typescript-eslint/no-explicit-any */
export const sendMessage = (message: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            chrome.runtime.sendMessage(message, (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve(response)
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}