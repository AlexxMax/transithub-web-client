<template>
  <el-dialog
    v-if="guid"
    :visible="visible"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="$emit('close')">

    <Header
      slot="title"
      :title="$t('forms.vehicleRegister.title')"
      :statusTitle="$t(vehicleRegister.status.localeKey)"
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
            :value="vehicleRegister.vehicleTechPass"/>
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
            :value="vehicleRegister.trailerTechPass"/>
        </el-col>
      </el-row>
    </Group>

    <Group :title="$t('forms.common.goods')">
      <el-row :gutter="20">
        <el-col :xs="24" :md="8">
          <Field
            :value="vehicleRegister.goodsName"/>
        </el-col>
      </el-row>
    </Group>

    <Group :title="$t('forms.common.points')">
      <Point
        :name="vehicleRegister.pointFromName"
        :koatuu="vehicleRegister.pointFromKoatuu"
        :label="$t('forms.common.pointFrom')"/>

      <Point
        :name="vehicleRegister.pointToName"
        :koatuu="vehicleRegister.pointToKoatuu"
        :label="$t('forms.common.pointTo')"/>
    </Group>

    <Group :title="$t('forms.common.route')">
      <Map
        koatuu
        :pointFromKoatuu="vehicleRegister.pointFromKoatuu"
        :pointToKoatuu="vehicleRegister.pointToKoatuu"/>
    </Group>

    <div class="VehicleRegisterFastView__button-wrapper">
      <nuxt-link :to="$i18n.path(`workspace/vehicles-registers/${guid}`)">
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
import ContactInfo from '@/components/Common/ContactInfo'
import Button from '@/components/Common/Buttons/Button'
import Point from '@/components/Common/Point'
import Map from '@/components/Common/Map'

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"

export default {
  name: "th-vehicle-register-fast-view",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Header,
    Group,
    Field,
    ContactInfo,
    Button,
    Point,
    Map
  },

  props: {
    visible: Boolean,
    guid: {
      type: String,
      defalt: null
    },
    subordinate: Boolean,
    requestGuid: String
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
    guid: {
      handler: function() {
        if (this.subordinate) {
          this.vehicleRegister = this.$store.getters["vehiclesRegisters/getRaceFromSubordinateList"]({
            vehicleRegister: this.guid,
            request: this.requestGuid
          })
        } else {
          this.vehicleRegister = this.$store.getters['vehiclesRegisters/getVehicleRegisterFromList'](this.guid)
        }
      }
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
