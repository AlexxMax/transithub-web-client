import _uniqby from 'lodash.uniqby'

import { showErrorMessage } from '@/utils/messages'
import { getOppositeStatusId, STATUSES_IDS } from '@/utils/railway-aggregations'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { filtersSet } from '@/utils/storeCommon'
import { getSortingDirectionCode } from '../utils/sorting'

const FILTERS_SAVED_TABLE_NAME = 'railway-proposition'

const filtersInit = {
  goods: [],
  railwayAffilations: [],
  railwayStationsFrom: [],
  railwayStationsTo: [],
  statuses: [ STATUSES_IDS.actual ],
  companies: [],
  railwayStationsRoadsFrom: [],
  railwayStationsRoadsTo: [],
  railwayReferenceStations: [],
  polygonNumbers: [],
  income: 0
}

export const state = () => ({
  item: {},
  subordinateList: [],
  list: [],
  count: 0,
  loading: false,
  limit: PAGE_SIZE,
  offset: OFFSET,
  search: null,
  filters: {
    data: {
      companies: {
        items: [],
        loading: false,
        fetched: false
      }
    },
    set: { ...filtersInit },
    saved: {
      list: [],
      loading: false,
      fetched: false
    }
  },
  sorting: {
    date: null,
    number: null,
    stationFrom: null,
    stationTo: null
  }
})

export const getters = {
  getRailwayRequest: state => {
    return { ...state.item, status: state.item.status || {} }
  },
  listFiltersSet(state) {
    return filtersSet(state.filters.set)
  },
  getSubordinateList: state => aggregation => {
    const record = state.subordinateList.find(
      item => item.aggregation === aggregation
    )
    if (record) {
      return record.items
    }
    return []
  },
  getRailwayRequestFromSubordinateList: (state, getters) => ({ aggregation, request }) => {
    const subordinateList = getters.getSubordinateList(aggregation)
    return subordinateList.find(item => item.guid === request) || { status: {} }
  },
  getAggregationSubordinationRequestsParams: (state, getters) => aggregation => {
    const params = {
      requestsWagons: 0,
      requestsCount: 0,
      partisipantsCount: 0
    }

    const subordinateList = getters.getSubordinateList(aggregation)
    subordinateList.forEach(item => { params.requestsWagons += item.wagons })
    params.requestsCount = subordinateList.length
    params.partisipantsCount = _uniqby(subordinateList, 'companyName').length

    return params
  },

  // listFiltersSet(state) {
  //   const {
  //     goods,
  //     railwayAffilations,
  //     railwayStationsFrom
  //   } = state.filters.set

  //   return goods.length > 0
  //     || railwayAffilations.length > 0
  //     || railwayStationsFrom.length > 0
  // }
}

export const mutations = {
  RESET(state) {
    state.list = []
    state.count = 0
    state.loading = false,
    state.limit = PAGE_SIZE
    state.offset = OFFSET
    state.search = null
    // state.filters.set = { ...filtersInit }
  },

  SET_ITEM(state, item) {
    state.item = item
  },

  SET_ITEM_STATUS(state, { status, statusId }) {
    state.item.status = status
    state.item.statusId = statusId
  },

  SET_LIST(state, list) {
    state.list = list
  },

  SET_COUNT(state, count) {
    state.count = count
  },

  SET_LOADING(state, loading) {
    state.loading = loading
  },

  CLEAR_SUBORDINATE_LIST(state, aggregation) {
    const record = state.subordinateList.find(
      item => item.aggregation === aggregation
    )
    if (record) {
      record.items = []
    }
  },

  UPDATE_SUBORDINATE_LIST(state, { aggregation, items }) {
    const record = state.subordinateList.find(
      item => item.aggregation === aggregation
    )
    if (record) {
      record.items = [ ...items ]
    } else {
      state.subordinateList.push({
        aggregation,
        items: [ ...items ]
      })
    }
  },

  UPDATE_ITEM(state, { request, item }) {
    if (state.item.guid === request) {
      state.item = item
    }
  },

  UPDATE_ITEM_IN_LIST(state, { aggregation, request, item }) {
    const record = state.subordinateList.find(
      item => item.aggregation === aggregation
    )

    if (record) {
      let listItem = record.items.find(subordinateItem => subordinateItem.guid === request)
      if (listItem) {
        Object.keys(item).forEach(key => {
          listItem[key] = item[key]
        })
      } else {
        record.items.push(item)
      }
    } else {
      state.subordinateList.push({
        aggregation,
        items: [ item ]
      })
    }
  },

  SET_SEARCH(state, value) {
    state.search = value
  },

  SET_SORTING_DATE(state, value) {
    state.sorting.date = value
  },

  SET_FILTERS(state, filters) {
		state.filters.set = filters || filtersInit
  },

  SET_FILTER_GOODS(state, goods) {
    state.filters.set.goods = goods
  },

  SET_FILTER_AFFILATIONS(state, affilations) {
    state.filters.set.railwayAffilations = affilations
  },

  SET_FILTER_STATIONS_FROM(state, stations) {
    state.filters.set.railwayStationsFrom = stations
  },

  SET_FILTER_STATIONS_TO(state, stations) {
    state.filters.set.railwayStationsTo = stations
  },

  SET_FILTER_STATIONS_ROADS_FROM(state, roads) {
    state.filters.set.railwayStationsRoadsFrom = roads
  },

  SET_FILTER_REFERENCE_STATIONS(state, stations) {
    state.filters.set.railwayReferenceStations = stations
  },

  SET_FILTER_POLYGON_NUMBER(state, polygonNumbers) {
    state.filters.set.polygonNumbers = polygonNumbers
  },

  SET_FILTER_STATIONS_ROADS_TO(state, roads) {
    state.filters.set.railwayStationsRoadsTo = roads
  },

  SET_FILTER_STATUSES(state, statuses) {
    state.filters.set.statuses = statuses
  },

  SET_FILTER_AUTHOR(state, author) {
    state.filters.set.author = author
  },

  SET_FILTER_COMPANIES(state, companies) {
    state.filters.set.companies = companies
  },

  SET_FILTER_INCOME(state, income) {
    state.filters.set.income = income
  },

  CLEAR_FILTERS(state) {
    state.filters.set = { ...state.filters.set, ...filtersInit}
  },

  SET_FILTER_COMPANIES_DATA(state, companies) {
    state.filters.data.companies.items = companies
  },

  SET_FILTER_COMPANIES_DATA_LOADING(state, loading) {
    state.filters.data.companies.loading = loading
  },

  SET_FILTER_COMPANIES_DATA_FETCHED(state, fetched) {
    state.filters.data.companies.fetched = fetched
  },

  SET_LIMIT(state, value) {
    state.limit = value
  },

  SET_OFFSET(state, value) {
    state.offset = value
  },

  SET_SORTING_DATE(state, value) {
    state.sorting.date = value
  },

  SET_SORTING_NUMBER(state, value) {
    state.sorting.number = value
  },

  SET_SORTING_STATION_FROM(state, value) {
    state.sorting.stationFrom = value
  },

  SET_SORTING_STATION_TO(state, value) {
    state.sorting.stationTo = value
  },

  SET_FILTERS_SAVED_LIST(state, list) {
    state.filters.saved.list = list
  },

  SET_FILTERS_SAVED_LOADING(state, loading) {
    state.filters.saved.loading = loading
  },

  SET_FILTERS_SAVED_FETCHED(state, fetched) {
    state.filters.saved.fetched = fetched
  }
}

export const actions = {
  async loadList({
    commit,
    state,
    rootGetters
  }) {
    commit('SET_LOADING', true)

    const filters = {
      ...state.filters.set,
      income: state.filters.set.income,
      affectedCompanies: rootGetters['companies/globalFilterOnlyGuids']
    }

    try {
      const {
        status,
        count,
        items
      } = await this.$api.railway.getRailwayAggregationRequests(
        null,
        state.limit,
        state.offset,
        state.search,
        filters,
        state.sorting
      )

      if (status) {
        commit('SET_LIST', items)
        commit('SET_COUNT', count)
        commit('SET_LOADING', false)
      }
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async loadElement({
    commit
  }, guid) {
    commit('SET_LOADING', true)
    try {
      const {
        status,
        item
      } = await this.$api.railway.getRailwayAggregationRequest(guid)

      if (status){
        commit('SET_ITEM', item)
      }
      commit('SET_LOADING', false)
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async fetchSubordinateList({
    commit
  }, aggregationGuid) {
    try {
      const {
        status,
        items
      } = await this.$api.railway.getRailwayAggregationRequests(aggregationGuid)

      if (status) {
        commit('UPDATE_SUBORDINATE_LIST', {
          aggregation: aggregationGuid,
          items
        })
      }
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async createRequest({
    commit,
    dispatch,
    getters
  }, payload) {
    try {
      const {
        status,
        msg,
        item
      } = await this.$api.railway.postRailwayAggregationRequest(payload)

      if (status) {
        const aggregationGuid = payload.parentId.toString()
        commit('UPDATE_SUBORDINATE_LIST', {
          aggregation: aggregationGuid,
          items: [ item, ...getters.getSubordinateList(aggregationGuid) ]
        })

        const {
          requestsWagons,
          requestsCount,
          partisipantsCount
        } = getters.getAggregationSubordinationRequestsParams(aggregationGuid)
        dispatch(
          'railwayAggregations/calculateAggregationParams',
          {
            aggregationGuid: payload.parentId,
            requestsWagons,
            requestsCount,
            partisipantsCount
          },
          { root: true }
        )
      } else {
        throw new Error(msg)
      }
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async changeRequest({
    commit,
    dispatch,
    getters
  }, {
    requestGuid,
    payload
  }) {
    try {
      const {
        status,
        msg,
        item
      } = await this.$api.railway.updateRailwayAggregationRequest(requestGuid, payload)

      if (status) {
        const aggregationGuid = payload.parentId.toString()
        commit('UPDATE_ITEM', { request: requestGuid, item })
        commit('UPDATE_ITEM_IN_LIST', {
          aggregation: aggregationGuid,
          request: requestGuid,
          item
        })
        const {
          requestsWagons,
          requestsCount,
          partisipantsCount
        } = getters.getAggregationSubordinationRequestsParams(aggregationGuid)
        dispatch(
          'railwayAggregations/calculateAggregationParams',
          {
            aggregationGuid: payload.parentId,
            requestsWagons,
            requestsCount,
            partisipantsCount
          },
          { root: true }
        )
      } else {
        throw new Error(msg)
      }
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async setStatus({ commit }, { guid, currentStatusId }) {
    try {
      const {
        status,
        statusId,
        statusObj,
        msg: message
      } = await this.$api.railway.setRailwayAggregationRequestStatus(
        guid,
        getOppositeStatusId(currentStatusId)
      )

      if (status) {
        commit('SET_ITEM_STATUS', { status: statusObj, statusId })
      }

      return { status, message}
    } catch ({ message }) {
      return { status: false, message }
    }
  },

  async setSearch({
    commit,
    dispatch
  }, value) {
    commit('SET_SEARCH', value)
    await dispatch('loadList')
  },

  async setFilterGoods({
    commit,
    dispatch,
    state
  }, goods) {
    commit('SET_FILTER_GOODS', goods)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilterAffilations({
    commit,
    dispatch,
    state
  }, affilations) {
    commit('SET_FILTER_AFFILATIONS', affilations)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilterStationsFrom({
    commit,
    dispatch,
    state
  }, stations) {
    commit('SET_FILTER_STATIONS_FROM', stations)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilterReferenceStations({
    commit,
    dispatch,
    state
  }, stations) {
    commit('SET_FILTER_REFERENCE_STATIONS', stations)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilterPolygonNumbers({
    commit,
    dispatch,
    state
  }, polygonNumbers) {
    commit('SET_FILTER_POLYGON_NUMBER', polygonNumbers)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilterStationsTo({
    commit,
    dispatch,
    state
  }, stations) {
    commit('SET_FILTER_STATIONS_TO', stations)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilterStationsRoadsFrom({
    commit,
    dispatch,
    state
  }, roads) {
    commit('SET_FILTER_STATIONS_ROADS_FROM', roads)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilterStationsRoadsTo({
    commit,
    dispatch,
    state
  }, roads) {
    commit('SET_FILTER_STATIONS_ROADS_TO', roads)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilterStatuses({
    commit,
    dispatch,
    state
  }, statuses) {
    commit('SET_FILTER_STATUSES', statuses)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilterAuthor({
    commit,
    dispatch,
    state
  }, author) {
    commit('SET_FILTER_AUTHOR', author)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilterCompanies({
    commit,
    dispatch,
    state
  }, companies) {
    commit('SET_FILTER_COMPANIES', companies)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilterIncome({
    commit,
    dispatch,
    state
  }, income) {
    commit('SET_FILTER_INCOME', income)
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async setFilters({
    commit,
    dispatch,
    state
  }, filters) {
    commit('SET_FILTERS', { ...filters, income: state.filters.set.income })
    await dispatch('loadList')
    this.$cookies.railwayRequests.setFilters(state.filters.set)
  },

  async clearFilters({
    commit,
    dispatch
  }) {
    commit('CLEAR_FILTERS')
    await dispatch('loadList')
    this.$cookies.railwayRequests.unsetFilters()
  },

  async setSortingDate({
    commit,
    dispatch
  }, direction) {
    commit('SET_SORTING_DATE', getSortingDirectionCode(direction))
    await dispatch('loadList')
  },

  async setSortingNumber({
    commit,
    dispatch
  }, direction) {
    commit('SET_SORTING_NUMBER', getSortingDirectionCode(direction))
    await dispatch('loadList')
  },

  async setSortingStationFrom({
    commit,
    dispatch
  }, direction) {
    commit('SET_SORTING_STATION_FROM', getSortingDirectionCode(direction))
    await dispatch('loadList')
  },

  async setSortingStationTo({
    commit,
    dispatch
  }, direction) {
    commit('SET_SORTING_STATION_TO', getSortingDirectionCode(direction))
    await dispatch('loadList')
  },

  async loadCompanies({commit}) {
    commit('SET_FILTER_COMPANIES_DATA_LOADING', true)
    try {
      const { status, items, msg } = await this.$api.railway.getFilterCompaniesRailway()
      if (status) {
        commit('SET_FILTER_COMPANIES_DATA', items)
        commit('SET_FILTER_COMPANIES_DATA_LOADING', false)
        commit('SET_FILTER_COMPANIES_DATA_FETCHED', true)
      } else {
        throw new Error(msg)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async loadSavedFilters({ commit }) {
    commit('SET_FILTERS_SAVED_LOADING', true)

    try {
      const {
        status,
        items
      } = await this.$api.usersFilters.getFilters(FILTERS_SAVED_TABLE_NAME)

      if (status) {
        commit('SET_FILTERS_SAVED_LIST', items)
        commit('SET_FILTERS_SAVED_LOADING', false)
        commit('SET_FILTERS_SAVED_FETCHED', true)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async createNewSavedFilters({ commit, state }, labels = []) {
    const { income, author,  ...values } = state.filters.set

    commit('SET_FILTERS_SAVED_LOADING', true)

    try {
      const { status, guid } = await this.$api.usersFilters.createNewFilters(FILTERS_SAVED_TABLE_NAME, { values, labels })

      if (status) {
        commit('SET_FILTERS_SAVED_LIST', [ { guid, values: values, labels }, ...state.filters.saved.list ])
        commit('SET_FILTERS_SAVED_LOADING', false)
        commit('SET_FILTERS_SAVED_FETCHED', true)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async removeSavedFilters({ commit, state }, guid) {
    try {
      const { status } = await this.$api.usersFilters.removeFilters(guid)

      if (status) {
        commit('SET_FILTERS_SAVED_LIST', state.filters.saved.list.filter(item => item.guid !== guid))
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  }
}
