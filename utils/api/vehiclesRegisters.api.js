import { complementRequest } from '@/utils/http'
import { getUserJWToken } from '@/utils/user'
import { formatDate, formatDateTime } from '@/utils/formating'
import { getStatusPresentation } from '@/utils/vehiclesRegisters'

const URL_VEHICLES_REGISTERS = '/api1/transithub/vehicles_registers'
const URL_VEHICLES_REGISTERS_DRIVERS = '/api1/transithub/vehicles_registers/filter_drivers'
const URL_VEHICLES_REGISTERS_VEHICLES = '/api1/transithub/vehicles_registers/filter_vehicles'
const URL_VEHICLES_REGISTERS_TRAILERS = '/api1/transithub/vehicles_registers/filter_trailers'

export const getVehiclesRegisters = async (
  limit,
  offset,
  search,
  filters,
  ctx
) => {
  const {
    data: {
      status,
      count,
      items
    }
  } = await ctx.$axios(complementRequest({
    method: 'get',
    url: URL_VEHICLES_REGISTERS,
    params: {
      access_token: getUserJWToken(ctx),
      limit: limit,
      offset: offset,
      request_guid: filters.requestGuid,
      period_from: filters.periodFrom ? formatDateTime(filters.periodFrom) : null,
      period_to: filters.periodTo ? formatDateTime(filters.periodTo) : null,
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
        periodFrom: formatDate(item.date_from_utc),
        periodTo: formatDate(item.date_to_utc),
        tripsQuantity: item.trips_quantity,
        status: getStatusPresentation((item.status || '').toLowerCase()),
        phone: item.phone || item.driver_phone,
        requestGuid: item.request_guid,
        vehicleNumber: item.r_vehicle_number || item.vehicle_number,
        vehicleBrand: item.r_vehicle_brand || `${item.vehicle_brand} ${item.vehicle_model}`,
        trailerNumber: item.r_trailer_number || item.trailer_number,
        trailerBrand: item.r_trailer_brand || `${item.trailer_brand} ${item.trailer_model}`,
        driverFullname: item.r_driver_fullname || item.driver_fullname
      })
    }
  }

  return result
}

export const filterDrivers = async (filters, ctx) => {
  const {
    data: {
      status,
      items
    }
  } = await ctx.$axios(complementRequest({
    method: 'get',
    url: URL_VEHICLES_REGISTERS_DRIVERS,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(ctx)
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

export const filterVehicles = async (filters, ctx) => {
  const {
    data: {
      status,
      items
    }
  } = await ctx.$axios(complementRequest({
    method: 'get',
    url: URL_VEHICLES_REGISTERS_VEHICLES,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(ctx)
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

export const filterTrailers = async (filters, ctx) => {
  const {
    data: {
      status,
      items
    }
  } = await ctx.$axios(complementRequest({
    method: 'get',
    url: URL_VEHICLES_REGISTERS_TRAILERS,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(ctx)
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
