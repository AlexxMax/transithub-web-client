import API from '@/utils/api'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { showErrorMessage } from '@/utils/messages'

export const state = () => ({
  list: [],
  count: 0,
  filters: {
    requestGuid: null
  },
  limit: PAGE_SIZE,
  offset: OFFSET,
  loading: true
})

export const mutations = {
  SET_LIST(state, list) {
    state.list = list
  },

  SET_COUNT(state, count) {
    state.count = count
  },

  SET_FILTER_REQUEST_GUID(state, requestGuid) {
    state.filters.requestGuid = requestGuid
  },

  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

export const actions = {
  async load({
    state,
    commit
  }) {
    commit('SET_LOADING', true)

    try {
      const { count, items } = await API.races.getRaces(
        state.limit,
        state.offset,
        state.filters,
        this.app.context
      )

      commit('SET_LIST', items)
      commit('SET_COUNT', count)
      commit('SET_LOADING', false)
    } catch (e) {
      showErrorMessage(e.message)
    }
  }
}
