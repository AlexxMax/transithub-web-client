import { getUserJWToken } from '@/utils/user'
import { getStatusPresentation, HANDLE_STATUSES } from '@/utils/vehiclesRegisters'
import { arrayToString } from '@/utils/http'

const URL_VEHICLES_REGISTERS = '/api1/transithub/vehicles_registers'
const URL_VEHICLES_REGISTERS_DRIVERS = '/api1/transithub/vehicles_registers/filter_drivers'
const URL_VEHICLES_REGISTERS_VEHICLES = '/api1/transithub/vehicles_registers/filter_vehicles'
const URL_VEHICLES_REGISTERS_TRAILERS = '/api1/transithub/vehicles_registers/filter_trailers'
const URL_VEHICLES_REGISTERS_SUBSCRIPTION = '/api1/transithub/vehicles_registers.subscribe'
const URL_VEHICLES_REGISTERS_UPDATE = '/api1/transithub/vehicles_registers.update'
const URL_VEHICLES_REGISTERS_FOR_DRIVER = '/api1/transithub/driver/vehicles_registers'

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
  vehicleBrand: ((`${item.vehicle_brand || ''}` || item.r_vehicle_brand) || '').pCapitalizeAllFirstWords(),
  vehicleTechPass: item.vehicle_tech_pass || item.r_vehicle_tech_pass,
  trailerGuid: item.trailer_guid,
  trailerNumber: item.trailer_number || item.r_trailer_number,
  trailerBrand: ((`${item.trailer_brand || ''}` || item.r_trailer_brand) || '').pCapitalizeAllFirstWords(),
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
  goodsGuid: item.goods_guid,
  goodsName: (locale === 'ua' ? item.goods_name_ua : item.goods_name_ru) || '',
  racesCount: item.races_count || 0,
  outcome: item.outcome === 1,
  handleStatus: item.handle_status,
  rowIndex: item.row_index || 0,
  readyToSubscription: item.ready_to_subscription === 1,
  sentToClient: item.sent_to_client === 1,
  changeable: item.changeable === 1,
  distance: item.distance,
  carrierGuid: item.carrier_guid,
  carrierName: item.carrier_name,
  clientName: item.client_name,
  warehouseFromCode: item.warehouse_from_code,
  warehouseFromName: item.warehouse_from_name,
  warehouseToCode: item.warehouse_to_code,
  warehouseToName: item.warehouse_to_name
})

export const getVehiclesRegisters = async function (
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

export const getVehicleRegister = async function (guid) {
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

export const filterDrivers = async function (filters, ctx) {
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
    items: []
  }

  if (status) {
    for (const item of items) {
      result.items.push(item.r_driver_fullname ? item.r_driver_fullname : item.driver_fullname)
    }
  }

  return result
}

export const filterVehicles = async function (filters) {
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
    items: []
  }

  if (status) {
    for (const item of items) {
      result.items.push(item.r_vehicle_number ? item.r_vehicle_number : item.vehicle_number)
    }
  }

  return result
}

export const filterTrailers = async function (filters) {
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
    items: []
  }

  if (status) {
    for (const item of items) {
      result.items.push(item.r_trailer_number ? item.r_trailer_number : item.trailer_number)
    }
  }

  return result
}

export const createOrUpdateVehicleRegister = async function (
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

  const {
    data: {
      status,
      _err,
      guid,
      request_vehicles_register_status: requestVehiclesRegisterStatus
    }
  } = await this.$axios({
    method: 'post',
    url: URL_VEHICLES_REGISTERS,
    params: {
      access_token: getUserJWToken(this),
      guid: registerGuid
    },
    data: payload
  })

  return { status, err: _err, guid, requestVehiclesRegisterStatus }
}

export const subscribeVehicleRegister = async function (requestGuid) {
  const { data: { status, request_vehicles_register_status: requestVehiclesRegisterStatus } } = await this.$axios({
    method: 'post',
    url: URL_VEHICLES_REGISTERS_SUBSCRIPTION,
    params: {
      access_token: getUserJWToken(this),
      request_guid: requestGuid
    }
  })

  return { status, requestVehiclesRegisterStatus }
}

export const getVehiclesRegistersByParticipant = async function (name = null, guid = null, startDate = new Date()) {
  let paramName = null
  switch (name) {
  case 'driver':
    paramName = 'driver_guid'
    break
  case 'truck':
    paramName = 'truck_guid'
    break
  case 'trailer':
    paramName = 'trailer_guid'
    break
  }

  const result = {
    status: false,
    count: 0,
    items: []
  }

  if (paramName === null || guid === null) {
    return result
  }

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
      carrier: this.store.getters['companies/getCurrentCompany'].guid,
      [paramName]: guid,
      start_date: startDate.pFormatDate(),
      ready_to_subscription: 1
    }
  })

  result.status = status
  result.count = count

  if (status) {
    for (const item of items) {
      const locale = this.store.state.locale
      result.items.push(formatResponseItem(item, locale))
    }
  }

  return result
}

export const updateVehiclesRegistersByParticipant = async function (name = null, guid = null, vehiclesRegisters = []) {
  let paramName = null
  switch (name) {
  case 'driver':
    paramName = 'driver_guid'
    break
  case 'truck':
    paramName = 'truck_guid'
    break
  case 'trailer':
    paramName = 'trailer_guid'
    break
  }

  const result = {
    status: false
  }

  if (paramName === null || guid === null) {
    return result
  }

  const {
    data: {
      status
    }
  } = await this.$axios({
    method: 'post',
    url: URL_VEHICLES_REGISTERS_UPDATE,
    params: {
      access_token: getUserJWToken(this),
      carrier: this.store.getters['companies/getCurrentCompany'].guid,
      [paramName]: guid
    },
    data: {
      items: vehiclesRegisters.map(item => ({ vehicle_register_guid: item.guid }))
    }
  })

  result.status = status

  return result
}

export const getVehiclesRegistersForDriver = async function (
  limit,
  offset,
  phone
  // certSerialNumber,
  // vehicleNumber,
  // pqWarehouseGuid
) {

  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_VEHICLES_REGISTERS_FOR_DRIVER,
    params: {
      access_token: getUserJWToken(this),
      limit: limit,
      offset: offset,
      // phone: this.store.state.user.phone
      // TODO: Phone
      phone
      // cert_serial_number: certSerialNumber,
      // vehicle_number: vehicleNumber,
      // pq_warehouse_guid: pqWarehouseGuid,
    },
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