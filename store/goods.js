import { showErrorMessage } from '@/utils/messages'

export const state = () => ({
  list: []
})

export const mutations = {
  SET_LIST(state, list) {
    state.list = list
  },
  ADD (state, item) {
    state.list.push({ ...item })
  },
  remove (state, { item }) {
    state.list.splice(state.list.indexOf(item), 1)
  }
}

export const actions = {
  async load ({ commit }) {
    try {
      const {
        status,
        items
      } = await this.$api.goods.getGoods()

      if (status) {
        commit('SET_LIST', items)
      }
    } catch (e) {
      showErrorMessage(e.message)
    }
  }
}
