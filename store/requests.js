import _orderBy from 'lodash.orderby'
import _uniq from 'lodash.uniq'
import _pull from 'lodash.pull'

import { PAGE_SIZE, OFFSET, LIST_SORTING_DIRECTION } from '@/utils/defaultValues'
import { showErrorMessage } from '@/utils/messages'
import { SORTING_DIRECTION } from '../utils/sorting'
import { getGroupedList, filtersSet } from '@/utils/storeCommon'
import { getVehiclesRegisterStatus } from '@/utils/requests'

const filtersInit = Object.freeze({
  numbers: [],
  periodFrom: null,
  periodTo: null,
  clients: [],
  goods: [],
  pointsFrom: [],
  pointsTo: [],
  statuses: []
})

const FILTERS_SAVED_TABLE_NAME = 'auto-requests'

export const state = () => ({
  item: {},
  list: [],
  count: 0,
  subordinateList: [],
  search: null,
  filters: {
    dataFetched: false,
    data: {
      numbers: [],
      clients: [],
      goods: [],
      statuses: []
    },
    set: { ...filtersInit },
    saved: {
      list: [],
      loading: false,
      fetched: false
    }
  },
  sorting: {
    number: LIST_SORTING_DIRECTION,
    date: LIST_SORTING_DIRECTION
  },
  limit: PAGE_SIZE,
  offset: OFFSET,
  itemQuantityHistory: [],
  loading: true,

  namespaced: true
})

export const getters = {
  getBreadcrumb: state => guid => {
    const request = state.list.find(elem => elem.guid === guid)
    return request ? request.number : ''
  },
  getRequest: state => {
    return { ...state.item, status: state.item.status || {} }
  },
  listFiltersSet(state) {
    return filtersSet(state.filters.set)
  },
  groupedList(state, getters, rootState) {
    const GROUPS = {
      number: 'number',
      scheduleDate: 'scheduleDate',
      clientName: 'clientName',
      pointFrom: 'pointFromName',
      pointTo: 'pointToName',
      pointFromRegion: 'pointFromRegion',
      pointToRegion: 'pointToRegion'
    }

    return getGroupedList(state.list, rootState.userSettings.requests.list.groups, GROUPS)
  }
}

export const mutations = {
  RESET(state) {
    state.list = []
    state.count = 0
    state.search = null
    // state.filters.set = {
    //   numbers: [],
    //   periodFrom: null,
    //   periodTo: null,
    //   clients: [],
    //   goods: [],
    //   pointsFrom: [],
    //   pointsTo: [],
    //   statuses: []
    // }
    state.limit = PAGE_SIZE
    state.offset = OFFSET
  },
  CLEAR(state) {
    state.list = []
  },
  SET_LIST(state, list) {
    state.list = list
  },
  APPEND_ITEMS_TO_LIST(state, items) {
    state.list = [
      ...state.list,
      ...items
    ]
  },
  ADD(state, item) {
    state.list.push({
      ...item
    })
  },
  REMOVE(state, {
    item
  }) {
    state.list.splice(state.list.indexOf(item), 1)
  },
  SET_COUNT(state, count) {
    state.count = count
  },
  SET_ITEM(state, item) {
    state.item = item
  },
  SET_SEARCH(state, value) {
    state.search = value
  },
  SET_FILTERS(state, filters) {
		state.filters.set = {
      ...filtersInit,
      ...filters,
      periodFrom: (filters && filters.periodFrom) ? new Date(filters.periodFrom) : null,
      periodTo: (filters && filters.periodTo) ? new Date(filters.periodTo) : null
    }
  },
  SET_FILTER_NUMBERS(state, value) {
    state.filters.set.numbers = value
  },
  SET_FILTER_PERIOD_FROM(state, value) {
    state.filters.set.periodFrom = value
  },
  SET_FILTER_PERIOD_TO(state, value) {
    state.filters.set.periodTo = value
  },
  SET_FILTER_CLIENT(state, value) {
    state.filters.set.clients = value
  },
  SET_FILTER_GOODS(state, value) {
    state.filters.set.goods = value
  },
  SET_FILTER_POINTS_FROM(state, value) {
    state.filters.set.pointsFrom = value
  },
  SET_FILTER_POINTS_TO(state, value) {
    state.filters.set.pointsTo = value
  },
  SET_FILTER_STATUSES(state, value) {
    state.filters.set.statuses = value
  },
  SET_SORTING_NUMBER(state, value) {
    state.sorting.number = value
  },
  SET_SORTING_DATE(state, value) {
    state.sorting.date = value
  },
  CLEAR_FILTERS(state) {
    state.filters.set = { ...state.filters.set, ...filtersInit}
  },
  CLEAR_FILTERS_DATA(state) {
    state.filters.data = {
      drivers: [],
      vehicles: [],
      trailers: [],
      statuses: []
    }
  },
  UPDATE_FILTERS_DATA(state, data) {
    state.filters.data = { ...state.filters.data, ...data }
  },
  SET_FILTERS_DATA_FETCHED(state, dataFetched) {
    state.filters.dataFetched = dataFetched
  },
  SET_LIMIT(state, value) {
    state.limit = value
  },
  SET_OFFSET(state, value) {
    state.offset = value
  },
  SET_LOADING(state, value) {
    state.loading = value
  },
  CLEAR_ITEM_QUANTITY_HISTORY(state) {
    state.itemQuantityHistory = []
  },
  SET_ITEM_QUANTITY_HISTORY(state, history) {
    state.itemQuantityHistory = [ ...history ]
  },
  SET_FILTERS_SAVED_LIST(state, list) {
    state.filters.saved.list = list
  },

  SET_FILTERS_SAVED_LOADING(state, loading) {
    state.filters.saved.loading = loading
  },

  SET_FILTERS_SAVED_FETCHED(state, fetched) {
    state.filters.saved.fetched = fetched
  },

  SET_REQUEST_VEHICLES_REGISTER_STATUS(state, { guid, requestVehiclesRegisterStatus }) {
    const item = state.list.find(item => item.guid === guid)
    console.log("TCL: SET_REQUEST_VEHICLES_REGISTER_STATUS -> item", item)
    if (item) {
      item.vehiclesRegisterStatus = getVehiclesRegisterStatus(requestVehiclesRegisterStatus)
      console.log("TCL: SET_REQUEST_VEHICLES_REGISTER_STATUS -> item.vehiclesRegisterStatus", item.vehiclesRegisterStatus)
    }
  }
}

export const actions = {
  async load({
    state,
    commit,
    dispatch
  }) {
    commit('SET_LIMIT', PAGE_SIZE)
    commit('SET_OFFSET', OFFSET)
    commit('CLEAR')
    commit('SET_LOADING', true)

    try {
      const { count, items } = await this.$api.requests.getRequests(
        state.limit,
        state.offset,
        state.search,
        state.filters.set
      )

      commit('SET_LIST', items)
      commit('SET_COUNT', count)
      dispatch('sortList')
      commit('SET_LOADING', false)
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async loadMore({
    state,
    commit,
    dispatch
  }) {
    commit('CLEAR')
    commit('SET_LOADING', true)

    try {
      const { count, items } = await this.$api.requests.getRequests(
        state.limit,
        state.offset,
        state.search,
        state.filters.set
      )

      commit('APPEND_ITEMS_TO_LIST', items)
      commit('SET_COUNT', count)
      dispatch('sortList')
      commit('SET_LOADING', false)
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
      } = await this.$api.requests.getRequest(guid)

      if (status){
        commit('SET_ITEM', item)
      }
      commit('SET_LOADING', false)
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  setSearch({
    commit,
    dispatch
  }, value) {
    commit('SET_SEARCH', value)
    dispatch('load')
  },

  setFilterNumber({
    commit,
    dispatch,
    state
  }, numbers) {
    commit('SET_FILTER_NUMBERS', numbers)
    dispatch('load')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterPeriod({
    commit,
    dispatch,
    state
  }, period) {
    if (period === null) {
      commit('SET_FILTER_PERIOD_FROM', null)
      commit('SET_FILTER_PERIOD_TO', null)
    } else {
      commit('SET_FILTER_PERIOD_FROM', period[0])
      commit('SET_FILTER_PERIOD_TO', period[1])
    }
    dispatch('load')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterClient({
    commit,
    dispatch,
    state
  }, clients) {
    commit('SET_FILTER_CLIENT', clients)
    dispatch('load')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterGoods({
    commit,
    dispatch,
    state
  }, goods) {
    commit('SET_FILTER_GOODS', goods)
    dispatch('load')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterPointsFrom({
    commit,
    dispatch,
    state
  }, pointsFrom) {
    commit('SET_FILTER_POINTS_FROM', pointsFrom)
    dispatch('load')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterPointsTo({
    commit,
    dispatch,
    state
  }, pointsTo) {
    commit('SET_FILTER_POINTS_TO', pointsTo)
    dispatch('load')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterStatuses({
    commit,
    dispatch,
    state
  }, statuses) {
    commit('SET_FILTER_STATUSES', statuses)
    dispatch('load')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  async clearFilters({
    commit,
    dispatch
  }) {
    commit('CLEAR_FILTERS')
    await dispatch('load')
    this.$cookies.automobileRequests.unsetFilters()
  },

  setSortingNumber({
    commit,
    dispatch
  }, direction) {
    commit('SET_SORTING_NUMBER', direction)
    dispatch('sortList')
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
    if (state.sorting.number != SORTING_DIRECTION.disabled) {
      sortCols.push('number')
      sortDirs.push(state.sorting.number)
    }
    if (state.sorting.date != SORTING_DIRECTION.disabled) {
      sortCols.push('scheduleDate')
      sortDirs.push(state.sorting.date)
    }
    if (sortCols.length != 0) {
      commit('SET_LIST', _orderBy(state.list, sortCols, sortDirs))
    }
  },

  clearFilters({
    commit,
    dispatch,
    state
  }) {
    commit('CLEAR_FILTERS')
    dispatch('load')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  async loadElementQuantityHistory({
    commit
  }, guid) {
    commit('CLEAR_ITEM_QUANTITY_HISTORY')
    try {
      const {
        status,
        items
      } = await this.$api.requests.quantityHistory(guid)

      if (status) {
        commit('SET_ITEM_QUANTITY_HISTORY', items)
      }
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async fetchFiltersData({
    commit
  }) {
    commit('SET_FILTERS_DATA_FETCHED', false)

    const fetchNumbers = async () => {
      const { status, items } = await this.$api.requests.filterNumbers()
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }
    const fetchClients = async () => {
      const { status, items } = await this.$api.requests.filterClientsNames()
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }
    const fetchGoods = async () => {
      const { status, items } = await this.$api.requests.filterGoods()
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }

    const [ numbers, clients, goods ] = await Promise.all([
      fetchNumbers(),
      fetchClients(),
      fetchGoods()
    ])

    commit('UPDATE_FILTERS_DATA', { numbers, clients, goods })
    commit('SET_FILTERS_DATA_FETCHED', true)
  },

  async setFilters({
    commit,
    dispatch,
    state
  }, filters) {
    commit('SET_FILTERS', filters)
    await dispatch('load')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
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
    const values = state.filters.set

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
