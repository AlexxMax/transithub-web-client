import globalConfig from '@/config'

export default function ({ $axios }) {
  // $axios.setHeader('client_token', globalConfig.backend.logistics.token)

  $axios.onRequest(config => {
    const params = config.params || {}
    params.client_token = globalConfig.backend.logistics.token
    config.params = params
    console.log('Making request to backend with ' + config.url)
  })

  $axios.onError(error => {
    console.log(error.message)
  })
}
