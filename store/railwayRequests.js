import _uniqby from 'lodash.uniqby'

import { showErrorMessage } from '@/utils/messages'
import { getOppositeStatusId } from '@/utils/railway-aggregations'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { getGroupedList } from '@/utils/storeCommon'

export const state = () => ({
  item: {},
  subordinateList: [],
  list: [],
  count: 0,
  loading: false,
  limit: PAGE_SIZE,
  offset: OFFSET,
  search: null
  // filters: {
  //   set: {
  //     goods: [],
  //     railwayAffilations: [],
  //     railwayStationsFrom: []
  //   }
  // }
})

export const getters = {
  getRailwayRequest: state => {
    return { ...state.item, status: state.item.status || {} }
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
  groupedList(state, getters, rootState) {
    const GROUPS = {
      stationFrom: 'stationFromName'
    }

    return getGroupedList(state.list, rootState.userSettings.railwayRequests.list.groups, GROUPS)
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
    // state.filters.set = {
    //   goods: [],
    //   railwayAffilations: [],
    //   railwayStationsFrom: [],
    //   railwayStationsTo: []
    // }
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

  SET_FILTER_GOODS(state, goods) {
    state.filters.set.goods = goods
  },

  SET_FILTER_AFFILATIONS(state, affilations) {
    state.filters.set.railwayAffilations = affilations
  },

  SET_FILTER_STATIONS_FROM(state, stations) {
    state.filters.set.railwayStationsFrom = stations
  },

  // CLEAR_FILTERS(state) {
  //   const filters = {
  //     goods: [],
  //     railwayAffilations: [],
  //     railwayStationsFrom: []
  //   }
  //   state.filters.set = { ...state.filters.set, ...filters}
  // }

  SET_LIMIT(state, value) {
    state.limit = value
  },

  SET_OFFSET(state, value) {
    state.offset = value
  }
}

export const actions = {
  async loadList({
    commit,
    state
  }) {
    commit('SET_LOADING', true)

    try {
      const {
        status,
        count,
        items
      } = await this.$api.railway.getRailwayAggregationRequests(null, state.limit, state.offset)

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

  setSearch({
    commit,
    dispatch
  }, value) {
    commit('SET_SEARCH', value)
    dispatch('loadList')
  },

  // setSortingDate({
  //   commit,
  //   dispatch
  // }, direction) {
  //   commit('SET_SORTING_DATE', direction)
  //   dispatch('sortList')
  // },

  // setFilterGoods({
  //   commit,
  //   dispatch
  // }, goods) {
  //   commit('SET_FILTER_GOODS', goods)
  //   dispatch('loadList')
  // },

  // setFilterAffilations({
  //   commit,
  //   dispatch
  // }, affilations) {
  //   commit('SET_FILTER_AFFILATIONS', affilations)
  //   dispatch('loadList')
  // },

  // setFilterStationsFrom({
  //   commit,
  //   dispatch
  // }, stations) {
  //   commit('SET_FILTER_STATIONS_FROM', stations)
  //   dispatch('loadList')
  // },

  // clearFilters({
  //   commit,
  //   dispatch
  // }) {
  //   commit('CLEAR_FILTERS')
  //   dispatch('loadList')
  // }
}
