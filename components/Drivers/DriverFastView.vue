<template>
  <el-dialog
    :z-index="4000"
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
            <div class="DriverFastView__header-phone">
              <ContactInfo
                ref="contact-info"
                :type="CONTACT_INFO_TYPES.phone"
                :value="(driver.phone || '').pMaskPhone()"
              />
            </div>
          </div>

          <FormField
            big-title
            :title="$t('forms.driver.driverCert')"
            :value="driver.certSerialNumber"
          />

          <FormField
            v-if="driver.personDocsType === PERSON_DOCS_TYPE.PASSPORT"
            big-title
            :title="$t('forms.driver.passNumber')"
            :value="`${driver.passSerial} ${driver.passNumber}`"
          />

          <FormField
            v-if="driver.personDocsType === PERSON_DOCS_TYPE.PASSPORT"
            big-title
            :title="$t('forms.driver.passIssuedAndDate')"
            :value="`${driver.passIssued} - ${driver.passDate}`"
          />

          <FormField
            v-if="driver.personDocsType === PERSON_DOCS_TYPE.ID_CARD"
            big-title
            :title="$t('forms.common.idCard')"
            :value="driver.idCard"
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
import ContactInfo from '@/components/Common/ContactInfo'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { CONTACT_INFO_TYPES } from '@/utils/constants'

import { PERSON_DOCS_TYPE } from '@/utils/drivers'

export default {
  name: 'th-driver-fast-view',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    DriverAvatar,
    FormField,
    Button,
    ContactInfo
  },

  props: {
    driver: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    dialogVisible: false,

    CONTACT_INFO_TYPES,
    PERSON_DOCS_TYPE
  }),

  methods: {
    show() {
      this.dialogVisible = true
    },

    hide() {
      this.dialogVisible = false
      this.$refs['contact-info'].hideValue()
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
