import { showErrorMessage } from '@/utils/messages'
import { TABLE_NAMES } from '@/utils/constants'

const filtersInit = Object.freeze({
  [TABLE_NAMES.railwayAggregation]: false,
  [TABLE_NAMES.railwayRequest]: false,
  [TABLE_NAMES.autoRequest]: false,
  [TABLE_NAMES.autoVehiclesRegister]: false,
  [TABLE_NAMES.autoRace]: false
})

export const state = () => ({
  item: {},
  list: [],
  loading: false,
  filters: {
    set: { ...filtersInit}
  }
})

export const getters = {
  listFiltered(state) {
    const filters = state.filters.set
    const filtersKeys = Object.keys(filters)
    const filtersChecked = filtersKeys.filter(item => filters[item])
    const allFiltersSame = filtersChecked.length === filtersKeys.length || filtersChecked.length === 0

    return allFiltersSame ?
      state.list :
      state.list.filter(listItem => filtersChecked.some(filtersItem => listItem.listName === filtersItem))
  }
}

export const mutations = {
  RESET(state) {
    state.list = []
    state.loading = false
  },

  SET_LIST(state, list) {
    state.list = list
  },

  SET_LOADING(state, loading) {
    state.loading = loading
  },

  SET_FILTERS(state, filters) {
		state.filters.set = filters || filtersInit
  }
}

export const actions = {
  async loadList({
    commit
  }) {
    commit('SET_LOADING', true)

    try {
      const {
        status,
        items
      } = await this.$api.usersFilters.getFilters()

      if (status) {
        commit('SET_LIST', items)
        commit('SET_LOADING', false)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async deleteSubscription({ commit, state }, { guid }) {
    try {
      const { status } = await this.$api.usersFilters.removeFilters(guid)

      if (status) {
        commit('SET_LIST', state.list.filter(item => item.guid !== guid))
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  }
}