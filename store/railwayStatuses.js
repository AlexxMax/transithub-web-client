import { showErrorMessage } from '@/utils/messages'

export const state = () => ({
  list: [],
  loading: false,
  fetched: false
})

export const mutations = {
  SET_LIST(state, list) {
    state.list = list
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_FETCHED(state, fetched) {
    state.fetched = fetched
  }
}

export const actions = {
  async loadList({ commit }) {
    commit('SET_LOADING', true)
    try {
      const { status, items, msg } = await this.$api.railway.getFilterStatuses()
      if (status) {
        commit('SET_LIST', items)
        commit('SET_LOADING', false)
        commit('SET_FETCHED', true)
      } else {
        throw new Error(msg)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  }
}
