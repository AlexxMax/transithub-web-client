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
    requestGuid = null,
    periodFrom = null,
    periodTo = null,
    phone = null,
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
      carrier: this.store.state.companies.currentCompany.guid,
      request_guid: requestGuid,
      period_from: periodFrom ? periodFrom.pFormatDateTime() : null,
      period_to: periodTo ? periodTo.pFormatDateTime() : null,
      drivers: drivers.join(';'),
      vehicles: vehicles.join(';'),
      trailers: trailers.join(';'),
      phone: phone,
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
      result.items.push({
        guid: item.guid,
        periodFrom: new Date(item.date_from_utc).pFormatDate(),
        periodTo: new Date(item.date_to_utc).pFormatDate(),
        tripsQuantity: item.trips_quantity || 0,
        status: getStatusPresentation((item.status || '').toLowerCase()) || {},
        phone: ((item.phone || item.driver_phone) || '').pMaskPhone(),
        requestGuid: item.request_guid,
        requestNumber: item.request_client_number,
        requestScheduleDate: new Date(item.request_schedule_date).pFormatDate(),
        vehicleNumber: item.r_vehicle_number || item.vehicle_number,
        vehicleBrand: ((item.r_vehicle_brand || `${item.vehicle_brand || ''} ${item.vehicle_model || ''}`) || '').pCapitalizeAllFirstWords(),
        vehicleTechPass: item.r_vehicle_tech_pass || item.vehicle_tech_pass,
        trailerNumber: item.r_trailer_number || item.trailer_number,
        trailerBrand: ((item.r_trailer_brand || `${item.trailer_brand || ''} ${item.trailer_model || ''}`) || '').pCapitalizeAllFirstWords(),
        trailerTechPass: item.r_trailer_tech_pass || item.trailer_tech_pass,
        driverFullname: (item.r_driver_fullname || item.driver_fullname || '').pCapitalizeAllFirstWords(),
        driverCert: item.r_driver_cert || item.driver_cert || '',
        pointFromName: item.point_from_name || '',
        pointFromKoatuu: item.point_from_koatuu,
        pointFromRegion: ((locale === 'ua' ? item.point_from_region_ua : item.point_from_region_ru) || ''),
        pointToName: item.point_to_name || '',
        pointToKoatuu: item.point_to_koatuu,
        pointToRegion: ((locale === 'ua' ? item.point_to_region_ua : item.point_to_region_ru) || ''),
        lastEventDate: new Date(item.last_event_date_utc).pFormatDateTime(),
        lastEventName: (locale === 'ua' ? item.last_event_name_ua : item.last_event_name_ru) || '',
        goodsName: (locale === 'ua' ? item.goods_name_ua : item.goods_name_ru) || '',
        racesCount: item.races_count || 0
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
  } = await this.$axios({
    method: 'get',
    url: URL_VEHICLES_REGISTERS,
    params: {
      access_token: getUserJWToken(this),
      carrier: this.store.state.companies.currentCompany.guid,
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
    result.item.guid = item.guid
    result.item.periodFrom = new Date(item.date_from_utc).pFormatDate()
    result.item.periodTo = new Date(item.date_to_utc).pFormatDate()
    result.item.tripsQuantity = item.trips_quantity
    result.item.status = getStatusPresentation((item.status || '').toLowerCase()) || {}
    result.item.phone = ((item.phone || item.driver_phone) || '').pMaskPhone()
    result.item.requestGuid = item.request_guid
    result.item.requestNumber = item.request_client_number
    result.item.requestScheduleDate = new Date(item.request_schedule_date).pFormatDate()
    result.item.orderGuid = item.order_guid
    result.item.orderNumber = item.order_number
    result.item.orderDate = new Date(item.order_date).pFormatDate()
    result.item.vehicleNumber = item.r_vehicle_number || item.vehicle_number
    result.item.vehicleTechPass = item.r_vehicle_tech_pass || item.vehicle_tech_pass
    result.item.vehicleBrand = (item.r_vehicle_brand || `${item.vehicle_brand || ''} ${item.vehicle_model || ''}`) || ''
    result.item.trailerNumber = item.r_trailer_number || item.trailer_number
    result.item.trailerTechPass = item.r_trailer_tech_pass || item.trailer_tech_pass
    result.item.trailerBrand = ((item.r_trailer_brand || `${item.trailer_brand || ''} ${item.trailer_model || ''}`) || '').pCapitalizeAllFirstWords()
    result.item.driverFullname = (item.r_driver_fullname || item.driver_fullname || '').pCapitalizeAllFirstWords()
    result.item.driverCert = item.r_driver_cert || item.driver_cert || ''
    result.item.pointFromName = item.point_from_name || ''
    result.item.pointFromKoatuu = item.point_from_koatuu
    result.item.pointToName = item.point_to_name || ''
    result.item.pointToKoatuu = item.point_to_koatuu
    result.item.lastEventDate = new Date(item.last_event_date_utc).pFormatDateTime() || ''
    result.item.lastEventName = (locale === 'ua' ? item.last_event_name_ua : item.last_event_name_ru) || ''
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
      carrier: this.store.state.companies.currentCompany.guid
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
      carrier: this.store.state.companies.currentCompany.guid
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
      carrier: this.store.state.companies.currentCompany.guid
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
