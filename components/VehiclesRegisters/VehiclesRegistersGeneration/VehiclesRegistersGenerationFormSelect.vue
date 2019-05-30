<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="$t('forms.common.vehiclesShort')" :name="TABS.VEHICLES">
        <VehiclesSelectList
          draggable
          :loading="vehiclesLoading"
          :vehicles="vehicles"
          @item-open="vehicle => $emit('open-vehicle', vehicle)"
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
        TRAILERS
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import VehiclesSelectList from '@/components/Vehicles/VehiclesSelectList'
import DriversSelectList from '@/components/Drivers/DriversSelectList'

const TABS = Object.freeze({
  VEHICLES: 'VEHICLES',
  DRIVERS: 'DRIVERS',
  TRAILERS: 'TRAILERS'
})

export default {
  name: 'th-vehicles-registers-generation-form-select',

  components: { VehiclesSelectList, DriversSelectList },

  props: {
    vehicles: Array,
    drivers: Array,
    vehiclesLoading: Boolean,
    driversLoading: Boolean
  },

  data: () => ({
    activeTab: TABS.VEHICLES,
    TABS
  })
}
</script>

<style lang='scss' scoped>

</style>
