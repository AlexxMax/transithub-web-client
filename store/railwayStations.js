import _uniqby from 'lodash.uniqby'

import { showErrorMessage } from '@/utils/messages'

export const state = () => ({
  roads: [],
  stations: [],
  roadsFetched: false,
  stationsFetched: false,
  fetchedRoadsStations: [],
  loading: false
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
  getTreeSelectStations: state => {
    const result = []

    const stations = state.stations.map(({ guid, name, rwCode, roadGuid, roadName }) => ({
      guid, name, rwCode, roadGuid, roadName
    }))

    const roads = _uniqby(stations.map(({ roadGuid, roadName }) => ({ roadGuid, roadName })), 'roadGuid')

    roads.forEach(({ roadGuid, roadName }) => {
      result.push({
        id: roadGuid,
        label: roadName,
        children: (stations.filter(station => station.roadGuid === roadGuid)).map(item => ({
          id: item.rwCode,
          label: `${item.name} (${item.rwCode})`
        }))
      })
    })

    return result
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
  }
}

export const actions = {
  async loadRoads({ commit }) {
    commit('SET_LOADING', true)
    try {
      const {
        status,
        items
      } = await this.$api.railway.getRailwayStationsRoads()

      if (status) {
        commit('SET_ROADS', items)
        commit('SET_ROADS_IS_FETCHED', true)
        commit('SET_LOADING', false)
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
