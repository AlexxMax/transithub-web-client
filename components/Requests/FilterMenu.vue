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
          placeholder="Select">
          <el-option
            v-for="item in select.statuses"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

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

      <el-form-item :label="$t('lists.filters.client')" >
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
    </el-form>

  </FiltersMenu>
</template>

<script>
import FiltersMenu from '@/components/Common/Lists/FiltersMenu'

import { DatePeriod } from '@/utils/datetime'
// import EventBus from "@/utils/eventBus"

export default {
  name: 'th-requests-filter-menu',

  components: {
    FiltersMenu
  },

  props: {
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

      loading: false
    }
  },

  computed: {
    filterNumber: {
      get() {
        return this.$store.state.requests.filters.set.numbers
      },
      set(value) {
        this.setFilter('number', value)
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
        return this.$store.state.requests.filters.set.clients
      },
      set(value) {
        this.setFilter('client', value)
      }
    },
    filterGoods: {
      get() {
        return this.$store.state.requests.filters.set.goods
      },
      set(value) {
        this.setFilter('goods', value)
      }
    },
    filterSet: function() {
      return this.$store.getters['requests/listFiltersSet']
    },
    select() {
      return this.$store.state.requests.filters.data
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
      switch (key) {
        case 'number':
          this.$store.dispatch('requests/setFilterNumber', value)
          break
        case 'period':
          this.$store.dispatch('requests/setFilterPeriod', value)
          break
        case 'status':
          this.$store.dispatch('requests/setFilterStatuses', value)
          break
        case 'client':
          this.$store.dispatch('requests/setFilterClient', value)
          break
        case 'goods':
          this.$store.dispatch('requests/setFilterGoods', value)
          break
        case 'pointsFrom':
          this.$store.dispatch('requests/setFilterPointsFrom', value)
          break
        case 'pointsTo':
          this.$store.dispatch('requests/setFilterPointsTo', value)
          break
      }

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
      labels = [ ...labels, ...getFilterNames(this.filterStatus, this.select.statuses, 'value', 'label') ]

      // Numbers
      labels = [ ...labels, ...this.filterNumber ]

      // Period
      if (Array.isArray(this.filterPeriod) && this.filterPeriod.length > 0) {
        labels = [ ...labels, `${this.filterPeriod[0].pFormatDate()} - ${this.filterPeriod[1].pFormatDate()}` ]
      }

      // Clients
      labels = [ ...labels, ...this.filterClient ]

      // Goods
      labels = [ ...labels, ...getFilterNames(this.filterGoods, this.select.goods) ]

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
  },

  mounted() {
    // Sync between filters. We have filters menus in tollbar
    // and in tollbar menu, and they are using v-model (Element.IO),
    // so we need to sync them by event bus
    // EventBus.$on('requests-filters', ({ key, value }) => {
    //   this.filters[key] = value
    // })

    // EventBus.$on('workspace-changed', () => {
    //   this.filters = {
    //     number: [],
    //     period: null,
    //     client: [],
    //     goods: [],
    //     pointsFrom: [],
    //     pointsTo: [],
    //     status: []
    //   }
    //   this.$store.commit('requests/CLEAR_FILTERS_DATA')
    //   this.$store.commit('requests/CLEAR_FILTERS')
    //   this.$store.commit('requests/SET_FILTERS_DATA_FETCHED', false)
    // })
  }
}
</script>
