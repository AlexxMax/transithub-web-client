import { MUTATIONS_KEYS, ACTIONS_KEYS, GETTERS_KEYS } from '@/utils/pq.warehouses'
import * as notify from '@/utils/notifications'

export const state = () => ({
  list: null,
  item: null,
  count: 0,
  isShowCreateDialog: false,
  loading: false,
})

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({ commit, state }) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {

      const { status, count, items } = await this.$api.pqWarehouses.getPQWarehouses()
      if (status) commit(MUTATIONS_KEYS.SET_LIST, { count, items })

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.FETCH_ITEM]({ commit, state }, guid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)
    commit(MUTATIONS_KEYS.SET_ITEM, null)

    try {

      const { status, item } = await this.$api.pqWarehouses.getPQWarehouse(guid)
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

      status = await this.$api.pqWarehouses.createPQWarehouse(payload)
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

      response = await this.$api.pqWarehouses.updatePQWarehouse(guid, form)
      if (response.status) {

        commit(MUTATIONS_KEYS.SET_ITEM, response.item)
        notify.success($nuxt.$t('forms.pqWarehouses.messages.warehouseChanged'))

      }

    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
    return response.status
  }
}

export const mutations = {
  [MUTATIONS_KEYS.SET_LIST](state, { count, items }) {
    state.count = count
    state.list = items
  },

  [MUTATIONS_KEYS.SET_ITEM](state, item) { state.item = item },

  [MUTATIONS_KEYS.IS_SHOW_CREATE_DIALOG](state, isShow) { state.isShowCreateDialog = isShow },

  [MUTATIONS_KEYS.SET_LOADING](state, loading) { state.loading = loading }
}