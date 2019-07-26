import _orderBy from 'lodash.orderby'
import _uniq from 'lodash.uniq'
import _pull from 'lodash.pull'

import { PAGE_SIZE, OFFSET, LIST_SORTING_DIRECTION } from '@/utils/defaultValues'
import { showErrorMessage } from '@/utils/messages'
import { SORTING_DIRECTION } from '../utils/sorting'
import { getGroupedList, filtersSet } from '@/utils/storeCommon'
import { getVehiclesRegisterStatus, USER_STATUSES } from '@/utils/requests'
import { getStatusPresentation, DISTANCE, filtersInit } from '@/utils/requests'

const FILTERS_SAVED_TABLE_NAME = 'auto-requests'

export const state = () => ({
  item: {},

  list: [],
  limit: PAGE_SIZE,
  offset: OFFSET,
  loading: true,

  listInWork: [],
  offsetInWork: OFFSET,
  loadingInWork: true,

  listArchived: [],
  offsetArchived: OFFSET,
  loadingArchived: true,

  count: {
    new: 0,
    inWork: 0,
    archived: 0
  },

  subordinateList: [],

  search: null,
  filters: {
    dataFetched: false,
    data: {
      numbers: [],
      clients: [],
      goods: [],
      statuses: [],
      logists: [],
      regions: [],
      organisations: []
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

  itemQuantityHistory: [],

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
    state.listInWork = []
    state.listArchived = []
    state.count = { new: 0, inWork: 0, archived: 0 }
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
    state.offsetInWork = OFFSET
    state.offsetArchived = OFFSET
  },
  SET_LIST(state, list) {
    state.list = list
  },
  SET_LIST_IN_WORK(state, list) {
    state.listInWork = list
  },
  SET_LIST_ARCHIVED(state, list) {
    state.listArchived = list
  },
  APPEND_ITEMS_TO_LIST(state, items) {
    state.list = [
      ...state.list,
      ...items
    ]
  },
  APPEND_ITEMS_TO_LIST_IN_WORK(state, items) {
    state.listInWork = [
      ...state.listInWork,
      ...items
    ]
  },
  APPEND_ITEMS_TO_LIST_ARCHIVED(state, items) {
    state.listArchived = [
      ...state.listArchived,
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
  SET_FILTER_DISTANCE_FROM(state, value) {
    if (!value) {
      state.filters.set.distanceFrom = DISTANCE.FROM
      return
    }
    state.filters.set.distanceFrom = value
  },
  SET_FILTER_DISTANCE_TO(state, value) {
    if (!value) {
      state.filters.set.distanceTo = DISTANCE.TO
      return
    }
    state.filters.set.distanceTo = value
  },
  SET_FILTER_CLIENT(state, value) {
    state.filters.set.clients = value
  },
  SET_FILTER_LOGISTS(state, value) {
    state.filters.set.logists = value
  },
  SET_FILTER_REGIONS_FROM(state, value) {
    state.filters.set.regionsFrom = value
  },
  SET_FILTER_REGIONS_TO(state, value) {
    state.filters.set.regionsTo = value
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
  SET_FILTER_NO_VEHICLES_REGISTERS(state, value) {
    state.filters.set.noVehiclesRegisters = value
  },
  SET_FILTER_ORGANISATIONS(state, value) {
    state.filters.set.organisations = value
  },
  SET_FILTER_VEHICLES_REGISTERS_STATUS(state, value) {
    state.filters.set.vehiclesRegistersStatuses = value
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
      statuses: [],
      logists: [],
      regions: [],
      organisations: []
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
  SET_OFFSET_IN_WORK(state, value) {
    state.offsetInWork = value
  },
  SET_LOADING_IN_WORK(state, value) {
    state.loadingInWork = value
  },
  SET_OFFSET_ARCHIVED(state, value) {
    state.offsetArchived = value
  },
  SET_LOADING_ARCHIVED(state, value) {
    state.loadingArchived = value
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
    const f = function(array) {
      const item = array.find(item => item.guid === guid)
      if (item) {
        item.vehiclesRegisterStatus = getVehiclesRegisterStatus(requestVehiclesRegisterStatus)
      }
    }

    f(state.list)
    f(state.listInWork)
    f(state.listArchived)
  },

  SET_USER_STATUS(state, { guid, userStatus }) {
    const f = function(array) {
      const item = array.find(item => item.guid === guid)
      if (item) {
        item.userStatus = userStatus
        item.status = getStatusPresentation(userStatus)
      }
    }

    f(state.list)
    f(state.listInWork)

    if (state.item.guid === guid) {
      state.item.userStatus = userStatus
      state.item.status = getStatusPresentation(userStatus)
    }
  }
}

export const actions = {
  async load({
    state,
    commit
  }) {
    commit('SET_LIMIT', PAGE_SIZE)
    commit('SET_OFFSET', OFFSET)
    commit('SET_LOADING', true)

    try {
      const { count, items } = await this.$api.requests.getRequests(
        state.limit,
        state.offset,
        state.search,
        state.filters.set,
        USER_STATUSES.NEW
      )

      commit('SET_LIST', items)
      commit('SET_COUNT', count)
      commit('SET_LOADING', false)
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async loadInWork({
    state,
    commit
  }) {
    commit('SET_OFFSET_IN_WORK', OFFSET)
    commit('SET_LOADING_IN_WORK', true)

    try {
      const { count, items } = await this.$api.requests.getRequests(
        state.limit,
        state.offsetInWork,
        state.search,
        state.filters.set,
        USER_STATUSES.IN_WORK
      )

      commit('SET_LIST_IN_WORK', items)
      commit('SET_COUNT', count)
      // dispatch('sortList')
      commit('SET_LOADING_IN_WORK', false)
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async loadArchived({
    state,
    commit
  }) {
    commit('SET_OFFSET_ARCHIVED', OFFSET)
    commit('SET_LOADING_ARCHIVED', true)

    try {
      const { count, items } = await this.$api.requests.getRequests(
        state.limit,
        state.offsetArchived,
        state.search,
        state.filters.set,
        USER_STATUSES.ARCHIVED
      )

      commit('SET_LIST_ARCHIVED', items)
      commit('SET_COUNT', count)
      commit('SET_LOADING_ARCHIVED', false)
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async loadMore({
    state,
    commit
  }, userStatus) {
    if (userStatus === USER_STATUSES.NEW) {
      commit('SET_LOADING', true)
    } else if (userStatus === USER_STATUSES.IN_WORK) {
      commit('SET_LOADING_IN_WORK', true)
    } else if (userStatus === USER_STATUSES.ARCHIVED) {
      commit('SET_LOADING_ARCHIVED', true)
    }

    try {
      const { count, items } = await this.$api.requests.getRequests(
        state.limit,
        state.offset,
        state.search,
        state.filters.set,
        userStatus
      )

      commit('SET_COUNT', count)

      if (userStatus === USER_STATUSES.NEW) {
        commit('APPEND_ITEMS_TO_LIST', items)
        commit('SET_LOADING', false)
      } else if (userStatus === USER_STATUSES.IN_WORK) {
        commit('APPEND_ITEMS_TO_LIST_IN_WORK', items)
        commit('SET_LOADING_IN_WORK', false)
      } else if (userStatus === USER_STATUSES.ARCHIVED) {
        commit('APPEND_ITEMS_TO_LIST_ARCHIVED', items)
        commit('SET_LOADING_ARCHIVED', false)
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
    dispatch('loadInWork')
    dispatch('loadArchived')
  },

  setFilterNumber({
    commit,
    dispatch,
    state
  }, numbers) {
    commit('SET_FILTER_NUMBERS', numbers)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
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
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterClient({
    commit,
    dispatch,
    state
  }, clients) {
    commit('SET_FILTER_CLIENT', clients)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterLogists({
    commit,
    dispatch,
    state
  }, clients) {
    commit('SET_FILTER_LOGISTS', clients)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterGoods({
    commit,
    dispatch,
    state
  }, goods) {
    commit('SET_FILTER_GOODS', goods)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterPointsFrom({
    commit,
    dispatch,
    state
  }, pointsFrom) {
    commit('SET_FILTER_POINTS_FROM', pointsFrom)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterPointsTo({
    commit,
    dispatch,
    state
  }, pointsTo) {
    commit('SET_FILTER_POINTS_TO', pointsTo)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterStatuses({
    commit,
    dispatch,
    state
  }, statuses) {
    commit('SET_FILTER_STATUSES', statuses)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterRegionsFrom({
    commit,
    dispatch,
    state
  }, regions) {
    commit('SET_FILTER_REGIONS_FROM', regions)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterRegionsTo({
    commit,
    dispatch,
    state
  }, regions) {
    commit('SET_FILTER_REGIONS_TO', regions)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterDistanceFrom({
    commit,
    dispatch,
    state
  }, distance) {
    commit('SET_FILTER_DISTANCE_FROM', distance)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterDistanceTo({
    commit,
    dispatch,
    state
  }, distance) {
    commit('SET_FILTER_DISTANCE_TO', distance)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterNoVehiclesRegisters({
    commit,
    dispatch,
    state
  }, noVehiclesRegisters) {
    commit('SET_FILTER_NO_VEHICLES_REGISTERS', noVehiclesRegisters)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterOrganisations({
    commit,
    dispatch,
    state
  }, organisations) {
    commit('SET_FILTER_ORGANISATIONS', organisations)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  setFilterVehiclesRegistersStatus({
    commit,
    dispatch,
    state
  }, vehiclesRegistersStatuses) {
    commit('SET_FILTER_VEHICLES_REGISTERS_STATUS', vehiclesRegistersStatuses)
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
    this.$cookies.automobileRequests.setFilters(state.filters.set)
  },

  async clearFilters({
    commit,
    dispatch
  }) {
    commit('CLEAR_FILTERS')
    dispatch('load')
    dispatch('loadInWork')
    dispatch('loadArchived')
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

  // clearFilters({
  //   commit,
  //   dispatch,
  //   state
  // }) {
  //   commit('CLEAR_FILTERS')
  //   dispatch('load')
  //   this.$cookies.automobileRequests.setFilters(state.filters.set)
  // },

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
    commit,
    rootState
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
    const fetchLogists = async () => {
      const { status, items } = await this.$api.requests.filterLogists()
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }
    const fetchGoods = async () => {
      const { status, items } = await this.$api.requests.filterGoods()
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }
    const fetchRegions = async () => {
      const { status, items } = await this.$api.localities.getRegions()
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }
    const fetchOrganisations = async () => {
      const { status, items } = await this.$api.organisations.getOrganisations(rootState.companies.currentCompany.guid)
      const list = status ? _pull(_uniq(items.sort()), null, undefined, '') : []
      return list.map(item => ({ guid: item.guid, name: item.name }))
    }

    const [ numbers, clients, logists, goods, regions, organisations ] = await Promise.all([
      fetchNumbers(),
      fetchClients(),
      fetchLogists(),
      fetchGoods(),
      fetchRegions(),
      fetchOrganisations()
    ])

    commit('UPDATE_FILTERS_DATA', { numbers, clients, logists, goods, regions, organisations })
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
  },

  async setUserStatus({ commit }, { requestGuid, userStatus }) {
    try {
      const { status } = await this.$api.requests.setUserStatus(requestGuid, userStatus)
      if (status) {
        commit('SET_USER_STATUS', { guid: requestGuid, userStatus })
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async archiveRequest({ dispatch }, requestGuid) {
    dispatch('setUserStatus', {
      requestGuid,
      userStatus: USER_STATUSES.ARCHIVED
    })
  }
}
