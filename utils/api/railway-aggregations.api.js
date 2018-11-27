import { complementRequest } from '@/utils/http'
import { getUserJWToken } from '@/utils/user'
import { getLangFromStore } from '@/utils/locale'
import { getStatusPresentation } from '@/utils/railway-aggregations'

const URL_RAILWAY_AGGREGATORS = '/api1/transithub/railway_aggregation'
const URL_RAILWAY_AGGREGATION_REQUESTS = '/api1/transithub/railway_requests'
const URL_RAILWAY_AFFILATIONS = '/api1/transithub/railway_affilations'
const URL_RAILWAY_STATIONS = '/api1/transithub/railway_stations'
const URL_RAILWAY_STATIONS_ROADS = '/api1/transithub/railway_stations_roads'
const URL_RAILWAY_AGGREGATORS_TEST = 'https://prod.apex.rest/ords/kernel_logistic_dev/v1/transithub/railway_aggregation'
const URL_RAILWAY_AGGREGATION_REQUESTS_TEST = 'https://prod.apex.rest/ords/kernel_logistic_dev/v1/transithub/railway_requests'
const URL_RAILWAY_AFFILATIONS_TEST = 'https://prod.apex.rest/ords/kernel_logistic_dev/v1/transithub/railway_affilations'
const URL_RAILWAY_STATIONS_TEST = 'https://prod.apex.rest/ords/kernel_logistic_dev/v1/transithub/railway_stations'
const URL_RAILWAY_STATIONS_ROADS_TEST = 'https://prod.apex.rest/ords/kernel_logistic_dev/v1/transithub/railway_stations_roads'

export const getRailwayAggregations = async function() {
  const { limit, offset, search, filters } = this.store.state.railwayAggregations
  const {
    goods,
    railwayAffilations,
    railwayStationsFrom,
    railwayStationsTo
  } = filters.set

  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_RAILWAY_AGGREGATORS_TEST,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      limit,
      offset,
      search,
      goods: goods.join(';'),
      wagon_types: railwayAffilations.join(';'),
      stations_from: railwayStationsFrom.join(';'),
      stations_to: railwayStationsTo.join(';')
    }
  }))

  const result = {
    status,
    count,
    items: []
  }

  if (status && count > 0) {
    items.forEach(item => {
      result.items.push({
        guid: item.id,
        number: item.number || '',
        status: getStatusPresentation((item.status || '').toLowerCase()) || {},
        stationFromRWCode: item.station_from_rw_code || '',
        stationFromName: (item.station_from_name || '').pCapitalizeAllFirstWords(),
        stationFromRoad: (item.station_from_road || '').pCapitalizeAllFirstWords(),
        stationToRWCode: item.station_to_rw_code || '',
        stationToName: (item.station_to_name || '').pCapitalizeAllFirstWords(),
        stationToRoad: (item.station_to_road || '').pCapitalizeAllFirstWords(),
        companyName: item.company_name || '',
        companyEmail: item.company_email || '',
        companyPhone: item.company_phone || '',
        wagonsInRoute: item.wagons_route || 0,
        wagonsDeficit: item.wagons_deficit || 0,
        periodFrom: new Date(item.date_from_utc).pFormatDate(),
        periodTo: new Date(item.date_to_utc).pFormatDate(),
        wagonsAffilationId: item.wagons_affilation_id,
        wagonsAffilationName: item.wagons_affilation_name || '',
        wagonsAggregator: item.wagons_aggregator || 0,
        goodsGuid: item.goods_classificator_code,
        goodsName: (item.goods_name || '').pCapitalizeFirstWord(),
        userFullname: item.user_fullname || '',
        userEmail: item.user_email || '',
        userPhone: item.user_phone || '',
        partisipantsCount: item.partisipants_count || 0,
        requestsCount: item.requests_count || 0,
        comment: item.comment || ''
      })
    })
  }

  return result
}

export const getRailwayAggregation = async function(guid) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_RAILWAY_AGGREGATORS_TEST,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      id: guid
    }
  }))

  const result = {
    status,
    count,
    item: {}
  }

  if (status && count > 0) {
    const item = items[0]
    result.item = {
      guid: item.id,
      date: new Date(item.created_at_utc).pFormatDateTime(),
      number: item.number || '',
      status: getStatusPresentation((item.status || '').toLowerCase()) || {},
      stationFromRWCode: item.station_from_rw_code || '',
      stationFromName: (item.station_from_name || '').pCapitalizeAllFirstWords(),
      stationFromRoad: (item.station_from_road || '').pCapitalizeAllFirstWords(),
      stationToRWCode: item.station_to_rw_code || '',
      stationToName: (item.station_to_name || '').pCapitalizeAllFirstWords(),
      stationToRoad: (item.station_to_road || '').pCapitalizeAllFirstWords(),
      companyName: item.company_name || '',
      companyEmail: item.company_email || '',
      companyPhone: (item.company_phone || '').pMaskPhone(),
      wagonsInRoute: item.wagons_route || 0,
      wagonsAggregator: item.wagons_aggregator || 0,
      wagonsDeficit: item.wagons_deficit || 0,
      periodFrom: new Date(item.date_from_utc).pFormatDate(),
      periodTo: new Date(item.date_to_utc).pFormatDate(),
      wagonsAffilationId: item.wagons_affilation_id,
      wagonsAffilationName: item.wagons_affilation_name || '',
      goodsGuid: item.goods_classificator_code,
      goodsName: (item.goods_name || '').pCapitalizeFirstWord(),
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: (item.user_phone || '').pMaskPhone(),
      partisipantsCount: item.partisipants_count || 0,
      requestsCount: item.requests_count || 0,
      comment: item.comment || ''
    }
  }

  return result
}

export const postRailwayAggregation = async function(payload) {
  const {
    data: {
      status,
      msg,
      item
    }
  } = await this.$axios(complementRequest({
    method: 'post',
    url: URL_RAILWAY_AGGREGATORS_TEST,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store)
    },
    data: payload
  }))

  const result = {
    status,
    msg,
    item: {}
  }

  if (status) {
    result.item = {
      guid: item.id,
      number: item.number || '',
      status: getStatusPresentation((item.status || '').toLowerCase()) || {},
      stationFromRWCode: item.station_from_rw_code || '',
      stationFromName: (item.station_from_name || '').pCapitalizeAllFirstWords(),
      stationFromRoad: (item.station_from_road || '').pCapitalizeAllFirstWords(),
      stationToRWCode: item.station_to_rw_code || '',
      stationToName: (item.station_to_name || '').pCapitalizeAllFirstWords(),
      stationToRoad: (item.station_to_road || '').pCapitalizeAllFirstWords(),
      companyName: item.company_name || '',
      companyEmail: item.company_email || '',
      companyPhone: item.company_phone || '',
      wagonsInRoute: item.wagons_route || 0,
      wagonsDeficit: item.wagons_deficit || 0,
      periodFrom: new Date(item.date_from_utc).pFormatDate(),
      periodTo: new Date(item.date_to_utc).pFormatDate(),
      wagonsAffilationId: item.wagons_affilation_id,
      wagonsAffilationName: item.wagons_affilation_name || '',
      wagonsAggregator: item.wagons_aggregator || 0,
      goodsGuid: item.goods_classificator_code,
      goodsName: (item.goods_name || '').pCapitalizeFirstWord(),
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: item.user_phone || '',
      comment: item.comment || '',
      partisipantsCount: item.partisipants_count || 0,
      requestsCount: item.requests_count || 0,
      comment: item.comment || ''
    }
  }

  return result
}

export const updateRailwayAggregation = async function(guid, payload) {
  const {
    data: {
      status,
      msg,
      item
    }
  } = await this.$axios(complementRequest({
    method: 'put',
    url: URL_RAILWAY_AGGREGATORS_TEST,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      id: guid
    },
    data: payload
  }))

  const result = {
    status,
    msg,
    item: {}
  }

  if (status) {
    result.item = {
      guid: item.id,
      number: item.number || '',
      status: getStatusPresentation((item.status || '').toLowerCase()) || {},
      stationFromRWCode: item.station_from_rw_code || '',
      stationFromName: (item.station_from_name || '').pCapitalizeAllFirstWords(),
      stationFromRoad: (item.station_from_road || '').pCapitalizeAllFirstWords(),
      stationToRWCode: item.station_to_rw_code || '',
      stationToName: (item.station_to_name || '').pCapitalizeAllFirstWords(),
      stationToRoad: (item.station_to_road || '').pCapitalizeAllFirstWords(),
      companyName: item.company_name || '',
      companyEmail: item.company_email || '',
      companyPhone: item.company_phone || '',
      wagonsInRoute: item.wagons_route || 0,
      wagonsDeficit: item.wagons_deficit || 0,
      periodFrom: new Date(item.date_from_utc).pFormatDate(),
      periodTo: new Date(item.date_to_utc).pFormatDate(),
      wagonsAffilationId: item.wagons_affilation_id,
      wagonsAffilationName: item.wagons_affilation_name || '',
      wagonsAggregator: item.wagons_aggregator || 0,
      goodsGuid: item.goods_classificator_code,
      goodsName: (item.goods_name || '').pCapitalizeFirstWord(),
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: item.user_phone || '',
      comment: item.comment || '',
      partisipantsCount: item.partisipants_count || 0,
      requestsCount: item.requests_count || 0,
      comment: item.comment || ''
    }
  }

  return result
}

export const getRailwayAggregationRequest = async function(requestGuid) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_RAILWAY_AGGREGATION_REQUESTS_TEST,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      id: requestGuid
    }
  }))

  const result = {
    status,
    count,
    item: {}
  }

  if (status && count > 0) {
    const item = items[0]
    result.item = {
      guid: item.id,
      number: item.number || '',
      date: new Date(item.created_at_utc).pFormatDateTime(),
      status: getStatusPresentation((item.status || '').toLowerCase()) || {},
      stationFromRWCode: item.station_from_rw_code || '',
      stationFromName: (item.station_from_name || '').pCapitalizeAllFirstWords(),
      stationFromRoad: (item.station_from_road || '').pCapitalizeAllFirstWords(),
      stationToRWCode: item.station_to_rw_code || '',
      stationToName: (item.station_to_name || '').pCapitalizeAllFirstWords(),
      stationToRoad: (item.station_to_road || '').pCapitalizeAllFirstWords(),
      companyName: item.company_name || '',
      companyEmail: item.company_email || '',
      companyPhone: (item.company_phone || '').pMaskPhone(),
      wagons: item.wagons_request || 0,
      wagonsTypeGuid: item.wagons_type_id,
      wagonsTypeName: item.wagons_type_name || '',
      goodsGuid: item.goods_classificator_code,
      goodsName: (item.goods_name || '').pCapitalizeFirstWord(),
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: item.user_phone || '',
      periodFrom : new Date(item.period_from_utc).pFormatDate(),
      periodTo : new Date(item.period_to_utc).pFormatDate(),
      comment: item.comment || '',
      aggregationGuid: item.parent_id
    }
  }

  return result
}

export const getRailwayAggregationRequests = async function(aggregationGuid) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_RAILWAY_AGGREGATION_REQUESTS_TEST,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      aggregation_id: aggregationGuid
    }
  }))

  const result = {
    status,
    count,
    items: []
  }

  if (status && count > 0) {
    items.forEach(item => {
      result.items.push({
        guid: item.id,
        number: item.number || '',
        date: new Date(item.created_at_utc).pFormatDateTime(),
        status: getStatusPresentation((item.status || '').toLowerCase()) || {},
        stationFromRWCode: item.station_from_rw_code || '',
        stationFromName: (item.station_from_name || '').pCapitalizeAllFirstWords(),
        stationFromRoad: (item.station_from_road || '').pCapitalizeAllFirstWords(),
        companyName: item.company_name || '',
        companyEmail: item.company_email || '',
        companyPhone: (item.company_phone || '').pMaskPhone(),
        wagons: item.wagons_request || 0,
        wagonsTypeGuid: item.wagons_type_id,
        wagonsTypeName: item.wagons_type_name || '',
        goodsGuid: item.goods_classificator_code,
        goodsName: (item.goods_name || '').pCapitalizeFirstWord(),
        userFullname: item.user_fullname || '',
        userEmail: item.user_email || '',
        userPhone: item.user_phone || '',
        periodFrom : new Date(item.period_from_utc).pFormatDate(),
        periodTo : new Date(item.period_to_utc).pFormatDate(),
        comment: item.comment || ''
      })
    })
  }

  return result
}

export const postRailwayAggregationRequest = async function(payload) {
  const {
    data: {
      status,
      msg,
      item
    }
  } = await this.$axios(complementRequest({
    method: 'post',
    url: URL_RAILWAY_AGGREGATION_REQUESTS_TEST,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store)
    },
    data: payload
  }))

  const result = {
    status,
    msg,
    item: {}
  }

  if (status) {
    result.item = {
      guid: item.id,
      number: item.number || '',
      date: new Date(item.created_at_utc).pFormatDateTime(),
      status: getStatusPresentation((item.status || '').toLowerCase()) || {},
      stationFromRWCode: item.station_from_rw_code || '',
      stationFromName: (item.station_from_name || '').pCapitalizeAllFirstWords(),
      stationFromRoad: (item.station_from_road || '').pCapitalizeAllFirstWords(),
      companyName: item.company_name || '',
      companyEmail: item.company_email || '',
      companyPhone: (item.company_phone || '').pMaskPhone(),
      wagons: item.wagons_request || 0,
      wagonsTypeGuid: item.wagons_type_id,
      wagonsTypeName: item.wagons_type_name || '',
      goodsGuid: item.goods_classificator_code,
      goodsName: (item.goods_name || '').pCapitalizeFirstWord(),
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: item.user_phone || '',
      periodFrom : new Date(item.period_from_utc).pFormatDate(),
      periodTo : new Date(item.period_to_utc).pFormatDate(),
      comment: item.comment || ''
    }
  }

  return result
}

export const updateRailwayAggregationRequest = async function(guid, payload) {
  const {
    data: {
      status,
      msg,
      item
    }
  } = await this.$axios(complementRequest({
    method: 'put',
    url: URL_RAILWAY_AGGREGATION_REQUESTS_TEST,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      id: guid
    },
    data: payload
  }))

  const result = {
    status,
    msg,
    item: {}
  }

  if (status) {
    result.item = {
      guid: item.id,
      number: item.number || '',
      date: new Date(item.created_at_utc).pFormatDateTime(),
      status: getStatusPresentation((item.status || '').toLowerCase()) || {},
      stationFromRWCode: item.station_from_rw_code || '',
      stationFromName: (item.station_from_name || '').pCapitalizeAllFirstWords(),
      stationFromRoad: (item.station_from_road || '').pCapitalizeAllFirstWords(),
      stationToRWCode: item.station_to_rw_code || '',
      stationToName: (item.station_to_name || '').pCapitalizeAllFirstWords(),
      stationToRoad: (item.station_to_road || '').pCapitalizeAllFirstWords(),
      companyName: item.company_name || '',
      companyEmail: item.company_email || '',
      companyPhone: (item.company_phone || '').pMaskPhone(),
      wagons: item.wagons_request || 0,
      wagonsTypeGuid: item.wagons_type_id,
      wagonsTypeName: item.wagons_type_name || '',
      goodsGuid: item.goods_classificator_code,
      goodsName: (item.goods_name || '').pCapitalizeFirstWord(),
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: item.user_phone || '',
      periodFrom : new Date(item.period_from_utc).pFormatDate(),
      periodTo : new Date(item.period_to_utc).pFormatDate(),
      comment: item.comment || '',
      aggregationGuid: item.parent_id
    }
  }

  return result
}

export const getRailwayAffilations = async function() {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_RAILWAY_AFFILATIONS_TEST,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store)
    }
  }))

  const result = {
    status,
    count,
    items: []
  }

  if (status) {
    items.forEach(item => {
      result.items.push({
        guid: item.id,
        name: item.name
      })
    })
  }

  return result
}

export const getRailwayStations = async function(roadGuid = null, search = null) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_RAILWAY_STATIONS_TEST,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      road: roadGuid,
      search
    }
  }))

  const result = {
    status,
    count,
    items: []
  }

  if (status) {
    items.forEach(item => {
      result.items.push({
        guid: item.id,
        rwCode: item.rw_code,
        name: item.name.pCapitalizeFirstWord(),
        roadGuid: item.road.toUpperCase(),
        roadName: item.road.pCapitalizeAllFirstWords()
      })
    })
  }

  return result
}

export const getRailwayStationsRoads = async function() {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_RAILWAY_STATIONS_ROADS_TEST,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store)
    }
  }))

  const result = {
    status,
    items: []
  }

  if (status) {
    items.forEach(item => {
      if (item.road) {
        result.items.push({
          guid: item.road.toUpperCase(),
          road: item.road.pCapitalizeAllFirstWords()
        })
      }
    })
  }

  return result
}
