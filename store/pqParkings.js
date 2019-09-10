import _ from 'lodash'

import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { MUTATIONS_KEYS, ACTIONS_KEYS, EDIT_DIALOG_TYPES, GETTERS_KEYS } from '@/utils/pq.parkings'
import * as notify from '@/utils/notifications'

export const state = () => ({
  list: [],
  count: 0,
  loading: false,
  limit: PAGE_SIZE,
  offset: OFFSET,
  item: {},

  editing: {
    type: EDIT_DIALOG_TYPES.CREATE,
    showEditDialog: false,
    showInaccessibleFunctionalityDialog: false
  },

  loadingBind: false,

  notSubordinate: {
    list: null,
    count: 0,
    loading: false,
    dialog: false,

    limit: 10000,
    offset: 0,
  },

  subordinate: {
    list: null,
    count: 0,
    loading: false,
    visible: false,

    limit: 10000,
    offset: 0,

    warehouse: null
  }
})

export const mutations = {
  [MUTATIONS_KEYS.SET_LIST](state, list) {
    state.list = list
  },

  [MUTATIONS_KEYS.SET_COUNT](state, count) {
    state.count = count
  },

  [MUTATIONS_KEYS.SET_LOADING](state, loading) {
    state.loading = loading
  },

  [MUTATIONS_KEYS.SET_OFFSET](state, offset) {
    state.offset = offset
  },

  [MUTATIONS_KEYS.SET_ITEM](state, item) {
    state.item = item
  },

  [MUTATIONS_KEYS.CLEAR_LIST](state) {
    state.list = []
  },

  [MUTATIONS_KEYS.APPEND_TO_LIST](state, items) {
    state.list = [...state.list, ...items]
  },

  [MUTATIONS_KEYS.PREPEND_TO_LIST](state, item) {
    state.list = [item, ...state.list]
  },

  [MUTATIONS_KEYS.UPDATE_ITEM_IN_LIST](state, item) {
    const index = state.list.findIndex(element => element.guid === item.guid)
    if (index) {
      state.list.splice(index, 1, item)
    }
  },

  [MUTATIONS_KEYS.SET_BIND_LOADING](state, loading) {
    state.loadingBind = loading
  },

  [MUTATIONS_KEYS.SET_NOT_SUBORDINATE_LIST](state, { count, items }) {
    state.notSubordinate.list = items
    state.notSubordinate.count = count
  },

  [MUTATIONS_KEYS.APPEND_TO_NOT_SUBORDINATE_LIST](state, items) {
    state.notSubordinate.list = [...state.notSubordinate.list, ...items]
  },

  [MUTATIONS_KEYS.PREPEND_TO_NOT_SUBORDINATE_LIST](state, items) {
    state.notSubordinate.list = [...items, ...state.notSubordinate.list]
  },

  [MUTATIONS_KEYS.SET_NOT_SUBORDINATE_LOADING](state, loading) {
    state.notSubordinate.loading = loading
  },

  [MUTATIONS_KEYS.SET_NOT_SUBORDINATE_DIALOG](state, dialog) {
    state.notSubordinate.dialog = dialog
  },

  [MUTATIONS_KEYS.SET_NOT_SUBORDINATE_OFFSET](state, offset) {
    state.notSubordinate.offset = offset
  },

  [MUTATIONS_KEYS.SET_SUBORDINATE_LIST](state, { count, items }) {
    state.subordinate.list = items
    state.subordinate.count = count
  },

  [MUTATIONS_KEYS.PREPEND_TO_SUBORDINATE_LIST](state, items) {
    state.subordinate.list = [...items, ...state.subordinate.list]
  },

  [MUTATIONS_KEYS.APPEND_TO_SUBORDINATE_LIST](state, items) {
    state.subordinate.list = [...state.subordinate.list, ...items]
  },

  [MUTATIONS_KEYS.SET_SUBORDINATE_WAREHOUSE](state, warehouse) {
    state.subordinate.warehouse = warehouse
  },

  [MUTATIONS_KEYS.SET_SUBORDINATE_LOADING](state, loading) {
    state.subordinate.loading = loading
  },

  [MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE](state, visible) {
    state.subordinate.visible = visible

    if (!visible) {
      state.subordinate.warehouses = null
      state.subordinate.list = null
      state.subordinate.count = 0
    }
  },

  [MUTATIONS_KEYS.SET_SUBORDINATE_OFFSET](state, offset) {
    state.subordinate.offset = offset
  },

  [MUTATIONS_KEYS.SHOW_EDIT_DIALOG](state, show) {
    state.editing.showEditDialog = show
  },

  [MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE](state, type) {
    state.editing.type = type
  },

  [MUTATIONS_KEYS.SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY](state, value) {
    state.editing.showInaccessibleFunctionalityDialog = value
  }
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({ commit, state }, companyGuid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    try {
      const { status, count, items } = await this.$api.parkingQueueParkings.getParkings(
        state.limit,
        state.offset,
        companyGuid
      )
      if (status) {
        if (state.offset === 0) {
          commit(MUTATIONS_KEYS.SET_LIST, items)
        } else {
          commit(MUTATIONS_KEYS.APPEND_TO_LIST, items)
        }
        commit(MUTATIONS_KEYS.SET_COUNT, count)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.FETCH_ITEM]({ commit }, { companyGuid, parkingGuid }) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    try {
      const { status, item } = await this.$api.parkingQueueParkings.getParking(
        companyGuid,
        parkingGuid,
      )
      if (status) {
        commit(MUTATIONS_KEYS.SET_ITEM, item)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.CREATE_ITEM]({ commit, dispatch, state }, payload) {
    let errorKey

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, err, item } = await this.$api.parkingQueueParkings.createParking(payload)
      if (status) {

        commit(MUTATIONS_KEYS.PREPEND_TO_LIST, item)
        commit(MUTATIONS_KEYS.SET_COUNT, state.count + 1)

        // await dispatch(ACTIONS_KEYS.FETCH_SUBORDINATE_LIST)// dispatch(ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST)

      } else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)

    return errorKey
  },

  async [ACTIONS_KEYS.CHANGE_ITEM]({ commit, state }, { payload, guid }) {
    let errorKey

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, err, item } = await this.$api.parkingQueueParkings.changeParking(guid, payload)
      if (status) {
        commit(MUTATIONS_KEYS.UPDATE_ITEM_IN_LIST, item)
        commit(MUTATIONS_KEYS.SET_ITEM, item)

        commit(MUTATIONS_KEYS.SET_SUBORDINATE_OFFSET, 0)
        // dispatch(ACTIONS_KEYS.FETCH_SUBORDINATE_LIST, {
        //   warehouseName: item.warehouseName,
        //   warehouseGuid: item.warehouseGuid
        // })
      } else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)

    return errorKey
  },

  async [ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST]({ commit, state }) {

    commit(MUTATIONS_KEYS.SET_NOT_SUBORDINATE_LOADING, true)

    try {
      const { status, count, items } = await this.$api.parkingQueueParkings.getParkings(
        state.notSubordinate.limit,
        state.notSubordinate.offset
      )

      if (status) {

        const diff = _.differenceBy(items, state.subordinate.list, 'guid')
        const diffCount = count - (state.subordinate.list ? state.subordinate.list.length : 0)

        if (state.notSubordinate.offset === 0)
          commit(MUTATIONS_KEYS.SET_NOT_SUBORDINATE_LIST, { count: diffCount, items: diff })
        else
          commit(MUTATIONS_KEYS.APPEND_TO_NOT_SUBORDINATE_LIST, items)

      }

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_NOT_SUBORDINATE_LOADING, false)
  },

  async [ACTIONS_KEYS.BIND_PARKING_TO_WAREHOUSE]({ commit, state, dispatch }, parkingGuid) {

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {

      const status = await this.$api.parkingQueueParkings.bindParkingToWarehouse(parkingGuid)

      if (status) {
        await commit(MUTATIONS_KEYS.SET_SUBORDINATE_OFFSET, 0)
        await commit(MUTATIONS_KEYS.SET_NOT_SUBORDINATE_OFFSET, 0)
        await dispatch(ACTIONS_KEYS.FETCH_SUBORDINATE_LIST)
        dispatch(ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST)
      }

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, false)

  },

  async [ACTIONS_KEYS.UNBIND_PARKING_TO_WAREHOUSE]({ commit, state, dispatch }, parkingGuid) {

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {

      const status = await this.$api.parkingQueueParkings.unbindParkingToWarehouse(parkingGuid)

      if (status) {
        await commit(MUTATIONS_KEYS.SET_SUBORDINATE_OFFSET, 0)
        await commit(MUTATIONS_KEYS.SET_NOT_SUBORDINATE_OFFSET, 0)
        await dispatch(ACTIONS_KEYS.FETCH_SUBORDINATE_LIST)
        dispatch(ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST)
      }

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, false)

  },

  async [ACTIONS_KEYS.FETCH_SUBORDINATE_LIST]({ commit, state }) {

    commit(MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE, true)
    commit(MUTATIONS_KEYS.SET_SUBORDINATE_LOADING, true)

    try {
      const { status, count, items } = await this.$api.parkingQueueParkings.getParkingsByWarehouse(
        state.subordinate.limit,
        state.subordinate.offset,
        state.subordinate.warehouse.guid,
      )

      if (status) {

        if (state.subordinate.offset === 0)
          commit(MUTATIONS_KEYS.SET_SUBORDINATE_LIST, { count, items })
        else
          commit(MUTATIONS_KEYS.APPEND_TO_SUBORDINATE_LIST, items)

      }

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_SUBORDINATE_LOADING, false)

  },

  [ACTIONS_KEYS.SHOW_EDIT_DIALOG]({ commit }, { show, type }) {
    commit(MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE, type)
    commit(MUTATIONS_KEYS.SHOW_EDIT_DIALOG, show)
  }
}
