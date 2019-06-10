import { getUserJWToken } from '@/utils/user'
import { getStatusPresentation, HANDLE_STATUSES } from '@/utils/vehiclesRegisters'
import { arrayToString } from '@/utils/http'

const URL_VEHICLES_REGISTERS = '/api1/transithub/vehicles_registers'
const URL_VEHICLES_REGISTERS_DRIVERS = '/api1/transithub/vehicles_registers/filter_drivers'
const URL_VEHICLES_REGISTERS_VEHICLES = '/api1/transithub/vehicles_registers/filter_vehicles'
const URL_VEHICLES_REGISTERS_TRAILERS = '/api1/transithub/vehicles_registers/filter_trailers'

const formatResponseItem = (item, locale) => ({
  guid: item.guid,
  periodFrom: new Date(item.date_from_utc).pFormatDate(),
  periodTo: new Date(item.date_to_utc).pFormatDate(),
  tripsQuantity: item.trips_quantity || 0,
  status: getStatusPresentation((item.status || '').toLowerCase()) || {},
  phone: ((item.phone || item.driver_phone) || '').pMaskPhone(),
  requestGuid: item.request_guid,
  requestNumber: item.request_client_number,
  requestScheduleDate: new Date(item.request_schedule_date).pFormatDate(),
  vehicleGuid: item.vehicle_guid,
  vehicleNumber: item.vehicle_number || item.r_vehicle_number,
  vehicleBrand: ((`${item.vehicle_brand || ''} ${item.vehicle_model || ''}` || item.r_vehicle_brand) || '').pCapitalizeAllFirstWords(),
  vehicleTechPass: item.vehicle_tech_pass || item.r_vehicle_tech_pass,
  trailerGuid: item.trailer_guid,
  trailerNumber: item.trailer_number || item.r_trailer_number,
  trailerBrand: ((`${item.trailer_brand || ''} ${item.trailer_model || ''}` || item.r_trailer_brand) || '').pCapitalizeAllFirstWords(),
  trailerTechPass: item.trailer_tech_pass || item.r_trailer_tech_pass,
  driverGuid: item.driver_guid,
  driverFullname: (item.driver_fullname || item.r_driver_fullname || '').pCapitalizeAllFirstWords(),
  driverCert: item.driver_cert || item.r_driver_cert || '',
  pointFromName: item.point_from_name || '',
  pointFromKoatuu: item.point_from_koatuu,
  pointFromRegion: ((locale === 'ua' ? item.point_from_region_ua : item.point_from_region_ru) || ''),
  pointToName: item.point_to_name || '',
  pointToKoatuu: item.point_to_koatuu,
  pointToRegion: ((locale === 'ua' ? item.point_to_region_ua : item.point_to_region_ru) || ''),
  lastEventDate: new Date(item.last_event_date_utc).pFormatDateTime(),
  lastEventName: (locale === 'ua' ? item.last_event_name_ua : item.last_event_name_ru) || '',
  goodsName: (locale === 'ua' ? item.goods_name_ua : item.goods_name_ru) || '',
  racesCount: item.races_count || 0,
  outcome: item.outcome === 1,
  handleStatus: item.handle_status,
  rowIndex: item.row_index || 0,
  readyToSubscription: item.ready_to_subscription === 1,
  sentToClient: item.sent_to_client === 1
})

export const getVehiclesRegisters = async function(
  limit,
  offset,
  search,
  filters
) {
  const {
    requestGuid = null,
    periodFrom = null,
    periodTo = null,
    phone = '',
    statuses = [],
    drivers = [],
    vehicles = [],
    trailers = []
  } = filters

  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_VEHICLES_REGISTERS,
    params: {
      access_token: getUserJWToken(this),
      limit: limit,
      offset: offset,
      // carrier: arrayToString(this.store.getters['companies/globalFilterOnlyGuids']),
      carrier: this.store.getters['companies/getCurrentCompany'].guid,
      request_guid: requestGuid,
      period_from: periodFrom ? new Date(periodFrom).pFormatDateTime() : null,
      period_to: periodTo ? new Date(periodTo).pFormatDateTime() : null,
      drivers: drivers.join(';'),
      vehicles: vehicles.join(';'),
      trailers: trailers.join(';'),
      phone: (phone || '').replace(' ', ''),
      statuses: statuses.join(';'),
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
      result.items.push(formatResponseItem(item, locale))
    }
  }

  return result
}

export const getVehicleRegister = async function(guid) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_VEHICLES_REGISTERS,
    params: {
      access_token: getUserJWToken(this),
      guid
    }
  })

  const result = {
    status,
    item: {}
  }

  if (status && items.length > 0) {
    const locale = this.store.state.locale
    const item = items[0]
    result.item = formatResponseItem(item, locale)
  }

  return result
}

export const filterDrivers = async function(filters, ctx) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_VEHICLES_REGISTERS_DRIVERS,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(this),
      carrier: arrayToString(this.store.getters['companies/globalFilterOnlyGuids'])
    }
  })

  const result = {
    status,
    items : []
  }

  if (status) {
    for (const item of items) {
      result.items.push(item.r_driver_fullname ? item.r_driver_fullname : item.driver_fullname)
    }
  }

  return result
}

export const filterVehicles = async function(filters) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_VEHICLES_REGISTERS_VEHICLES,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(this),
      carrier: arrayToString(this.store.getters['companies/globalFilterOnlyGuids'])
    }
  })

  const result = {
    status,
    items : []
  }

  if (status) {
    for (const item of items) {
      result.items.push(item.r_vehicle_number ? item.r_vehicle_number : item.vehicle_number)
    }
  }

  return result
}

export const filterTrailers = async function(filters) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_VEHICLES_REGISTERS_TRAILERS,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(this),
      carrier: arrayToString(this.store.getters['companies/globalFilterOnlyGuids'])
    }
  })

  const result = {
    status,
    items : []
  }

  if (status) {
    for (const item of items) {
      result.items.push(item.r_trailer_number ? item.r_trailer_number : item.trailer_number)
    }
  }

  return result
}

export const createOrUpdateVehicleRegister = async function(
  registerGuid = null,
  requestGuid,
  truckGuid,
  trailerGuid = null,
  driverGuid,
  companyGuid,
  handleStatus = HANDLE_STATUSES.DASH,
  rowIndex = 0,
  readyToSubscription = false
) {
  const payload = {
    request_guid: requestGuid,
    truck_guid: truckGuid,
    trailer_guid: trailerGuid,
    driver_guid: driverGuid,
    company_guid: companyGuid,
    handle_status: handleStatus,
    row_index: rowIndex,
    ready_to_subscription: readyToSubscription === true ? 1 : 0
  }

  const { data: { status, _err, guid } } = await this.$axios({
    method: 'post',
    url: URL_VEHICLES_REGISTERS,
    params: {
      access_token: getUserJWToken(this),
      guid: registerGuid
    },
    data: payload
  })

  return { status, err: _err, guid }
}
