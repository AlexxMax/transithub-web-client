<template>
  <FiltersMenu
    v-bind="$attrs"
    use-save-filters
    :filterSet="filterSet"
    :saved-filters-loading="loadingSavedFilters"
    :saved-filters-items="savedFilters"
    @clear-filters="clearFilters"
    @save-filters="saveFilters"
    @set-filters="setFilters"
    @remove-filters="removeFilters"
    @open="handleOpenFiltersMenu"
    @close="$emit('close')">
    <el-form
      ref="form"
      v-loading="loading"
      label-width="120px"
      label-position="top"
      size="mini"
      @submit.native.prevent>

      <el-form-item :label="$t('lists.filters.status')" >
        <el-select
          style="width: 100%"
          v-model="filterStatus"
          multiple
          filterable
          allow-create
          placeholder="Select">
          <el-option
            v-for="item in select.statuses"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item :label="$t('lists.filters.number')" >
        <el-select
          style="width: 100%"
          v-model="filters.number"
          multiple
          filterable
          allow-create
          placeholder="Select"
          @change="value => { setFilter('number', value) }">
          <el-option
            v-for="item in select.numbers"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item :label="$t('lists.filters.period')" >
        <el-date-picker
          style="width: 100%"
          v-model="filterPeriod"
          type="daterange"
          format="dd.MM.yyyy"
          :range-separator="$t('lists.filters.periodTo')"
          :start-placeholder="$t('lists.filters.periodStart')"
          :end-placeholder="$t('lists.filters.periodEnd')"
          :picker-options="pickerOptions"
        />
      </el-form-item>

      <el-form-item :label="$t('lists.filters.phone')">
        <el-input
          v-model="filterPhone"
          type="tel"
          v-mask="'+38 (###) ### ####'"
          placeholder="+38 (097) 000 0000"
          clearable
        />
      </el-form-item>

      <el-form-item :label="$t('lists.filters.driver')" >
        <el-select
          style="width: 100%"
          v-model="filterDriver"
          multiple
          filterable
          allow-create
          placeholder="Select">
          <el-option
            v-for="item in select.drivers"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('lists.filters.vehicle_number')" >
        <el-select
          style="width: 100%"
          v-model="filterVehicle"
          multiple
          filterable
          allow-create
          placeholder="Select">
          <el-option
            v-for="item in select.vehicles"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('lists.filters.vehicle_trailer')" >
        <el-select
          style="width: 100%"
          v-model="filterTrailer"
          multiple
          filterable
          allow-create
          placeholder="Select">
          <el-option
            v-for="item in select.trailers"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>
  </FiltersMenu>
</template>

<script>
import FiltersMenu from '@/components/Common/Lists/FiltersMenu'

import { DatePeriod } from '@/utils/datetime'
// import EventBus from "@/utils/eventBus"

export default {
  name: 'th-races-filter-menu',

  components: {
    FiltersMenu
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    request: {
      tyoe: String,
      default: null
    }
  },

  data() {
    return {
      // filters: {
      //   // number: [],
      //   period: null,
      //   phone: null,
      //   driver: [],
      //   vehicle: [],
      //   trailer: [],
      //   status: []
      // },

      pickerOptions: {
        firstDayOfWeek: 1
      },

      loading: false
    }
  },

  computed: {
    filterPhone: {
      get() {
        return this.$store.state.races.filters.set.phone
      },
      set(value) {
        this.setFilter('phone', value)
      }
    },
    filterPeriod: {
      get() {
        const { periodFrom, periodTo } = this.$store.state.races.filters.set
        return new DatePeriod(periodFrom, periodTo).period
      },
      set(value) {
        this.setFilter('period', value)
      }
    },
    filterStatus: {
      get() {
        return this.$store.state.races.filters.set.statuses
      },
      set(value) {
        this.setFilter('status', value)
      }
    },
    filterDriver: {
      get() {
        return this.$store.state.races.filters.set.drivers
      },
      set(value) {
        this.setFilter('driver', value)
      }
    },
    filterVehicle: {
      get() {
        return this.$store.state.races.filters.set.vehicles
      },
      set(value) {
        this.setFilter('vehicle', value)
      }
    },
    filterTrailer: {
      get() {
        return this.$store.state.races.filters.set.trailers
      },
      set(value) {
        this.setFilter('trailer', value)
      }
    },
    filterSet: function() {
      return this.$store.getters['races/listFiltersSet']
    },
    select() {
      return this.$store.state.races.filters.data
    },
    loadingSavedFilters: {
      get() {
        return this.$store.state.races.filters.saved.loading
      },
      set(value) {
        this.$store.commit('races/SET_FILTERS_SAVED_LOADING', value)
      }
    },
    savedFilters() {
      return this.$store.state.races.filters.saved.list
    }
  },

  methods: {
    setFilter(key, value) {
      switch (key) {
        // case 'number':
        //   this.$store.dispatch('races/setFilterNumbers', value)
        //   break
        case 'phone':
          this.$store.dispatch('races/setFilterPhone', value)
          break
        case 'period':
          this.$store.dispatch('races/setFilterPeriod', value)
          break
        case 'status':
          this.$store.dispatch('races/setFilterStatuses', value)
          break
        case 'driver':
          this.$store.dispatch('races/setFilterDrivers', value)
          break
        case 'vehicle':
          this.$store.dispatch('races/setFilterVehicles', value)
          break
        case 'trailer':
          this.$store.dispatch('races/setFilterTrailers', value)
          break
      }

      // Sync between filters. We have filters menus in tollbar
      // and in tollbar menu, and they are using v-model (Element.IO),
      // so we need to sync them by event bus
      // EventBus.$emit('races-filters', { key, value })
    },
    clearFilters() {
      // this.filters = {
      //   // number: [],
      //   period: null,
      //   phone: null,
      //   driver: [],
      //   vehicle: [],
      //   trailer: [],
      //   status: []
      // }
      this.$store.dispatch('races/clearFilters')
    },
    async saveFilters() {
      this.loadingSavedFilters = true
      this.$store.dispatch('races/createNewSavedFilters', await this.generateFiltersLabels())
    },
    async generateFiltersLabels() {
      const getFilterNames = (filter, collection, key = 'guid', labelName = 'name') => {
        return collection
          .filter(element => filter.some(item => item === (key ? element[key] : element)))
          .map(item => ((labelName ? item[labelName] : item)))
      }

      let labels = []

      // Statuses
      labels = [ ...labels, ...getFilterNames(this.filterStatus, this.select.statuses, 'value', 'label') ]

      // Period
      if (Array.isArray(this.filterPeriod) && this.filterPeriod.length > 0) {
        labels = [ ...labels, `${this.filterPeriod[0].pFormatDate()} - ${this.filterPeriod[1].pFormatDate()}` ]
      }

      // Phone
      if (this.filterPhone) {
        labels = [ ...labels, this.filterPhone ]
      }

      // Drivers
      labels = [ ...labels, ...this.filterDriver ]

      // Vehicles Numbers
      labels = [ ...labels, ...this.filterVehicle ]

      // Trailers Numbers
      labels = [ ...labels, ...this.filterTrailer ]

      return labels
    },
    setFilters(filters) {
      this.$store.dispatch('races/setFilters', filters)
    },
    removeFilters(guid) {
      this.$store.dispatch('races/removeSavedFilters', guid)
    },
    async handleOpenFiltersMenu() {
      if (!this.$store.state.races.filters.dataFetched) {
        this.loading = true
        await this.$store.dispatch('races/fetchFiltersData')
        this.loading = false
      }

      // Saved Filters
      if (!this.$store.state.races.filters.saved.fetched && !this.loadingSavedFilters) {
        this.$store.dispatch('races/loadSavedFilters')
      }
    }
  },

  created() {
    // Sync between filters. We have filters menus in tollbar
    // and in tollbar menu, and they are using v-model (Element.IO),
    // so we need to sync them by event bus
    // EventBus.$on('races-filters', ({ key, value }) => {
    //   this.filters[key] = value
    // })

    // EventBus.$on('workspace-changed', () => {
    //   this.filters = {
    //     // number: [],
    //     period: null,
    //     phone: null,
    //     driver: [],
    //     vehicle: [],
    //     trailer: [],
    //     status: []
    //   }
    //   this.$store.commit('races/CLEAR_FILTERS_DATA')
    //   this.$store.commit('races/CLEAR_FILTERS_SUBORDINATE')
    //   this.$store.commit('races/SET_FILTERS_DATA_FETCHED', false)
    // })
  }
}
</script>
