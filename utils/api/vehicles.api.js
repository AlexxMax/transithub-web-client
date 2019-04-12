import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'

const URL = Object.freeze({
  vehicles: '/api1/transithub/vehicles'
})

export const getVehicles = async function(companyGuid, limit = PAGE_SIZE, offset = OFFSET) {
  const { data: { status, count, items } } = await this.$axios({
    method: 'get',
    url: URL.vehicles,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      limit,
      offset
    }
  })

  const result = {
    status,
    count,
    items: []
  }

  if (status && count > 0) {
    items.forEach(item => {
      result.items.push({
        guid: item.guid,
        vNumber: item.v_number.toUpperCase(),
        techPassport: item.tech_passport.toUpperCase(),
        model: item.model.pCapitalizeAllFirstWords(),
        brand: item.brand.pCapitalizeAllFirstWords(),
        type: item.type.pCapitalizeFirstWord(),
        subtype: item.subtype,
        gross: item.gross,
        tara: item.tara,
        net: item.net,
        cargoCapacity: item.cargo_capacity,
        color: item.color.pCapitalizeFirstWord(),
        year: item.year,
        width: item.width,
        height: item.height,
        length: item.length,
        cWidth: item.c_width,
        cHeight: item.c_height,
        cLength: item.c_length,
        hasGps: item.has_gps === 1,
        suitableForSealing: item.suitable_for_sealing === 1,
        companyGuid
      })
    });
  }

  return result
}

export const getVehicle = async function(companyGuid, driverGuid) {
  const { data: { status, count, items } } = await this.$axios({
    method: 'get',
    url: URL.vehicles,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      guid: driverGuid
    }
  })

  const result = {
    status,
    item: {}
  }

  if (status && count > 0) {
    const item = items[0]
    result.item = {
      guid: item.guid,
      vNumber: item.v_number.toUpperCase(),
      techPassport: item.tech_passport.toUpperCase(),
      model: item.model.pCapitalizeAllFirstWords(),
      brand: item.brand.pCapitalizeAllFirstWords(),
      type: item.type.pCapitalizeFirstWord(),
      subtype: item.subtype,
      gross: item.gross,
      tara: item.tara,
      net: item.net,
      cargoCapacity: item.cargo_capacity,
      color: item.color.pCapitalizeFirstWord(),
      year: item.year,
      width: item.width,
      height: item.height,
      length: item.length,
      cWidth: item.c_width,
      cHeight: item.c_height,
      cLength: item.c_length,
      hasGps: item.has_gps === 1,
      suitableForSealing: item.suitable_for_sealing === 1,
      companyGuid
    }
  }

  return result
}
