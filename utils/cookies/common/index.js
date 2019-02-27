import Cookie from 'js-cookie'
import cookie from 'cookie'
import Crypto from '@/utils/crypto'

import { EU_COOKIE_LAW_KEY } from '@/utils/cookies'

export const generateFiltersMethods = cookieKey => ({
  setFilters: filters => {
    if (cookiesAreAccepted()) {
      Cookie.set(cookieKey, Crypto.encrypt(JSON.stringify(filters)))
    }
  },
  getFilters: req => {
    if (req.headers.cookie && cookiesAreAccepted(req)) {
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

const cookiesAreAccepted = (req = null) => {
  if (req && req.headers.cookie) {
    const accepted = Boolean(cookie.parse(req.headers.cookie)[EU_COOKIE_LAW_KEY])
    return accepted
  }

  if (!req && process.client) {
    return localStorage.getItem(EU_COOKIE_LAW_KEY)
  }
  return null
}
