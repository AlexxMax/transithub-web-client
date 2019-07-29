import * as notify from '@/utils/notifications'

export const state = () => ({
  list: [],
  loading: false,
  fetched: false
})

export const mutations = {
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