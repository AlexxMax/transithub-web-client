import { MARKER_TYPE } from "@/utils/google/maps/constants";
import { showErrorMessage } from "@/utils/messages";

export const state = () => ({
  mapData: {
    list: [],
    loading: false,
    railwayAggregationGuidToOpen: null,
    referencedStations: []
  }
});

export const getters = {
  getMapData: state => {
    const list = state.mapData.list;
    const stations = [];
    const map = new Map();
    list.forEach(item => {
      if (!map.has(item.stationFromRWCode)) {
        map.set(item.stationFromRWCode, true);
        stations.push({
          periodFrom: item.periodFrom,
          periodTo: item.periodTo,
          stationRWCode: item.stationFromRWCode,
          stationName: item.stationFromName,
          stationRoad: item.stationFromRoad,
          stationLat: item.stationFromLat,
          stationLon: item.stationFromLon,
          stationToName: item.stationToName,
          stationReferenceRWCode: item.stationReferenceRWCode,
          polygonName: item.polygonName
        });
      }
    });

    stations.forEach(station => {
      station.railwayAggregationsWagonsDeficit = 0;
      station.railwayAggregations = list.filter(item => {
        if (item.stationFromRWCode === station.stationRWCode) {
          station.railwayAggregationsWagonsDeficit += item.wagonsDeficit;
          return true;
        }
        return false;
      });
    });

    return stations;
  },
  getMapReferenceStations: state => {
    const list = state.mapData.list;
    const stations = [];
    const map = new Map();
    list.forEach(item => {
      if (
        item.stationReferenceRWCode &&
        !map.has(item.stationReferenceRWCode)
      ) {
        map.set(item.stationReferenceRWCode, true);
        stations.push({
          stationReferenceRWCode: item.stationReferenceRWCode,
          stationReferenceName: item.stationReferenceName,
          stationReferenceRoad: item.stationReferenceRoad,
          stationReferenceLat: item.stationReferenceLat,
          stationReferenceLon: item.stationReferenceLon,
          polygonName: item.polygonName
        });
      }
    });

    return stations;
  },
  getReferencesStationsRWCodes: (state, getters) => {
    return getters.getMapReferenceStations.map(
      item => item.stationReferenceRWCode
    );
  },
  getStationsOfReferencedStations: (state, getters) => {
    const referencesStationsRWCodes = getters.getReferencesStationsRWCodes;
    const stations = [];
    referencesStationsRWCodes.forEach(referenceStationRWCode => {
      const referencedStations = state.mapData.referencedStations
        .filter(
          station =>
            referenceStationRWCode === station.referenceRwCode &&
            referenceStationRWCode !== station.rwCode
        )
        .map(item => ({
          stationRWCode: item.rwCode,
          stationName: item.name,
          stationRoad: item.roadName,
          stationLat: item.lat,
          stationLon: item.lon,
          stationReferenceRWCode: item.referenceRwCode,
          isRouteStation: item.isRouteStation,
          polygonName: item.polygonName
        }));
      stations.push({
        referenceStationRWCode,
        stations: referencedStations
      });
    });
    return stations;
  },
  getBlankStations: (state, getters) => {
    let stations = [];
    getters.getStationsOfReferencedStations.forEach(item => {
      stations = [...stations, ...item.stations];
    });
    return stations;
  },
  getMarkers: (state, getters) => {
    let result = []
    
    const stations = getters.getMapData.map(item => ({
      id: `s${item.stationRWCode}`,
      position: { lat: +item.stationLat, lng: +item.stationLon },
      label: `${item.railwayAggregations.length}/${
        item.railwayAggregationsWagonsDeficit
      }`,
      type: MARKER_TYPE.working,
      data: item
    }));

    result = [ ...stations ]

    const referenceStations = getters.getMapReferenceStations.map(item => ({
      id: `rs${item.stationReferenceRWCode}`,
      position: {
        lat: +item.stationReferenceLat,
        lng: +item.stationReferenceLon
      },
      type: MARKER_TYPE.reference,
      data: item
    }));

    result = [ ...result, ...referenceStations ]

    const blankStations = getters.getBlankStations.map(item => ({
      id: `b${item.stationRWCode}`,
      position: {
        lat: +item.stationLat,
        lng: +item.stationLon
      },
      type: item.isRouteStation ? MARKER_TYPE.route : MARKER_TYPE.blank,
      data: item
    }));

    result = [ ...result, ...blankStations ]

    return result;
  },
  getMapLines: (state, getters) => {
    const lines = [];

    const handleStation = (referenceStation, table, prefix) => {
      table.forEach(station => {
        if (
          referenceStation.stationReferenceRWCode ===
          station.stationReferenceRWCode
        ) {
          lines.push({
            id: `${prefix}${station.stationRWCode}-${
              referenceStation.stationReferenceRWCode
            }`,
            path: [
              {
                lat: +station.stationLat,
                lng: +station.stationLon
              },
              {
                lat: +referenceStation.stationReferenceLat,
                lng: +referenceStation.stationReferenceLon
              }
            ]
          });
        }
      });
    };

    getters.getMapReferenceStations.forEach(referenceStation => {
      handleStation(referenceStation, getters.getMapData, "l");
      handleStation(referenceStation, getters.getBlankStations, "b");
    });

    // getter.getMapData.forEach(station => {
    //   if (station.stationReferenceRWCode) {
    //     const referenceStation = getter.getMapReferenceStations.find(
    //       referenceStation =>
    //         referenceStation.stationReferenceRWCode ===
    //         station.stationReferenceRWCode
    //     );
    //     if (referenceStation) {
    //       lines.push({
    //         id: `l${station.stationFromRWCode}-${
    //           referenceStation.stationReferenceRWCode
    //         }`,
    //         path: [
    //           {
    //             lat: +station.stationFromLat,
    //             lng: +station.stationFromLon
    //           },
    //           {
    //             lat: +referenceStation.stationReferenceLat,
    //             lng: +referenceStation.stationReferenceLon
    //           }
    //         ]
    //       });
    //     }
    //   }
    // });

    return lines;
  }
};

export const mutations = {
  SET_MAP_DATA_LIST(state, list) {
    state.mapData.list = list;
  },

  SET_MAP_DATA_LOADING(state, loading) {
    state.mapData.loading = loading;
  },

  SET_RAILWAY_AGGREGATION_ID_TO_OPEN(state, guid) {
    state.mapData.railwayAggregationGuidToOpen = guid;
  },

  SET_REFERENCED_STATIONS(state, list) {
    state.mapData.referencedStations = list;
  }
};

export const actions = {
  async loadMapData({ commit, dispatch, rootState }, author = null) {
    commit("SET_MAP_DATA_LOADING", true);

    try {
      const {
        status,
        items
      } = await this.$api.railway.getRailwayAggregationsForMap(
        rootState.railwayAggregations.search,
        rootState.railwayAggregations.filters.set,
        rootState.railwayAggregations.sorting,
        author
      );

      if (status) {
        commit("SET_MAP_DATA_LIST", items);
        await dispatch("loadStationsOfReferencedStations");
        commit("SET_MAP_DATA_LOADING", false);
      }
    } catch ({ message }) {
      showErrorMessage(message);
    }
  },

  async loadStationsOfReferencedStations({ commit, getters }) {
    if (getters.getReferencesStationsRWCodes.length > 0) {
      const { status, items } = await this.$api.railway.getRailwayStations(
        null,
        null,
        null,
        null,
        getters.getReferencesStationsRWCodes
      );
      if (status) {
        commit("SET_REFERENCED_STATIONS", items);
      }
    }
  }
};
