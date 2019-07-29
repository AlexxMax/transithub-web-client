<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="$t('forms.common.vehiclesShort')" :name="TABS.TRUCKS">
        <VehiclesSelectList
          draggable
          type="truck"
          :loading="trucksLoading"
          :vehicles="trucks"
          :show-load-more="trucksShowLoadMore"
          :search="trucksSearch"
          @item-open="truck => $emit('open-vehicle', truck)"
          @fetch-more="$emit('fetch-more-trucks')"
          @on-search="value => $emit('on-search-trucks', value)"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('forms.common.drivers')" :name="TABS.DRIVERS">
        <DriversSelectList
          draggable
          :loading="driversLoading"
          :drivers="drivers"
          :show-load-more="driversShowLoadMore"
          :search="driversSearch"
          @item-open="driver => $emit('open-driver', driver)"
          @fetch-more="$emit('fetch-more-drivers')"
          @on-search="value => $emit('on-search-drivers', value)"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('forms.common.trailers')" :name="TABS.TRAILERS">
        <VehiclesSelectList
          draggable
          type="trailer"
          :loading="trailersLoading"
          :vehicles="trailers"
          :show-load-more="trailersShowLoadMore"
          :search="trailersSearch"
          @item-open="trailer => $emit('open-vehicle', trailer)"
          @fetch-more="$emit('fetch-more-trailers')"
          @on-search="value => $emit('on-search-trailers', value)"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import VehiclesSelectList from '@/components/Vehicles/VehiclesSelectList'
import DriversSelectList from '@/components/Drivers/DriversSelectList'

const TABS = Object.freeze({
  TRUCKS: 'TRUCKS',
  DRIVERS: 'DRIVERS',
  TRAILERS: 'TRAILERS'
})

export default {
  name: 'th-vehicles-registers-generation-form-select',

  components: { VehiclesSelectList, DriversSelectList },

  props: {
    trucks: Array,
    trailers: Array,
    drivers: Array,
    trucksLoading: Boolean,
    trailersLoading: Boolean,
    driversLoading: Boolean,
    trucksShowLoadMore: Boolean,
    trailersShowLoadMore: Boolean,
    driversShowLoadMore: Boolean,
    trucksSearch: String,
    trailersSearch: String,
    driversSearch: String
  },

  data: () => ({
    activeTab: TABS.TRUCKS,
    TABS
  })
}
</script>
