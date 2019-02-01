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
    requestGuid = null,
    vehicleRegisterGuid = null,
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
    url: URL_RACES,
    params: {
      access_token: getUserJWToken(this),
      limit: limit,
      offset: offset,
      carrier: this.store.state.companies.currentCompany.guid,
      request_guid: requestGuid,
      vehicle_register: vehicleRegisterGuid,
      period_from: periodFrom ? new Date(periodFrom).pFormatDateTime() : null,
      period_to: periodTo ? new Date(periodTo).pFormatDateTime() : null,
      phone: phone,
      statuses: statuses.join(';'),
      // numbers: filters.numbers.join(';'),
      drivers: drivers.join(';'),
      vehicles: vehicles.join(';'),
      trailers: trailers.join(';'),
      search
    }
  })

  const result = {
    status,
    count,
    items: []
  }

  if (status) {
    const locale = this.store.state.locale
    for (const item of items) {
      const dateFrom = new Date(item.vehicles_register_date_from).pFormatDate()
      const dateTo = new Date(item.vehicles_register_date_to).pFormatDate()

      result.items.push({
        guid: item.guid,
        number: item.number || '',
        date: new Date(item.date_utc).pFormatDateTime(),
        driverFullname: (item.driver_full_name || '').pCapitalizeAllFirstWords(),
        driverCert: item.r_driver_cert || item.driver_cert || '',
        phone: (item.phone || item.driver_phone || '').pMaskPhone(),
        vehicleNumber: item.vehicle_number || '',
        vehicleBrand: (`${item.vehicle_brand || ''} ${item.vehicle_model || ''}` || '').pCapitalizeAllFirstWords(),
        trailerNumber: item.trailer_number || '',
        trailerBrand: (`${item.trailer_brand || ''} ${item.trailer_model || ''}`).pCapitalizeAllFirstWords(),
        goodsName: ((locale === 'ua' ? item.goods_name_ua : item.goods_name_ru) || '').pCapitalizeFirstWord(),
        quantity: item.quantity || 0,
        pointFromName: ((locale === 'ua' ? item.point_from_name_ua : item.point_from_name_ru) || '').pCapitalizeAllFirstWords(),
        pointFromKoatuu: item.point_from_koatuu,
        pointFromRegion: ((locale === 'ua' ? item.point_from_region_ua : item.point_from_region_ru) || ''),
        pointToName: ((locale === 'ua' ? item.point_to_name_ua : item.point_to_name_ru) || '').pCapitalizeAllFirstWords(),
        pointToKoatuu: item.point_to_koatuu,
        pointToRegion: ((locale === 'ua' ? item.point_to_region_ua : item.point_to_region_ru) || ''),
        lastEvent: ((locale === 'ua' ? item.last_event_ua : item.last_event_ru) || '').pCapitalizeFirstWord(),
        lastEventDate: new Date(item.last_event_date_utc).pFormatDateTime(),
        status: getStatusPresentation((item.status || '').toLowerCase()) || '',
        requestGuid: item.request_guid,
        requestNumber: item.request_client_number || '',
        requestScheduleDate: new Date(item.request_schedule_date_utc).pFormatDate(),
        vehiclesRegisterGuid: item.vehicles_register_guid,
        vehiclesRegisterDateFrom: dateFrom,
        vehiclesRegisterDateTo: dateTo,
        vehicleRegisterName: `${dateFrom} - ${dateTo}`
      })
    }
  }

  return result
}

export const getRace = async function(guid) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_RACES,
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
    result.item.number = item.number || ''
    result.item.date = new Date(item.date_utc).pFormatDateTime() || ''
    result.item.driverFullname = (item.driver_full_name || '').pCapitalizeAllFirstWords()
    result.item.driverCert = item.driver_cert || ''
    result.item.phone = (item.phone || item.driver_phone || '').pMaskPhone()
    result.item.vehicleNumber = item.vehicle_number || ''
    result.item.vehicleBrand = (`${item.vehicle_brand || ''} ${item.vehicle_model || ''}` || '').pCapitalizeAllFirstWords()
    result.item.trailerNumber = item.trailer_number || ''
    result.item.trailerBrand = (`${item.trailer_brand || ''} ${item.trailer_model || ''}`).pCapitalizeAllFirstWords()
    result.item.goods = ((locale === 'ua' ? item.goods_name_ua : item.goods_name_ru) || '').pCapitalizeFirstWord()
    result.item.goodsDesc = item.goods_desc
    result.item.quantity = item.quantity || 0
    result.item.pointFromName = ((locale === 'ua' ? item.point_from_name_ua : item.point_from_name_ru) || '').pCapitalizeAllFirstWords()
    result.item.pointFromDescription = ((locale === 'ua' ? item.point_from_description_ua : item.point_from_description_ru) || '').pCapitalizeAllFirstWords()
    result.item.pointFromKoatuu = item.point_from_koatuu
    result.item.pointToName = ((locale === 'ua' ? item.point_to_name_ua : item.point_to_name_ru) || '').pCapitalizeAllFirstWords()
    result.item.pointToDescription = ((locale === 'ua' ? item.point_to_description_ua : item.point_to_description_ru) || '').pCapitalizeAllFirstWords()
    result.item.pointToKoatuu = item.point_to_koatuu
    result.item.warehouseFromAddress = (item.warehouse_from_address || '').pCapitalizeAllFirstWords()
    result.item.warehouseToAddress = (item.warehouse_to_address || '').pCapitalizeAllFirstWords()
    result.item.warehouseFromCode = item.warehouse_from_code
    result.item.warehouseToCode = item.warehouse_to_code
    result.item.lastEvent = ((locale === 'ua' ? item.last_event_ua : item.last_event_ru) || '').pCapitalizeFirstWord()
    result.item.lastEventDate = new Date(item.last_event_date_utc).pFormatDateTime() || ''
    result.item.status = getStatusPresentation((item.status || '').toLowerCase()) || ''
    result.item.requestGuid = item.request_guid
    result.item.requestNumber = item.request_client_number || ''
    result.item.requestScheduleDate = new Date(item.request_schedule_date_utc).pFormatDate()
    result.item.vehiclesRegisterGuid = item.vehicles_register_guid
    result.item.vehiclesRegisterDateFrom = new Date(item.vehicles_register_date_from).pFormatDate()
    result.item.vehiclesRegisterDateTo = new Date(item.vehicles_register_date_to).pFormatDate()
    result.item.waybillNumber = item.waybill_number || ''
    result.item.waybillDate = new Date(item.waybill_date).pFormatDate()
    result.item.waybillNet = item.waybill_netto || 0
    result.item.vehicleRegister = {}
    result.item.vehicleRegister.driverFullname = (item.vr_r_driver_fullname || item.vr_driver_fullname || '').pCapitalizeAllFirstWords()
    result.item.vehicleRegister.driverCert = (item.vr_driver_cert || '').pCapitalizeAllFirstWords()
    result.item.vehicleRegister.phone = (item.vr_driver_phone || item.vr_r_driver_phone || '').pMaskPhone()
    result.item.vehicleRegister.vehicleNumber = item.vr_r_vehicle_number || item.vr_vehicle_number
    result.item.vehicleRegister.vehicleTechPass = item.vr_r_vehicle_tech_pass || item.vr_vehicle_tech_pass
    result.item.vehicleRegister.vehicleBrand = (item.vr_r_vehicle_brand || `${item.vr_vehicle_brand || ''} ${item.vr_vehicle_model || ''}`) || ''
    result.item.vehicleRegister.trailerNumber = item.vr_r_trailer_number || item.vr_trailer_number
    result.item.vehicleRegister.trailerTechPass = item.vr_r_trailer_tech_pass || item.vr_trailer_tech_pass
    result.item.vehicleRegister.trailerBrand = ((item.vr_r_trailer_brand || `${item.vr_trailer_brand || ''} ${item.vr_trailer_model || ''}`) || '').pCapitalizeAllFirstWords()
  }

  return result
}

export const filterNumbers = async function(filters) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_RACES_NUMBERS,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(this),
      carrier: this.store.state.companies.currentCompany.guid
    }
  })

  const result = {
    status,
    items: []
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
  } = await this.$axios({
    method: 'get',
    url: URL_RACES_DRIVERS,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(this),
      carrier: this.store.state.companies.currentCompany.guid
    }
  })

  const result = {
    status,
    items: []
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
  } = await this.$axios({
    method: 'get',
    url: URL_RACES_VEHICLES,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(this),
      carrier: this.store.state.companies.currentCompany.guid
    }
  })

  const result = {
    status,
    items: []
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
  } = await this.$axios({
    method: 'get',
    url: URL_RACES_TRAILERS,
    params: {
      request_guid: filters.requestGuid,
      access_token: getUserJWToken(this),
      carrier: this.store.state.companies.currentCompany.guid
    }
  })

  const result = {
    status,
    items: []
  }

  if (status) {
    for (const item of items) {
      result.items.push(item.trailer_number)
    }
  }

  return result
}
