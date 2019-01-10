import { getUserJWToken } from '@/utils/user'
import { getLangFromStore } from '@/utils/locale'
import { getStatusPresentation } from '@/utils/railway-aggregations'
import { arrayToString } from '@/utils/http'

const URL = Object.freeze({
  railway_aggregators:                      `/api1/transithub/railway_aggregation`,
  railway_aggregators_set_status:           `/api1/transithub/railway_aggregation.set_status`,
  railway_aggreagtion_requests:             `/api1/transithub/railway_requests`,
  railway_aggregation_requests_set_status:  `/api1/transithub/railway_requests.set_status`,
  railway_affilations:                      `/api1/transithub/railway_affilations`,
  railway_stations:                         `/api1/transithub/railway_stations`,
  railway_stations_roads:                   `/api1/transithub/railway_stations_roads`,
  railway_filter_statuses:                  `/api1/transithub/railway_aggregation/filter_statuses`,
  railway_filter_companies:                 `/api1/transithub/railway_aggregation/filter_companies`
})

export const getRailwayAggregations = async function() {
  const { limit, offset, search, filters, sorting } = this.store.state.railwayAggregations
  const {
    goods,
    railwayAffilations,
    railwayStationsFrom,
    railwayStationsTo,
    statuses,
    author,
    companies,
    railwayStationsRoadsFrom,
    railwayStationsRoadsTo
  } = filters.set

  const {
    date: sortingDate,
    stationFrom: sortingStationFrom,
    stationTo: sortingStationTo
  } = sorting

  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL.railway_aggregators,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      limit,
      offset,
      search,
      goods: goods.join(';'),
      wagon_types: railwayAffilations.join(';'),
      stations_from: railwayStationsFrom.join(';'),
      stations_to: railwayStationsTo.join(';'),
      statuses: statuses.join(';'),
      companies: companies.join(';'),
      roads_from: railwayStationsRoadsFrom.join(';'),
      roads_to: railwayStationsRoadsTo.join(';'),
      author,
      sort_date: sortingDate,
      sort_station_from: sortingStationFrom,
      sort_station_to: sortingStationTo
    }
  })

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
        statusId: item.status_id,
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
        periodFromUtc: new Date(item.date_from_utc),
        periodTo: new Date(item.date_to_utc).pFormatDate(),
        wagonsAffilationId: item.wagons_affilation_id,
        wagonsAffilationName: item.wagons_affilation_name || '',
        wagonsAggregator: item.wagons_aggregator || 0,
        goodsGuid: item.goods_classificator_code,
        goodsName: (item.goods_name || '').pCapitalizeFirstWord(),
        authorFullname: item.author_fullname || '',
        userFullname: item.user_fullname || '',
        userEmail: item.user_email || '',
        userPhone: (item.user_phone || '').pNormalizePhone(),
        partisipantsCount: item.partisipants_count || 0,
        requestsCount: item.requests_count || 0,
        comment: item.comment || '',
        loadingRate: item.loading_rate || 0
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
  } = await this.$axios({
    method: 'get',
    url: URL.railway_aggregators,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      id: guid
    }
  })

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
      statusId: item.status_id,
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
      authorGuid: item.author_guid,
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: (item.user_phone || '').pNormalizePhone(),
      partisipantsCount: item.partisipants_count || 0,
      requestsCount: item.requests_count || 0,
      comment: item.comment || '',
      loadingRate: item.loading_rate || 0
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
  } = await this.$axios({
    method: 'post',
    url: URL.railway_aggregators,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store)
    },
    data: payload
  })

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
      statusId: item.status_id,
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
      authorFullname: item.author_fullname || '',
      authorGuid: item.author_guid,
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: item.user_phone || '',
      comment: item.comment || '',
      partisipantsCount: item.partisipants_count || 0,
      requestsCount: item.requests_count || 0,
      comment: item.comment || '',
      loadingRate: item.loading_rate || 0
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
  } = await this.$axios({
    method: 'put',
    url: URL.railway_aggregators,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      id: guid
    },
    data: payload
  })

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
      statusId: item.status_id,
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
      authorFullname: item.author_fullname || '',
      authorGuid: item.author_guid,
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: item.user_phone || '',
      comment: item.comment || '',
      partisipantsCount: item.partisipants_count || 0,
      requestsCount: item.requests_count || 0,
      comment: item.comment || '',
      loadingRate: item.loading_rate || 0
    }
  }

  return result
}

export const setRailwayAggregationStatus = async function(guid, newStatusId) {
  const {
    data: {
      status,
      msg,
      status_id: statusId,
      status_name: statusName
    }
  } = await this.$axios({
    method: 'post',
    url: URL.railway_aggregators_set_status,
    params: {
      access_token: getUserJWToken(this),
      id: guid
    },
    data: { status_id: newStatusId }
  })

  return {
    status,
    msg,
    statusId,
    statusObj: getStatusPresentation((statusName || '').toLowerCase()) || {}
  }
}

export const getRailwayAggregationRequest = async function(requestGuid) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL.railway_aggreagtion_requests,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      id: requestGuid
    }
  })

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
      statusId: item.status_id,
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
      authorGuid: item.author_guid,
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: (item.user_phone || '').pNormalizePhone(),
      periodFrom : new Date(item.period_from_utc).pFormatDate(),
      periodTo : new Date(item.period_to_utc).pFormatDate(),
      comment: item.comment || '',
      aggregationGuid: item.parent_id,
      aggregationNumber: item.aggregation_number || '',
      aggregationStatus: getStatusPresentation((item.aggregation_status || '').toLowerCase()) || {},
      aggregationStatusId: item.aggregation_status_id,
      loadingRate: item.loading_rate || 0
    }
  }

  return result
}

export const getRailwayAggregationRequests = async function(
  aggregationGuid = null,
  limit = null,
  offset = null,
  search = null,
  filters = {},
  sorting = {}
) {
  const {
    goods,
    railwayAffilations,
    railwayStationsFrom,
    railwayStationsTo,
    statuses,
    author,
    companies,
    railwayStationsRoadsFrom,
    railwayStationsRoadsTo,
    income
  } = filters

  const {
    date: sortingDate,
    number: sortingNumber,
    stationFrom: sortingStationFrom,
    stationTo: sortingStationTo
  } = sorting

  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL.railway_aggreagtion_requests,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      aggregation_id: aggregationGuid,
      limit,
      offset,
      search,
      goods: arrayToString(goods),
      wagon_types: arrayToString(railwayAffilations),
      stations_from: arrayToString(railwayStationsFrom),
      stations_to: arrayToString(railwayStationsTo),
      statuses: arrayToString(statuses),
      companies: arrayToString(companies),
      roads_from: arrayToString(railwayStationsRoadsFrom),
      roads_to: arrayToString(railwayStationsRoadsTo),
      author,
      income,
      sort_date: sortingDate,
      sort_station_from: sortingStationFrom,
      sort_station_to: sortingStationTo,
      sort_number: sortingNumber
    }
  })

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
        authorFullname: item.author_fullname || '',
        authorGuid: item.author_guid,
        userFullname: item.user_fullname || '',
        userEmail: item.user_email || '',
        userPhone: (item.user_phone || '').pNormalizePhone(),
        periodFrom : new Date(item.period_from_utc).pFormatDate(),
        periodTo : new Date(item.period_to_utc).pFormatDate(),
        comment: item.comment || '',
        loadingRate: item.loading_rate || 0
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
  } = await this.$axios({
    method: 'post',
    url: URL.railway_aggreagtion_requests,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store)
    },
    data: payload
  })

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
      statusId: item.status_id,
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
      authorFullname: item.author_fullname || '',
      authorGuid: item.author_guid,
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: item.user_phone || '',
      periodFrom : new Date(item.period_from_utc).pFormatDate(),
      periodTo : new Date(item.period_to_utc).pFormatDate(),
      comment: item.comment || '',
      loadingRate: item.loading_rate || 0
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
  } = await this.$axios({
    method: 'put',
    url: URL.railway_aggreagtion_requests,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      id: guid
    },
    data: payload
  })

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
      statusId: item.status_id,
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
      authorFullname: item.author_fullname || '',
      authorGuid: item.author_guid,
      userFullname: item.user_fullname || '',
      userEmail: item.user_email || '',
      userPhone: item.user_phone || '',
      periodFrom : new Date(item.period_from_utc).pFormatDate(),
      periodTo : new Date(item.period_to_utc).pFormatDate(),
      comment: item.comment || '',
      aggregationGuid: item.parent_id,
      loadingRate: item.loading_rate || 0
    }
  }

  return result
}

export const setRailwayAggregationRequestStatus = async function(guid, newStatusId) {
  const {
    data: {
      status,
      msg,
      status_id: statusId,
      status_name: statusName
    }
  } = await this.$axios({
    method: 'post',
    url: URL.railway_aggregation_requests_set_status,
    params: {
      access_token: getUserJWToken(this),
      id: guid
    },
    data: { status_id: newStatusId }
  })

  return {
    status,
    msg,
    statusId,
    statusObj: getStatusPresentation((statusName || '').toLowerCase()) || {}
  }
}

export const getRailwayAffilations = async function() {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL.railway_affilations,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store)
    }
  })

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
  } = await this.$axios({
    method: 'get',
    url: URL.railway_stations,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store),
      road: roadGuid,
      search
    }
  })

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
  } = await this.$axios({
    method: 'get',
    url: URL.railway_stations_roads,
    params: {
      access_token: getUserJWToken(this),
      locale: getLangFromStore(this.store)
    }
  })

  const result = {
    status,
    items: []
  }

  if (status) {
    items.forEach(item => {
      result.items.push({
        guid: item.id,
        name: item.name.pCapitalizeFirstWord()
      })
    })
  }

  return result
}

export const getFilterStatuses = async function() {
  const {
    data: {
      status,
      items,
      msg
    }
  } = await this.$axios({
    method: 'get',
    url: URL.railway_filter_statuses,
    params: {
      locale: getLangFromStore(this.store)
    }
  })

  const result = {
    status,
    items: [],
    msg
  }

  if (status) {
    items.forEach(item => {
      result.items.push({
        guid: item.status_id,
        name: item.status_name.pCapitalizeFirstWord()
      })
    })
  }

  return result
}

export const getFilterCompanies = async function() {
  const {
    data: {
      status,
      items,
      msg
    }
  } = await this.$axios({
    method: 'get',
    url: URL.railway_filter_companies,
    params: {
      locale: getLangFromStore(this.store)
    }
  })

  const result = {
    status,
    items: [],
    msg
  }

  if (status) {
    items.forEach(item => {
      result.items.push({
        guid: item.company_guid,
        name: item.company_name
      })
    })
  }

  return result
}
