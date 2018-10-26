import _orderBy from 'lodash.orderby'
import _uniq from 'lodash.uniq'
import _pull from 'lodash.pull'

import { PAGE_SIZE, OFFSET, LIST_SORTING_DIRECTION } from '@/utils/defaultValues'
import { SORTING_DIRECTION } from '../utils/sorting'
import { showErrorMessage } from '@/utils/messages'

export const state = () => ({
  item: {},
  list: [],
  count: 0,
  subordinateList: [],
  search: null,
  filters: {
    data: {
      drivers: [],
      vehicles: [],
      trailers: [],
      statuses: []
    },
    set: {
      requestGuid: null,
      periodFrom: null,
      periodTo: null,
      drivers: [],
      vehicles: [],
      trailers: [],
      phone: null,
      statuses: []
    }
  },
  sorting: {
    date: LIST_SORTING_DIRECTION
  },
  limit: PAGE_SIZE,
  offset: OFFSET,
  loading: true
})

export const getters = {
  getVehicleRegister: state => {
    return { ...state.item, status: state.item.status || {} }
  },
  listFiltersSet(state) {
    const { periodFrom, periodTo, drivers, vehicles, trailers, phone, statuses } = state.filters.set
    return !!periodFrom ||
      !!periodTo ||
      drivers.length > 0 ||
      vehicles.length > 0 ||
      trailers.length > 0 ||
      !!phone ||
      statuses.length > 0
  },
  subordinateListFiltersSet(state) {
    const { periodFrom, periodTo, drivers, vehicles, trailers, phone, statuses } = state.filters.set
    return !!periodFrom ||
      !!periodTo ||
      drivers.length > 0 ||
      vehicles.length > 0 ||
      trailers.length > 0 ||
      !!phone ||
      statuses.length > 0
  },
  groupedList(state, getters, rootState) {
    const GROUPS = {
      request: 'requestNumber',
      date: 'periodFrom',
      driver: 'driverFullname',
      vehicle: 'vehicleNumber',
      pointFrom: 'pointFromName',
      pointTo: 'pointToName'
    }

    const groups = rootState.userSettings.vehiclesRegisters.list.groups.filter(item => item.use)
    const list = state.list.map((item) => ({ ...item }))
    const _groups = []

    list.forEach(item => {
      item._group = ''
      groups.forEach(group => {
        const key = GROUPS[group.name]
        if (key && item[key]) {
          item._group = (item._group === '' ? item._group : item._group + ', ') + item[key]
        }
      })
      const _group = _groups.find(_group => _group.group === item._group)
      if (_group) {
        _group.items.push(item)
      } else {
        _groups.push({
          group: item._group,
          items: [ item ]
        })
      }
    })

    return _groups
  },
  getVehicleRegisterFromList: state => guid => {
    return state.list.find(item => item.guid === guid) || {}
  },
  getSubordinateList: state => request => {
    const record = state.subordinateList.find(
      item => item.request === request
    )
    if (record) {
      return record.items
    }
    return []
  },
  getRaceFromSubordinateList: (state, getters) => ({ vehicleRegister, request }) => {
    const items = getters.getSubordinateList(request)
    return items.find(item => item.guid === vehicleRegister) || { status: {} }
  }
}

export const mutations = {
  RESET(state) {
    state.list = []
    state.count = 0
    state.search = null
    state.filters.set = {
      requestGuid: null,
      periodFrom: null,
      periodTo: null,
      drivers: [],
      vehicles: [],
      trailers: [],
      phone: null,
      statuses: []
    }
    state.limit = PAGE_SIZE
    state.offset = OFFSET
  },
  SET_ITEM(state, item) {
    state.item = item
  },
  SET_LIST(state, list) {
    state.list = list
  },
  SET_COUNT(state, count) {
    state.count = count
  },
  SET_SEARCH(state, value) {
    state.search = value
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
  CLEAR_FILTERS_SUBORDINATE(state) {
    const filters = {
      periodFrom: null,
      periodTo: null,
      drivers: [],
      vehicles: [],
      trailers: [],
      phone: null,
      statuses: []
    }
    state.filters.set = { ...state.filters.set, ...filters}
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
      drivers: [],
      vehicles: [],
      trailers: [],
      statuses: []
    }
  },
  UPDATE_FILTERS_DATA(state, data) {
    state.filters.data = { ...state.filters.data, ...data }
  },
  CLEAR_SUBORDINATE_LIST(state, request) {
    const record = state.subordinateList.find(
      item => item.request === request
    )
    if (record) {
      record.items = []
    }
  },
  UPDATE_SUBORDINATE_LIST(state, { request, items }) {
    const record = state.subordinateList.find(
      item => item.request === request
    )
    if (record) {
      record.items = [ ...items ]
    } else {
      state.subordinateList.push({
        request,
        items: [ ...items ]
      })
    }
  }
}

export const actions = {
  async load({
    state,
    commit,
    dispatch
  }) {
    commit('SET_LOADING', true)

    try {
      const { count, items } = await this.$api.vehiclesRegisters.getVehiclesRegisters(
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

  async loadElement({
    commit
  }, guid) {
    commit('SET_LOADING', true)
    try {
      const {
        status,
        item
      } = await this.$api.vehiclesRegisters.getVehicleRegister(guid)

      if (status){
        commit('SET_ITEM', item)
      }
      commit('SET_LOADING', false)
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  sortList({
    state,
    commit
  }) {
    const sortCols = []
    const sortDirs = []
    if (state.sorting.date != SORTING_DIRECTION.disabled) {
      sortCols.push('periodFrom')
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

  setSearch({
    commit,
    dispatch
  }, value) {
    commit('SET_SEARCH', value)
    dispatch('load')
  },

  setFilterPeriod({
    commit,
    dispatch
  }, period) {
    if (period === null) {
      commit('SET_FILTER_PERIOD_FROM', null)
      commit('SET_FILTER_PERIOD_TO', null)
    } else {
      commit('SET_FILTER_PERIOD_FROM', period[0])
      commit('SET_FILTER_PERIOD_TO', period[1])
    }
    dispatch('load')
  },

  setFilterPhone({
    commit,
    dispatch
  }, phone) {
    commit('SET_FILTER_PHONE', phone)
    dispatch('load')
  },

  setFilterStatuses({
    commit,
    dispatch
  }, statuses) {
    commit('SET_FILTER_STATUSES', statuses)
    dispatch('load')
  },

  setFilterDrivers({
    commit,
    dispatch
  }, drivers) {
    commit('SET_FILTER_DRIVERS', drivers)
    dispatch('load')
  },

  setFilterVehicles({
    commit,
    dispatch
  }, vehicles) {
    commit('SET_FILTER_VEHICLES', vehicles)
    dispatch('load')
  },

  setFilterTrailers({
    commit,
    dispatch
  }, trailers) {
    commit('SET_FILTER_TRAILERS', trailers)
    dispatch('load')
  },

  clearFiltersSubordinate({
    commit,
    dispatch
  }) {
    commit('CLEAR_FILTERS_SUBORDINATE')
    dispatch('load')
  },

  async fetchFiltersData({
    commit
  }) {
    const fetchDrivers = async () => {
      const { status, items } = await this.$api.vehiclesRegisters.filterDrivers({ requestGuid: this.request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }
    const fetchVehicles = async () => {
      const { status, items } = await this.$api.vehiclesRegisters.filterVehicles({ requestGuid: this.request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }
    const fetchTrailers = async () => {
      const { status, items } = await this.$api.vehiclesRegisters.filterTrailers({ requestGuid: this.request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    }

    const [ drivers, vehicles, trailers ] = await Promise.all([
      fetchDrivers(),
      fetchVehicles(),
      fetchTrailers()
    ])

    commit('UPDATE_FILTERS_DATA', { drivers, vehicles, trailers })
  },
  async fetchSubordinateRaces({
    commit
  }, requestGuid = null) {
    commit('CLEAR_SUBORDINATE_LIST', requestGuid)
    try {
      const {
        status,
        items
      } = await this.$api.vehiclesRegisters.getVehiclesRegisters(
        null,
        null,
        null,
        { requestGuid }
      )

      if (status) {
        commit('UPDATE_SUBORDINATE_LIST', {
          request: requestGuid,
          items
        })
      }
    } catch (error) {
      showErrorMessage(error.message)
    }
  }
}
