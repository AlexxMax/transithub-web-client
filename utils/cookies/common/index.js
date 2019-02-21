import Cookie from 'js-cookie'
import cookie from 'cookie'
import Crypto from '@/utils/crypto'

export const generateFiltersMethods = cookieKey => ({
  setFilters: filters => {
    Cookie.set(cookieKey, Crypto.encrypt(JSON.stringify(filters)))
  },
  getFilters: req => {
    if (req.headers.cookie) {
      const filters = cookie.parse(req.headers.cookie)[cookieKey]
      if (filters) {
        return JSON.parse(Crypto.decrypt(filters))
      }
    }
    return null
  },
  unsetFilters: () => {
    Cookie.remove(cookieKey)
  }
})

export const cookiesAreAccepted = () => {
  
}
