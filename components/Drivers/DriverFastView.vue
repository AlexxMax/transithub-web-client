<template>
  <el-dialog
    :title="$t('forms.common.driver')"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '30%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="hide"
  >

    <div class="DriverFastView">

      <div class="DriverFastView__body">

        <div class="DriverFastView__right">
          <DriverAvatar :name="driver.fullName" :size="84"/>
        </div>

        <div class="DriverFastView__left">

          <div class="DriverFastView__header">
            <span class="DriverFastView__header-fullname">{{ driver.fullName }}</span>
            <span class="DriverFastView__header-phone">{{ (driver.phone || '').pMaskPhone() }}</span>
          </div>

          <FormField
            big-title
            :title="$t('forms.driver.driverCert')"
            :value="driver.certSerialNumber"
          />

          <FormField
            big-title
            :title="$t('forms.driver.passNumber')"
            :value="`${driver.passSerial} ${driver.passNumber}`"
          />

          <FormField
            big-title
            :title="$t('forms.driver.passIssuedAndDate')"
            :value="`${driver.passIssued} - ${driver.passDate}`"
          />

        </div>

      </div>

      <div class="DriverFastView__footer">
        <nuxt-link :to="$i18n.path(`workspace/drivers/${driver.guid}`)">
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
import DriverAvatar from '@/components/Drivers/DriverAvatar'
import FormField from '@/components/Common/FormElements/FormField'
import Button from '@/components/Common/Buttons/Button'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-driver-fast-view',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    DriverAvatar,
    FormField,
    Button
  },

  props: {
    driver: {
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
.DriverFastView {
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

  &__header {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    border-bottom: 1px solid #BABABA;
    margin-bottom: 10px;

    &-fullname {
      font-size: 16px;
    }

    &-phone {
      margin-top: 5px;
      color: #BABABA;
    }
  }

  &__footer {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>