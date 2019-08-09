import { MUTATIONS_KEYS, ACTIONS_KEYS, GETTERS_KEYS } from '@/utils/pqWarehouses'
import * as notify from '@/utils/notifications'

export const state = () => ({
  list: null,
  item: null,
  count: 0,
  loading: false
})

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({ commit, state }) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    const { status, count, items } = await this.$api.pqWarehouses.getPQWarehouses()
    if (status) commit(MUTATIONS_KEYS.SET_LIST, { count, items })

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.FETCH_ITEM]({ commit, state }, guid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    const { status, item } = await this.$api.pqWarehouses.getPQWarehouse(guid)
    if (status) commit(MUTATIONS_KEYS.SET_ITEM, item)

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async createPQWarehouses(payload) {
    await this.$api.pqWarehouses.createPQWarehouses(payload)
  }
}

export const mutations = {
  [MUTATIONS_KEYS.SET_LIST](state, { count, items }) {
    state.count = count
    state.list = items
  },

  [MUTATIONS_KEYS.SET_ITEM](state, item) { state.item = item },

  [MUTATIONS_KEYS.SET_LOADING](state, loading) { state.loading = loading }
}