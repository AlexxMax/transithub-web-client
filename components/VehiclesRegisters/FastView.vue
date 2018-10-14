<template>
  <el-dialog
    :visible="visible"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="$emit('close')">

    <Header
      slot="title"
      :title="$t('forms.vehicleRegister.title')"
      :statusTitle="vehicleRegister.status.title"
      :statusColor="vehicleRegister.status.color"
      no-back-button/>

    <Group style="margin-top: -30px">
      <el-row :gutter="20">

        <el-col :xs="24" :md="8">
          <Field
            :title="$t('forms.common.period')"
            :value="period"/>
        </el-col>

        <el-col :xs="24" :md="16">
          <Field
            :title="$t('forms.vehicleRegister.tripsQuantity')"
            :value="vehicleRegister.tripsQuantity"/>
        </el-col>
      </el-row>
    </Group>

    <Group :title="$t('forms.common.driverGroup')">
      <el-row :gutter="20">
        <el-col :xs="24" :md="8">
          <Field
            :title="$t('forms.common.personCred')"
            :value="vehicleRegister.driverFullname"/>
        </el-col>

        <el-col :xs="24" :md="8">
          <Field
            :title="$t('forms.common.driverCert')"
            :value="vehicleRegister.driverCert"/>
        </el-col>

        <el-col :xs="24" :md="8">
          <ContactInfo
            class="VehicleRegisterFastView__contact-info"
            :value="vehicleRegister.phone"
            type="phone"/>
        </el-col>
      </el-row>
    </Group>

    <Group :title="$t('forms.common.vehicleGroup')">
      <el-row :gutter="20">
        <el-col :xs="24" :md="8">
          <Field
            :title="$t('forms.common.vehicleNumber')"
            :value="vehicleRegister.vehicleNumber"/>
        </el-col>

        <el-col :xs="24" :md="16">
          <Field
            :title="$t('forms.common.vehicleTechPass')"
            :value="vehicleRegister.vehicleBrand"/>
        </el-col>
      </el-row>
    </Group>

    <Group :title="$t('forms.common.trailerGroup')">
      <el-row :gutter="20">
        <el-col :xs="24" :md="8">
          <Field
            :title="$t('forms.common.vehicleNumber')"
            :value="vehicleRegister.trailerNumber"/>
        </el-col>

        <el-col :xs="24" :md="16">
          <Field
            :title="$t('forms.common.vehicleTechPass')"
            :value="vehicleRegister.trailerBrand"/>
        </el-col>
      </el-row>
    </Group>

    <div class="VehicleRegisterFastView__button-wrapper">
      <nuxt-link :to="`workspace/vehicles-registers/${guid}`">
        <Button
          class="VehicleRegisterFastView__button"
          type="primary">
          {{ $t('forms.common.showMoreInfo') }}
        </Button>
      </nuxt-link>
    </div>

  </el-dialog>
</template>

<script>
import Header from '@/components/Common/FormElements/FormHeader'
import Group from '@/components/Common/FormElements/FormGroup'
import Field from '@/components/Common/FormElements/FormField'
import Status from '@/components/Common/FormElements/Constituents/Status'
import ContactInfo from '@/components/Common/ContactInfo'
import Button from '@/components/Common/Buttons/Button'

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"

export default {
  name: "th-vehicle-register-fast-view",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Header,
    Group,
    Field,
    Status,
    ContactInfo,
    Button
  },

  props: {
    visible: Boolean,
    guid: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      vehicleRegister: {}
    }
  },

  computed: {
    period() {
      let period = this.vehicleRegister.periodTo
      if (this.vehicleRegister.periodFrom && this.vehicleRegister.periodTo) {
        period = `${this.vehicleRegister.periodFrom} - ${this.vehicleRegister.periodTo}`
      } else if (this.vehicleRegister.periodFrom && !this.vehicleRegister.periodTo) {
        period = this.vehicleRegister.periodFrom
      }
      return period
    }
  },

  watch: {
    guid() {
      this.vehicleRegister = this.$store.getters['vehiclesRegisters/getVehicleRegisterFromList'](this.guid)
    }
  }
}
</script>

<style lang="scss" scoped>
.VehicleRegisterFastView__contact-info {
  margin-top: 30px;
}

.VehicleRegisterFastView__button-wrapper {
  margin-top: 20px;

  .VehicleRegisterFastView__button {
    display: flex;
    margin: auto;
  }
}

@media only screen and (max-width: 991px) {
  .VehicleRegisterFastView__contact-info {
    margin-top: 10px;
  }
}
</style>
