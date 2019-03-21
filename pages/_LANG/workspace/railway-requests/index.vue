<template>
  <PagePattern>
    <FormList
      :list="$store.state.railwayRequests.list"
      @eventFetch="fetch"
    />
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from "@/components/RailwayRequests/FormList"

const fetchFilters = store => {
  // Goods
  if (!store.state.goods.fetched && !store.state.goods.loading) {
    store.dispatch('goods/load')
  }

  // Wagons Types
  if (!store.state.railwayAffilations.fetched && !store.state.railwayAffilations.loading) {
    store.dispatch('railwayAffilations/loadList')
  }

  // Statuses
  if (!store.state.railwayStatuses.fetched && !store.state.railwayStatuses.loading) {
    store.dispatch('railwayStatuses/loadList')
  }

  // Companies
  if (!store.state.railwayRequests.filters.data.companies.fetched && !store.state.railwayRequests.filters.data.companies.loading) {
    store.dispatch('railwayRequests/loadCompanies')
  }

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

  // Saved Filters
  if (!store.state.railwayRequests.filters.saved.fetched && !store.state.railwayRequests.filters.saved.loading) {
    store.dispatch('railwayRequests/loadSavedFilters')
  }
}

export default {
  components: {
    PagePattern,
    FormList
  },

  methods: {
    async fetch(dropLimit = false) {
      if (dropLimit) {
        return await this.$store.dispatch('railwayRequests/loadList')
      }
      return await this.$store.dispatch('railwayRequests/loadMoreItems')
    }
  },

  fetch({ store }) {
    store.commit('railwayRequests/RESET')
    fetchFilters(store)
    return store.dispatch('railwayRequests/setFilterAuthor', store.state.user.guid)
  }
}
</script>
