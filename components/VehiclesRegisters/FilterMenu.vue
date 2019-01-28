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
      v-loading="loading"
      label-width="120px"
      label-position="top"
      size="mini"
      @submit.native.prevent>
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
            v-for="(item, index) in select.drivers"
            :key="index"
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
            v-for="(item, index) in select.vehicles"
            :key="index"
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
            v-for="(item, index) in select.trailers"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

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
    </el-form>
  </FiltersMenu>
</template>

<script>
import FiltersMenu from '@/components/Common/Lists/FiltersMenu'

import { DatePeriod } from '@/utils/datetime'
// import EventBus from "@/utils/eventBus"

export default {
  name: 'th-vehicles-registers-filter-menu',

  components: {
    FiltersMenu
  },

  data() {
    return {
      // filters: {
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
        return this.$store.state.vehiclesRegisters.filters.set.phone
      },
      set(value) {
        this.setFilter('phone', value)
      }
    },
    filterPeriod: {
      get() {
        const { periodFrom, periodTo } = this.$store.state.vehiclesRegisters.filters.set
        return new DatePeriod(periodFrom, periodTo).period
      },
      set(value) {
        this.setFilter('period', value)
      }
    },
    filterStatus: {
      get() {
        return this.$store.state.vehiclesRegisters.filters.set.statuses
      },
      set(value) {
        this.setFilter('status', value)
      }
    },
    filterDriver: {
      get() {
        return this.$store.state.vehiclesRegisters.filters.set.drivers
      },
      set(value) {
        this.setFilter('driver', value)
      }
    },
    filterVehicle: {
      get() {
        return this.$store.state.vehiclesRegisters.filters.set.vehicles
      },
      set(value) {
        this.setFilter('vehicle', value)
      }
    },
    filterTrailer: {
      get() {
        return this.$store.state.vehiclesRegisters.filters.set.trailers
      },
      set(value) {
        this.setFilter('trailer', value)
      }
    },
    filterSet: function() {
      return this.$store.getters['vehiclesRegisters/listFiltersSet']
    },
    select() {
      return this.$store.state.vehiclesRegisters.filters.data
    }
  },

  methods: {
    setFilter(key, value) {
      switch (key) {
        case 'phone':
          this.$store.dispatch('vehiclesRegisters/setFilterPhone', value.replace(' ', ''))
          break
        case 'period':
          this.$store.dispatch('vehiclesRegisters/setFilterPeriod', value)
          break
        case 'status':
          this.$store.dispatch('vehiclesRegisters/setFilterStatuses', value)
          break
        case 'driver':
          this.$store.dispatch('vehiclesRegisters/setFilterDrivers', value)
          break
        case 'vehicle':
          this.$store.dispatch('vehiclesRegisters/setFilterVehicles', value)
          break
        case 'trailer':
          this.$store.dispatch('vehiclesRegisters/setFilterTrailers', value)
          break
      }

      // Sync between filters. We have filters menus in tollbar
      // and in tollbar menu, and they are using v-model (Element.IO),
      // so we need to sync them by event bus
      // EventBus.$emit('vehicles-registers-filters', { key, value })
    },
    clearFilters() {
      // this.filters = {
      //   period: null,
      //   phone: null,
      //   driver: [],
      //   vehicle: [],
      //   trailer: [],
      //   status: []
      // }
      this.$store.dispatch('vehiclesRegisters/clearFilters')
    },
    async handleOpenFiltersMenu() {
      if (!this.$store.state.vehiclesRegisters.filters.dataFetched) {
        this.loading = true
        await this.$store.dispatch('vehiclesRegisters/fetchFiltersData')
        this.loading = false
      }
    }
  },

  created() {
    // Sync between filters. We have filters menus in tollbar
    // and in tollbar menu, and they are using v-model (Element.IO),
    // so we need to sync them by event bus
    // EventBus.$on('vehicles-registers-filters', ({ key, value }) => {
    //   this.filters[key] = value
    // })

    // EventBus.$on('workspace-changed', () => {
    //   this.filters = {
    //     period: null,
    //     phone: null,
    //     driver: [],
    //     vehicle: [],
    //     trailer: [],
    //     status: []
    //   }
    //   this.$store.commit('vehiclesRegisters/CLEAR_FILTERS_DATA')
    //   this.$store.commit('vehiclesRegisters/CLEAR_FILTERS_SUBORDINATE')
    //   this.$store.commit('vehiclesRegisters/SET_FILTERS_DATA_FETCHED', false)
    // })
  }
}
</script>
