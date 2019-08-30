import { getUserJWToken } from '@/utils/user'
import { getLangFromStore } from '@/utils/locale'

const URL_GOODS = '/api1/transithub/goods'
const URL_GOODS_BY_WAREHOUSE = '/api1/transithub/pq_warehouse/goods'

export const getGoods = async function () {
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

export const getGoodsByWarehouse = async function (warehouseGuid) {

  const { status, count, items } = await this.$axios.$get(URL_GOODS_BY_WAREHOUSE, {
    params: {
      access_token: getUserJWToken(this),
      warehouse_guid: warehouseGuid
    }
  })

  const result = { status, count, items }

  if (status) {
    const locale = getLangFromStore(this.store)

    result.items = items.map(item => ({
      name: locale === 'ru' ? item.goods_name_ru : item.goods_name_ua,
      guid: item.goods_code,
      direction: item.direction
    }))
  }

  return result
}

export const bindGoodsToWarehouse = async function (warehouseGuid, { guid, direction }) {

  const { status, ...args } = await this.$axios.$post(URL_GOODS_BY_WAREHOUSE, {
    goods_guid: guid,
    direction
  }, {
    params: {
      access_token: getUserJWToken(this),
      warehouse_guid: warehouseGuid
    }
  })

  return { status, item: { guid: args.goods_code, direction: args.direction } }

}

export const unbindGoodsToWarehouse = async function (warehouseGuid, guid) {

  const { status, ...args } = await this.$axios.$delete(URL_GOODS_BY_WAREHOUSE, {
    params: {
      access_token: getUserJWToken(this),
      warehouse_guid: warehouseGuid,
      goods_guid: guid
    }
  })

  return { status, item: { guid: args.goods_guid } }
}