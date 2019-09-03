import { complementRequest } from '@/utils/http'

export const state = () => ({
  list: []
})

export const mutations = {
  add (state, item) {
    state.list.push({ ...item })
  },
  SET_LIST(state, list) {
    state.list = list
  },
  remove (state, { item }) {
    state.list.splice(state.list.indexOf(item), 1)
  }
}

export const actions = {
  async load ({ commit }) {
    const { data: { items } } = await this.$axios(complementRequest({
      method: 'get',
      url: '/api1/locality'
    }, this))
    commit('SET_LIST', items)
  }
}
