import _orderBy from 'lodash.orderby'
import _uniq from 'lodash.uniq'
import _pull from 'lodash.pull'

import { showErrorMessage } from '@/utils/messages'
import { getSortingDirectionCode } from '../utils/sorting'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { getOppositeStatusId, STATUSES_IDS } from '@/utils/railway-aggregations'
import { filtersSet } from '@/utils/storeCommon'

const filtersInit = {
  goods: [],
  railwayAffilations: [],
  railwayStationsFrom: [],
  railwayStationsTo: [],
  statuses: [ STATUSES_IDS.actual ],
  author: null,
  companies: [],
  railwayStationsRoadsFrom: [],
  railwayStationsRoadsTo: []
}

export const state = () => ({
  item: {},
  list: [],
  count: 0,
  loading: false,
  filters: {
    data: {
      companies: {
        items: [],
        loading: false,
        fetched: false
      }
    },
    set: { ...filtersInit }
  },
  sorting: {
    date: null,
    stationFrom: null,
    stationTo: null
  },
  limit: PAGE_SIZE,
  offset: OFFSET,
  search: null
})

export const getters = {
  getRailwayAggregation: state => {
    return { ...state.item, status: state.item.status || {} }
  },
  listFiltersSet(state) {
    return filtersSet(state.filters.set)
  }
}

export const mutations = {
  RESET(state) {
    state.list = []
    state.count = 0
    state.loading = false
    state.filters.set = { ...filtersInit }
    state.limit = PAGE_SIZE
    state.offset = OFFSET
    state.search = null
  },

  SET_LIST(state, list) {
    state.list = list
  },

  UPDATE_LIST_ITEM(state, item) {
    let listItem = state.list.find(item => item.guid === item.guid)
    if (listItem) {
      listItem = { ...listItem, ...item }
    } else {
      state.list = [ item, ...state.list ]
    }
  },

  APPEND_ITEMS_TO_LIST(state, items) {
    state.list = [
      ...state.list,
      ...items
    ]
  },

  SET_COUNT(state, count) {
    state.count = count
  },

  SET_LOADING(state, loading) {
    state.loading = loading
  },

  SET_ITEM(state, item) {
    state.item = item
  },

  SET_ITEM_STATUS(state, { status, statusId }) {
    state.item.status = status
    state.item.statusId = statusId
  },

  CALCULATE_ITEM_PARAMS(state, { requestsWagons, requestsCount, partisipantsCount }) {
    state.item.wagonsDeficit = state.item.wagonsInRoute - state.item.wagonsAggregator - requestsWagons
    state.item.requestsCount = requestsCount
    state.item.partisipantsCount = partisipantsCount
  },

  CALCULATE_IN_LIST_PARAMS(state, { aggregationGuid, requestsWagons, requestsCount, partisipantsCount }) {
    const list = [ ...state.list ]
    const item = list.find(item => item.guid === aggregationGuid)
    if (item) {
      item.wagonsDeficit = item.wagonsInRoute - item.wagonsAggregator - requestsWagons
      item.requestsCount = requestsCount
      item.partisipantsCount = partisipantsCount
      state.list = list
    }
  },

  SET_SORTING_DATE(state, value) {
    state.sorting.date = value
  },

  SET_SORTING_STATION_FROM(state, value) {
    state.sorting.stationFrom = value
  },

  SET_SORTING_STATION_TO(state, value) {
    state.sorting.stationTo = value
  },

  SET_LIMIT(state, value) {
    state.limit = value
  },

  SET_OFFSET(state, value) {
    state.offset = value
  },

  SET_SEARCH(state, value) {
    state.search = value
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
  }
}

export const actions = {
  async loadList({
    commit
  }) {
    commit('SET_LOADING', true)

    try {
      const {
        status,
        count,
        items
      } = await this.$api.railway.getRailwayAggregations()

      if (status) {
        commit('SET_LIST', items)
        commit('SET_COUNT', count)
        commit('SET_LOADING', false)
      }
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async loadMoreItems({
    commit,
    state
  }) {
    commit('SET_LOADING', true)

    try {
      const {
        status,
        count,
        items
      } = await this.$api.railway.getRailwayAggregations()

      if (status) {
        commit('APPEND_ITEMS_TO_LIST', items)
        commit('SET_COUNT', state.count + count)
        commit('SET_LOADING', false)
      }
    } catch ({ message }) {
      showErrorMessage(message)
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
      } = await this.$api.railway.getRailwayAggregation(guid)

      if (status){
        commit('SET_ITEM', item)
      }
      commit('SET_LOADING', false)
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async createAggregation({ commit, state, dispatch }, payload) {
    try {
      const {
        status,
        msg,
        item
      } = await this.$api.railway.postRailwayAggregation(payload)

      if (msg) {
        throw new Error(msg)
      }

      if (status) {
        dispatch('loadList')
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async changeAggregation({ commit, state, dispatch }, { aggregationGuid, payload }) {
    try {
      const {
        status,
        msg,
        item
      } = await this.$api.railway.updateRailwayAggregation(aggregationGuid, payload)

      if (msg) {
        throw new Error(msg)
      }

      if (status) {
        if (state.item.guid === aggregationGuid) {
          commit('SET_ITEM', item)
        }
        commit('UPDATE_LIST_ITEM', item)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  calculateAggregationParams({ commit, state }, {
    aggregationGuid,
    requestsWagons,
    requestsCount,
    partisipantsCount
  }) {
    if (state.item.guid == aggregationGuid) {
      commit('CALCULATE_ITEM_PARAMS', { requestsWagons, requestsCount, partisipantsCount })
    }
    commit('CALCULATE_IN_LIST_PARAMS', { aggregationGuid, requestsWagons, requestsCount, partisipantsCount })
  },

  async setSortingDate({
    commit,
    dispatch
  }, direction) {
    commit('SET_SORTING_DATE', getSortingDirectionCode(direction))
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

  async setSearch({
    commit,
    dispatch
  }, value) {
    commit('SET_SEARCH', value)
    await dispatch('loadList')
  },

  async setFilterGoods({
    commit,
    dispatch
  }, goods) {
    commit('SET_FILTER_GOODS', goods)
    await dispatch('loadList')
  },

  async setFilterAffilations({
    commit,
    dispatch
  }, affilations) {
    commit('SET_FILTER_AFFILATIONS', affilations)
    await dispatch('loadList')
  },

  async setFilterStationsFrom({
    commit,
    dispatch
  }, stations) {
    commit('SET_FILTER_STATIONS_FROM', stations)
    await dispatch('loadList')
  },

  async setFilterStationsTo({
    commit,
    dispatch
  }, stations) {
    commit('SET_FILTER_STATIONS_TO', stations)
    await dispatch('loadList')
  },

  async setFilterStationsRoadsFrom({
    commit,
    dispatch
  }, roads) {
    commit('SET_FILTER_STATIONS_ROADS_FROM', roads)
    await dispatch('loadList')
  },

  async setFilterStationsRoadsTo({
    commit,
    dispatch
  }, roads) {
    commit('SET_FILTER_STATIONS_ROADS_TO', roads)
    await dispatch('loadList')
  },

  async setFilterStatuses({
    commit,
    dispatch
  }, statuses) {
    commit('SET_FILTER_STATUSES', statuses)
    await dispatch('loadList')
  },

  async setFilterAuthor({
    commit,
    dispatch
  }, author) {
    commit('SET_FILTER_AUTHOR', author)
    await dispatch('loadList')
  },

  async setFilterCompanies({
    commit,
    dispatch
  }, companies) {
    commit('SET_FILTER_COMPANIES', companies)
    await dispatch('loadList')
  },

  async clearFilters({
    commit,
    dispatch
  }) {
    commit('CLEAR_FILTERS')
    await dispatch('loadList')
  },

  async setStatus({ commit }, { guid, currentStatusId }) {
    try {
      const {
        status,
        statusId,
        statusObj,
        msg: message
      } = await this.$api.railway.setRailwayAggregationStatus(
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
  }
}
