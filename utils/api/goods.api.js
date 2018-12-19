import { getUserJWToken } from '@/utils/user'
import { getLangFromStore } from '@/utils/locale'

const URL_GOODS = '/api1/transithub/goods'

export const getGoods = async function() {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_GOODS,
    params: {
      access_token: getUserJWToken(this)
    }
  })

  const result = {
    status,
    count,
    items: []
  }

  if (status) {
    const locale = getLangFromStore(this.store)
    items.forEach(item => {
      result.items.push({
        name: locale === 'ru' ? item.name_ru : item.name_ua,
        guid: item.guid
      })
    })
  }

  return result
}
