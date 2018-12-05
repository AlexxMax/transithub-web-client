import _uniqby from 'lodash.uniqby'

import { showErrorMessage } from '@/utils/messages'
import { getOppositeStatusId } from '@/utils/railway-aggregations'

export const state = () => ({
  item: {},
  subordinateList: [],
  list: [],
  count: 0,
  loading: false
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
  }
}

export const mutations = {
  RESET(state) {
    state.list = []
    state.count = 0
    state.loading = false
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
      } = await this.$api.railway.getRailwayAggregationRequests()

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
  }
}
