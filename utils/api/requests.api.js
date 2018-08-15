import moment from 'moment'

import { complementRequest } from '@/utils/http'
import { getUserJWToken } from '@/utils/user'
import { API_DATE_FORMAT } from '@/utils/constants'

const URL_REQUESTS = '/api1/transithub/requests'
const URL_FILTER_NUMBERS = '/api1/transithub/requests/filter_numbers'
const URL_FILTER_CLIENTS_NAMES = '/api1/transithub/requests/filter_clients_names'
const URL_FILTER_GOODS = '/api1/transithub/requests/filter_goods'

export const getRequests = async (
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
    url: URL_REQUESTS,
    params: {
      access_token: getUserJWToken(ctx),
      limit: limit,
      offset: offset,
      numbers: filters.numbers.join(';'),
      period_from: filters.periodFrom ? moment(filters.periodFrom).format(API_DATE_FORMAT) : null,
      period_to: filters.periodTo ? moment(filters.periodTo).format(API_DATE_FORMAT) : null,
      clients: filters.clients.join(';'),
      goods: filters.goods.join(';'),
      points_from: filters.pointsFrom.join(';'),
      points_to: filters.pointsTo.join(';'),
      statuses: filters.statuses.join(';'),
      search
    }
  }))

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
        createdAt: item.date_utc,
        scheduleDate: item.schedule_date_utc,
        carrierName: item.carrier_name,
        carrierEdrpou: item.carrier_edrpou,
        carrierGuid: item.carrier_guid,
        clientName: item.client_name,
        clientGuid: item.client_guid,
        agreementNumber: item.agreement_number,
        agreementDate: item.agreement_date_utc,
        logistName: item.logist_name,
        logistPhone: item.logist_phone,
        logistEmail: item.logist_email,
        dispetcherGroup: item.dispetcher_group,
        rate: item.rate,
        statusCode: item.status_code,
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
        pointToGuid: item.point_to_guid,
        pointToName: item.point_to_name,
        warehouseFromGuid: item.warehouse_from_guid,
        warehouseFromAddressPointed: item.warehouse_from_address_pointed,
        warehouseToGuid: item.warehouse_to_guid,
        warehouseToAddressPointed: item.warehouse_to_address_pointed
      })
    }
  }

  return result
}

export const filterNumbers = async ctx => {
  const {
    data: {
      status,
      items
    }
  } = await ctx.$axios(complementRequest({
    method: 'get',
    url: URL_FILTER_NUMBERS,
    params: {
      access_token: getUserJWToken(ctx)
    }
  }))

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

export const filterClientsNames = async ctx => {
  const {
    data: {
      status,
      items
    }
  } = await ctx.$axios(complementRequest({
    method: 'get',
    url: URL_FILTER_CLIENTS_NAMES,
    params: {
      access_token: getUserJWToken(ctx)
    }
  }))

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

export const filterGoods = async ctx => {
  const {
    data: {
      status,
      items
    }
  } = await ctx.$axios(complementRequest({
    method: 'get',
    url: URL_FILTER_GOODS,
    params: {
      access_token: getUserJWToken(ctx)
    }
  }))

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
