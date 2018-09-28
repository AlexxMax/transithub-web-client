import _orderBy from 'lodash.orderby'

import API from '@/utils/api'
import { PAGE_SIZE, OFFSET, LIST_SORTING_DIRECTION } from '@/utils/defaultValues'
import { SORTING_DIRECTION } from '../utils/sorting'
import { showErrorMessage } from '@/utils/messages'

export const state = () => ({
  list: [],
  count: 0,
  filters: {
    requestGuid: null,
    periodFrom: null,
    periodTo: null,
    phone: null,
    statuses: [],
    numbers: [],
    drivers: [],
    vehicles: [],
    trailers: []
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
  listFiltersSet(state) {
    const { periodFrom, periodTo, numbers, drivers, vehicles, trailers, phone, statuses } = state.filters
    return !!periodFrom ||
      !!periodTo ||
      numbers.length > 0 ||
      drivers.length > 0 ||
      vehicles.length > 0 ||
      trailers.length > 0 ||
      !!phone ||
      statuses.length > 0
  },
  subordinateListFiltersSet(state) {
    const { periodFrom, periodTo, numbers, drivers, vehicles, trailers, phone, statuses } = state.filters
    return !!periodFrom ||
      !!periodTo ||
      numbers.length > 0 ||
      drivers.length > 0 ||
      vehicles.length > 0 ||
      trailers.length > 0 ||
      !!phone ||
      statuses.length > 0
  },
  groupedList(state) {
    const list = state.list
    const requests = []
    const groupedList = []

    for (const vr of list) {
      const req = requests.find(item => item.guid === vr.requestGuid)
      if (!req) {
        requests.push({
          guid: vr.requestGuid,
          number: vr.requestNumber,
          scheduleDate: vr.requestScheduleDate
        })
      }
    }

    for (const req of requests) {
      const request = {
        ...req,
        races: [],
        vehiclesRegisters: [],
        racesWithoutVehiclesRegister: []
      }
      for (const r of list) {
        if (r.requestGuid === req.guid) {
          request.races.push(r)
          if (r.vehiclesRegisterGuid) {
            const vr = (request.vehiclesRegisters.find(item => item.guid === r.vehiclesRegisterGuid))
            if (!vr) {
              request.vehiclesRegisters.push({
                guid: r.vehiclesRegisterGuid,
                dateFrom : r.vehiclesRegisterDateFrom,
                dateTo: r.vehiclesRegisterDateTo,
                races: [ r ]
              })
            } else {
              vr.races.push(r)
            }
          } else {
            request.racesWithoutVehiclesRegister.push(r)
          }
        }
      }

      groupedList.push(request)
    }

    return groupedList
  }
}

export const mutations = {
  RESET(state) {
    state.list = []
    state.count = 0
    state.search = null
    state.filters = {
      requestGuid: null,
      periodFrom: null,
      periodTo: null,
      phone: null,
      statuses: [],
      numbers: [],
      drivers: [],
      vehicles: [],
      trailers: []
    }
    state.limit = PAGE_SIZE
    state.offset = OFFSET
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
    state.filters.requestGuid = requestGuid
  },
  SET_FILTER_PERIOD_FROM(state, periodFrom) {
    state.filters.periodFrom = periodFrom
  },
  SET_FILTER_PERIOD_TO(state, periodTo) {
    state.filters.periodTo = periodTo
  },
  SET_FILTER_PHONE(state, phone) {
    state.filters.phone = phone
  },
  SET_FILTER_NUMBERS(state, numbers) {
    state.filters.numbers = numbers
  },
  SET_FILTER_STATUSES(state, statuses) {
    state.filters.statuses = statuses
  },
  SET_FILTER_DRIVERS(state, drivers) {
    state.filters.drivers = drivers
  },
  SET_FILTER_VEHICLES(state, vehicles) {
    state.filters.vehicles = vehicles
  },
  SET_FILTER_TRAILERS(state, trailers) {
    state.filters.trailers = trailers
  },
  CLEAR_FILTERS_SUBORDINATE(state) {
    const filters = {
      periodFrom: null,
      periodTo: null,
      phone: null,
      statuses: [],
      numbers: [],
      drivers: [],
      vehicles: [],
      trailers: []
    }
    state.filters = { ...state.filters, ...filters}
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
      const { count, items } = await API.races.getRaces(
        state.limit,
        state.offset,
        state.search,
        state.filters,
        this.app.context
      )

      commit('SET_LIST', items)
      commit('SET_COUNT', count)
      dispatch('sortList')
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

  setFilterNumbers({
    commit,
    dispatch
  }, numbers) {
    commit('SET_FILTER_NUMBERS', numbers)
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
}