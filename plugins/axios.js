import globalConfig from '@/config'

export default function ({ $axios }) {
  $axios.setHeader('client_token', globalConfig.backend.logistics.token)

  $axios.onRequest(config => {
    console.log('Making request to backend with ' + config.url)
  })

  $axios.onError(error => {
    console.log(error.message)
  })
}
