import {
  complementRequest
} from '@/utils/http'

export const state = () => ({
  list: [],
  count: 0
})

export const mutations = {
  add(state, item) {
    state.list.push({ ...item
    })
  },
  remove(state, {
    item
  }) {
    state.list.splice(state.list.indexOf(item), 1)
  },
  setCount(state, count) {
    state.count = count
  }
}

export const actions = {
  async load({
    commit,
    rootState
  }) {
    try {
      const {
        data: {
          items,
          count
        }
      } = await this.$axios(complementRequest({
        method: 'get',
        url: '/api1/driver',
        params: {
          limit: 25
        }
      }))
      for (const item of items) {
        commit('add', item);
      }
      commit('setCount', count)
    } catch (e) {
      console.log(e.toString());
    }
  }
}
