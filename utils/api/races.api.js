import { complementRequest } from '@/utils/http'
import { getUserJWToken } from '@/utils/user'
import { getStatusPresentation } from '@/utils/races'

const URL_RACES = '/api1/transithub/races'
const URL_RACES_NUMBERS = '/api1/transithub/races/filter_numbers'
const URL_RACES_DRIVERS = '/api1/transithub/races/filter_drivers'
const URL_RACES_VEHICLES = '/api1/transithub/races/filter_vehicles'
const URL_RACES_TRAILERS = '/api1/transithub/races/filter_trailers'

export const getRaces = async function(
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
    url: URL_RACES,
    params: {
      access_token: getUserJWToken(this),
      limit: limit,
      offset: offset,
      request_guid: filters.requestGuid,
      period_from: filters.periodFrom ? filters.periodFrom.pFormatDateTime() : null,
      period_to: filters.periodTo ? filters.periodTo.pFormatDateTime() : null,
      phone: filters.phone,
      statuses: filters.statuses.join(';'),
      numbers: filters.numbers.join(';'),
      drivers: filters.drivers.join(';'),
      vehicles: filters.vehicles.join(';'),
      trailers: filters.trailers.join(';'),
      search
    }
  }))

  const result = {
    status,
    count,
    items: []
  }

  if (status) {
    const locale = this.store.state.locale
    for (const item of items) {
      result.items.push({
        guid: item.guid,
        number: item.number || '',
        date: new Date(item.date_utc).pFormatDate(),
        driverFullname: (item.driver_full_name || '').pCapitalizeAllFirstWords(),
        phone: (item.phone || item.driver_phone || '').pMaskPhone(),
        vehicleNumber: item.vehicle_number || '',
        vehicleBrand: (`${item.vehicle_brand} ${item.vehicle_model}` || '').pCapitalizeAllFirstWords(),
        trailerNumber: item.trailer_number || '',
        trailerBrand: (`${item.trailer_brand || ''} ${item.trailer_model || ''}`).pCapitalizeAllFirstWords(),
        quantity: item.quantity || 0,
        pointFromName: ((locale === 'ua' ? item.point_from_name_ua : item.point_from_name_ru) || '').pCapitalizeAllFirstWords(),
        pointToName: ((locale === 'ua' ? item.point_to_name_ua : item.point_to_name_ru) || '').pCapitalizeAllFirstWords(),
        lastEvent: ((locale === 'ua' ? item.last_event_ua : item.last_event_ru) || '').pCapitalizeFirstWord(),
        lastEventDate: new Date(item.last_event_date_utc).pFormatDateTime(),
        status: getStatusPresentation((item.status || '').toLowerCase()) || '',
        requestGuid: item.request_guid,
        requestNumber: item.request_client_number || '',
        requestScheduleDate: new Date(item.request_schedule_date_utc).pFormatDate(),
        vehiclesRegisterGuid: item.vehicles_register_guid,
        vehiclesRegisterDateFrom: new Date(item.vehicles_register_date_from).pFormatDate(),
        vehiclesRegisterDateTo: new Date(item.vehicles_register_date_to).pFormatDate()
      })
    }
  }

  return result
}

export const filterNumbers = async function(filters) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_RACES_NUMBERS,
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
      result.items.push(item.number)
    }
  }

  return result
}

export const filterDrivers = async function(filters) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_RACES_DRIVERS,
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
      result.items.push(item.driver_full_name)
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
    url: URL_RACES_VEHICLES,
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
      result.items.push(item.vehicle_number)
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
    url: URL_RACES_TRAILERS,
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
      result.items.push(item.trailer_number)
    }
  }

  return result
}
