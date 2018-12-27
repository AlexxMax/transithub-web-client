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

      <el-checkbox
        v-model="filters.checkedAuthor"
        @change="value => setFilter('author', value)"
      >
        {{ $t('forms.common.onlyMine') }}
      </el-checkbox>

    </el-form>
  </FiltersMenu>
</template>

<script>
import FiltersMenu from '@/components/Common/Lists/FiltersMenu'
import RailwayStation from '@/components/Common/Railway/RailwayStation'

import { generateStationsByRoadsTree } from '@/utils/railway-stations'

import EventBus from "@/utils/eventBus"

const filters = Object.freeze({
  goods: [],
  railwayAffilations: [],
  railwayStationsFrom: [],
  railwayStationsTo: [],
  statuses: [],
  checkedAuthor: false
})

export default {
  name: 'th-railway-aggregations-filter-menu',

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
      return this.$store.getters['railwayAggregations/listFiltersSet']
    },
    select() {
      const select = {
        goods: this.$store.state.goods.list,
        railwayAffilations: this.$store.state.railwayAffilations.list,
        statuses: this.$store.state.railwayStatuses.list
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
    }
  },

  methods: {
    setFilter(key, value) {
      switch (key) {
        case 'goods':
          this.$store.dispatch('railwayAggregations/setFilterGoods', value)
          break
        case 'railwayAffilations':
          this.$store.dispatch('railwayAggregations/setFilterAffilations', value)
          break
        case 'railwayStationsFrom':
          this.$store.dispatch('railwayAggregations/setFilterStationsFrom', value)
          break
        case 'railwayStationsTo':
          this.$store.dispatch('railwayAggregations/setFilterStationsTo', value)
          break
        case 'statuses':
          this.$store.dispatch('railwayAggregations/setFilterStatuses', value)
          break
        case 'author':
          this.$store.dispatch('railwayAggregations/setFilterAuthor', value ? this.$store.state.user.guid : null)
          break
      }

      // Sync between filters. We have filters menus in tollbar
      // and in tollbar menu, and they are using v-model (Element.IO),
      // so we need to sync them by event bus
      EventBus.$emit('railway-aggregations-filters', { key, value })
    },
    clearFilters() {
      this.filters = { ...filters }
      this.$store.dispatch('railwayAggregations/clearFilters')
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
        EventBus.$emit('railway-aggregations-options', {
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
        EventBus.$emit('railway-aggregations-options', {
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
    EventBus.$on('railway-aggregations-filters', ({ key, value }) => {
      this.filters[key] = value
    })

    EventBus.$on('railway-aggregations-options', ({ key, value }) => {
      this[key] = value
    })

    EventBus.$on('workspace-changed', () => {
      this.filters = { ...filters }
      this.$store.commit('railwayAggregations/CLEAR_FILTERS')
    })
  }
}
</script>
