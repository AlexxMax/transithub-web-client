import _orderBy from 'lodash.orderby'

import { PAGE_SIZE, OFFSET, LIST_SORTING_DIRECTION } from '@/utils/defaultValues'
import { showErrorMessage } from '@/utils/messages'
import { SORTING_DIRECTION } from '../utils/sorting'

export const state = () => ({
  item: {},
  list: [],
  count: 0,
  search: null,
  filters: {
    numbers: [],
    periodFrom: null,
    periodTo: null,
    clients: [],
    goods: [],
    pointsFrom: [],
    pointsTo: [],
    statuses: []
  },
  sorting: {
    number: LIST_SORTING_DIRECTION,
    date: LIST_SORTING_DIRECTION
  },
  limit: PAGE_SIZE,
  offset: OFFSET,
  itemQuantityHistory: [],
  loading: true
})

export const getters = {
  getBreadcrumb: state => guid => {
    const request = state.list.find(elem => elem.guid === guid)
    return request ? request.number : ''
  },
  getRequest: state => {
    return { ...state.item }
  }
}

export const mutations = {
  CLEAR(state) {
    state.list = []
  },
  SET_LIST(state, list) {
    state.list = list
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
  SET_FILTER_NUMBERS(state, value) {
    state.filters.numbers = value
  },
  SET_FILTER_PERIOD_FROM(state, value) {
    state.filters.periodFrom = value
  },
  SET_FILTER_PERIOD_TO(state, value) {
    state.filters.periodTo = value
  },
  SET_FILTER_CLIENT(state, value) {
    state.filters.clients = value
  },
  SET_FILTER_GOODS(state, value) {
    state.filters.goods = value
  },
  SET_FILTER_POINTS_FROM(state, value) {
    state.filters.pointsFrom = value
  },
  SET_FILTER_POINTS_TO(state, value) {
    state.filters.pointsTo = value
  },
  SET_FILTER_STATUSES(state, value) {
    state.filters.statuses = value
  },
  SET_SORTING_NUMBER(state, value) {
    state.sorting.number = value
  },
  SET_SORTING_DATE(state, value) {
    state.sorting.date = value
  },
  CLEAR_FILTERS(state) {
    state.filters = {
      numbers: [],
      periodFrom: null,
      periodTo: null,
      clients: [],
      goods: [],
      pointsFrom: [],
      pointsTo: [],
      statuses: []
    }
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
  }
}

export const actions = {
  async load({
    state,
    commit,
    dispatch
  }) {
    commit('CLEAR')
    commit('SET_LOADING', true)

    try {
      const { count, items } = await this.$api.requests.getRequests(state.limit, state.offset, state.search, state.filters)

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
    dispatch
  }, numbers) {
    commit('SET_FILTER_NUMBERS', numbers)
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

  setFilterClient({
    commit,
    dispatch
  }, clients) {
    commit('SET_FILTER_CLIENT', clients)
    dispatch('load')
  },

  setFilterGoods({
    commit,
    dispatch
  }, goods) {
    commit('SET_FILTER_GOODS', goods)
    dispatch('load')
  },

  setFilterPointsFrom({
    commit,
    dispatch
  }, pointsFrom) {
    commit('SET_FILTER_POINTS_FROM', pointsFrom)
    dispatch('load')
  },

  setFilterPointsTo({
    commit,
    dispatch
  }, pointsTo) {
    commit('SET_FILTER_POINTS_TO', pointsTo)
    dispatch('load')
  },

  setFilterStatuses({
    commit,
    dispatch
  }, statuses) {
    commit('SET_FILTER_STATUSES', statuses)
    dispatch('load')
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
    dispatch
  }) {
    commit('CLEAR_FILTERS')
    dispatch('load')
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
  }
}
