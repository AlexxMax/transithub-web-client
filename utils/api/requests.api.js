import { getUserJWToken } from '@/utils/user'
import { getStatusPresentation, getVehiclesRegisterStatus } from '@/utils/requests'
import { arrayToString } from '@/utils/http'
import { getFilterValue } from '@/utils/filters'

const URL_REQUESTS = '/api1/transithub/requests'
const URL_FILTER_NUMBERS = '/api1/transithub/requests/filter_numbers'
const URL_FILTER_CLIENTS_NAMES = '/api1/transithub/requests/filter_clients_names'
const URL_FILTER_LOGISTS = '/api1/transithub/requests/filter_logists'
const URL_FILTER_GOODS = '/api1/transithub/requests/filter_goods'
const URL_HISTORY = '/api1/transithub/requests/quantity_history'
const URL_REQUEST_SET_USER_STATUS = '/api1/transithub/requests.set_user_status'

export const getRequests = async function(
  limit,
  offset,
  search,
  filters,
  userStatus
) {
  const {
    data: {
      status,
      count_new: countNew,
      count_in_work: countInWork,
      count_archived: countArchived,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_REQUESTS,
    params: {
      access_token: getUserJWToken(this),
      carrier: this.store.state.companies.currentCompany.guid,
      user_guid: this.store.state.user.guid,
      limit: limit,
      offset: offset,
      numbers: getFilterValue(filters.numbers).join(';'),
      period_from: filters.periodFrom ? new Date(filters.periodFrom).pFormatDateTime() : null,
      period_to: filters.periodTo ? new Date(filters.periodTo).pFormatDateTime() : null,
      clients: getFilterValue(filters.clients).join(';'),
      logists: getFilterValue(filters.logists).join(';'),
      goods: getFilterValue(filters.goods).join(';'),
      points_from: getFilterValue(filters.pointsFrom).join(';'),
      points_to: getFilterValue(filters.pointsTo).join(';'),
      statuses: getFilterValue(filters.statuses).join(';'),
      search,
      user_status: userStatus,
      distance_from: filters.distanceFrom,
      distance_to: filters.distanceTo,
      region_from: getFilterValue(filters.regionsFrom).join(';'),
      region_to: getFilterValue(filters.regionsTo).join(';'),
      no_veh_regs: filters.noVehiclesRegisters ? 1 : null,
      organisations: getFilterValue(filters.organisations).join(';'),
      veh_reg_status: getFilterValue(filters.vehiclesRegistersStatuses).join(';')
    }
  })

  const result = {
    status,
    count: {
      new: countNew,
      inWork: countInWork,
      archived: countArchived,
    },
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
        rateOfLoss: item.rate_of_loss_auto,
        statusCode: item.status_code,
        status: getStatusPresentation((item.user_status || '').toLowerCase()) || {},
        quantityT: item.quantity_t || 0,
        quantityVehicles: item.quantity_vehicles || 0,
        vehiclesLimitation: item.vehicles_limitation,
        warehouseFromScheduleFrom: item.warehouse_from_schedule_from,
        warehouseFromScheduleTo: item.warehouse_from_schedule_to,
        warehouseToScheduleFrom: item.warehouse_to_schedule_from,
        warehouseToScheduleTo: item.warehouse_to_schedule_to,
        info: item.info,
        comment: item.comment,
        comment2: item.comment_2,
        route: item.route,
        orderGuid: item.order_guid,
        goodsGuid: item.goods_guid,
        goodsName: item.goods_name,
        goodsCost: item.goods_cost,
        pointFromGuid: item.point_from_guid,
        pointFromName: item.point_from_name,
        pointFromKoatuu: item.point_from_koatuu,
        pointFromRegion: item.point_from_region,
        pointFromLat: item.point_from_lat,
        pointFromLng: item.point_from_lng,
        pointToGuid: item.point_to_guid,
        pointToName: item.point_to_name,
        pointToKoatuu: item.point_to_koatuu,
        pointToRegion: item.point_to_region,
        pointToLat: item.point_to_lat,
        pointToLng: item.point_to_lng,
        warehouseFromGuid: item.warehouse_from_guid,
        warehouseFromName: item.warehouse_from_name,
        warehouseFromAddressPointed: item.warehouse_from_address_pointed,
        warehouseFromLat: item.warehouse_from_lat,
        warehouseFromLng: item.warehouse_from_lng,
        warehouseToGuid: item.warehouse_to_guid,
        warehouseToName: item.warehouse_to_name,
        warehouseToAddressPointed: item.warehouse_to_address_pointed,
        warehouseToLat: item.warehouse_to_lat,
        warehouseToLng: item.warehouse_to_lng,

        warehouseFromCode: null,
        warehouseToCode: null,
        warehouseLoadDate: null,

        vehiclesRegistersCount: item.vehicles_registers_count || 0,
        racesCount: item.races_count || 0,

        distance: item.distance || 0,

        warehouseFromMaxHeight: item.warehouse_from_max_height || 0,
        warehouseFromMaxWeight: item.warehouse_from_max_weight || 0,
        warehouseFromMaxLength: item.warehouse_from_max_length || 0,
        warehouseFromWeightType: item.warehouse_from_weight_type,
        warehouseFromAutotrainType: item.warehouse_from_autotrain_type,

        warehouseToMaxHeight: item.warehouse_to_max_height || 0,
        warehouseToMaxWeight: item.warehouse_to_max_weight || 0,
        warehouseToMaxLength: item.warehouse_to_max_length || 0,
        warehouseToWeightType: item.warehouse_to_weight_type,
        warehouseToAutotrainType: item.warehouse_to_autotrain_type,

        vehiclesRegisterStatus: getVehiclesRegisterStatus(item.vehicles_register_status),

        outdated: item.outdated === 1,
        userStatus: item.user_status,
        organisationName: item.organisation_name,
        isFavorite: Boolean(item.is_favorite)
      })
    }
  }

  return result
}

export const getRequest = async function(guid) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_REQUESTS,
    params: {
      access_token: getUserJWToken(this),
      carrier: this.store.state.companies.currentCompany.guid,
      user_guid: this.store.state.user.guid,
      guid
    }
  })

  const result = {
    status,
    item: {}
  }

  if (status) {
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
      rateOfLoss: item.rate_of_loss_auto,
      statusCode: item.status_code,
      status: getStatusPresentation((item.user_status || '').toLowerCase()) || {},
      quantityT: item.quantity_t || 0,
      quantityVehicles: item.quantity_vehicles || 0,
      vehiclesLimitation: item.vehicles_limitation,
      warehouseFromScheduleFrom: item.warehouse_from_schedule_from,
      warehouseFromScheduleTo: item.warehouse_from_schedule_to,
      warehouseToScheduleFrom: item.warehouse_to_schedule_from,
      warehouseToScheduleTo: item.warehouse_to_schedule_to,
      info: item.info,
      comment: item.comment,
      comment2: item.comment_2,
      route: item.route,
      orderGuid: item.order_guid,
      orderNumber: item.order_number,
      orderDate: new Date(item.order_date_utc).pFormatDate(),
      goodsGuid: item.goods_guid,
      goodsName: item.goods_name,
      goodsDesc: item.goods_desc,
      goodsCost: item.goods_cost,
      pointFromGuid: item.point_from_guid,
      pointFromName: item.point_from_name,
      pointFromKoatuu: item.point_from_koatuu,
      pointFromLat: item.point_from_lat,
      pointFromLng: item.point_from_lng,
      pointToGuid: item.point_to_guid,
      pointToName: item.point_to_name,
      pointToKoatuu: item.point_to_koatuu,
      pointToLat: item.point_to_lat,
      pointToLng: item.point_to_lng,
      warehouseFromGuid: item.warehouse_from_guid,
      warehouseFromCode: item.warehouse_from_code,
      warehouseFromAddressPointed: item.warehouse_from_address_pointed,
      warehouseFromLat: +(item.warehouse_from_lat || ''),
      warehouseFromLng: +(item.warehouse_from_lng || ''),
      warehouseToGuid: item.warehouse_to_guid,
      warehouseToCode: item.warehouse_to_code,
      warehouseToAddressPointed: item.warehouse_to_address_pointed,
      warehouseToLat: +(item.warehouse_to_lat || ''),
      warehouseToLng: +(item.warehouse_to_lng || ''),
      vehiclesRegistersCount: item.vehicles_registers_count || 0,
      racesCount: item.races_count || 0,
      distance: item.distance || 0,
      warehouseFromMaxHeight: item.warehouse_from_max_height || 0,
      warehouseFromMaxWeight: item.warehouse_from_max_weight || 0,
      warehouseFromMaxLength: item.warehouse_from_max_length || 0,
      warehouseFromWeightType: item.warehouse_from_weight_type,
      warehouseFromAutotrainType: item.warehouse_from_autotrain_type,
      warehouseToMaxHeight: item.warehouse_to_max_height || 0,
      warehouseToMaxWeight: item.warehouse_to_max_weight || 0,
      warehouseToMaxLength: item.warehouse_to_max_length || 0,
      warehouseToWeightType: item.warehouse_to_weight_type,
      warehouseToAutotrainType: item.warehouse_to_autotrain_type,
      vehiclesRegisterStatus: getVehiclesRegisterStatus(item.vehicles_register_status),
      outdated: item.outdated === 1,
      userStatus: item.user_status,
      organisationName: item.organisation_name,
      managerName: item.manager_name,
      managerPhone: (item.manager_phone || '').pMaskPhone(),
      managerEmail: item.manager_email,
      isFavorite: Boolean(item.is_favorite)
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

export const filterLogists = async function() {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_FILTER_LOGISTS,
    params: {
      access_token: getUserJWToken(this),
      carrier: arrayToString(this.store.getters['companies/globalFilterOnlyGuids'])
    }
  })

  const result = {
    status,
    items : status ? items.map(item => (item.logist_name)) : []
  }

  return result
}

export const setUserStatus = async function(requestGuid, userStatus) {
  if (!requestGuid || !userStatus) {
    console.error('Can\'t change request user status, incorrect guid or status');
    return
  }

  const { data: { status } } = await this.$axios({
    method: 'post',
    url: URL_REQUEST_SET_USER_STATUS,
    params: {
      access_token: getUserJWToken(this)
    },
    data: {
      request_guid: requestGuid,
      user_status: userStatus
    }
  })

  return { status }
}

