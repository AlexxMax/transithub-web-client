import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'

const URL = Object.freeze({
  PARKINGS: '/api1/transithub/pq_parkings',
  BIND_PARKING_TO_WAREHOUSE: '/api1/transithub/bind_pq_warehouse_and_pq_parking'
})

const formatResponseItem = item => ({
  guid: item.guid,
  name: item.name,
  localityKoatuu: item.locality_koatuu || '',
  localityName: item.locality_name || '',
  districtCode: item.district_code || '',
  districtName: item.district_name || '',
  regionCode: item.region_code || '',
  regionName: item.region_name || '',
  fullAddress: item.address || '',
  geoParkingLat: item.geo_parking_lat || '',
  geoParkingLng: item.geo_parking_lng || '',
  streetName: item.street_name || '',
  building: item.building_n || '',
  active: Boolean(item.active)
})

const formatPayload = payload => ({
  company_guid: payload.companyGuid,
  name: payload.name,
  address: payload.fullAddress,
  geo_parking_lat: payload.geoParkingLat,
  geo_parking_lng: payload.geoParkingLng,
  locality_koatuu: payload.localityKoatuu,
  street_name: payload.street,
  building_n: payload.building,
})

export const getParkings = async function (
  limit = PAGE_SIZE,
  offset = OFFSET,
  companyGuid,
  parkingGuid
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
      company_guid: companyGuid || this.store.state.companies.currentCompany.guid,
      guid: parkingGuid,
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

export const getParkingsByWarehouse = async function (
  limit = PAGE_SIZE,
  offset = OFFSET,
  warehouseGuid,
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

export const bindParkingToWarehouse = async function (parkingGuid) {

  const { status } = await this.$axios.$post(URL.BIND_PARKING_TO_WAREHOUSE, {
    pq_warehouse_guid: this.store.state.pqParkings.subordinate.warehouse.guid,
    pq_parking_guid: parkingGuid
  }, {
    params: {
      access_token: getUserJWToken(this)
    }
  })

  return status

}

export const unbindParkingToWarehouse = async function (parkingGuid) {

  const { status } = await this.$axios.$delete(URL.BIND_PARKING_TO_WAREHOUSE, {
    params: {
      access_token: getUserJWToken(this),
      warehouse_guid: this.store.state.pqParkings.subordinate.warehouse.guid,
      parking_guid: parkingGuid
    }
  })

  return status

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
