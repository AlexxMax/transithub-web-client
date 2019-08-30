import _ from 'lodash'

import { MUTATIONS_KEYS, ACTIONS_KEYS, GETTERS_KEYS } from '@/utils/goods'
import * as notify from '@/utils/notifications'

export const state = () => ({
  list: [],
  loading: false,
  fetched: false,

  loadingBind: false,

  subordinate: {
    list: null,
    loading: false,

    visible: false,
    warehouse: null
  },
})

export const getters = {
  [GETTERS_KEYS.COMBINED]: ({ list, subordinate: { list: selected } }) => {

    console.warn('TRIGGERED');

    if (_.isEmpty(list))
      return []
    else if (_.isEmpty(selected))
      return list
    else if (list && selected) {

      const selectedKeys = selected.map(item => item.guid)

      return list.reduce((result, item) => selectedKeys.includes(item.guid) ? result : result = [...result, item], selected)

    }

  }
}

export const mutations = {
  [MUTATIONS_KEYS.SET_LIST](state, list) {
    state.list = list
  },
  [MUTATIONS_KEYS.SET_LOADING](state, loading) {
    state.loading = loading
  },

  [MUTATIONS_KEYS.SET_SUBORDINATE_LIST](state, list) {
    state.subordinate.list = list
  },
  [MUTATIONS_KEYS.SET_SUBORDINATE_LOADING](state, loading) {
    state.subordinate.loading = loading
  },
  [MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE](state, visible) {
    state.subordinate.visible = visible
  },
  [MUTATIONS_KEYS.SET_SUBORDINATE_WAREHOUSE](state, warehouse) {
    state.subordinate.warehouse = warehouse
  },

  [MUTATIONS_KEYS.CHANGE_SUBORDINATE_LIST_ITEM](state, { guid, direction }) {

    const indexInList = state.list.findIndex(i => i.guid == guid)
    const isInSubordinate = state.subordinate.list.some(i => i.guid == guid)
    const indexInSubordinate = state.subordinate.list.findIndex(i => i.guid == guid)

    // Change
    if (direction && isInSubordinate)
      state.subordinate.list[indexInSubordinate].direction = direction
    // Create
    else if (direction && !isInSubordinate)
      state.subordinate.list = [...state.subordinate.list, { ...state.list[indexInList], direction }]
    // Delete
    else if (!direction)
      state.subordinate.list[indexInSubordinate].direction = undefined

  },

  [MUTATIONS_KEYS.SET_BIND_LOADING](state, loading) {
    state.loadingBind = loading
  },

  // NOTE: outdated code
  SET_LIST(state, list) {
    state.list = list
  },
  SET_LOADING(state, value) {
    state.loading = value
  },
  SET_FETCHED(state, fetched) {
    state.fetched = fetched
  }
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({ commit }) {

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {

      const { status, items } = await this.$api.goods.getGoods()

      if (status)
        commit(MUTATIONS_KEYS.SET_LIST, items)

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.FETCH_SUBORDINATE_LIST]({ commit, state }) {

    commit(MUTATIONS_KEYS.SET_SUBORDINATE_LOADING, true)
    commit(MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE, true)

    try {

      const warehouseGuid = state.subordinate.warehouse.guid
      const { status, items } = await this.$api.goods.getGoodsByWarehouse(warehouseGuid)

      if (status)
        commit(MUTATIONS_KEYS.SET_SUBORDINATE_LIST, items)

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_SUBORDINATE_LOADING, false)
  },

  async [ACTIONS_KEYS.BIND_GOODS_TO_WAREHOUSE]({ commit, state, dispatch }, payload) {

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {

      const warehouseGuid = state.subordinate.warehouse.guid
      const { status, item } = await this.$api.goods.bindGoodsToWarehouse(warehouseGuid, payload)

      if (status)
        commit(MUTATIONS_KEYS.CHANGE_SUBORDINATE_LIST_ITEM, item)
      // dispatch(ACTIONS_KEYS.FETCH_SUBORDINATE_LIST)

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, false)
  },

  async [ACTIONS_KEYS.UNBIND_GOODS_TO_WAREHOUSE]({ commit, state, dispatch }, guid) {

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {

      const warehouseGuid = state.subordinate.warehouse.guid
      const { status, item } = await this.$api.goods.unbindGoodsToWarehouse(warehouseGuid, guid)

      if (status)
        commit(MUTATIONS_KEYS.CHANGE_SUBORDINATE_LIST_ITEM, item)
      // dispatch(ACTIONS_KEYS.FETCH_SUBORDINATE_LIST)

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, false)
  },

  // NOTE: outdated code
  async load({ commit }) {
    commit('SET_LOADING', true)
    try {
      const {
        status,
        items
      } = await this.$api.goods.getGoods()

      if (status) {
        commit('SET_LIST', items)
        commit('SET_LOADING', false)
        commit('SET_FETCHED', true)
      }
    } catch ({ message }) {
      notify.error(message)
    }
  }
}