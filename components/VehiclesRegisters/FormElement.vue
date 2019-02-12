<template>
  <div>
    <Form>
      <Header
        slot="header"
        :title="$t('forms.vehicleRegister.title')"
        :status-title="$t(vehicleRegister.status.localeKey)"
        :status-color="vehicleRegister.status.color">

        <div class="VehicleRegisterForm__header-subtitle">
          <div>
            {{ `${$t('forms.race.lastEvent')}: ${vehicleRegister.lastEventName} - ${vehicleRegister.lastEventDate}` }}
          </div>
        </div>

      </Header>

      <div slot="toolbar">
        <MainMenu>

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

        </MainMenu>
      </div>

      <div slot="content">
        <el-row>
          <el-col :span="24">
            <Segment>
              <el-form
                :model="vehicleRegister"
                label-position="top"
                label-width="100px"
                size="mini">
                <Group>
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
                </Group>

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

                <Group>
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

                <GroupCollapse
                  v-if="vehicleRegister.guid"
                  :title="$t('lists.races')"
                  :style="{ 'margin-top': $_smallDeviceMixin_isDeviceSmall ? '20px' : '-10px', 'padding-bottom': '10px' }">
                  <RacesSubordinateList
                    instant-fill-up
                    no-events
                    :vehicle-register-guid="vehicleRegister.guid"/>
                </GroupCollapse>
              </el-form>
            </Segment>
          </el-col>
        </el-row>
      </div>
    </Form>
  </div>
</template>

<script>
import Form from '@/components/Common/Form'
import Header from '@/components/Common/FormElements/FormHeader'
import Segment from '@/components/Common/FormElements/FormSegment'
import Link from '@/components/Common/FormElements/FormLink'
import Group from '@/components/Common/FormElements/FormGroup'
import GroupCollapse from '@/components/Common/FormElements/FormGroupCollapse'
import ContactInfo from '@/components/Common/ContactInfo'
import MainMenu from '@/components/Common/FormElements/FormMainMenu'
import Point from '@/components/Common/Point'
import RacesSubordinateList from '@/components/Races/SubordinateList'
import Map from '@/components/Common/Map'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-vehicles-registers-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Form,
    Header,
    Segment,
    Link,
    Group,
    GroupCollapse,
    ContactInfo,
    MainMenu,
    Point,
    RacesSubordinateList,
    Map
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

.VehicleRegisterForm__header-subtitle {
  margin-top: 8px;
  color: #909399;
}

@media only screen and (max-width: 991px) {
  .VehicleRegisterForm__contact-info {
    margin-top: 10px;
  }
}
</style>
