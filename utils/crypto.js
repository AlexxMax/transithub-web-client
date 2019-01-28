import CryptoJS from 'crypto-js'
import config from '@/config'

const key = config.crypto.key

export default {
  encrypt: data => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
  },
  decrypt: cipherText => {
    const bytes  = CryptoJS.AES.decrypt(cipherText, key)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  }
}
