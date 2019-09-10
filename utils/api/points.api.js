import _ from 'lodash'

import { getUserJWToken } from '@/utils/user'

const URL_POINTS = '/api1/transithub/localities'

export const getPoints = async function (
  limit = null,
  offset = null,
  kind = 1,
  countryCode = null,
  regionCode = null,
  districtCode = null,
  search = null
) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_POINTS,
    params: {
      access_token: getUserJWToken(this),
      limit,
      offset,
      kind,
      country_code: countryCode,
      region_code: regionCode,
      district_code: districtCode,
      search
    }
  })

  const result = {
    status,
    count,
    items: []
  }

  if (status) {
    for (const item of items) {
      const locale = this.store.state.locale
      result.items.push({
        guid: item.guid,
        name: ((locale === 'ua' ? item.name_ua : item.name_ru) || '').pCapitalizeAllFirstWords(),
        kindId: item.kind_id,
        kind: item.kind,
        districtCode: item.district_code,
        districtName: _.initial(((locale === 'ua' ? item.district_name_ua : item.district_name_ru) || '').pCapitalizeAllFirstWords().split(' ')).join(' '),
        regionCode: item.region_code,
        regionName: ((locale === 'ua' ? item.region_name_ua : item.region_name_ru) || '').pCapitalizeAllFirstWords(),
        countryCode: item.country_code || '',
        countryName: ((locale === 'ua' ? item.country_name_ua : item.country_name_ru) || '').pCapitalizeFirstWord(),
        description: ((locale === 'ua' ? item.description_ua : item.description_ru) || '').pCapitalizeFirstWord(),
        koatuu: item.koatuu,
        lat: item.lat || '',
        lng: item.lng || '',
        type: ((locale === 'ua' ? item.locality_type_ua : item.locality_type_ru) || ''),
        description: ((locale === 'ua' ? item.description_ua : item.description_ru) || '').pCapitalizeAllFirstWords()
      })
    }
  }

  return result
}

export const getPoint = async function (
  initValue = null,
  kind = 2,
) {

  let params = {}
  if (kind === 2) {

    params.kind = 2
    params.region_code = initValue

  } else if (kind === 3) {

    params.kind = 3
    params.district_code = initValue

  } else if (kind === 4) {

    params.kind = 4
    params.koatuu = initValue

  }

  console.log(params);

  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_POINTS,
    params: {
      access_token: getUserJWToken(this),
      ...params
    }
  })

  const result = {
    status,
    item: {}
  }

  if (status && items.length > 0) {
    const locale = this.store.state.locale
    const item = items[0]
    result.item.guid = item.guid
    result.item.name = ((locale === 'ua' ? item.name_ua : item.name_ru) || '').pCapitalizeAllFirstWords()
    result.item.kindId = item.kind_id
    result.item.kind = item.kind
    result.item.districtCode = item.district_code
    result.item.districtName = _.initial(((locale === 'ua' ? item.district_name_ua : item.district_name_ru) || '').pCapitalizeAllFirstWords().split(' ')).join(' ')
    result.item.regionCode = item.region_code
    result.item.regionName = ((locale === 'ua' ? item.region_name_ua : item.region_name_ru) || '').pCapitalizeAllFirstWords()
    result.item.countryCode = item.country_code || ''
    result.item.countryName = ((locale === 'ua' ? item.country_name_ua : item.country_name_ru) || '').pCapitalizeFirstWord()
    result.item.description = ((locale === 'ua' ? item.description_ua : item.description_ru) || '').pCapitalizeFirstWord()
    result.item.koatuu = item.koatuu
    result.item.lat = item.lat || ''
    result.item.lng = item.lng || ''
    result.item.type = ((locale === 'ua' ? item.locality_type_ua : item.locality_type_ru) || '')
    result.item.description = ((locale === 'ua' ? item.description_ua : item.description_ru) || '').pCapitalizeAllFirstWords()
  }

  return result
}