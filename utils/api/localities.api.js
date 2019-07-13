import { getUserJWToken } from '@/utils/user'

const URL_REGIONS = '/api1/transithub/localities/regions'

export const getRegions = async function() {
  const { data: { status, items } } = await this.$axios({
    method: 'get',
    url: URL_REGIONS,
    params: {
      access_token: getUserJWToken(this)
    }
  })

  return {
    status,
    items: status ? items.map(({ code, name }) => ({ code, name })) : []
  }
}
