<template>
  <el-dialog
    :title="$t('forms.common.drivers')"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '30%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="hide"
  >

    <DriversSelectList
      :loading="driversLoading"
      :drivers="drivers"
      @item-open="handleOpenDriver"
    />

    <DriverFastView
      ref="driver-fast-view"
      :driver="currentDriver"
    />

  </el-dialog>
</template>

<script>
import DriversSelectList from '@/components/Drivers/DriversSelectList'
import DriverFastView from '@/components/Drivers/DriverFastView'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import {
  STORE_MODULE_NAME
} from '@/utils/drivers'

import {
  STORE_MODULE_NAME as DRIVERS_STORE_MODULE_NAME
} from '@/utils/drivers'

export default {
  name: 'th-driver-select-dialog',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: { 
    DriversSelectList,
    DriverFastView
  },

  data: () => ({
    dialogVisible: false,
    currentDriver: {},
  }),

  computed: {
    drivers() {
      return this.$store.state[DRIVERS_STORE_MODULE_NAME].list
    },
    driversLoading() {
      return this.$store.state[DRIVERS_STORE_MODULE_NAME].loading
    }
  },

  methods: {
    show() {
      this.dialogVisible = true
    },

    hide() {
      this.dialogVisible = false
    },

    handleOpenDriver(driver) {
      this.currentDriver = driver
      this.$refs['driver-fast-view'].show()
    }
  }
}
</script>