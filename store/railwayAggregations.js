import _orderBy from 'lodash.orderby'
import _uniq from 'lodash.uniq'
import _pull from 'lodash.pull'

import { showErrorMessage } from '@/utils/messages'
import { SORTING_DIRECTION } from '../utils/sorting'
import { PAGE_SIZE, OFFSET, LIST_SORTING_DIRECTION } from '@/utils/defaultValues'

export const state = () => ({
  item: {},
  list: [],
  count: 0,
  loading: false,
  filters: {
    set: {
      goods: [],
      railwayAffilations: [],
      railwayStationsFrom: [],
      railwayStationsTo: []
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
      stationTo: 'stationToName',
    }

    const groups = rootState.userSettings.railwayAggregations.list.groups.filter(item => item.use)
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
  listFiltersSet(state) {
    const {
      goods,
      railwayAffilations,
      railwayStationsFrom,
      railwayStationsTo
    } = state.filters.set

    return goods.length > 0
      || railwayAffilations.length > 0
      || railwayStationsFrom.length > 0
      || railwayStationsTo.length > 0
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
      railwayStationsTo: []
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

  CLEAR_FILTERS(state) {
    const filters = {
      goods: [],
      railwayAffilations: [],
      railwayStationsFrom: [],
      railwayStationsTo: []
    }
    state.filters.set = { ...state.filters.set, ...filters}
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
        commit('SET_LIST', [ item, ...state.list ])
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
      sortCols.push('periodFrom')
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

  clearFilters({
    commit,
    dispatch
  }) {
    commit('CLEAR_FILTERS')
    dispatch('loadList')
  }
}
