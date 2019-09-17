import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { EDIT_DIALOG_TYPES, MUTATIONS_KEYS, ACTIONS_KEYS } from '@/utils/pq.warehouses'
import { WAREHOUSES_STORE_MODULE_NAME, WAREHOUSES_MUTATIONS_KEYS } from '@/utils/pq.queueProfiles'
import * as notify from '@/utils/notifications'

export const state = () => ({
  list: [],
  item: null,
  count: 0,
  loading: false,

  limit: PAGE_SIZE,
  offset: OFFSET,

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

    parking: null
  }
})

export const mutations = {
  // Main
  [MUTATIONS_KEYS.SET_LIST](state, { count, items }) {
    state.count = count
    state.list = items
  },

  [MUTATIONS_KEYS.SET_COUNT](state, count) { state.count = count },

  [MUTATIONS_KEYS.APPEND_TO_LIST](state, items) {
    state.list = [...state.list, ...items]
  },

  [MUTATIONS_KEYS.PREPEND_TO_LIST](state, items) {
    state.list = [...items, ...state.list]
  },

  [MUTATIONS_KEYS.SET_ITEM](state, item) { state.item = item },

  [MUTATIONS_KEYS.SET_ITEM_IN_LIST](state, item) {
    const index = state.list.findIndex((listItem) => item.guid === listItem.guid)
    if (index !== -1) {
      state.list.splice(index, 1, item)
    }
  },

  [MUTATIONS_KEYS.SET_LOADING](state, loading) { state.loading = loading },

  [MUTATIONS_KEYS.SET_OFFSET](state, offset) { state.offset = offset },

  // Subordinate
  [MUTATIONS_KEYS.SET_BIND_LOADING](state, loading) {
    state.loadingBind = loading
  },

  [MUTATIONS_KEYS.SET_NOT_SUBORDINATE_LIST](state, { count, items }) {
    state.notSubordinate.list = items
    state.notSubordinate.count = count
  },

  [MUTATIONS_KEYS.SET_NOT_SUBORDINATE_LOADING](state, loading) {
    state.notSubordinate.loading = loading
  },

  [MUTATIONS_KEYS.SET_NOT_SUBORDINATE_DIALOG](state, dialog) {
    state.notSubordinate.dialog = dialog
  },

  [MUTATIONS_KEYS.SET_SUBORDINATE_PARKING](state, item) { state.subordinate.parking = item },

  [MUTATIONS_KEYS.SET_SUBORDINATE_LIST](state, { count, items }) {
    state.subordinate.list = items
    state.subordinate.count = count
  },

  [MUTATIONS_KEYS.SET_SUBORDINATE_LOADING](state, loading) {
    state.subordinate.loading = loading
  },

  [MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE](state, visible) {
    state.subordinate.visible = visible

    if (!visible) {
      state.subordinate.parking = null
      state.subordinate.list = null
      state.subordinate.count = 0
    }
  },

  // Change/Create
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
  async [ACTIONS_KEYS.FETCH_LIST]({ commit, state }) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {

      const { status, count, items } = await this.$api.parkingQueueWarehouses.getPQWarehouses(
        state.offset,
        state.limit,
      )
      if (status) {
        if (state.offset === 0) {
          commit(MUTATIONS_KEYS.SET_LIST, { count, items })
        } else {
          commit(MUTATIONS_KEYS.APPEND_TO_LIST, items)
        }
      }

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.FETCH_ITEM]({ commit }, guid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)
    commit(MUTATIONS_KEYS.SET_ITEM, null)

    try {

      const { status, item } = await this.$api.parkingQueueWarehouses.getPQWarehouse(guid)
      if (status) commit(MUTATIONS_KEYS.SET_ITEM, item)

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.CREATE_ITEM]({ commit, state, rootState }, payload) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    let status

   // try {

      const { status: _status, item } = await this.$api.parkingQueueWarehouses.createPQWarehouse(payload)
      status = _status
      if (status) {
        notify.success($nuxt.$t('forms.pqWarehouses.messages.warehouseCreated'))
        commit(MUTATIONS_KEYS.PREPEND_TO_LIST, [ item ])
        commit(MUTATIONS_KEYS.SET_ITEM, item)
        commit(MUTATIONS_KEYS.SET_OFFSET, state.offset + 1)
        commit(MUTATIONS_KEYS.SET_COUNT, state.count + 1)

        if (rootState.pqQueueProfiles.item 
          && rootState.pqQueueProfiles.item.guid
          && rootState.pqQueueProfiles.item.guid === item.queueProfileGuid
        ) {
          const { count: warehousesCount, offset: warehouseOffset } = rootState.pqQueueProfiles.warehouses
          commit(`${WAREHOUSES_STORE_MODULE_NAME}/${WAREHOUSES_MUTATIONS_KEYS.PREPEND_TO_LIST}`, item, { root: true })
          commit(`${WAREHOUSES_STORE_MODULE_NAME}/${WAREHOUSES_MUTATIONS_KEYS.SET_OFFSET}`, warehouseOffset + 1, { root: true })
          commit(`${WAREHOUSES_STORE_MODULE_NAME}/${WAREHOUSES_MUTATIONS_KEYS.SET_COUNT}`, warehousesCount + 1, { root: true })
        }
      }

    //} 
    // catch ({ message }) {
    //   notify.error(message)
    // }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
    return status
  },

  async [ACTIONS_KEYS.CHANGE_ITEM]({ commit }, { guid, form }) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    let response

    try {

      response = await this.$api.parkingQueueWarehouses.updatePQWarehouse(guid, form)
      if (response.status) {

        commit(MUTATIONS_KEYS.SET_ITEM, response.item)
        commit(MUTATIONS_KEYS.SET_ITEM_IN_LIST, response.item)
        notify.success($nuxt.$t('forms.pqWarehouses.messages.warehouseChanged'))

      }

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
    return response.status
  },

  async [ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST]({ commit, state }) {

    commit(MUTATIONS_KEYS.SET_NOT_SUBORDINATE_LOADING, true)

    try {
      const { status, count, items } = await this.$api.parkingQueueWarehouses.getPQWarehouses(
        state.notSubordinate.offset,
        state.notSubordinate.limit
      )

      if (status) {

        const diff = _.differenceBy(items, state.subordinate.list, 'guid')
        const diffCount = count - (state.subordinate.list ? state.subordinate.list.length : 0)

        commit(MUTATIONS_KEYS.SET_NOT_SUBORDINATE_LIST, { count: diffCount, items: diff })

      }

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_NOT_SUBORDINATE_LOADING, false)
  },

  async [ACTIONS_KEYS.FETCH_SUBORDINATE_LIST]({ commit, state }) {

    commit(MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE, true)
    commit(MUTATIONS_KEYS.SET_SUBORDINATE_LOADING, true)

    try {
      const { status, count, items } = await this.$api.parkingQueueWarehouses.getWarehousesByParking(
        state.subordinate.limit,
        state.subordinate.offset,
        state.subordinate.parking.guid,
      )

      if (status)
        commit(MUTATIONS_KEYS.SET_SUBORDINATE_LIST, { count, items })

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_SUBORDINATE_LOADING, false)

  },

  async [ACTIONS_KEYS.BIND_WAREHOUSE_TO_PARKING]({ commit, state, dispatch }, warehouseGuid) {

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {

      const status = await this.$api.parkingQueueWarehouses.bindWarehouseToParking(warehouseGuid)

      if (status) {
        await dispatch(ACTIONS_KEYS.FETCH_SUBORDINATE_LIST)
        dispatch(ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST)
      }

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, false)

  },

  async [ACTIONS_KEYS.UNBIND_WAREHOUSE_TO_PARKING]({ commit, state, dispatch }, warehouseGuid) {

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {

      const status = await this.$api.parkingQueueWarehouses.unbindWarehouseToParking(warehouseGuid)

      if (status) {
        await dispatch(ACTIONS_KEYS.FETCH_SUBORDINATE_LIST)
        dispatch(ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST)
      }

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, false)

  },

  [ACTIONS_KEYS.SHOW_EDIT_DIALOG]({ commit }, { show, type }) {
    commit(MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE, type)
    commit(MUTATIONS_KEYS.SHOW_EDIT_DIALOG, show)
  }
}
