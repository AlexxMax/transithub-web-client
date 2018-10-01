<template>
  <RightView
    :visible="visible"
    :title="$t('lists.filterRaces')"
    @close="$emit('close')">
    <Button
      type="text"
      size="mini"
      :disabled="!searchSet"
      style="margin-bottom: 15px"
      @click="clearFilters">
      {{ $t('lists.filters.clear') }}
    </Button>

    <el-form
      ref="form"
      label-width="120px"
      label-position="top"
      size="mini"
      @submit.native.prevent>
      <el-form-item :label="$t('lists.filters.number')" >
        <el-select
          style="width: 100%"
          v-model="filters.number"
          multiple
          filterable
          allow-create
          placeholder="Select"
          @change="setFilter('number')">
          <el-option
            v-for="item in select.number"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('lists.filters.period')" >
        <el-date-picker
          style="width: 100%"
          v-model="filters.period"
          type="daterange"
          format="dd.MM.yyyy"
          :range-separator="$t('lists.filters.periodTo')"
          :start-placeholder="$t('lists.filters.periodStart')"
          :end-placeholder="$t('lists.filters.periodEnd')"
          :picker-options="pickerOptions"
          @change="setFilter('period')">
        </el-date-picker>
      </el-form-item>

      <el-form-item :label="$t('lists.filters.phone')">
        <el-input
          v-model="filters.phone"
          type="tel"
          v-mask="'+38 (###) ### ####'"
          placeholder="+38 (097) 000 0000"
          clearable
          @change="setFilter('phone')"/>
      </el-form-item>

      <el-form-item :label="$t('lists.filters.driver')" >
        <el-select
          style="width: 100%"
          v-model="filters.driver"
          multiple
          filterable
          allow-create
          placeholder="Select"
          @change="setFilter('driver')">
          <el-option
            v-for="item in select.driver"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('lists.filters.vehicle_number')" >
        <el-select
          style="width: 100%"
          v-model="filters.vehicle"
          multiple
          filterable
          allow-create
          placeholder="Select"
          @change="setFilter('vehicle')">
          <el-option
            v-for="item in select.vehicle"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('lists.filters.vehicle_trailer')" >
        <el-select
          style="width: 100%"
          v-model="filters.trailer"
          multiple
          filterable
          allow-create
          placeholder="Select"
          @change="setFilter('trailer')">
          <el-option
            v-for="item in select.trailer"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('lists.filters.status')" >
        <el-select
          style="width: 100%"
          v-model="filters.status"
          multiple
          filterable
          allow-create
          placeholder="Select"
          @change="setFilter('status')">
          <el-option
            v-for="item in select.status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </RightView>
</template>

<script>
import _uniq from 'lodash.uniq'
import _pull from 'lodash.pull'

import RightView from '@/components/Common/RightView'
import Button from '@/components/Common/Buttons/Button'

import { getStatusFilters } from '@/utils/races'

export default {
  name: 'th-races-filter-menu',

  components: {
    RightView,
    Button
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    request: String
  },

  data() {
    return {
      filters: {
        number: [],
        period: null,
        phone: null,
        driver: [],
        vehicle: [],
        trailer: [],
        status: []
      },

      select: {
        number: [],
        status: [],
        driver: [],
        vehicle: [],
        trailer: []
      },

      pickerOptions: {
        firstDayOfWeek: 1
      }
    }
  },

  computed: {
    searchSet: function() {
      return this.$store.getters['races/subordinateListFiltersSet']
    }
  },

  methods: {
    async _fetchNumbers() {
      const { status, items } = await this.$api.races.filterNumbers({ requestGuid: this.request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    },
    async _fetchDrivers() {
      const { status, items } = await this.$api.races.filterDrivers({ requestGuid: this.request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    },
    async _fetchVehicles() {
      const { status, items } = await this.$api.races.filterVehicles({ requestGuid: this.request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    },
    async _fetchTrailers() {
      const { status, items } = await this.$api.races.filterTrailers({ requestGuid: this.request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    },
    setFilter(key) {
      const value = this.filters[key]
      switch (key) {
        case 'number':
          this.$store.dispatch('races/setFilterNumbers', value)
          break
        case 'phone':
          this.$store.dispatch('races/setFilterPhone', value.replace(' ', ''))
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
    },
    clearFilters() {
      this.filters = {
        number: [],
        period: null,
        phone: null,
        driver: [],
        vehicle: [],
        trailer: [],
        status: []
      }

      this.$store.dispatch('races/clearFiltersSubordinate')
    }
  },

  async created() {
    const setFilter = (key, list) => {
      for (const item of list) {
        this.select[key].push({
          label: item,
          value: item
        })
      }
    }

    // try {
      const [ numbers, drivers, vehicles, trailers ] = await Promise.all([
        this._fetchNumbers(),
        this._fetchDrivers(),
        this._fetchVehicles(),
        this._fetchTrailers()
      ])

      setFilter('number', numbers)
      setFilter('driver', drivers)
      setFilter('vehicle', vehicles)
      setFilter('trailer', trailers)
    // } catch (e) {
    //   console.error(e);
    // }
  },

  mounted() {
    this.select.status = getStatusFilters(this.$t)
  }
}
</script>
