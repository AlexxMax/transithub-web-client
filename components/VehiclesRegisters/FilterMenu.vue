<template>
  <RightView
    :visible="visible"
    :title="$t('lists.filterVehiclesRegisters')"
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

import { getStatusFilters } from '@/utils/vehiclesRegisters'

export default {
  name: 'th-vehicles-registers-filter-menu',

  components: {
    RightView,
    Button
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
      filters: {
        period: null,
        phone: null,
        driver: [],
        vehicle: [],
        trailer: [],
        status: []
      },

      select: {
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
      return this.$store.getters['vehiclesRegisters/subordinateListFiltersSet']
    }
  },

  methods: {
    async _fetchDrivers() {
      const { status, items } = await this.$api.vehiclesRegisters.filterDrivers({ requestGuid: this.request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    },
    async _fetchVehicles() {
      const { status, items } = await this.$api.vehiclesRegisters.filterVehicles({ requestGuid: this.request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    },
    async _fetchTrailers() {
      const { status, items } = await this.$api.vehiclesRegisters.filterTrailers({ requestGuid: this.request })
      return status ? _pull(_uniq(items.sort()), null, undefined, '') : []
    },
    setFilter(key) {
      const value = this.filters[key]
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
    },
    clearFilters() {
      this.filters = {
        period: null,
        phone: null,
        driver: [],
        vehicle: [],
        trailer: [],
        status: []
      }

      this.$store.dispatch('vehiclesRegisters/clearFiltersSubordinate')
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

    try {
      const [ drivers, vehicles, trailers ] = await Promise.all([
        this._fetchDrivers(),
        this._fetchVehicles(),
        this._fetchTrailers()
      ])

      setFilter('driver', drivers)
      setFilter('vehicle', vehicles)
      setFilter('trailer', trailers)
    } catch (e) {
      console.error(e);
    }
  },

  mounted() {
    this.select.status = getStatusFilters(this.$t)
  },
}
</script>
