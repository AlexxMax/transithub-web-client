<template>
  <PagePattern>
    <FormList
      :list="$store.state.railwayAggregations.list"
      :list-by-author="$store.state.railwayAggregations.listByAuthor"
      @eventFetch="fetch"
    />
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from "@/components/RailwayAggregations/FormList"

const fecthFilters = store => {
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
  if (!store.state.railwayAggregations.filters.data.companies.fetched && !store.state.railwayAggregations.filters.data.companies.loading) {
    store.dispatch('railwayAggregations/loadCompanies')
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
  if (!store.state.railwayAggregations.filters.saved.fetched && !store.state.railwayAggregations.filters.saved.list) {
    store.dispatch('railwayAggregations/loadSavedFilters')
  }
}

export default {
  components: {
    PagePattern,
    FormList
  },

  methods: {
    async fetch(loadByAuthor = false) {
      return await this.$store.dispatch(
        'railwayAggregations/loadMoreItems',
        loadByAuthor ? this.$store.state.user.guid : null
      )
    }
  },

  fetch({ store }) {
    store.commit('railwayAggregations/RESET')

    // store.dispatch('railwayAggregations/loadMoreItems', store.state.user.guid)
    // store.dispatch('railwayAggregations/loadMapData')
    // return store.dispatch('railwayAggregations/loadMoreItems')

    fecthFilters(store)

    return Promise.all([
      store.dispatch('railwayAggregations/loadMoreItems'),
      store.dispatch('railwayAggregations/loadMoreItems', store.state.user.guid),
      store.dispatch('railwayAggregationsMap/loadMapData')
    ])
  }
}
</script>
