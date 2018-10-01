import { complementRequest } from '@/utils/http'
import { getUserJWToken } from '@/utils/user'

const URL_POINTS = '/api1/transithub/localities'

export const getPoints = async function(
  limit = null,
  offset = null,
  kind = 1,
  countryCode = null,
  regionCode = null,
  districtCode = null
) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_POINTS,
    params: {
      access_token: getUserJWToken(this),
      limit,
      offset,
      kind,
      country_code: countryCode,
      region_code: regionCode,
      district_code: districtCode
    }
  }))

  const result = {
    status,
    count,
    items : []
  }

  if (status) {
    for (const item of items) {
      result.items.push({
        guid: item.guid,
        nameUa: item.name_ua,
        nameRu: item.name_ru,
        kind: item.kind_id,
        countryCode: item.country_code,
        regionCode: item.region_code,
        districtCode: item.district_code,
        descriptionUa: item.description_ua,
        descriptionRu: item.description_ru,
        koatuu: item.koatuu,
        lat: item.lat,
        lng: item.lng,
        localityTypeUa: item.locality_type_ua,
        localityTypeRu: item.locality_type_ru
      })
    }
  }

  return result
}
