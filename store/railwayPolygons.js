import { showErrorMessage } from '@/utils/messages'
import { getStationPolygons } from '@/utils/railway-stations'

export const state = () => ({
  list: [],
  loading: false,
  fetched: false
})

export const getters = {
  getStationsPolygons: state => stationsRWCodes => {
    return getStationPolygons(state.list, stationsRWCodes)
  }
}

export const mutations = {
  SET_LIST(state, list) {
    state.list = list
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_FETCHED(state, fetched) {
    state.fetched = fetched
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
      } = await this.$api.railway.getRailwayPolygons()

      if (status) {
        commit('SET_LIST', items)
        commit('SET_LOADING', false)
        commit('SET_FETCHED', true)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  }
}
