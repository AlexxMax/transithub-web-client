import { complementRequest } from '@/utils/http'
import { getUserJWToken } from '@/utils/user'
import { getStatusPresentation } from '@/utils/vehiclesRegisters'

const URL_VEHICLES_REGISTERS = '/api1/transithub/vehicles_registers'
const URL_VEHICLES_REGISTERS_DRIVERS = '/api1/transithub/vehicles_registers/filter_drivers'
const URL_VEHICLES_REGISTERS_VEHICLES = '/api1/transithub/vehicles_registers/filter_vehicles'
const URL_VEHICLES_REGISTERS_TRAILERS = '/api1/transithub/vehicles_registers/filter_trailers'

export const getVehiclesRegisters = async function(
  limit,
  offset,
  search,
  filters
) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_VEHICLES_REGISTERS,
    params: {
      access_token: getUserJWToken(this),
      limit: limit,
      offset: offset,
      request_guid: filters.requestGuid,
      period_from: filters.periodFrom ? filters.periodFrom.pFormatDateTime() : null,
      period_to: filters.periodTo ? filters.periodTo.pFormatDateTime() : null,
      drivers: filters.drivers.join(';'),
      vehicles: filters.vehicles.join(';'),
      trailers: filters.trailers.join(';'),
      phone: filters.phone,
      statuses: filters.statuses.join(';'),
      search
    }
  }))

  const result = {
    status,
    count,
    items: []
  }

  if (status) {
    for (const item of items) {
      result.items.push({
        guid: item.guid,
        periodFrom: new Date(item.date_from_utc).pFormatDate(),
        periodTo: new Date(item.date_to_utc).pFormatDate(),
        tripsQuantity: item.trips_quantity,
        status: getStatusPresentation((item.status || '').toLowerCase()) || '',
        phone: ((item.phone || item.driver_phone) || '').pMaskPhone(),
        requestGuid: item.request_guid,
        requestNumber: item.request_client_number,
        requestScheduleDate: new Date(item.request_schedule_date).pFormatDate(),
        vehicleNumber: item.r_vehicle_number || item.vehicle_number,
        vehicleBrand: ((item.r_vehicle_brand || `${item.vehicle_brand} ${item.vehicle_model}`) || '').pCapitalizeAllFirstWords(),
        trailerNumber: item.r_trailer_number || item.trailer_number,
        trailerBrand: ((item.r_trailer_brand || `${item.trailer_brand} ${item.trailer_model}`) || '').pCapitalizeAllFirstWords(),
        driverFullname: (item.r_driver_fullname || item.driver_fullname || '').pCapitalizeAllFirstWords()
      })
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
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_VEHICLES_REGISTERS,
    params: {
      access_token: getUserJWToken(this),
      guid
    }
  }))

  const result = {
    status,
    item: {}
  }

  if (status && items.length > 0) {
    const item = items[0]
    result.item.periodFrom = new Date(item.date_from_utc).pFormatDate()
    result.item.periodTo = new Date(item.date_to_utc).pFormatDate()
    result.item.tripsQuantity = item.trips_quantity
    result.item.status = getStatusPresentation((item.status || '').toLowerCase()) || ''
    result.item.phone = ((item.phone || item.driver_phone) || '').pMaskPhone()
    result.item.requestGuid = item.request_guid
    result.item.requestNumber = item.request_client_number
    result.item.requestScheduleDate = new Date(item.request_schedule_date).pFormatDate()
    result.item.orderGuid = item.order_guid
    result.item.orderNumber = item.order_number
    result.item.orderDate = new Date(item.order_date).pFormatDate()
    result.item.vehicleNumber = item.r_vehicle_number || item.vehicle_number
    result.item.vehicleTechPass = item.r_vehicle_tech_pass || item.vehicle_tech_pass
    result.item.vehicleBrand = (item.r_vehicle_brand || `${item.vehicle_brand} ${item.vehicle_model}`) || ''
    result.item.trailerNumber = item.r_trailer_number || item.trailer_number
    result.item.trailerTechPass = item.r_trailer_tech_pass || item.trailer_tech_pass
    result.item.trailerBrand = ((item.r_trailer_brand || `${item.trailer_brand} ${item.trailer_model}`) || '').pCapitalizeAllFirstWords()
    result.item.driverFullname = (item.r_driver_fullname || item.driver_fullname || '').pCapitalizeAllFirstWords()
    result.item.driverCert = item.r_driver_cert || item.driver_cert || ''
  }

  return result
}

export const filterDrivers = async function(filters, ctx) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_VEHICLES_REGISTERS_DRIVERS,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(this)
    }
  }))

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
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_VEHICLES_REGISTERS_VEHICLES,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(this)
    }
  }))

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
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_VEHICLES_REGISTERS_TRAILERS,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(this)
    }
  }))

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
