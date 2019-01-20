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

      <!-- <el-checkbox
        v-model="filters.checkedAuthor"
        @change="value => setFilter('author', value)"
      >
        {{ $t('forms.common.onlyMine') }}
      </el-checkbox> -->

      <el-form-item
        v-loading="loadingStatuses"
        :label="$t('forms.common.status')" >
        <el-select
          style="width: 100%"
          v-model="filters.statuses"
          multiple
          filterable
          placeholder="Select"
          @change="value => { setFilter('statuses', value) }">
          <el-option
            v-for="item in select.statuses"
            :key="item.guid"
            :label="item.name"
            :value="item.guid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-loading="loadingGoods"
        :label="$t('lists.filters.goods')" >
        <el-select
          style="width: 100%"
          v-model="filters.goods"
          multiple
          filterable
          placeholder="Select"
          @change="value => { setFilter('goods', value) }">
          <el-option
            v-for="item in select.goods"
            :key="item.guid"
            :label="item.name"
            :value="item.guid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-loading="loadingRailwayAffilations"
        :label="$t('forms.railwayAggregator.wagonsType')" >
        <el-select
          style="width: 100%"
          v-model="filters.railwayAffilations"
          multiple
          filterable
          placeholder="Select"
          @change="value => { setFilter('railwayAffilations', value) }">
          <el-option
            v-for="item in select.railwayAffilations"
            :key="item.guid"
            :label="item.name"
            :value="item.guid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-loading="loadingRailwayStationsRoads"
        :label="$t('forms.common.railwayStationRoadFrom')" >
        <el-select
          style="width: 100%"
          v-model="filters.railwayStationsRoadsFrom"
          multiple
          filterable
          placeholder="Select"
          @change="value => { setFilter('railwayStationsRoadsFrom', value) }">
          <el-option
            v-for="item in select.railwayStationsRoads"
            :key="item.guid"
            :label="item.name"
            :value="item.guid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        :label="$t('forms.common.stationFrom')" >
        <el-select
          style="width: 100%"
          v-model="filters.railwayStationsFrom"
          multiple
          :multiple-limit="10"
          filterable
          remote
          reserve-keyword
          :remote-method="handleRailwayStationFromFiltered"
          placeholder="Select"
          :loading="loadingStationsFrom"
          @change="value => { setFilter('railwayStationsFrom', value) }">
          <el-option-group
            v-for="group in railwayStationsFromOptions"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.children"
              :key="item.id"
              :label="item.label"
              :value="item.id">
              <RailwayStation
                :name="item.name"
                :road="item.road"
                :rw-code="item.rwCode"
                no-icon
              />
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item
        v-loading="loadingReferenceStations"
        :label="$t('forms.common.stationMiddle')" >
        <el-select
          style="width: 100%"
          v-model="filters.railwayReferenceStations"
          multiple
          filterable
          placeholder="Select"
          @change="value => { setFilter('railwayReferenceStations', value) }">
          <el-option
            v-for="item in select.railwayReferenceStations"
            :key="item.guid"
            :label="item.name"
            :value="item.rwCode">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item
        :label="$t('forms.common.polygon')" >
        <el-select
          style="width: 100%"
          v-model="filters.polygonNumber"
          multiple
          filterable
          placeholder="Select"
          @change="value => { setFilter('polygonNumber', value) }">
          <el-option
            v-for="item in select.polygonNumber"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item
        :label="$t('forms.common.stationTo')" >
        <el-select
          style="width: 100%"
          v-model="filters.railwayStationsTo"
          multiple
          :multiple-limit="10"
          filterable
          remote
          reserve-keyword
          :remote-method="handleRailwayStationToFiltered"
          placeholder="Select"
          :loading="loadingStationsTo"
          @change="value => { setFilter('railwayStationsTo', value) }">
          <el-option-group
            v-for="group in railwayStationsToOptions"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.children"
              :key="item.id"
              :label="item.label"
              :value="item.id">
              <RailwayStation
                :name="item.name"
                :road="item.road"
                :rw-code="item.rwCode"
                no-icon
              />
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

      <!-- <el-form-item
        v-loading="loadingRailwayStationsRoads"
        :label="$t('forms.common.railwayStationRoadTo')" >
        <el-select
          style="width: 100%"
          v-model="filters.railwayStationsRoadsTo"
          multiple
          filterable
          placeholder="Select"
          @change="value => { setFilter('railwayStationsRoadsTo', value) }">
          <el-option
            v-for="item in select.railwayStationsRoads"
            :key="item.guid"
            :label="item.name"
            :value="item.guid">
          </el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item
        v-loading="loadingCompanies"
        :label="$t('forms.common.company')" >
        <el-select
          style="width: 100%"
          v-model="filters.companies"
          multiple
          filterable
          placeholder="Select"
          @change="value => { setFilter('companies', value) }">
          <el-option
            v-for="item in select.companies"
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
import RailwayStation from '@/components/Common/Railway/RailwayStation'

import { generateStationsByRoadsTree } from '@/utils/railway-stations'
import { getOppositeStatusId, STATUSES_IDS } from '@/utils/railway-aggregations'

import EventBus from "@/utils/eventBus"

const filters = Object.freeze({
  goods: [],
  railwayAffilations: [],
  railwayStationsFrom: [],
  railwayStationsTo: [],
  statuses: [ STATUSES_IDS.actual ],
  checkedAuthor: false,
  companies: [],
  railwayStationsRoadsFrom: [],
  railwayReferenceStations: [],
  polygonNumber: [],
  railwayStationsRoadsTo: []
})

export default {
  name: 'th-railway-requests-filter-menu',

  components: {
    FiltersMenu,
    RailwayStation
  },

  data() {
    return {
      filters: { ...filters },

      pickerOptions: {
        firstDayOfWeek: 1
      },

      railwayStationsFromOptions: [],
      railwayStationsToOptions: [],

      loadingStationsFrom: false,
      loadingStationsTo: false
    }
  },

  computed: {
    filterSet: function() {
      return this.$store.getters['railwayRequests/listFiltersSet']
    },
    select() {
      const select = {
        goods: this.$store.state.goods.list,
        railwayAffilations: this.$store.state.railwayAffilations.list,
        statuses: this.$store.state.railwayStatuses.list,
        companies: this.$store.state.railwayRequests.filters.data.companies.items,
        railwayStationsRoads: this.$store.state.railwayStations.roads,
        railwayReferenceStations: this.$store.state.railwayStations.referenceStations,
        polygonNumber: []
      }

      for (let i = 1; i <= 10; i++) {
        select.polygonNumber.push({
          name: `${this.$t('forms.common.polygon')} №${i}`,
          value: i
        })
      }

      return select
    },
    loadingGoods() {
      return this.$store.state.goods.loading
    },
    loadingRailwayAffilations() {
      return this.$store.state.railwayAffilations.loading
    },
    loadingStatuses() {
      return this.$store.state.railwayStatuses.loading
    },
    loadingCompanies() {
      return this.$store.state.railwayRequests.filters.data.companies.loading
    },
    loadingRailwayStationsRoads() {
      return this.$store.state.railwayStations.roadsLoading
    },
    loadingReferenceStations() {
      return this.$store.state.railwayStations.referenceStationsLoading
    }
  },

  methods: {
    setFilter(key, value) {
      switch (key) {
        case 'goods':
          this.$store.dispatch('railwayRequests/setFilterGoods', value)
          break
        case 'railwayAffilations':
          this.$store.dispatch('railwayRequests/setFilterAffilations', value)
          break
        case 'railwayStationsFrom':
          this.$store.dispatch('railwayRequests/setFilterStationsFrom', value)
          break
        case 'railwayStationsTo':
          this.$store.dispatch('railwayRequests/setFilterStationsTo', value)
          break
        case 'statuses':
          this.$store.dispatch('railwayRequests/setFilterStatuses', value)
          break
        case 'author':
          this.$store.dispatch('railwayRequests/setFilterAuthor', value ? this.$store.state.user.guid : null)
          break
        case 'companies':
          this.$store.dispatch('railwayRequests/setFilterCompanies', value)
          break
        case 'railwayStationsRoadsFrom':
          this.$store.dispatch('railwayRequests/setFilterStationsRoadsFrom', value)
          break
        case 'railwayStationsRoadsTo':
          this.$store.dispatch('railwayRequests/setFilterStationsRoadsTo', value)
          break
        case 'railwayReferenceStations':
          this.$store.dispatch('railwayRequests/setFilterReferenceStations', value)
          break
        case 'polygonNumber':
          this.$store.dispatch('railwayRequests/setFilterPolygonNumbers', value)
          break
      }

      // Sync between filters. We have filters menus in tollbar
      // and in tollbar menu, and they are using v-model (Element.IO),
      // so we need to sync them by event bus
      EventBus.$emit('railway-requests-filters', { key, value })
    },
    clearFilters() {
      this.filters = { ...filters }
      this.$store.dispatch('railwayRequests/clearFilters')
    },
    handleOpenFiltersMenu() {
      // Goods
      if (!this.$store.state.goods.fetched && !this.loadingGoods) {
        this.$store.dispatch('goods/load')
      }

      // Wagons Types
      if (!this.$store.state.railwayAffilations.fetched && !this.loadingRailwayAffilations) {
        this.$store.dispatch('railwayAffilations/loadList')
      }

      // Statuses
      if (!this.$store.state.railwayStatuses.fetched && !this.loadingStatuses) {
        this.$store.dispatch('railwayStatuses/loadList')
      }

      // Companies
      if (!this.$store.state.railwayRequests.filters.data.companies.fetched && !this.loadingCompanies) {
        this.$store.dispatch('railwayRequests/loadCompanies')
      }

      // Railway Stations Roads
      if (!this.$store.state.railwayStations.roadsFetched && !this.loadingRailwayStationsRoads) {
        this.$store.dispatch('railwayStations/loadRoads')
      }

      // Railway Reference Stations
      if (!this.$store.state.railwayStations.referenceStationsFetched && !this.loadingReferenceStations) {
        this.$store.dispatch('railwayStations/loadReferenceStations')
      }
    },
    async getStationsTree(query) {
      const { status, items } = await this.$api.railway.getRailwayStations(null, query)
      if (status) {
        return generateStationsByRoadsTree(items)
      }
      return []
    },
    async handleRailwayStationFromFiltered(query) {
      this.railwayStationsFromOptions = []
      if (query !== '' && query.length >= 3) {
        this.loadingStationsFrom = true
        this.railwayStationsFromOptions = await this.getStationsTree(query)
        EventBus.$emit('railway-requests-options', {
          key: 'railwayStationsFromOptions',
          value: this.railwayStationsFromOptions
        })
        this.loadingStationsFrom = false
      }
    },
    async handleRailwayStationToFiltered(query) {
      this.railwayStationsToOptions = []
      if (query !== '' && query.length >= 3) {
        this.loadingStationsTo = true
        this.railwayStationsToOptions = await this.getStationsTree(query)
        EventBus.$emit('railway-requests-options', {
          key: 'railwayStationsToOptions',
          value: this.railwayStationsToOptions
        })
        this.loadingStationsTo = false
      }
    }
  },

  created() {
    // Sync between filters. We have filters menus in tollbar
    // and in tollbar menu, and they are using v-model (Element.IO),
    // so we need to sync them by event bus
    EventBus.$on('railway-requests-filters', ({ key, value }) => {
      this.filters[key] = value
    })

    EventBus.$on('railway-requests-options', ({ key, value }) => {
      this[key] = value
    })

    EventBus.$on('workspace-changed', () => {
      this.filters = { ...filters }
      this.$store.commit('railwayRequests/CLEAR_FILTERS')
    })
  }
}
</script>
