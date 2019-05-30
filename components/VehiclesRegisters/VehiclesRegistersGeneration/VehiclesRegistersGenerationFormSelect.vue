<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="$t('forms.common.vehiclesShort')" :name="TABS.VEHICLES">
        <VehiclesSelectList
          draggable
          :vehicles="vehicles"
          :clone-method="handleCloneVehicle"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('forms.common.drivers')" :name="TABS.DRIVERS">
        DRIVERS
      </el-tab-pane>
      <el-tab-pane :label="$t('forms.common.trailers')" :name="TABS.TRAILERS">
        TRAILERS
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import VehiclesSelectList from '@/components/Vehicles/VehiclesSelectList'

const TABS = Object.freeze({
  VEHICLES: 'VEHICLES',
  DRIVERS: 'DRIVERS',
  TRAILERS: 'TRAILERS'
})

export default {
  name: 'th-vehicles-registers-generation-form-select',

  components: { VehiclesSelectList },

  props: {
    vehicles: Array
  },

  data: () => ({
    activeTab: TABS.VEHICLES,

    TABS
  }),

  methods: {
    handleCloneVehicle(vehicle) {
      return {
        ...vehicle,
        type: 'vehicle'
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
