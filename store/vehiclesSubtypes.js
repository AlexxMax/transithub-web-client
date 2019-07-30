import { MUTATIONS_KEYS, ACTIONS_KEYS } from '@/utils/vehiclesSubtypes'
import * as notify from '@/utils/notifications'

export const state = () => ({
  list: [],
  loading: false,
  fetched: false
})

export const mutations = {
  [MUTATIONS_KEYS.SET_LIST](state, items) {
    state.list = items
  },

  [MUTATIONS_KEYS.SET_LOADING](state, loading) {
    state.loading = loading
  },

  [MUTATIONS_KEYS.SET_FETCHED](state, fetched) {
    state.fetched = fetched
  }
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({ commit }, kind = null) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, items } = await this.$api.vehicles.getSubtypes(kind)
      if (status) {
        commit(MUTATIONS_KEYS.SET_LIST, items)
        commit(MUTATIONS_KEYS.SET_FETCHED, true)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  }
}