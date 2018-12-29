import config from '@/config'

export const complementRequest = req => {
  const params = req.params || {}
  params.client_token = config.backend.logistics.token
  req.params = params
  return req
}

export const arrayToString = array => (array || []).join(';')
