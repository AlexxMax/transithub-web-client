<template>
<div class="filter-menu">

  <el-card
    v-if="!isShow && !floating"
    shadow="hover"
    class="filter-menu__empty"
  />

  <FiltersMenu
    v-else
    v-bind="$attrs"
    use-save-filters
    :floating="floating"
    :filterSet="filterSet"
    :saved-filters-loading="loadingSavedFilters"
    :saved-filters-items="savedFilters"
    @clear-filters="clearFilters"
    @save-filters="saveFilters"
    @set-filters="setFilters"
    @remove-filters="removeFilters"
    @open="handleOpenFiltersMenu"
    @close="$emit('close')"
  >

    <el-form
      ref="form"
      v-loading="loading"
      label-width="120px"
      label-position="top"
      size="mini"
      @submit.native.prevent
    >

      <!-- <el-form-item :label="$t('lists.filters.status')" >
        <el-select
          style="width: 100%"
          v-model="filterStatus"
          multiple
          filterable
          placeholder="Select">
          <el-option
            v-for="item in select.statuses"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item :label="$t('lists.filters.number')" >
        <el-select
          style="width: 100%"
          v-model="filterNumber"
          multiple
          filterable
          allow-create
          placeholder="Select">
          <el-option
            v-for="item in select.numbers"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('lists.filters.goods')" >
        <el-select
          style="width: 100%"
          v-model="filterGoods"
          multiple
          filterable
          placeholder="Select">
          <el-option
            v-for="item in select.goods"
            :key="item.guid"
            :label="item.name"
            :value="item.guid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('forms.common.regionFrom')" >
        <el-select
          style="width: 100%"
          v-model="filterRegionsFrom"
          multiple
          filterable
          placeholder="Select">
          <el-option
            v-for="item in select.regions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('forms.common.regionTo')" >
        <el-select
          style="width: 100%"
          v-model="filterRegionsTo"
          multiple
          filterable
          placeholder="Select">
          <el-option
            v-for="item in select.regions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('forms.common.distance')">
        <div class="RequestsFilterMenu__distance-group">
          <el-input-number v-model="filterDistanceFrom" :min="DISTANCE.FROM" :max="DISTANCE.TO"/>
          <div class="RequestsFilterMenu__distance-group__divider"/>
          <el-input-number v-model="filterDistanceTo" :min="DISTANCE.FROM" :max="DISTANCE.TO"/>
        </div>
      </el-form-item>

      <el-form-item :label="$t('forms.common.orderer')" >
        <el-select
          style="width: 100%"
          v-model="filterClient"
          multiple
          filterable
          allow-create
          placeholder="Select">
          <el-option
            v-for="item in select.clients"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('forms.common.carrier')" >
        <el-select
          style="width: 100%"
          v-model="filterOrganisations"
          multiple
          filterable
          allow-create
          placeholder="Select">
          <el-option
            v-for="item in select.organisations"
            :key="item.guid"
            :label="item.name"
            :value="item.guid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('forms.common.logist')" >
        <el-select
          style="width: 100%"
          v-model="filterLogist"
          multiple
          filterable
          allow-create
          placeholder="Select">
          <el-option
            v-for="item in select.logists"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('lists.filters.period')" >
        <el-date-picker
          style="width: 100%"
          v-model="filterPeriod"
          type="daterange"
          format="dd.MM.yyyy"
          :range-separator="$t('lists.filters.periodTo')"
          :start-placeholder="$t('lists.filters.periodStart')"
          :end-placeholder="$t('lists.filters.periodEnd')"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>

      <el-form-item :label="$t('forms.common.vehicleRegisterStatus')" >
        <el-select
          style="width: 100%"
          v-model="filterVehiclesRegistersStatuses"
          multiple
          filterable
          allow-create
          placeholder="Select">
          <el-option
            v-for="item in select.vehiclesRegistersStatuses"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

  </FiltersMenu>

</div>
</template>

<script>
import FiltersMenu from '@/components/Common/Lists/FiltersMenu'

import { DatePeriod } from '@/utils/datetime'
import {
  DISTANCE,
  VEHICLES_REGISTER_STATUS,
  getVehiclesRegisterStatus,
  setFilter,
  getVehiclesRegisterStatusSelect
} from '@/utils/requests'
import { generateFilterValue, getFilterValue } from '@/utils/filters'
// import EventBus from "@/utils/eventBus"

export default {
  name: 'th-requests-filter-menu',

  components: {
    FiltersMenu
  },

  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    floating: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // filters: {
      //   number: [],
      //   period: null,
      //   client: [],
      //   goods: [],
      //   pointsFrom: [],
      //   pointsTo: [],
      //   status: []
      // },

      pickerOptions: {
        firstDayOfWeek: 1
      },

      loading: false,

      DISTANCE,
      VEHICLES_REGISTER_STATUS
    }
  },

  computed: {
    filterNumber: {
      get() {
        return getFilterValue(this.$store.state.requests.filters.set.numbers)
      },
      set(value) {
        this.setFilter('number', generateFilterValue(value, this.select.numbers))
      }
    },
    filterPeriod: {
      get() {
        const { periodFrom, periodTo } = this.$store.state.requests.filters.set
        return new DatePeriod(periodFrom, periodTo).period
      },
      set(value) {
        this.setFilter('period', value)
      }
    },
    filterStatus: {
      get() {
        return this.$store.state.requests.filters.set.statuses
      },
      set(value) {
        this.setFilter('status', value)
      }
    },
    filterClient: {
      get() {
        return getFilterValue(this.$store.state.requests.filters.set.clients)
      },
      set(value) {
        this.setFilter('client', generateFilterValue(value, this.select.clients))
      }
    },
    filterLogist: {
      get() {
        return getFilterValue(this.$store.state.requests.filters.set.logists)
      },
      set(value) {
        this.setFilter('logist', generateFilterValue(value, this.select.logists))
      }
    },
    filterGoods: {
      get() {
        return getFilterValue(this.$store.state.requests.filters.set.goods)
      },
      set(value) {
        this.setFilter('goods', generateFilterValue(value, this.select.goods))
      }
    },
    filterDistanceFrom: {
      get() {
        return this.$store.state.requests.filters.set.distanceFrom
      },
      set(value) {
        this.setFilter('distanceFrom', value)
      }
    },
    filterDistanceTo: {
      get() {
        return this.$store.state.requests.filters.set.distanceTo
      },
      set(value) {
        this.setFilter('distanceTo', value)
      }
    },
    filterRegionsFrom: {
      get() {
        return getFilterValue(this.$store.state.requests.filters.set.regionsFrom)
      },
      set(value) {
        this.setFilter('regionsFrom', generateFilterValue(value, this.select.regions, 'code'))
      }
    },
    filterRegionsTo: {
      get() {
        return getFilterValue(this.$store.state.requests.filters.set.regionsTo)
      },
      set(value) {
        this.setFilter('regionsTo', generateFilterValue(value, this.select.regions, 'code'))
      }
    },
    filterNoVehiclesRegisters: {
      get() {
        return this.$store.state.requests.filters.set.noVehiclesRegisters
      },
      set(value) {
        this.setFilter('noVehiclesRegisters', value)
      }
    },
    filterOrganisations: {
      get() {
        return getFilterValue(this.$store.state.requests.filters.set.organisations)
      },
      set(value) {
        this.setFilter('organisations', generateFilterValue(value, this.select.organisations))
      }
    },
    filterVehiclesRegistersStatuses: {
      get() {
        return getFilterValue(this.$store.state.requests.filters.set.vehiclesRegistersStatuses)
      },
      set(value) {
        this.setFilter('vehiclesRegistersStatuses', generateFilterValue(value, this.select.vehiclesRegistersStatuses, 'code'))
      }
    },
    filterSet: function() {
      return this.$store.getters['requests/listFiltersSet']
    },
    select() {
      const select = { ...this.$store.state.requests.filters.data }
      select.vehiclesRegistersStatuses = getVehiclesRegisterStatusSelect(this)
      return select
    },
    loadingSavedFilters: {
      get() {
        return this.$store.state.requests.filters.saved.loading
      },
      set(value) {
        this.$store.commit('requests/SET_FILTERS_SAVED_LOADING', value)
      }
    },
    savedFilters() {
      return this.$store.state.requests.filters.saved.list
    }
  },

  methods: {
    setFilter(key, value) {
      setFilter(this, key, value)

      // switch (key) {
      //   case 'number':
      //     this.$store.dispatch('requests/setFilterNumber', value)
      //     break
      //   case 'period':
      //     this.$store.dispatch('requests/setFilterPeriod', value)
      //     break
      //   case 'status':
      //     this.$store.dispatch('requests/setFilterStatuses', value)
      //     break
      //   case 'client':
      //     this.$store.dispatch('requests/setFilterClient', value)
      //     break
      //   case 'logist':
      //     this.$store.dispatch('requests/setFilterLogists', value)
      //     break
      //   case 'goods':
      //     this.$store.dispatch('requests/setFilterGoods', value)
      //     break
      //   case 'pointsFrom':
      //     this.$store.dispatch('requests/setFilterPointsFrom', value)
      //     break
      //   case 'pointsTo':
      //     this.$store.dispatch('requests/setFilterPointsTo', value)
      //     break
      //   case 'distanceFrom':
      //     this.$store.dispatch('requests/setFilterDistanceFrom', value)
      //     break
      //   case 'distanceTo':
      //     this.$store.dispatch('requests/setFilterDistanceTo', value)
      //     break
      //   case 'regionsFrom':
      //     this.$store.dispatch('requests/setFilterRegionsFrom', value)
      //     break
      //   case 'regionsTo':
      //     this.$store.dispatch('requests/setFilterRegionsTo', value)
      //     break
      //   case 'noVehiclesRegisters':
      //     this.$store.dispatch('requests/setFilterNoVehiclesRegisters', value)
      //     break
      //   case 'organisations':
      //     this.$store.dispatch('requests/setFilterOrganisations', value)
      //     break
      //   case 'vehiclesRegistersStatus':
      //     this.$store.dispatch('requests/setFilterVehiclesRegistersStatus', value)
      //     break
      // }

      // Sync between filters. We have filters menus in tollbar
      // and in tollbar menu, and they are using v-model (Element.IO),
      // so we need to sync them by event bus
      // EventBus.$emit('requests-filters', { key, value })
    },
    clearFilters() {
      // this.filters = {
      //   number: [],
      //   period: null,
      //   client: [],
      //   goods: [],
      //   pointsFrom: [],
      //   pointsTo: [],
      //   status: []
      // }
      this.$store.dispatch('requests/clearFilters')
    },
    async saveFilters() {
      this.loadingSavedFilters = true
      this.$store.dispatch('requests/createNewSavedFilters', await this.generateFiltersLabels())
    },
    async generateFiltersLabels() {
      const getFilterNames = (filter, collection, key = 'guid', labelName = 'name') => {
        return collection
          .filter(element => filter.some(item => item === (key ? element[key] : element)))
          .map(item => ((labelName ? item[labelName] : item)))
      }

      let labels = []

      // Statuses
      // labels = [ ...labels, ...getFilterNames(this.filterStatus, this.select.statuses, 'value', 'label') ]

      // Numbers
      labels = [ ...labels, ...this.filterNumber ]

      // Goods
      labels = [ ...labels, ...getFilterNames(this.filterGoods, this.select.goods) ]

      // Regions From
      labels = [ ...labels, ...getFilterNames(this.filterRegionsFrom, this.select.regions, 'code', 'name') ]

      // Regions To
      labels = [ ...labels, ...getFilterNames(this.filterRegionsTo, this.select.regions, 'code', 'name') ]

      // Distance
      if (this.filterDistanceFrom > 0 && this.filterDistanceTo > 0) {
        labels = [ ...labels, `${this.filterDistanceFrom} - ${this.filterDistanceTo}` ]
      }

      // Clients
      labels = [ ...labels, ...this.filterClient ]

      // Organisations
      labels = [ ...labels, ...getFilterNames(this.filterOrganisations, this.select.organisations, 'guid', 'name') ]

      // Logists
      labels = [ ...labels, ...this.filterLogist ]

      // No Vehicles Registes
      if (this.filterNoVehiclesRegisters) {
        labels = [ ...labels, this.$t('forms.common.noVehiclesRegisters') ]
      }

      // Period
      if (Array.isArray(this.filterPeriod) && this.filterPeriod.length > 0) {
        labels = [ ...labels, `${this.filterPeriod[0].pFormatDate()} - ${this.filterPeriod[1].pFormatDate()}` ]
      }

      // Vehicles Registers Statuses
      labels = [ ...labels, ...getFilterNames(this.filterVehiclesRegistersStatuses, this.select.vehiclesRegistersStatuses, 'code', 'name') ]

      return labels
    },
    setFilters(filters) {
      this.$store.dispatch('requests/setFilters', filters)
    },
    removeFilters(guid) {
      this.$store.dispatch('requests/removeSavedFilters', guid)
    },
    async handleOpenFiltersMenu() {
      if (!this.$store.state.requests.filters.dataFetched) {
        this.loading = true
        await this.$store.dispatch('requests/fetchFiltersData')
        this.loading = false
      }

      // Saved Filters
      if (!this.$store.state.requests.filters.saved.fetched && !this.loadingSavedFilters) {
        this.$store.dispatch('requests/loadSavedFilters')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-menu {
  &__empty {
    width: 100%;
    height: 900px;

    margin: 1.5rem 0 0;

    border-radius: 10px;

    @media (max-width: 1199px) {
      display: none;
    }
  }
}

.RequestsFilterMenu__distance-group {
  display: flex;
  flex-direction: row;

  * {
    width: 100%;
  }

  &__divider {
    width: 40px;
    height: 14px;
    border-bottom: 1px solid rgb(220, 223, 230);
    margin: 0 5px;
  }
}
</style>
