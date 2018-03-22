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
    let { items } = await this.$axios.$get('/api1/goods?client_token=e0d22acfba67c35937f2e26c7b6344e6');
    for (const item of items) {
      commit('add', item);
    }
  }
}
