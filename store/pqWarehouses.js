import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { EDIT_DIALOG_TYPES, MUTATIONS_KEYS, ACTIONS_KEYS, GETTERS_KEYS } from '@/utils/pq.warehouses'
import * as notify from '@/utils/notifications'

export const state = () => ({
  list: null,
  item: null,
  count: 0,

  parking: null,

  limit: PAGE_SIZE,
  offset: OFFSET,

  // isShowCreateDialog: false,
  editing: {
    type: EDIT_DIALOG_TYPES.CREATE,
    showEditDialog: false,
    showInaccessibleFunctionalityDialog: false
  },
  loading: false,
})

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

  async [ACTIONS_KEYS.FETCH_ITEM]({ commit, state }, guid) {
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

  async [ACTIONS_KEYS.CREATE_ITEM]({ commit, dispatch }, payload) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    let status

    try {

      status = await this.$api.parkingQueueWarehouses.createPQWarehouse(payload)
      if (status) {

        notify.success($nuxt.$t('forms.pqWarehouses.messages.warehouseCreated'))
        dispatch(ACTIONS_KEYS.FETCH_LIST)

      }

    } catch ({ message }) {
      notify.error(message)
    }

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
        notify.success($nuxt.$t('forms.pqWarehouses.messages.warehouseChanged'))

      }

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
    return response.status
  },

  [ACTIONS_KEYS.SHOW_EDIT_DIALOG]({ commit }, { show, type }) {
    commit(MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE, type)
    commit(MUTATIONS_KEYS.SHOW_EDIT_DIALOG, show)
  }
}

export const mutations = {
  [MUTATIONS_KEYS.SET_LIST](state, { count, items }) {
    state.count = count
    state.list = items
  },

  [MUTATIONS_KEYS.APPEND_TO_LIST](state, items) {
    state.list = [...state.list, ...items]
  },

  [MUTATIONS_KEYS.SET_ITEM](state, item) { state.item = item },

  [MUTATIONS_KEYS.SET_PARKING](state, item) { state.parking = item },

  [MUTATIONS_KEYS.SET_OFFSET](state, offset) { state.offset = offset },

  // [MUTATIONS_KEYS.IS_SHOW_CREATE_DIALOG](state, isShow) { state.isShowCreateDialog = isShow },
  [MUTATIONS_KEYS.SHOW_EDIT_DIALOG](state, show) {
    state.editing.showEditDialog = show
  },

  [MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE](state, type) {
    state.editing.type = type
  },

  [MUTATIONS_KEYS.SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY](state, value) {
    state.editing.showInaccessibleFunctionalityDialog = value
  },

  [MUTATIONS_KEYS.SET_LOADING](state, loading) { state.loading = loading }
}