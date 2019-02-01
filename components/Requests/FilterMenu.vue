<template>
  <FiltersMenu
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
          allow-create
          placeholder="Select">
          <el-option
            v-for="item in select.goods"
            :key="item.guid"
            :label="item.name"
            :value="item.guid">
          </el-option>
        </el-select>
      </el-form-item>

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
      this.$store.dispatch('requests/CLEAR_FILTERS')
    },
    async handleOpenFiltersMenu() {
      if (!this.$store.state.requests.filters.dataFetched) {
        this.loading = true
        await this.$store.dispatch('requests/fetchFiltersData')
        this.loading = false
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
