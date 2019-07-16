<template>
  <PagePattern>
    <RailwayStationsList
      :stations="stations"
      :loading="loading"
    />
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import RailwayStationsList from '@/components/RailwayStations/RailwayStationsList'

const fetchFilters = store => {
  // Railway Stations Roads
  if (!store.state.railwayStations.roadsFetched && !store.state.railwayStations.roadsLoading) {
    store.dispatch('railwayStations/loadRoads')
  }

  // Railway Reference Stations
  if (!store.state.railwayStations.referenceStationsFetched && !store.state.railwayStations.referenceStationsLoading) {
    store.dispatch('railwayStations/loadReferenceStations')
  }

  // Railway Polygons
  if (!store.state.railwayPolygons.fetched && !store.state.railwayPolygons.loading) {
    store.dispatch('railwayPolygons/loadList')
  }
}

export default {
  components: {
    PagePattern,
    RailwayStationsList
  },

  computed: {
    stations() {
      return this.$store.state.railwayStations.stationsCatalog.list
    },
    loading() {
      return this.$store.state.railwayStations.stationsCatalog.loading
    }
  },

  fetch({ store }) {
    fetchFilters(store)
    return store.dispatch("railwayStations/loadCatalogStation")
  }
};
</script>
