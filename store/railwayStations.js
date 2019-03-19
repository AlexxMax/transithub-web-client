import { showErrorMessage } from '@/utils/messages'
import { generateStationsByRoadsTree, getMiddleStation, getStationPolygon } from '@/utils/railway-stations'
import { filtersSet } from '@/utils/storeCommon'
import { FILTERS_IS_ROUTE_STATION } from '@/utils/railway-stations'
import { MARKER_TYPE } from "@/utils/google/maps/constants";

const stationsCatalogFilterInit = Object.freeze({
  roads: [],
  referenceStations: [],
  polygons: [],
  isRouteStations: []
})

export const state = () => ({
  roads: [],
  stations: [],
  roadsFetched: false,
  stationsFetched: false,
  fetchedRoadsStations: [],
  loading: false,
  roadsLoading: false,
  referenceStations: [],
  referenceStationsLoading: false,
  referenceStationsFetched: false,
  stationsCatalog: {
    loading: false,
    list: [],
    filters: {
      set: { ...stationsCatalogFilterInit }
    },
    search: null
  }
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
  getTreeSelectStations: state => (polygonRWCode = null, polygonId = null) => (generateStationsByRoadsTree(state.stations, polygonRWCode, polygonId)),
  getMiddleStation: state => stationRwCode => (getMiddleStation(state.stations, stationRwCode)),
  getStationPolygon: state => stationRwCode => (getStationPolygon(state.stations, stationRwCode)),
  isRouteStation: state => stationRWCode => {
    const station = state.stations.find(item => item.rwCode === stationRWCode)
    if (station) {
      return station.isRouteStation
    }
    return false
  },
  catalogFiltersSet: state => (filtersSet(state.stationsCatalog.filters.set)),
  getMapMarkers: state => {
    const list = state.stationsCatalog.list
    const stations = list.map(item => {
      const station = {
        id: item.rwCode,
        data: {
          stationRWCode: item.rwCode,
          stationName: item.name,
          stationRoad: item.roadName,
          stationLat: item.lat,
          stationLon: item.lon,
          stationReferenceRWCode: item.referenceRwCode,
          stationReferenceName: item.name,
          stationReferenceRoad: item.roadName,
          isRouteStation: item.isRouteStation,
          polygonName: item.polygonName
        },
        position: { lat: +item.lat, lng: +item.lon },
        type: MARKER_TYPE.blank
      }

      if (item.rwCode === item.referenceRwCode) {
        station.type = MARKER_TYPE.reference
      } else if (item.isRouteStation) {
        station.type = MARKER_TYPE.route
      }

      return station
    })
    return stations
  },
  getMapLines: state => {
    const list = state.stationsCatalog.list
    const lines = []
    list.forEach(station => {
      if (station.referenceRwCode && station.rwCode !== station.referenceRwCode) {
        const referenceStation = list.find(item => item.rwCode === station.referenceRwCode)
        if (referenceStation) {
          lines.push({
            id: `${station.rwCode}-${
              referenceStation.referenceRwCode
            }`,
            path: [
              {
                lat: +station.lat,
                lng: +station.lon
              },
              {
                lat: +referenceStation.lat,
                lng: +referenceStation.lon
              }
            ]
          })
        }
      }
    })
    return lines
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
  },
  SET_REFERENCE_STATIONS(state, referenceStations) {
    state.referenceStations = referenceStations
  },
  SET_REFERENCE_LOADING(state, loading) {
    state.referenceStationsLoading = loading
  },
  SET_REFERENCE_STATIONS_IS_FETCHED(state, fetched) {
    state.referenceStationsFetched = fetched
  },
  SET_CATALOG_LOADING(state, loading) {
    state.stationsCatalog.loading = loading
  },
  SET_CATALOG(state, stations) {
    state.stationsCatalog.list = stations
  },
  SET_CATALOG_FILTERS(state, filters) {
		state.stationsCatalog.filters.set = filters || stationsCatalogFilterInit
  },
  SET_CATALOG_FILTER_ROADS(state, roads) {
    state.stationsCatalog.filters.set.roads = roads
  },
  SET_CATALOG_FILTER_REFERENCE_STATIONS(state, referenceStations) {
    state.stationsCatalog.filters.set.referenceStations = referenceStations
  },
  SET_CATALOG_FILTER_POLYGONS(state, polygons) {
    state.stationsCatalog.filters.set.polygons = polygons
  },
  SET_CATALOG_FILTER_IS_ROUTE_STATION(state, isRouteStations) {
    state.stationsCatalog.filters.set.isRouteStations = isRouteStations
  },
  CLEAR_CATALOG_FILTERS(state) {
    state.stationsCatalog.filters.set = { ...state.stationsCatalog.filters.set, ...stationsCatalogFilterInit}
  },
  SET_CATALOG_SEARCH(state, search) {
    state.stationsCatalog.search = search
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
  },

  async loadReferenceStations({ commit, state }) {
    commit('SET_REFERENCE_LOADING', true)
    try {
      const {
        status,
        items
      } = await this.$api.railway.getRailwayReferenceStations()

      if (status) {
        commit('SET_REFERENCE_STATIONS', items)
        commit('SET_REFERENCE_STATIONS_IS_FETCHED', true)
        commit('SET_REFERENCE_LOADING', false)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async loadCatalogStation({ commit, state }) {
    commit('SET_CATALOG_LOADING', true)

    const {
      search,
      filters: {
        set: {
          roads,
          referenceStations,
          polygons,
          isRouteStations
        }
      }
    } = state.stationsCatalog

    let isRouteStationsValue = null
    if (isRouteStations.length === 1) {
      isRouteStationsValue = isRouteStations[0] === FILTERS_IS_ROUTE_STATION.isRoute ? 1 : 0
    }

    try {
      const {
        status,
        items
      } = await this.$api.railway.getRailwayStations(
        null,
        search,
        null,
        roads,
        referenceStations,
        polygons,
        isRouteStationsValue
      )

      if (status) {
        commit('SET_CATALOG', items)
        commit('SET_CATALOG_LOADING', false)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async setCatalogSearch({
    commit,
    dispatch
  }, value) {
    commit('SET_CATALOG_SEARCH', value)
    await dispatch('loadCatalogStation')
  },

  async clearCatalogFilters({
    commit,
    dispatch
  }) {
    commit('CLEAR_CATALOG_FILTERS')
    await dispatch('loadCatalogStation')
    this.$cookies.railwayStations.unsetFilters()
  },

  async setCatalogFilterRoads({
    commit,
    dispatch,
    state
  }, roads) {
    commit('SET_CATALOG_FILTER_ROADS', roads)
    await dispatch('loadCatalogStation')
    this.$cookies.railwayStations.setFilters(state.stationsCatalog.filters.set)
  },

  async setCatalogFilterReferenceStations({
    commit,
    dispatch,
    state
  }, referenceStations) {
    commit('SET_CATALOG_FILTER_REFERENCE_STATIONS', referenceStations)
    await dispatch('loadCatalogStation')
    this.$cookies.railwayStations.setFilters(state.stationsCatalog.filters.set)
  },

  async setCatalogFilterPolygonNumbers({
    commit,
    dispatch,
    state
  }, polygons) {
    commit('SET_CATALOG_FILTER_POLYGONS', polygons)
    await dispatch('loadCatalogStation')
    this.$cookies.railwayStations.setFilters(state.stationsCatalog.filters.set)
  },

  async setCatalogFilterIsRouteStations({
    commit,
    dispatch,
    state
  }, isRouteStations) {
    commit('SET_CATALOG_FILTER_IS_ROUTE_STATION', isRouteStations)
    await dispatch('loadCatalogStation')
    this.$cookies.railwayStations.setFilters(state.stationsCatalog.filters.set)
  }
}
