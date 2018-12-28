import _orderBy from 'lodash.orderby'
import _uniq from 'lodash.uniq'
import _pull from 'lodash.pull'

import { showErrorMessage } from '@/utils/messages'
import { SORTING_DIRECTION } from '../utils/sorting'
import { PAGE_SIZE, OFFSET, LIST_SORTING_DIRECTION } from '@/utils/defaultValues'
import { getOppositeStatusId } from '@/utils/railway-aggregations'
import { getGroupedList, filtersSet } from '@/utils/storeCommon'

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
    set: {
      goods: [],
      railwayAffilations: [],
      railwayStationsFrom: [],
      railwayStationsTo: [],
      statuses: [],
      author: null,
      companies: [],
      railwayStationsRoadsFrom: [],
      railwayStationsRoadsTo: []
    }
  },
  sorting: {
    date: LIST_SORTING_DIRECTION
  },
  limit: PAGE_SIZE,
  offset: OFFSET,
  search: null
})

export const getters = {
  getRailwayAggregation: state => {
    return { ...state.item, status: state.item.status || {} }
  },
  groupedList(state, getters, rootState) {
    const GROUPS = {
      stationFrom: 'stationFromName',
      stationTo: 'stationToName'
    }

    return getGroupedList(state.list, rootState.userSettings.railwayAggregations.list.groups, GROUPS)
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
    state.filters.set = {
      goods: [],
      railwayAffilations: [],
      railwayStationsFrom: [],
      railwayStationsTo: [],
      statuses: [],
      author: null,
      companies: [],
      railwayStationsRoadsFrom: [],
      railwayStationsRoadsTo: []
    }
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
    const filters = {
      goods: [],
      railwayAffilations: [],
      railwayStationsFrom: [],
      railwayStationsTo: [],
      statuses: [],
      author: null,
      companies: [],
      railwayStationsRoadsFrom: [],
      railwayStationsRoadsTo: []
    }
    state.filters.set = { ...state.filters.set, ...filters}
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
    commit,
    dispatch
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
        dispatch('sortList')
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
        dispatch('sortList')
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
        dispatch('sortList')
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

  setSortingDate({
    commit,
    dispatch
  }, direction) {
    commit('SET_SORTING_DATE', direction)
    dispatch('sortList')
  },

  sortList({
    state,
    commit
  }) {
    const sortCols = []
    const sortDirs = []
    if (state.sorting.date != SORTING_DIRECTION.disabled) {
      sortCols.push('periodFromUtc')
      sortDirs.push(state.sorting.date)
    }
    if (sortCols.length != 0) {
      commit('SET_LIST', _orderBy(state.list, sortCols, sortDirs))
    }
  },

  setSearch({
    commit,
    dispatch
  }, value) {
    commit('SET_SEARCH', value)
    dispatch('loadList')
  },

  setFilterGoods({
    commit,
    dispatch
  }, goods) {
    commit('SET_FILTER_GOODS', goods)
    dispatch('loadList')
  },

  setFilterAffilations({
    commit,
    dispatch
  }, affilations) {
    commit('SET_FILTER_AFFILATIONS', affilations)
    dispatch('loadList')
  },

  setFilterStationsFrom({
    commit,
    dispatch
  }, stations) {
    commit('SET_FILTER_STATIONS_FROM', stations)
    dispatch('loadList')
  },

  setFilterStationsTo({
    commit,
    dispatch
  }, stations) {
    commit('SET_FILTER_STATIONS_TO', stations)
    dispatch('loadList')
  },

  setFilterStationsRoadsFrom({
    commit,
    dispatch
  }, roads) {
    commit('SET_FILTER_STATIONS_ROADS_FROM', roads)
    dispatch('loadList')
  },

  setFilterStationsRoadsTo({
    commit,
    dispatch
  }, roads) {
    commit('SET_FILTER_STATIONS_ROADS_TO', roads)
    dispatch('loadList')
  },

  setFilterStatuses({
    commit,
    dispatch
  }, statuses) {
    commit('SET_FILTER_STATUSES', statuses)
    dispatch('loadList')
  },

  setFilterAuthor({
    commit,
    dispatch
  }, author) {
    commit('SET_FILTER_AUTHOR', author)
    dispatch('loadList')
  },

  setFilterCompanies({
    commit,
    dispatch
  }, companies) {
    commit('SET_FILTER_COMPANIES', companies)
    dispatch('loadList')
  },

  clearFilters({
    commit,
    dispatch
  }) {
    commit('CLEAR_FILTERS')
    dispatch('loadList')
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
