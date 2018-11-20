import { showErrorMessage } from '@/utils/messages'

export const state = () => ({
  list: []
})

export const mutations = {
  SET_LIST(state, list) {
    state.list = list
  }
}

export const actions = {
  async loadList({
    commit
  }) {
    try {
      const {
        status,
        items
      } = await this.$api.railway.getRailwayAffilations()

      if (status) {
        commit('SET_LIST', items)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  }
}
