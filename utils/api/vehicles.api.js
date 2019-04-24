import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { COLORS } from '@/utils/colors'

const URL = Object.freeze({
  VEHICLES: '/api1/transithub/vehicles',
  BRAND: '/api1/transithub/vehicles_brands',
  TYPES: '/api1/transithub/vehicles_types',
  SUBTYPES: '/api1/transithub/vehicles_subtypes'
})

const formatResponseItem = item => ({
  guid: item.guid,
  vNumber: item.v_number.toUpperCase(),
  techPassport: item.tech_passport.toUpperCase(),
  model: item.model.pCapitalizeAllFirstWords(),
  brand: item.brand.pCapitalizeAllFirstWords(),
  type: item.type,
  typeName: item.type_name.pCapitalizeFirstWord(),
  subtype: item.subtype,
  subtypeName: item.subtype_name.pCapitalizeFirstWord(),
  gross: item.gross,
  tara: item.tara,
  net: item.net,
  cargoCapacity: item.cargo_capacity,
  color: item.color,
  year: item.year,
  width: item.width,
  height: item.height,
  length: item.length,
  cWidth: item.c_width,
  cHeight: item.c_height,
  cLength: item.c_length,
  hasGps: item.has_gps === 1,
  suitableForSealing: item.suitable_for_sealing === 1
})

const formatPayload = payload => ({
  v_number: payload.vNumber,
  model: payload.model,
  brand: payload.brand,
  tech_passport: payload.techPassport,
  kind: payload.kind,
  type: payload.type,
  subtype: payload.subtype,
  gross: payload.gross || 0,
  tara: payload.tara || 0,
  net: payload.net || 0,
  cargo_capacity: payload.cargoCapacity || 0,
  color: payload.color || COLORS.WHITE,
  width: payload.width || 0,
  height: payload.height || 0,
  length: payload.length || 0,
  c_width: payload.cWidth || 0,
  c_height: payload.cHeight || 0,
  c_length: payload.cLength || 0,
  has_gps: payload.hasGps === true ? 1 : 0,
  suitable_for_sealing: payload.suitableForSealing === true ? 1 : 0,
  year: payload.year || new Date().getFullYear()
})

export const getVehicles = async function(companyGuid, limit = PAGE_SIZE, offset = OFFSET) {
  const { data: { status, count, items } } = await this.$axios({
    method: 'get',
    url: URL.VEHICLES,
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
        ...formatResponseItem(item),
        companyGuid
      })
    });
  }

  return result
}

export const getVehicle = async function(companyGuid, driverGuid) {
  const { data: { status, count, items } } = await this.$axios({
    method: 'get',
    url: URL.VEHICLES,
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
      ...formatResponseItem(item),
      companyGuid
    }
  }

  return result
}

export const createVehicle = async function(companyGuid, payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'post',
    url: URL.VEHICLES,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid
    },
    data: formatPayload(payload)
  })

  return {
    status,
    err: _err,
    item: status ? {
      ...formatResponseItem(item),
      companyGuid
    } : {}
  }
}

export const changeVehicle = async function(companyGuid, vehicleGuid, payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'post',
    url: URL.VEHICLES,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      guid: vehicleGuid
    },
    data: formatPayload(payload)
  })

  return {
    status,
    err: _err,
    item: status ? {
      ...formatResponseItem(item),
      companyGuid
    } : {}
  }
}

export const getBrands = async function(search = null) {
  const { data: { status, items } } = await this.$axios({
    method: 'get',
    url: URL.BRAND,
    params: {
      access_token: getUserJWToken(this),
      search
    }
  })

  const result = {
    status,
    items: []
  }

  if (status && items.length > 0) {
    result.items = items.map(item => ({ name: item.name.pCapitalizeAllFirstWords() }))
  }

  return result
}

export const getTypes = async function(kind = null) {
  const { data: { status, items } } = await this.$axios({
    method: 'get',
    url: URL.TYPES,
    params: {
      access_token: getUserJWToken(this),
      kind
    }
  })

  const result = {
    status,
    items: []
  }

  if (status && items.length > 0) {
    result.items = items.map(item => ({
      id: item.id,
      name: item.name.pCapitalizeAllFirstWords(),
      trailer: item.trailer
    }))
  }

  return result
}

export const getSubtypes = async function(kind = null) {
  const { data: { status, items } } = await this.$axios({
    method: 'get',
    url: URL.SUBTYPES,
    params: {
      access_token: getUserJWToken(this),
      kind
    }
  })

  const result = {
    status,
    items: []
  }

  if (status && items.length > 0) {
    result.items = items.map(item => ({
      id: item.id,
      name: item.name.pCapitalizeAllFirstWords()
    }))
  }

  return result
}
