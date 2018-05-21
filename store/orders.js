import {
  complementRequest
} from '@/utils/http'

import {
  PAGE_SIZE,
  OFFSET
} from '@/utils/defaultValues'

export const state = () => ({
  list: [],
  count: 0
})

export const mutations = {
  clear(state) {
    state.list = []
  },
  setList(state, list) {
    state.list = list
  },
  add(state, item) {
    state.list.push({
      ...item
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
  }, params = { limit: PAGE_SIZE, offset: OFFSET }) {
    const { limit, offset } = params

    commit('clear')

    try {
      const {
        data: {
          items,
          count
        }
      } = await this.$axios(complementRequest({
        method: 'get',
        url: '/api1/order',
        params: {
          limit,
          offset
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
