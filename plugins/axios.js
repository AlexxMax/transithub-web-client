import globalConfig from '@/config'

export default function ({ $axios, isDev }) {
  // $axios.setHeader('client_token', globalConfig.backend.logistics.token)

  $axios.onRequest(config => {
    const params = config.params || {}
    params.client_token = globalConfig.backend.logistics.token
    config.params = params
    if (isDev) {
      console.info('Making request to backend with ' + config.url)
    }
  })

  $axios.onError(error => {
    console.error(error)
  })
}
