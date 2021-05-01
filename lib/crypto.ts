import CryptoJS from 'crypto-js'

const SECRET = 'play-notes-secret'

export const decrypt = <T>(text: string, fallbackObj: T) => {
  const bytes = CryptoJS.AES.decrypt(text, SECRET)
  const bytesString = bytes.toString(CryptoJS.enc.Utf8)
  try {
    const decryptedData = JSON.parse(bytesString)

    return decryptedData as T
  } catch (error) {
    return fallbackObj
  }
}

export const encrypt = (data: object): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET).toString()
}
