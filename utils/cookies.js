import Cookie from 'js-cookie'
import cookie from 'cookie'

import config from '@/config'

export const setToken = token => {
  Cookie.set('token', token, { expires: config.cookie.expires })
}

export const getToken = (req) => {
  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie)
    return token
  }
  return null
}

export const unsetToken = () => {
  Cookie.remove('token')
}