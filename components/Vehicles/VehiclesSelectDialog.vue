<template>
  <el-dialog
    :title="$t('forms.common.vehicles')"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '30%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="hide"
  >

    <VehiclesSelectList
      :loading="vehiclesLoading"
      :vehicles="vehicles"
      @item-open="handleOpenVehicle"
    />

    <VehicleFastView
      ref="vehicle-fast-view"
      :vehicle="currentVehicle"
    />

  </el-dialog>
</template>

<script>
import VehiclesSelectList from '@/components/Vehicles/VehiclesSelectList'
import VehicleFastView from '@/components/Vehicles/VehicleFastView'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import {
  STORE_MODULE_NAME
} from '@/utils/vehicles'

import {
  STORE_MODULE_NAME as VEHICLES_STORE_MODULE_NAME
} from '@/utils/vehicles'

export default {
  name: 'th-vehicle-select-dialog',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: { 
    VehiclesSelectList,
    VehicleFastView
  },

  data: () => ({
    dialogVisible: false,
    currentVehicle: {},
  }),

  computed: {
    vehicles() {
      return this.$store.state[VEHICLES_STORE_MODULE_NAME].list
    },
    vehiclesLoading() {
      return this.$store.state[VEHICLES_STORE_MODULE_NAME].loading
    }
  },

  methods: {
    show() {
      this.dialogVisible = true
    },

    hide() {
      this.dialogVisible = false
    },

    handleOpenVehicle(vehicle) {
      this.currentVehicle = vehicle
      this.$refs['vehicle-fast-view'].show()
    }
  }
}
</script>
