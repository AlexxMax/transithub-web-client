<template>
  <el-dialog
    :z-index="3000"
    :title="$t('forms.common.drivers')"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '30%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="hide"
  >

    <DriversSelectList
      :loading="loading"
      :drivers="items"
      show-select-button
      @item-open="driver => $emit('item-open', driver)"
      @item-select="driver => $emit('item-select', driver)"
    />

  </el-dialog>
</template>

<script>
import DriversSelectList from '@/components/Drivers/DriversSelectList'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

import {
  STORE_MODULE_NAME as DRIVERS_STORE_MODULE_NAME
} from '@/utils/drivers'

export default {
  name: 'th-driver-select-dialog',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: { DriversSelectList },

  props: {
    items: {
      type: Array,
      required: true
    },
    loading: Boolean
  },

  data: () => ({
    dialogVisible: false
  }),

  methods: {
    show() {
      this.dialogVisible = true
    },

    hide() {
      this.dialogVisible = false
    }
  }
}
</script>
