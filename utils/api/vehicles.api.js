import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { COLORS } from '@/utils/colors'
import { types } from 'util';

const URL = Object.freeze({
  VEHICLES: '/api1/transithub/vehicles',
  BRAND: '/api1/transithub/vehicles_brands',
  TYPES: '/api1/transithub/vehicles_types',
  SUBTYPES: '/api1/transithub/vehicles_subtypes'
})

const formatResponseItem = item => {
  const vehicle = {
    guid: item.guid,
    vNumber: item.v_number.toUpperCase(),
    techPassport: item.tech_passport.toUpperCase(),
    model: (item.model || '').pCapitalizeFirstWord(),
    brand: item.brand.pCapitalizeAllFirstWords(),
    type: item.type,
    typeName: (item.type_name || '').pCapitalizeFirstWord(),
    subtype: item.subtype,
    subtypeName: (item.subtype_name || '').pCapitalizeFirstWord(),
    isTrailer: item.is_trailer === 1,
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
    suitableForSealing: item.suitable_for_sealing === 1,
    isFavorite: item.is_favorite === 1,
    lastTrailer: null,
    lastDriver: null,
    noUsefulSizes: item.no_useful_sizes === 1
  }

  let lastTrailer = null
  if (item.last_trailer_guid) {
    lastTrailer = {
      guid: item.last_trailer_guid,
      vNumber: (item.last_trailer_v_number || '').toUpperCase(),
      model: (item.last_trailer_model || '').pCapitalizeAllFirstWords(),
      techPassport: (item.last_trailer_tech_passport || '').toUpperCase(),
      brand: (item.last_trailer_brand || '').pCapitalizeAllFirstWords(),
      typeName: (item.last_trailer_type_name || '').pCapitalizeFirstWord()
    }
  }

  let lastDriver = null
  if (item.last_driver_guid) {
    lastDriver = {
      guid: item.last_driver_guid,
      firstName: (item.last_driver_first_name || '').pCapitalizeAllFirstWords(),
      fullName: (item.last_driver_full_name || '').pCapitalizeAllFirstWords(),
      passSerial: (item.pass_serial || '').toUpperCase(),
      passNumber: item.last_driver_pass_number,
      passDate: new Date(item.last_driver_pass_date_utc).pFormatDate(),
      passIssued: item.last_driver_pass_issued,
      certSerialNumber: (item.last_driver_cert_serial_number || '').toUpperCase(),
      phone: item.last_driver_phone
    }
  }

  vehicle.lastTrailer = lastTrailer
  vehicle.lastDriver = lastDriver

  return vehicle
}

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

export const getVehicles = async function(companyGuid, limit = PAGE_SIZE, offset = OFFSET, filters) {
  const {
    vehicleNr,
    techPassport,
    brand,
    type
  } = filters

  const { 
    data: { 
      status,
      count,
      items 
    } 
  } = await this.$axios({
    method: 'get',
    url: URL.VEHICLES,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      user_guid: this.store.state.user.guid,
      limit,
      offset,
      v_number: vehicleNr,
      tech_passport: techPassport,
      brand: brand,
      type: type
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

export const getVehicle = async function(companyGuid, vehicleGuid) {
  const { data: { status, count, items } } = await this.$axios({
    method: 'get',
    url: URL.VEHICLES,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      user_guid: this.store.state.user.guid,
      guid: vehicleGuid
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
    result.items = items.map(item => {
      const type = {
        id: item.id,
        name: item.name,
        trailer: item.trailer === 1,
        noUsefulSizes: item.no_useful_sizes === 1
      }

      type.subtypes = item.subtypes.map(({ id, name, no_useful_sizes }) => ({
        id,
        name,
        noUsefulSizes: no_useful_sizes === 1
      }))

      return type
    })
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
