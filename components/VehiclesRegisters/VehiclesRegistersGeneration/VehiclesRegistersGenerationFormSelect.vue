<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="$t('forms.common.vehiclesShort')" :name="TABS.TRUCKS">
        <VehiclesSelectList
          draggable
          type="truck"
          :loading="vehiclesLoading"
          :vehicles="trucks"
          @item-open="truck => $emit('open-vehicle', truck)"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('forms.common.drivers')" :name="TABS.DRIVERS">
        <DriversSelectList
          draggable
          :loading="driversLoading"
          :drivers="drivers"
          @item-open="driver => $emit('open-driver', driver)"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('forms.common.trailers')" :name="TABS.TRAILERS">
        <VehiclesSelectList
          draggable
          type="trailer"
          :loading="vehiclesLoading"
          :vehicles="trailers"
          @item-open="trailer => $emit('open-vehicle', trailer)"
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
    vehiclesLoading: Boolean,
    driversLoading: Boolean
  },

  data: () => ({
    activeTab: TABS.TRUCKS,
    TABS
  })
}
</script>

<style lang='scss' scoped>

</style>
