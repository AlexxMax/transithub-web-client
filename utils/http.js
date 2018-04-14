import { logisticsClientToken as clientToken } from '@/tokens'

export const complementRequest = req => {
  const params = req.params || {}
  params.client_token = clientToken
  req.params = params
  return req
}
