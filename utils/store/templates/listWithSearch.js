import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'

export default (fetchMethod) => ({
  namespaced: true,

  state: () => ({
    list: [],
    count: 0,
    loading: true,
    limit: PAGE_SIZE,
    offset: OFFSET,
    search: '',
  }),

  mutations: {
    SET_LIST(state, list) { state.list = list },

    APPEND_TO_LIST(state, items) { state.list = [...new Set([...state.list, ...items])] },

    SET_COUNT(state, count) { state.count = count },

    SET_LOADING(state, loading) { state.loading = loading },

    SET_OFFSET(state, offset) { state.offset = offset },

    SET_SEARCH(state, search) { state.search = search },
  },

  actions: {
    async FETCH_LIST({ commit, state }, fetchMethodArgs) {
      commit('SET_LOADING', true)

      const { status, items, count } = await fetchMethod(...fetchMethodArgs)
      if (status) {
        if (state.offset === 0) {
          commit('SET_LIST', items)
        } else {
          commit('APPEND_TO_LIST', items)
        }
        commit('SET_COUNT', count)
      }

      commit('SET_LOADING', false)
    },
  },
})
