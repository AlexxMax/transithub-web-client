import { complementRequest } from '@/utils/http'

export const state = () => ({
  list: []
})

export const mutations = {
  add (state, item) {
    state.list.push({ ...item })
  },
  remove (state, { item }) {
    state.list.splice(state.list.indexOf(item), 1)
  }
}

export const actions = {
  async load ({ commit }) {
    let { data: { items } } = await this.$axios(complementRequest({
      method: 'get',
      url: '/api1/warehouse',
      params: {
        limit: 100
      }
    }, this));
    for (const item of items) {
      commit('add', item);
    }
  }
}
