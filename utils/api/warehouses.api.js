import { complementRequest } from '@/utils/http'
import { getUserJWToken } from '@/utils/user'

const URL_WAREHOUSES = '/api1/transithub/warehouses'

export const getWarehouse = async function(code) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_WAREHOUSES,
    params: {
      access_token: getUserJWToken(this),
      code
    }
  }))

  const result = {
    status,
    item: {}
  }

  if (status && items.length > 0) {
    const locale = this.store.state.locale
    const item = items[0]
    result.item.kind = item.kind.pCapitalizeFirstWord() || ''
    result.item.name = item.name
    result.item.buildingNr = item.building_n || ''
    result.item.streetType = item.street_type.pCapitalizeFirstWord() || ''
    result.item.streetName = item.street_name
    result.item.locationType = ((locale === 'ua' ? item.location_type : item.location_type_ru) || '').pCapitalizeFirstWord()
    result.item.locationName = ((locale === 'ua' ? item.loaction_name : item.loaction_name_ru) || '').pCapitalizeAllFirstWords()
    result.item.districtName = ((locale === 'ua' ? item.district_name : item.district_name_ru) || '').pCapitalizeAllFirstWords()
    result.item.regionName = ((locale === 'ua' ? item.region_name : item.region_name_ru) || '').pCapitalizeAllFirstWords()
    result.item.countryName = ((locale === 'ua' ? item.country_name : item.country_name_ru) || '').pCapitalizeFirstWord()
    result.item.code = item.classificator_code
    result.item.lat = item.lat || ''
    result.item.lng = item.lng || ''
    result.item.fullAddress = item.full_address.pCapitalizeAllFirstWords(),
    result.item.typeTrain = null,
    result.item.heightTrain = null,
    result.item.loadCapacity = null,
    result.item.typeScale = null,
    result.item.lengthPlatform = null
  }

  return result
}