import { showErrorMessage } from '@/utils/messages'
import { generateStationsByRoadsTree } from '@/utils/railway-stations'

export const state = () => ({
  roads: [],
  stations: [],
  roadsFetched: false,
  stationsFetched: false,
  fetchedRoadsStations: [],
  loading: false,
  roadsLoading: false
})

export const getters = {
  // getRoadStations: state => roadGuid => {
  //   return state.stations.filter(item => item.roadGuid === roadGuid)
  // },
  // isRoadStationsFetched: state => roadGuid => {
  //   const item = state.fetchedRoadsStations.find(item => item.guid === roadGuid)
  //   if (item) {
  //     return true
  //   }
  //   return false
  // },
  getTreeSelectStations: state => (polygon = null) => (generateStationsByRoadsTree(state.stations, polygon)),
  isRouteStation: state => stationRWCode => {
    const station = state.stations.find(item => item.rwCode === stationRWCode)
    if (station) {
      return station.isRouteStation
    }
    return false
  }
}

export const mutations = {
  SET_ROADS(state, roads) {
    state.roads = roads
  },
  SET_STATIONS(state, stations) {
    state.stations = stations
  },
  SET_ROADS_IS_FETCHED(state, fetched) {
    state.roadsFetched = fetched
  },
  SET_STATIONS_IS_FETCHED(state, fetched) {
    state.stationsFetched = fetched
  },
  // ADD_FETCHED_ROADS_STATIONS(state, roadGuid) {
  //   const item = state.fetchedRoadsStations.find(item => item.guid === roadGuid)
  //   if (!item) {
  //     state.fetchedRoadsStations.push(roadGuid)
  //   }
  // }
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_LOADING_ROADS(state, loading) {
    state.roadsLoading =loading
  }
}

export const actions = {
  async loadRoads({ commit }) {
    commit('SET_LOADING_ROADS', true)
    try {
      const {
        status,
        items
      } = await this.$api.railway.getRailwayStationsRoads()

      if (status) {
        commit('SET_ROADS', items)
        commit('SET_LOADING_ROADS', false)
        commit('SET_ROADS_IS_FETCHED', true)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async loadStations({ commit, state }, roadGuid = null) {
    commit('SET_LOADING', true)
    try {
      const {
        status,
        items
      } = await this.$api.railway.getRailwayStations(roadGuid)

      if (status) {
        commit('SET_STATIONS', [ ...state.stations, ...items ])
        commit('SET_STATIONS_IS_FETCHED', true)
        // commit('ADD_FETCHED_ROADS_STATIONS', roadGuid)
        commit('SET_LOADING', false)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  }
}
