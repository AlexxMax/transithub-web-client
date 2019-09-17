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
    if (_.isEmpty(list))
      return []
    else if (_.isEmpty(selected))
      return list
    else if (list && selected) {

      return list.map(listItem => {

        const result = {
          code: listItem.guid,
          name: listItem.name,
          direction: {
            uploading: { status: false, guid: null },
            unloading: { status: false, guid: null },
          }
        }

        let selectedItems = selected.filter(i => i.code === listItem.guid)

        if (selectedItems.length === 1) {

          result.direction[selectedItems[0].direction].status = true
          result.direction[selectedItems[0].direction].guid = selectedItems[0].guid

        } else if (selectedItems.length === 2) {

          selectedItems.forEach(selectedItem => {

            result.direction[selectedItem.direction].status = true
            result.direction[selectedItem.direction].guid = selectedItem.guid

          })

        }

        return result

      }).sort((a, b) => a.name.localeCompare(b.name))

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

  [MUTATIONS_KEYS.CHANGE_SUBORDINATE_LIST_ITEM](state, { ...item }) {
      state.subordinate.list = item.direction ? state.subordinate.list.push(item) : state.subordinate.list.filter(i => i.guid !== item.guid)
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

  async [ACTIONS_KEYS.FETCH_SUBORDINATE_LIST]({ commit, state }, { visible = true }) {

    commit(MUTATIONS_KEYS.SET_SUBORDINATE_LOADING, true)
    commit(MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE, visible)

    try {

      const warehouseGuid = state.subordinate.warehouse.guid
      const { status, items } = await this.$api.parkingQueueWarehouses.getWarehouseGoods(warehouseGuid)

      if (status)
        commit(MUTATIONS_KEYS.SET_SUBORDINATE_LIST, items)

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_SUBORDINATE_LOADING, false)
  },

  async [ACTIONS_KEYS.BIND_GOODS_TO_WAREHOUSE]({ commit, state, dispatch }, { code, direction }) {

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {

      const warehouseGuid = state.subordinate.warehouse.guid
      const { status, item } = await this.$api.parkingQueueWarehouses.createPQWarehouseGoods(warehouseGuid, code, direction)

      if (status)
        commit(MUTATIONS_KEYS.CHANGE_SUBORDINATE_LIST_ITEM, { ...item })

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, false)
  },

  async [ACTIONS_KEYS.UNBIND_GOODS_TO_WAREHOUSE]({ commit, state, dispatch }, itemGuid) {

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {

      const { status, guid } = await this.$api.parkingQueueWarehouses.deletePQWarehouseGoods(itemGuid)

      if (status)
        commit(MUTATIONS_KEYS.CHANGE_SUBORDINATE_LIST_ITEM, { guid })

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
