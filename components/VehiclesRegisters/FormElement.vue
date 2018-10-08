<template>
  <Form>
    <Header
      slot="header"
      ref="$_elementHeightMixin_ref_header"
      :title="$t('forms.vehicleRegister.title')"
      :status-title="$t(vehicleRegister.status.localeKey)"
      :status-color="vehicleRegister.status.color"
      :back-button-tooltip="$t('forms.vehicleRegister.backBtn')"
      :back-button-to="$i18n.path('workspace/vehicles-registers')"/>

    <div slot="content">
      <el-row>
        <el-col :xs="24" :lg="18">
          <Segment :minus="elementHeightMixin_formElementsHeight.$_elementHeightMixin_ref_header">
            <el-form
              :model="vehicleRegister"
              label-position="top"
              label-width="100px"
              size="mini">
              <el-row :gutter="20">
                <el-col :xs="24" :md="8">
                  <el-form-item :label="$t('forms.common.period')">
                    <el-input :value="`${vehicleRegister.periodFrom} - ${vehicleRegister.periodTo}`" readonly></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="4">
                  <el-form-item :label="$t('forms.vehicleRegister.tripsQuantity')">
                    <el-input v-model="vehicleRegister.tripsQuantity" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <Group :title="$t('forms.common.driverGroup')">
                <el-row :gutter="20">
                  <el-col :xs="24" :md="8">
                    <el-form-item :label="$t('forms.common.personCred')">
                      <el-input :value="vehicleRegister.driverFullname" readonly></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :md="8">
                    <el-form-item :label="$t('forms.common.driverCert')">
                      <el-input :value="vehicleRegister.driverCert" readonly></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :md="8">
                    <ContactInfo
                      class="VehicleRegisterForm__contact-info"
                      :value="vehicleRegister.phone"
                      type="phone"/>
                  </el-col>
                </el-row>
              </Group>

              <Group :title="$t('forms.common.vehicleGroup')">
                <el-row :gutter="20">
                  <el-col :xs="24" :md="8">
                    <el-form-item :label="$t('forms.common.vehicleNumber')">
                      <el-input :value="vehicleRegister.vehicleNumber" readonly></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :md="8">
                    <el-form-item :label="$t('forms.common.vehicleTechPass')">
                      <el-input :value="vehicleRegister.vehicleTechPass" readonly></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :md="8">
                    <el-form-item :label="$t('forms.common.vehicleModel')">
                      <el-input :value="vehicleRegister.vehicleBrand" readonly></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </Group>

              <Group :title="$t('forms.common.trailerGroup')">
                <el-row :gutter="20">
                  <el-col :xs="24" :md="8">
                    <el-form-item :label="$t('forms.common.vehicleNumber')">
                      <el-input :value="vehicleRegister.trailerNumber" readonly></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :md="8">
                    <el-form-item :label="$t('forms.common.vehicleTechPass')">
                      <el-input :value="vehicleRegister.trailerTechPass" readonly></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :md="8">
                    <el-form-item :label="$t('forms.common.vehicleModel')">
                      <el-input :value="vehicleRegister.trailerBrand" readonly></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </Group>

              <Group
                v-if="$_smallDeviceMixin_isDeviceSmall"
                :title="$t('forms.common.more')">
                <el-row :gutter="20">
                  <el-col :xs="24" :md="8">
                    <Link
                      v-if="vehicleRegister.requestGuid"
                      :to="$i18n.path(`workspace/requests/${vehicleRegister.requestGuid}`)"
                      :title="$t('forms.request.title') + ' №' + vehicleRegister.requestNumber"
                      :subtitle="vehicleRegister.requestScheduleDate"/>
                  </el-col>

                  <el-col :xs="24" :md="8">
                    <Link
                      v-if="vehicleRegister.orderGuid"
                      :to="$i18n.path(`workspace/orders/${vehicleRegister.orderGuid}`)"
                      :title="$t('forms.order.title') + ' №' + vehicleRegister.orderNumber"
                      :subtitle="vehicleRegister.orderDate"/>
                  </el-col>
                </el-row>
              </Group>
            </el-form>
          </Segment>
        </el-col>

        <el-col :lg="6" class="hidden-md-and-down">
          <Segment
            :style="{ 'margin-left': '20px' }"
            :minus="elementHeightMixin_formElementsHeight.$_elementHeightMixin_ref_header">
            <Link
              v-if="vehicleRegister.requestGuid"
              :to="$i18n.path(`workspace/requests/${vehicleRegister.requestGuid}`)"
              :title="$t('forms.request.title') + ' №' + vehicleRegister.requestNumber"
              :subtitle="`${$t('forms.common.date')}: ${vehicleRegister.requestScheduleDate}`"/>

            <Link
              v-if="vehicleRegister.orderGuid"
              :to="$i18n.path(`workspace/orders/${vehicleRegister.orderGuid}`)"
              :title="$t('forms.order.title') + ' №' + vehicleRegister.orderNumber"
              :subtitle="`${$t('forms.common.date')}: ${vehicleRegister.orderDate}`"
              :style="{ 'margin-top': '10px' }"/>
          </Segment>
        </el-col>
      </el-row>
    </div>
  </Form>
</template>

<script>
import Form from '@/components/Common/Form'
import Header from '@/components/Common/FormElements/FormHeader'
import Segment from '@/components/Common/FormElements/FormSegment'
import Link from '@/components/Common/FormElements/FormLink'
import Group from '@/components/Common/FormElements/FormGroup'
import ContactInfo from '@/components/Common/ContactInfo'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import elementHeight from '@/mixins/elementHeight'

export default {
  name: 'th-vehicles-registers-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element), elementHeight ],

  components: {
    Form,
    Header,
    Segment,
    Link,
    Group,
    ContactInfo
  },

  data() {
    return {
      vehicleRegister: {}
    }
  },

  created() {
    this.vehicleRegister = this.$store.getters['vehiclesRegisters/getVehicleRegister']
  }
}
</script>

<style lang="scss" scoped>
.VehicleRegisterForm__contact-info {
  margin-top: 40px;
}

@media only screen and (max-width: 991px) {
  .VehicleRegisterForm__contact-info {
    margin-top: 10px;
  }
}
</style>
