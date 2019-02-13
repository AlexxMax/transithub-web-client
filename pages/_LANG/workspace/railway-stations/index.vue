<template>
  <PagePattern>
    <RailwayStationsList
      :stations="stations"
      :loading="loading"
    />
  </PagePattern>
</template>

<script>
import PagePattern from "@/components/Common/Pattern";
import RailwayStationsList from "@/components/RailwayStations/RailwayStationsList";

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
    return store.dispatch("railwayStations/loadCatalogStation")
  }
};
</script>

<style scoped>
</style>
