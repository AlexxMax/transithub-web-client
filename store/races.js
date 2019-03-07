import _orderBy from 'lodash.orderby'
import _uniq from 'lodash.uniq'
import _pull from 'lodash.pull'

import { PAGE_SIZE, OFFSET, LIST_SORTING_DIRECTION } from '@/utils/defaultValues'
import { SORTING_DIRECTION } from '../utils/sorting'
import { showErrorMessage } from '@/utils/messages'
import { getGroupedList, filtersSet } from '@/utils/storeCommon'

const filtersInit = Object.freeze({
  requestGuid: null,
  periodFrom: null,
  periodTo: null,
  phone: null,
  statuses: [],
  drivers: [],
  vehicles: [],
  trailers: []
})

const FILTERS_SAVED_TABLE_NAME = 'auto-races'

export const state = () => ({
  item: {},
  list: [],
  count: 0,
  subordinateList: [],
  filters: {
    dataFetched: false,
    data: {
      // numbers: [],
      drivers: [],
      vehicles: [],
      trailers: [],
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
    date: LIST_SORTING_DIRECTION
  },
  search: null,
  limit: PAGE_SIZE,
  offset: OFFSET,
  loading: true
})

export const getters = {
  getRace: state => {
    return { ...state.item, status: state.item.status || {} }
  },
  listFiltersSet(state) {
    return filtersSet(state.filters.set)
  },
  groupedList(state, getters, rootState) {
    const GROUPS = {
      request: 'requestNumber',
      vehicleRegister: 'vehicleRegisterName',
      date: 'date',
      driver: 'driverFullname',
      vehicle: 'vehicleNumber',
      pointFrom: 'pointFromName',
      pointTo: 'pointToName',
      pointFromRegion: 'pointFromRegion',
      pointToRegion: 'pointToRegion',
      lastEvent: 'lastEvent'
    }

    return getGroupedList(state.list, rootState.userSettings.races.list.groups, GROUPS)
  },
  getRaceFromList: state => guid => {
    return state.list.find(item => item.guid === guid) || {}
  },
  getSubordinateList: state => ({ request = null, vehicleRegister = null }) => {
    const record = state.subordinateList.find(
      item => item.request === request && item.vehicleRegister === vehicleRegister
    )
    if (record) {
      return record.items
    }
    return []
  },
  getRaceFromSubordinateList: (state, getters) => ({ race, request = null, vehicleRegister = null }) => {
    const items = getters.getSubordinateList({ request, vehicleRegister })
    return items.find(item => item.guid === race) || { status: {} }
  }
}

export const mutations = {
  RESET(state) {
    state.list = []
    state.count = 0
    state.search = null
    // state.filters.set = {
    //   requestGuid: null,
    //   periodFrom: null,
    //   periodTo: null,
    //   phone: null,
    //   statuses: [],
    //   // numbers: [],
    //   drivers: [],
    //   vehicles: [],
    //   trailers: []
    // }
    state.limit = PAGE_SIZE
    state.offset = OFFSET
  },
  SET_ITEM(state, item) {
    state.item = item
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
  SET_COUNT(state, count) {
    state.count = count
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
  SET_FILTER_REQUEST_GUID(state, requestGuid) {
    state.filters.set.requestGuid = requestGuid
  },
  SET_FILTER_PERIOD_FROM(state, periodFrom) {
    state.filters.set.periodFrom = periodFrom
  },
  SET_FILTER_PERIOD_TO(state, periodTo) {
    state.filters.set.periodTo = periodTo
  },
  SET_FILTER_PHONE(state, phone) {
    state.filters.set.phone = phone
  },
  // SET_FILTER_NUMBERS(state, numbers) {
  //   state.filters.set.numbers = numbers
  // },
  SET_FILTER_STATUSES(state, statuses) {
    state.filters.set.statuses = statuses
  },
  SET_FILTER_DRIVERS(state, drivers) {
    state.filters.set.drivers = drivers
  },
  SET_FILTER_VEHICLES(state, vehicles) {
    state.filters.set.vehicles = vehicles
  },
  SET_FILTER_TRAILERS(state, trailers) {
    state.filters.set.trailers = trailers
  },
  CLEAR_FILTERS(state) {
    state.filters.set = { ...state.filters.set, ...filtersInit}
  },
  CLEAR_FILTERS_SUBORDINATE(state) {
    state.filters.set = { ...state.filters.set, ...filtersInit}
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
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  CLEAR_FILTERS_DATA(state) {
    state.filters.data = {
      // numbers: [],
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
  CLEAR_SUBORDINATE_LIST(state, { request, vehicleRegister }) {
    const record = state.subordinateList.find(
      item => item.request === request && item.vehicleRegister === vehicleRegister
    )
    if (record) {
      record.items = []
    }
  },
  UPDATE_SUBORDINATE_LIST(state, { request, vehicleRegister, items }) {
    const record = state.subordinateList.find(
      item => item.request === request && item.vehicleRegister === vehicleRegister
    )
    if (record) {
      record.items = [ ...items ]
    } else {
      state.subordinateList.push({
        request,
        vehicleRegister,
        items: [ ...items ]
      })
    }
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
  async load({
    state,
    commit,
    dispatch
  }) {
    commit('SET_LIMIT', PAGE_SIZE)
    commit('SET_OFFSET', OFFSET)
    commit('SET_LOADING', true)

    try {
      const { count, items } = await this.$api.races.getRaces(
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
    commit('SET_LOADING', true)

    try {
      const { count, items } = await this.$api.races.getRaces(
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
      } = await this.$api.races.getRace(guid)

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
    this.$cookies.automobileRaces.setFilters(state.filters.set)
  },

  setFilterPhone({
    commit,
    dispatch,
    state
  }, phone) {
    commit('SET_FILTER_PHONE', phone)
    dispatch('load')
    this.$cookies.automobileRaces.setFilters(state.filters.set)
  },

  // setFilterNumbers({
  //   commit,
  //   dispatch
  // }, numbers) {
  //   commit('SET_FILTER_NUMBERS', numbers)
  //   dispatch('load')
  // },

  setFilterStatuses({
    commit,
    dispatch,
    state
  }, statuses) {
    commit('SET_FILTER_STATUSES', statuses)
    dispatch('load')
    this.$cookies.automobileRaces.setFilters(state.filters.set)
  },

  setFilterDrivers({
    commit,
    dispatch,
    state
  }, drivers) {
    commit('SET_FILTER_DRIVERS', drivers)
    dispatch('load')
    this.$cookies.automobileRaces.setFilters(state.filters.set)
  },

  setFilterVehicles({
    commit,
    dispatch,
    state
  }, vehicles) {
    commit('SET_FILTER_VEHICLES', vehicles)
    dispatch('load')
    this.$cookies.automobileRaces.setFilters(state.filters.set)
  },

  setFilterTrailers({
    commit,
    dispatch,
    state
  }, trailers) {
    commit('SET_FILTER_TRAILERS', trailers)
    dispatch('load')
    this.$cookies.automobileRaces.setFilters(state.filters.set)
  },

  async setFilters({
    commit,
    dispatch,
    state
  }, filters) {
    commit('SET_FILTERS', filters)
    await dispatch('load')
    this.$cookies.automobileRaces.setFilters(state.filters.set)
  },

  clearFilters({
    commit,
    dispatch,
    state
  }) {
    commit('CLEAR_FILTERS')
    dispatch('load')
    this.$cookies.automobileRaces.setFilters(state.filters.set)
  },

  clearFiltersSubordinate({
    commit,
    dispatch
  }) {
    commit('CLEAR_FILTERS_SUBORDINATE')
    dispatch('load')
  },

  sortList({
    state,
    commit
  }) {
    const sortCols = []
    const sortDirs = []
    if (state.sorting.date != SORTING_DIRECTION.disabled) {
      sortCols.push('date')
      sortDirs.push(state.sorting.date)
    }
    if (sortCols.length != 0) {
      commit('SET_LIST', _orderBy(state.list, sortCols, sortDirs))
    }
  },

  setSortingDate({
    commit,
    dispatch
  }, direction) {
    commit('SET_SORTING_DATE', direction)
    dispatch('sortList')
  },

  async fetchFiltersData({
    commit
  }, request = null) {
    commit('SET_FILTERS_DATA_FETCHED', false)

    // const fetchNumbers = async () => {
    //   const { status, items } = await this.$api.races.filterNumbers({ requestGuid: request })
    //   return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    // }
    const fetchDrivers = async () => {
      const { status, items } = await this.$api.races.filterDrivers({ requestGuid: request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }
    const fetchVehicles = async () => {
      const { status, items } = await this.$api.races.filterVehicles({ requestGuid: request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }
    const fetchTrailers = async () => {
      const { status, items } = await this.$api.races.filterTrailers({ requestGuid: request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }

    const [ /*numbers,*/ drivers, vehicles, trailers ] = await Promise.all([
      // fetchNumbers(),
      fetchDrivers(),
      fetchVehicles(),
      fetchTrailers()
    ])

    commit('UPDATE_FILTERS_DATA', { /*numbers,*/ drivers, vehicles, trailers })
    commit('SET_FILTERS_DATA_FETCHED', true)
  },

  async fetchSubordinateRaces({
    commit
  }, {
    requestGuid = null,
    vehicleRegisterGuid = null
  }) {
    commit('CLEAR_SUBORDINATE_LIST', { request: requestGuid, vehicleRegister: vehicleRegisterGuid })
    try {
      const {
        status,
        items
      } = await this.$api.races.getRaces(
        null,
        null,
        null,
        { requestGuid, vehicleRegisterGuid }
      )

      if (status) {
        commit('UPDATE_SUBORDINATE_LIST', {
          request: requestGuid,
          vehicleRegister: vehicleRegisterGuid,
          items
        })
      }
    } catch (error) {
      showErrorMessage(error.message)
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
