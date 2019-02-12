<template>
  <div>
    <Form>
      <Header
        slot="header"
        :title="`${$t('forms.race.title')} №${race.number}`"
        :status-title="$t(race.status.localeKey)"
        :status-color="race.status.color">

        <div class="RaceForm__header-subtitle">
          <div>{{ `${$t('forms.race.date')}: ${race.date}` }}</div>
          <div>
            {{ `${$t('forms.race.lastEvent')}: ${race.lastEvent} - ${race.lastEventDate}` }}
            <span
              class="RaceForm__header-subtitle-events"
              @click="visibleEvents = true">
              {{ $t('forms.race.events') }}
            </span>
          </div>
        </div>

      </Header>

      <div slot="toolbar">
        <MainMenu>

          <AddLink
            v-if="race.vehiclesRegisterGuid"
            :to="$i18n.path(`workspace/vehicles-registers/${race.vehiclesRegisterGuid}`)"
            :title="$t('forms.vehicleRegister.title')"
            :subtitle="`${$t('forms.common.period')}: ${race.vehiclesRegisterDateFrom} - ${race.vehiclesRegisterDateTo}`"/>

          <AddLink
            v-if="race.requestGuid"
            :to="$i18n.path(`workspace/requests/${race.requestGuid}`)"
            :title="$t('forms.request.title') + ' №' + race.requestNumber"
            :subtitle="`${$t('forms.common.date')}: ${race.requestScheduleDate}`"
            :style="{ 'margin-top': '10px' }"/>

          <AddLink
            v-if="race.waybillNumber"
            :title="$t('forms.race.waybill') + ' №' + race.waybillNumber"
            :subtitle="`${$t('forms.common.date')}: ${race.waybillDate}`"
            :style="{ 'margin-top': '40px' }">
            {{ `${$t('forms.common.net')}: ${race.waybillNet}` }}
          </AddLink>

        </MainMenu>
      </div>

      <div slot="content">
        <el-row>
          <el-col :span="24">
            <Segment>
              <el-form
                :model="race"
                label-position="top"
                label-width="100px"
                size="mini">
                <Group :title="$t('forms.common.driverGroup')">
                  <el-row :gutter="20">
                    <el-col :xs="24" :md="8">
                      <el-form-item :label="$t('forms.common.personCred')">
                        <el-input :value="race.driverFullname" readonly></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :md="8">
                      <el-form-item :label="$t('forms.common.driverCert')">
                        <el-input :value="race.driverCert" readonly></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :md="8">
                      <ContactInfo
                        class="RaceForm__contact-info"
                        :value="race.phone"
                        type="phone"/>
                    </el-col>
                  </el-row>

                  <GroupCollapse
                    v-if="race.vehiclesRegisterGuid"
                    :title="$t('forms.race.driverByVehiclesRegister')"
                    :style="{ 'margin-top': $_smallDeviceMixin_isDeviceSmall ? '20px' : '-10px' }">
                    <el-row :gutter="20">
                      <el-col :xs="24" :md="8">
                        <el-form-item :label="$t('forms.common.personCred')">
                          <el-input :value="race.vehicleRegister.driverFullname" readonly></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :xs="24" :md="8">
                        <el-form-item :label="$t('forms.common.driverCert')">
                          <el-input :value="race.vehicleRegister.driverCert" readonly></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :xs="24" :md="8">
                        <ContactInfo
                          class="RaceForm__contact-info"
                          :value="race.vehicleRegister.phone"
                          type="phone"
                          :style="$_smallDeviceMixin_isDeviceSmall ? { 'margin-top': '0', 'margin-bottom': '10px' } : {}"/>
                      </el-col>
                    </el-row>
                  </GroupCollapse>
                </Group>

                <Group :title="$t('forms.common.vehicleGroup')">
                  <el-row :gutter="20">
                    <el-col :xs="24" :md="8">
                      <el-form-item :label="$t('forms.common.vehicleNumber')">
                        <el-input :value="race.vehicleNumber" readonly></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :md="8">
                      <el-form-item :label="$t('forms.common.vehicleTechPass')">
                        <el-input :value="race.vehicleTechPass" readonly></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :md="8">
                      <el-form-item :label="$t('forms.common.vehicleModel')">
                        <el-input :value="race.vehicleBrand" readonly></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <GroupCollapse
                    v-if="race.vehiclesRegisterGuid"
                    :title="$t('forms.race.vehicleByVehiclesRegister')"
                    :style="{ 'margin-top': $_smallDeviceMixin_isDeviceSmall ? '10px' : '-10px' }">
                    <el-row :gutter="20">
                      <el-col :xs="24" :md="8">
                        <el-form-item :label="$t('forms.common.vehicleNumber')">
                          <el-input :value="race.vehicleRegister.vehicleNumber" readonly></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :xs="24" :md="8">
                        <el-form-item :label="$t('forms.common.vehicleTechPass')">
                          <el-input :value="race.vehicleRegister.vehicleTechPass" readonly></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :xs="24" :md="8">
                        <el-form-item :label="$t('forms.common.vehicleModel')">
                          <el-input :value="race.vehicleRegister.vehicleBrand" readonly></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </GroupCollapse>
                </Group>

                <Group :title="$t('forms.common.trailerGroup')">
                  <el-row :gutter="20">
                    <el-col :xs="24" :md="8">
                      <el-form-item :label="$t('forms.common.vehicleNumber')">
                        <el-input :value="race.trailerNumber" readonly></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :md="8">
                      <el-form-item :label="$t('forms.common.vehicleTechPass')">
                        <el-input :value="race.trailerTechPass" readonly></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :md="8">
                      <el-form-item :label="$t('forms.common.vehicleModel')">
                        <el-input :value="race.trailerBrand" readonly></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <GroupCollapse
                    v-if="race.vehiclesRegisterGuid"
                    :title="$t('forms.race.trailerByVehiclesRegister')"
                    :style="{ 'margin-top': $_smallDeviceMixin_isDeviceSmall ? '10px' : '-10px' }">
                    <el-row :gutter="20">
                      <el-col :xs="24" :md="8">
                        <el-form-item :label="$t('forms.common.vehicleNumber')">
                          <el-input :value="race.vehicleRegister.trailerNumber" readonly></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :xs="24" :md="8">
                        <el-form-item :label="$t('forms.common.vehicleTechPass')">
                          <el-input :value="race.vehicleRegister.trailerTechPass" readonly></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :xs="24" :md="8">
                        <el-form-item :label="$t('forms.common.vehicleModel')">
                          <el-input :value="race.vehicleRegister.trailerBrand" readonly></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </GroupCollapse>
                </Group>

                <Group>
                  <el-row :gutter="20">
                    <el-col :xs="24" :md="24">
                      <Goods
                        :goods="race.goods"
                        :desc="race.goodsDesc"
                        :horizontal="!$_smallDeviceMixin_isDeviceSmall"/>
                    </el-col>

                    <el-col :xs="24" :md="4">
                      <el-form-item :label="$t('forms.race.quantityT')">
                        <el-input :value="race.quantity" readonly></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </Group>

                <Group>
                  <Warehouse
                    :code="race.warehouseFromCode"
                    :label="$t('forms.common.warehouseFrom')"/>

                  <Warehouse
                    :code="race.warehouseToCode"
                    :label="$t('forms.common.warehouseTo')"/>
                </Group>

                <Group>
                  <Point
                    :name="race.pointFromName"
                    :koatuu="race.pointFromKoatuu"
                    :label="$t('forms.common.pointFrom')"/>

                  <Point
                    :name="race.pointToName"
                    :koatuu="race.pointToKoatuu"
                    :label="$t('forms.common.pointTo')"/>
                </Group>

                <Group :title="$t('forms.common.route')">
                  <Map
                    koatuu
                    :pointFromKoatuu="race.pointFromKoatuu"
                    :pointToKoatuu="race.pointToKoatuu"/>
                </Group>
              </el-form>
            </Segment>
          </el-col>
        </el-row>
      </div>
    </Form>

    <RightView
      :visible="visibleEvents"
      :title="$t('forms.race.events')"
      @close="visibleEvents = false"/>
  </div>
</template>

<script>
import Form from '@/components/Common/Form'
import Header from '@/components/Common/FormElements/FormHeader'
import Segment from '@/components/Common/FormElements/FormSegment'
import AddLink from '@/components/Common/FormElements/FormLink'
import Group from '@/components/Common/FormElements/FormGroup'
import GroupCollapse from '@/components/Common/FormElements/FormGroupCollapse'
import ContactInfo from '@/components/Common/ContactInfo'
import Goods from '@/components/Common/GoodsField'
import RightView from '@/components/Common/RightView'
import MainMenu from '@/components/Common/FormElements/FormMainMenu'
import Point from '@/components/Common/Point'
import Warehouse from '@/components/Common/Warehouse'
import Map from '@/components/Common/Map'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-race-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Form,
    Header,
    Segment,
    AddLink,
    Group,
    GroupCollapse,
    ContactInfo,
    Goods,
    RightView,
    MainMenu,
    Point,
    Warehouse,
    Map
  },

  data() {
    return {
      race: {},

      visibleEvents: false
    }
  },

  created() {
    this.race = this.$store.getters['races/getRace']
  }
}
</script>

<style lang="scss" scoped>
.RaceForm__header-subtitle {
  margin-top: 8px;
  color: #909399;

  .RaceForm__header-subtitle-events {
    color: #FECD34;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.RaceForm__contact-info {
  margin-top: 40px;
}

@media only screen and (max-width: 991px) {
  .RaceForm__contact-info {
    margin-top: 10px;
  }
}
</style>

