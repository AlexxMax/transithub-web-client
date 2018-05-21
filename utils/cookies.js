import Cookie from 'js-cookie'
import cookie from 'cookie'

export const setToken = token => {
  Cookie.set('token', token, {expires: 7})
}

export const getToken = (req) => {
  const { token } = cookie.parse(req.headers.cookie)
  return token
}

export const unsetToken = () => {
  Cookie.remove('token')
}
