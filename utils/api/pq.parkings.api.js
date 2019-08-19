import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'

const URL = Object.freeze({
  PARKINGS: '/api1/transithub/pq_parkings'
})

const formatResponseItem = item => ({
  guid: item.guid,
  organisationGuid: item.organisation_guid,
  organisationName: item.organisation_name,
  name: item.name,
  localityKoatuu: item.locality_koatuu,
  localityName: item.locality_name,
  districtCode: item.district_code,
  districtName: item.district_name,
  regionCode: item.region_code,
  regionName: item.region_name,
  address: item.address,
  geoParkingLat: item.geo_parking_lat,
  geoParkingLng: item.geo_parking_lng
})

const formatPayload = payload => ({
  company_guid: payload.companyGuid,
  organisation_guid: payload.organisationGuid,
  name: payload.name,
  address: payload.address,
  geo_parking_lat: payload.geoParkingLat,
  geo_parking_lng: payload.geoParkingLng,
  locality_koatuu: payload.localityKoatuu
})

export const getParkings = async function (
  companyGuid,
  limit = PAGE_SIZE,
  offset = OFFSET
) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL.PARKINGS,
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
      result.items.push(formatResponseItem(item))
    });
  }

  return result
}

export const getParkingsByWarehouse = async function (
  warehouseGuid,
  limit = PAGE_SIZE,
  offset = OFFSET
) {

  const companyGuid = this.store.state.companies.currentCompany.guid

  const { status, count, items } = await this.$axios.$get(URL.PARKINGS, {
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      warehouse_guid: warehouseGuid,
      limit,
      offset
    }
  })

  const result = { status, count, items: [] }

  if (status && count > 0)
    items.forEach(item => result.items.push({ ...formatResponseItem(item), companyGuid }))

  return result
}

export const getParking = async function (companyGuid, guid) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL.PARKINGS,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      guid
    }
  })

  const result = {
    status,
    item: {}
  }

  if (status && count > 0) {
    const item = items[0]
    result.item = formatResponseItem(item)
  }

  return result
}

export const createParking = async function (payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'post',
    url: URL.PARKINGS,
    params: {
      access_token: getUserJWToken(this)
    },
    data: formatPayload(payload)
  })

  return {
    status,
    err: _err,
    item: status ? {
      ...formatResponseItem(item)
    } : {}
  }
}

export const changeParking = async function (guid, payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'put',
    url: URL.PARKINGS,
    params: {
      access_token: getUserJWToken(this),
      guid
    },
    data: formatPayload(payload)
  })

  return {
    status,
    err: _err,
    item: status ? {
      ...formatResponseItem(item)
    } : {}
  }
}