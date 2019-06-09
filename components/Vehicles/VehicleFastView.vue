<template>
  <el-dialog
    :z-index="3000"
    :title="$t('forms.common.vehicle')"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '30%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    style="z-index: 3000 !important;"
    @close="hide"
  >

    <div class="VehicleFastView">

      <div class="VehicleFastView__body">

        <div class="VehicleFastView__right">
          <VehicleAvatar :name="vehicle.brand" :size="84"/>
        </div>

        <div class="VehicleFastView__left">

          <FormField
            big-title
            :title="$t('forms.common.vNumber')"
            :value="vehicle.vNumber"
          />

          <FormField
            big-title
            :title="$t('forms.common.techPassport')"
            :value="vehicle.techPassport"
          />

          <FormField
            big-title
            :title="$t('forms.common.brand')"
            :value="`${vehicle.brand} ${vehicle.model}`"
          />

          <FormField
            big-title
            :title="$t('forms.common.type')"
            :value="vehicle.typeName"
          />

        </div>

      </div>

      <div class="VehicleFastView__footer">
        <nuxt-link :to="$i18n.path(`workspace/vehicles/${vehicle.guid}`)">
          <Button
            round
            type="primary"
          >
            {{ $t('forms.common.showMoreInfo') }}
          </Button>
        </nuxt-link>
      </div>

    </div>

  </el-dialog>
</template>

<script>
import VehicleAvatar from '@/components/Vehicles/VehicleAvatar'
import FormField from '@/components/Common/FormElements/FormField'
import Button from '@/components/Common/Buttons/Button'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-vehicle-fast-view',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    VehicleAvatar,
    FormField,
    Button
  },

  props: {
    vehicle: {
      type: Object,
      required: true
    }
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

<style lang='scss' scoped>
.VehicleFastView {
  display: flex;
  flex-direction: column;

  &__body {
    display: flex;
    flex-direction: row;
  }

  &__right {
    margin-right: 25px;
  }

  &__left {
    display: flex;
    flex-direction: column;
  }

  &__footer {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
