<template>
  <el-dialog
    :z-index="3000"
    :title="title || $t('forms.common.vehicles')"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '30%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="hide"
  >

    <VehiclesSelectList
      :loading="loading"
      :vehicles="items"
      show-select-button
      @item-open="vehicle => $emit('item-open', vehicle)"
      @item-select="vehicle => $emit('item-select', vehicle)"
    />

  </el-dialog>
</template>

<script>
import VehiclesSelectList from '@/components/Vehicles/VehiclesSelectList'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

import {
  STORE_MODULE_NAME as VEHICLES_STORE_MODULE_NAME
} from '@/utils/vehicles'

export default {
  name: 'th-vehicle-select-dialog',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: { VehiclesSelectList },

  props: {
    items: {
      type: Array,
      required: true
    },
    loading: Boolean,
    title: String
  },

  data: () => ({ dialogVisible: false }),

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
