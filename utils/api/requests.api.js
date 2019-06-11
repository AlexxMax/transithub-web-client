import { getUserJWToken } from '@/utils/user'
import { getStatusPresentation } from '@/utils/requests'
import { arrayToString } from '@/utils/http'

const URL_REQUESTS = '/api1/transithub/requests'
const URL_FILTER_NUMBERS = '/api1/transithub/requests/filter_numbers'
const URL_FILTER_CLIENTS_NAMES = '/api1/transithub/requests/filter_clients_names'
const URL_FILTER_GOODS = '/api1/transithub/requests/filter_goods'
const URL_HISTORY = '/api1/transithub/requests/quantity_history'

export const getRequests = async function(
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
  } = await this.$axios({
    method: 'get',
    url: URL_REQUESTS,
    params: {
      access_token: getUserJWToken(this),
      // carrier: arrayToString(this.store.getters['companies/globalFilterOnlyGuids']),
      carrier: this.store.getters['companies/getCurrentCompany'].guid,
      limit: limit,
      offset: offset,
      numbers: filters.numbers.join(';'),
      period_from: filters.periodFrom ? new Date(filters.periodFrom).pFormatDateTime() : null,
      period_to: filters.periodTo ? new Date(filters.periodTo).pFormatDateTime() : null,
      clients: filters.clients.join(';'),
      goods: filters.goods.join(';'),
      points_from: filters.pointsFrom.join(';'),
      points_to: filters.pointsTo.join(';'),
      statuses: filters.statuses.join(';'),
      search
    }
  })

  const result = {
    status,
    count,
    items : []
  }

  if (status) {
    for (const item of items) {
      result.items.push({
        guid: item.guid,
        number: item.client_number,
        createdAt: new Date(item.date_utc).pFormatDate(),
        scheduleDate: new Date(item.schedule_date_utc).pFormatDate(),
        clientName: item.client_name,
        clientGuid: item.client_guid,
        agreementNumber: item.agreement_number,
        agreementDate: new Date(item.agreement_date_utc).pFormatDate(),
        logistName: item.logist_name,
        logistPhone: (item.logist_phone || '').pMaskPhone(),
        logistEmail: item.logist_email,
        dispetcherGroup: item.dispetcher_group,
        rate: item.rate,
        statusCode: item.status_code,
        status: getStatusPresentation((item.status_code || '').toLowerCase()) || {},
        quantityT: item.quantity_t,
        quantityVehicles: item.quantity_vehicles,
        vehiclesLimitation: item.vehicles_limitation,
        warehouseFromScheduleFrom: item.warehouse_from_schedule_from,
        warehouseFromScheduleTo: item.warehouse_from_schedule_to,
        warehouseToScheduleFrom: item.warehouse_to_schedule_from,
        warehouseToScheduleTo: item.warehouse_to_schedule_to,
        info: item.info,
        comment: item.comment,
        route: item.route,
        orderGuid: item.order_guid,
        goodsGuid: item.goods_guid,
        goodsName: item.goods_name,
        pointFromGuid: item.point_from_guid,
        pointFromName: item.point_from_name,
        pointFromKoatuu: item.point_from_koatuu,
        pointFromRegion: item.point_from_region,
        pointToGuid: item.point_to_guid,
        pointToName: item.point_to_name,
        pointToKoatuu: item.point_to_koatuu,
        pointToRegion: item.point_to_region,
        warehouseFromGuid: item.warehouse_from_guid,
        warehouseFromName: item.warehouse_from_name,
        warehouseFromAddressPointed: item.warehouse_from_address_pointed,
        warehouseToGuid: item.warehouse_to_guid,
        warehouseToName: item.warehouse_to_name,
        warehouseToAddressPointed: item.warehouse_to_address_pointed,

        warehouseFromCode: null,
        warehouseToCode: null,
        warehouseLoadDate: null,

        vehiclesRegistersCount: item.vehicles_registers_count || 0,
        racesCount: item.races_count || 0,

        distance: item.distance || 0,
        warehouseFromMaxHeight: item.warehouse_from_max_height || 0,
        warehouseFromMaxWeight: item.warehouse_from_max_weight || 0,
        warehouseFromAutotrainType: item.warehouse_from_autotrain_type
      })
    }
  }

  return result
}

export const getRequest = async function(guid) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_REQUESTS,
    params: {
      access_token: getUserJWToken(this),
      // carrier: this.store.state.companies.currentCompany.guid,
      guid
    }
  })

  const result = {
    status,
    item: {}
  }

  if (status && count > 0) {
    const item = items[0]
    result.item = {
      guid: item.guid,
      number: item.client_number,
      createdAt: new Date(item.date_utc).pFormatDate(),
      scheduleDate: new Date(item.schedule_date_utc).pFormatDate(),
      carrierName: item.carrier_name,
      carrierEdrpou: item.carrier_edrpou,
      carrierGuid: item.carrier_guid,
      clientName: item.client_name,
      clientGuid: item.client_guid,
      agreementNumber: item.agreement_number,
      agreementDate: new Date(item.agreement_date_utc).pFormatDate(),
      logistName: item.logist_name,
      logistPhone: (item.logist_phone || '').pMaskPhone(),
      logistEmail: item.logist_email,
      dispetcherGroup: item.dispetcher_group,
      rate: item.rate,
      statusCode: item.status_code,
      status: getStatusPresentation((item.status_code || '').toLowerCase()) || {},
      quantityT: item.quantity_t,
      quantityVehicles: item.quantity_vehicles,
      vehiclesLimitation: item.vehicles_limitation,
      warehouseFromScheduleFrom: item.warehouse_from_schedule_from,
      warehouseFromScheduleTo: item.warehouse_from_schedule_to,
      warehouseToScheduleFrom: item.warehouse_to_schedule_from,
      warehouseToScheduleTo: item.warehouse_to_schedule_to,
      info: item.info,
      comment: item.comment,
      route: item.route,
      orderGuid: item.order_guid,
      orderNumber: item.order_number,
      orderDate: new Date(item.order_date_utc).pFormatDate(),
      goodsGuid: item.goods_guid,
      goodsName: item.goods_name,
      goodsDesc: item.goods_desc,
      pointFromGuid: item.point_from_guid,
      pointFromName: item.point_from_name,
      pointFromKoatuu: item.point_from_koatuu,
      pointToGuid: item.point_to_guid,
      pointToName: item.point_to_name,
      pointToKoatuu: item.point_to_koatuu,
      warehouseFromGuid: item.warehouse_from_guid,
      warehouseFromAddressPointed: item.warehouse_from_address_pointed,
      warehouseToGuid: item.warehouse_to_guid,
      warehouseToAddressPointed: item.warehouse_to_address_pointed,
      vehiclesRegistersCount: item.vehicles_registers_count || 0,
      racesCount: item.races_count || 0,
      distance: item.distance || 0,
      warehouseFromMaxHeight: item.warehouse_from_max_height || 0,
      warehouseFromMaxWeight: item.warehouse_from_max_weight || 0,
      warehouseFromAutotrainType: item.warehouse_from_autotrain_type
    }
  }

  return result
}

export const quantityHistory = async function(guid) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_HISTORY,
    params: {
      access_token: getUserJWToken(this),
      request_guid: guid
    }
  })

  const result = {
    status,
    items: []
  }

  if (status) {
    for (const item of items) {
      result.items.push({
        date: new Date(item.date).pFormatDateTime(),
        dateUtc: new Date(item.date),
        quantityT: item.quantity_t || 0,
        quantityVehicles: item.quantity_vehicles || 0,
        vehiclesLimitation: item.vehicles_limitation == 0 ? false : true,
        comment: (item.comment || '').pCapitalizeFirstWord(),
        createdAt: new Date(item.created_at).pFormatDateTime(),
      })
    }
  }

  return result
}

export const filterNumbers = async function() {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_FILTER_NUMBERS,
    params: {
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
      result.items.push(item.client_number)
    }
  }

  return result
}

export const filterClientsNames = async function() {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_FILTER_CLIENTS_NAMES,
    params: {
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
      result.items.push(item.client_name)
    }
  }

  return result
}

export const filterGoods = async function() {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_FILTER_GOODS,
    params: {
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
      result.items.push({
        guid: item.goods_guid,
        name: item.goods_name
      })
    }
  }

  return result
}

