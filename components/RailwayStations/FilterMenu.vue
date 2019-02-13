<template>
  <FiltersMenu
    ref="filters-menu"
    v-bind="$attrs"
    :filterSet="filterSet"
    @clear-filters="clearFilters"
    @open="handleOpenFiltersMenu"
    @close="$emit('close')">

    <el-form
      ref="form"
      label-width="120px"
      label-position="top"
      size="mini"
      @submit.native.prevent>

      <el-form-item
        v-loading="loadingRailwayStationsRoads"
        :label="$t('forms.common.railwayRoad')" >
        <el-select
          style="width: 100%"
          v-model="filterRailwayStationsRoads"
          multiple
          filterable
          placeholder="Select">
          <el-option
            v-for="item in select.railwayStationsRoads"
            :key="item.guid"
            :label="item.name"
            :value="item.guid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-loading="loadingReferenceStations"
        :label="$t('forms.common.stationMiddle')" >
        <el-select
          style="width: 100%"
          v-model="filterRailwayReferenceStations"
          filterable
          clearable
          placeholder="Select">
          <el-option
            v-for="item in select.railwayReferenceStations"
            :key="item.guid"
            :label="item.name"
            :value="item.rwCode">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-loading="loadingPolygons"
        :label="$t('forms.common.polygon')" >
        <el-select
          style="width: 100%"
          v-model="filterPolygonNumbers"
          multiple
          filterable
          placeholder="Select">
          <el-option
            v-for="item in select.polygonNumbers"
            :key="item.guid"
            :label="item.name"
            :value="item.guid">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>

  </FiltersMenu>
</template>

<script>
import FiltersMenu from '@/components/Common/Lists/FiltersMenu'

export default {
  name: 'th-railway-station-filter-menu',

  components: { FiltersMenu },

  data: () => ({
    pickerOptions: {
      firstDayOfWeek: 1
    },
  }),

  computed: {
    filterSet() {
      return this.$store.getters['railwayStations/catalogFiltersSet']
    },
    loadingRailwayStationsRoads() {
      return this.$store.state.railwayStations.roadsLoading
    },
    loadingReferenceStations() {
      return this.$store.state.railwayStations.referenceStationsLoading
    },
    loadingPolygons() {
      return this.$store.state.railwayPolygons.loading
    },
    filterRailwayStationsRoads: {
      get() {
        return this.$store.state.railwayStations.stationsCatalog.filters.set.roads
      },
      set(value) {
        this.setFilter('railwayStationsRoads', value)
      }
    },
    filterRailwayReferenceStations: {
      get() {
        return this.$store.state.railwayStations.stationsCatalog.filters.set.referenceStations[0]
      },
      set(value) {
        this.setFilter('railwayReferenceStations', [ value ])
      }
    },
    filterPolygonNumbers: {
      get() {
        return this.$store.state.railwayStations.stationsCatalog.filters.set.polygons
      },
      set(value) {
        this.setFilter('polygonNumbers', value)
      }
    },
    select() {
      return {
        railwayStationsRoads: this.$store.state.railwayStations.roads,
        railwayReferenceStations: this.$store.state.railwayStations.referenceStations,
        polygonNumbers: this.$store.getters['railwayPolygons/getStationsPolygons']([ this.filterRailwayReferenceStations ])
      }
    }
  },

  methods: {
    clearFilters() {
      this.$store.dispatch('railwayStations/clearCatalogFilters')
    },

    handleOpenFiltersMenu() {
      // Railway Stations Roads
      if (!this.$store.state.railwayStations.roadsFetched && !this.loadingRailwayStationsRoads) {
        this.$store.dispatch('railwayStations/loadRoads')
      }

      // Railway Reference Stations
      if (!this.$store.state.railwayStations.referenceStationsFetched && !this.loadingReferenceStations) {
        this.$store.dispatch('railwayStations/loadReferenceStations')
      }

      // Railway Polygons
      if (!this.$store.state.railwayPolygons.fetched && !this.loadingPolygons) {
        this.$store.dispatch('railwayPolygons/loadList')
      }
    },
    setFilter(key, value) {
      switch (key) {
        case 'railwayStationsRoads':
          this.$store.dispatch('railwayStations/setCatalogFilterRoads', value)
          break
        case 'railwayReferenceStations':
          this.$store.dispatch('railwayStations/setCatalogFilterReferenceStations', value)
          break
        case 'polygonNumbers':
          this.$store.dispatch('railwayStations/setCatalogFilterPolygonNumbers', value)
          break
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
