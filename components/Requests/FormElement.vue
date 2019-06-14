<template>
  <div class="RequestForm__wrapper">
    <div class="th-request-form">
      <Form>
        <Header
          slot="header"
          :title="`${$t('forms.request.title')} №${request.number}`"
          :status-title="$t(request.status.localeKey)"
          :status-color="request.status.color">

          <div class="RequestForm__header-subtitle">
            <div>
              {{ `${$t('forms.common.createdAt')}: ${request.scheduleDate}` }}
            </div>
          </div>

        </Header>

        <div slot="toolbar">
          <MainMenu>

            <div class="th-request-form-more-container" v-show="!!request.orderGuid">
              <nuxt-link
                style="text-decoration: none; color: inherit"
                :to="$i18n.path(`workspace/orders/${request.orderGuid}`)">
                <div class="th-request-form-more-order th-request-form-more-link">
                  <div>{{ $t('forms.request.order') + ' №' + request.orderNumber }}</div>
                  <span>{{ request.orderDate }}</span>
                </div>
              </nuxt-link>
            </div>

            <div class="th-request-form-more-container">
              <div class="th-request-form-more-title">{{ $t('forms.request.client') }}</div>
              <div class="th-request-form-more-client">
                <th-company-avatar
                  v-if="request.clientName"
                  :style="'margin-right: 5px;'"
                  :name="request.clientName || ' '" />
                <p>
                  {{ request.clientName }}
                </p>
              </div>
            </div>

            <div class="th-request-form-more-container" v-show="!!request.logistName">
              <div class="th-request-form-more-title">{{ $t('forms.request.logist') }}</div>
              <div>
                <div class="th-request-form-more-logist-field">
                  <span><fa icon="user"/></span>
                  {{ request.logistName }}
                </div>
                <div class="th-request-form-more-logist-field" v-if="request.logistEmail">
                  <ContactInfo :value="request.logistEmail" type="mail"/>
                </div>
                <div class="th-request-form-more-logist-field" v-if="request.logistPhone">
                  <ContactInfo :value="request.logistPhone" type="phone"/>
                </div>
              </div>
            </div>

            <div class="th-request-form-more-container" v-show="!!request.agreementNumber">
              <div class="th-request-form-more-title">{{ $t('forms.request.agreement') }}</div>
              <div>
                <div class="th-request-form-more-agreement-field">
                  <span>{{ $t('forms.request.agreementNumber') + ':' }}</span>
                  {{ request.agreementNumber }}
                </div>
                <div class="th-request-form-more-agreement-field">
                  <span>{{ $t('forms.request.agreementDate') + ':' }}</span>
                  {{ request.agreementDate }}
                </div>
              </div>
            </div>

            <div class="th-request-form-more-container" v-show="!!request.info">
              <div class="th-request-form-more-title">{{ $t('forms.request.more') }}</div>
              <div>
                <div
                  class="th-request-from-more-comment-field th-request-form-more-link"
                  @click="infoFullView = true">
                  {{ request.info }}
                </div>
              </div>
            </div>

          </MainMenu>
        </div>

        <div slot="content">
          <el-row>
            <el-col :span="24">
              <Segment>
                <el-form :model="request" label-position="top" label-width="100px" size="mini">
                  <el-row :gutter="20">
                    <el-col :xs="24" :md="6">
                      <DateField
                        :loadDate="request.warehouseLoadDate"
                        :horizontal="!$_smallDeviceMixin_isDeviceSmall"/>
                    </el-col>

                    <el-col :xs="24" :md="6">
                      <!-- <el-form-item :label="$t('forms.common.goods')">
                        <el-input v-model="request.goodsName" readonly></el-input>
                      </el-form-item> -->
                      <Goods
                        :goods="request.goodsName"
                        :desc="request.goodsDesc"
                        :horizontal="!$_smallDeviceMixin_isDeviceSmall"/>
                    </el-col>

                    <el-col :xs="24" :md="24">
                      <!-- <Group :title="$t('forms.common.points')"> -->
                      <Group>
                        <!-- <Point
                          :name="request.pointFromName"
                          :koatuu="request.pointFromKoatuu"
                          :lat="+request.pointFromLat"
                          :lng="+request.pointFromLng"
                          :label="$t('forms.common.pointFrom')"
                        /> -->

                        <!-- <Point
                          :name="request.pointToName"
                          :koatuu="request.pointToKoatuu"
                          :lat="+request.pointToLat"
                          :lng="+request.pointToLng"
                          :label="$t('forms.common.pointTo')"/> -->
                      </Group>
                    </el-col>
                  </el-row>
                </el-form>

                <el-tabs v-model="activeTab" @tab-click="tabClick">
                  <el-tab-pane name="main">
                    <span slot="label"><fa icon="home" style="padding-right: 5px" />
                      {{ $t('forms.request.tabs.main') }}
                    </span>

                    <el-form :model="request" label-position="top" label-width="100px" size="mini">
                      <div
                        class="th-request-form-main-tab-body"
                        style=" padding-bottom: 30px ">
                        <div class="th-request-form-main-tab-body-title">
                          <span>{{ $t('forms.request.quantity') }}</span>
                          <span
                            class="th-request-form-main-tab-body-title-link"
                            @click="visibleQuantityHistory = true">{{ $t('forms.request.quantityHistory') }}</span>
                        </div>
                        <el-row :gutter="20">
                          <el-col :xs="24" :md="5">
                            <el-form-item :label="$t('forms.common.rate')">
                              <el-input v-model="request.rate" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :md="3">
                            <el-form-item :label="$t('forms.common.rateOfLoss')">
                              <el-input v-model="request.rateOfLoss" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :md="3">
                            <el-form-item :label="$t('forms.request.quantityT')">
                              <el-input v-model="request.quantityT" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :md="4">
                            <el-form-item :label="$t('forms.request.quantityVehicles')">
                              <el-input v-model="request.quantityVehicles" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <!-- <el-col :xs="24" :md="4">
                            <el-form-item :label="$t('forms.request.typeVehicle')">
                              <el-input v-model="request.typeVehicle" readonly></el-input>
                            </el-form-item>
                          </el-col> -->
                          <el-col :xs="24" :md="4">
                            <el-form-item :label="$t('forms.request.vehiclesLimitation')">
                              <el-switch
                                :value="request.vehiclesLimitation === 1"
                                :active-text="$t('forms.common.yes')"
                                :inactive-text="$t('forms.common.no')"
                                readonly/>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="24">
                            <el-form-item :label="$t('forms.common.comment')">
                              <el-input
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 20}"
                                :placeholder="$t('forms.common.commentPlaceholder')"
                                :value="request.comment"
                                readonly>
                              </el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>

                      <!-- <div class="th-request-form-main-tab-body">
                        <div class="th-request-form-main-tab-body-title">{{ $t('forms.request.warehouses') }}</div>
                        <el-row :gutter="20">
                          <el-col :xs="24" :md="6">
                            <el-form-item :label="$t('forms.request.warehouseFrom')">
                              <el-input v-model="request.warehouseFromName" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :md="13">
                            <el-form-item :label="$t('forms.common.address')">
                              <el-input v-model="request.warehouseFromAddressPointed" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :md="5">
                            <el-form-item :label="$t('forms.common.workPeriod')">
                              <el-input :value="`${request.warehouseFromScheduleFrom} - ${request.warehouseFromScheduleTo}`" readonly></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :xs="24" :md="6">
                            <el-form-item :label="$t('forms.request.warehouseTo')">
                              <el-input v-model="request.warehouseToName" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :md="13">
                            <el-form-item :label="$t('forms.common.address')">
                              <el-input v-model="request.warehouseToAddressPointed" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :md="5">
                            <el-form-item :label="$t('forms.common.workPeriod')">
                              <el-input :value="`${request.warehouseToScheduleFrom} - ${request.warehouseToScheduleTo}`" readonly></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div> -->
                    </el-form>
                  </el-tab-pane>

                  <el-tab-pane name="warehouses">
                    <span slot="label"><fa icon="warehouse" style="padding-right: 5px" />
                      {{ $t('forms.request.tabs.warehouses') }}
                    </span>

                    <Group :title="$t('forms.request.warehouses')">
                      <Warehouse
                        :code="request.warehouseFromCode"
                        :label="$t('forms.common.warehouseFrom')"
                        :isInRequest="true"
                        :scheduleFrom="request.warehouseFromScheduleFrom"
                        :scheduleTo="request.warehouseFromScheduleTo"/>

                      <Warehouse
                        :code="request.warehouseToCode"
                        :label="$t('forms.common.warehouseTo')"
                        :isInRequest="true"
                        :scheduleFrom="request.warehouseToScheduleFrom"
                        :scheduleTo="request.warehouseToScheduleTo"/>
                    </Group>
                    <!-- <el-form :model="request" label-position="top" label-width="100px" size="mini">
                      <div class="th-request-form-warehouses-tab-body">
                        <el-row :gutter="20">
                          <el-col :xs="24" :md="6">
                            <el-form-item :label="$t('forms.common.warehouseFrom')">
                              <el-input v-model="request.warehouseFromName" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :md="6">
                            <el-form-item :label="$t('forms.common.warehouseRegion')">
                              <el-input v-model="request.warehouseFromAddressPointed" readonly></el-input>
                            </el-form-item>
                          </el-col>
                           <el-col :xs="24" :md="6">
                            <el-form-item :label="$t('forms.common.warehouseDistrict')">
                              <el-input v-model="request.warehouseFromAddressPointed" readonly></el-input>
                            </el-form-item>
                          </el-col>
                           <el-col :xs="24" :md="6">
                            <el-form-item :label="$t('forms.common.warehouseSettlement')">
                              <el-input v-model="request.warehouseFromAddressPointed" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :md="6">
                            <el-form-item :label="$t('forms.common.warehouseStreet')">
                              <el-input v-model="request.warehouseFromAddressPointed" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :md="5">
                            <el-form-item :label="$t('forms.common.workPeriod')">
                              <el-input :value="`${request.warehouseFromScheduleFrom} - ${request.warehouseFromScheduleTo}`" readonly></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </el-form> -->
                  </el-tab-pane>

                  <el-tab-pane name="route">
                    <span slot="label"><fa icon="map-signs" style="padding-right: 5px" />
                      {{ $t('forms.request.tabs.route') }}
                    </span>
                    <!-- <Group :title="$t('forms.common.points')">
                      <Point
                        :name="request.pointFromName"
                        :koatuu="request.pointFromKoatuu"
                        :label="$t('forms.common.pointFrom')"/>

                      <Point
                        :name="request.pointToName"
                        :koatuu="request.pointToKoatuu"
                        :label="$t('forms.common.pointTo')"/>
                    </Group> -->

                    <Map
                      :title="$t('forms.request.tabs.route')"
                      koatuu
                      :point-from-koatuu="request.pointFromKoatuu"
                      :point-to-koatuu="request.pointToKoatuu"
                    />

                    <!-- <GoogleMap>
                      <template v-slot:default="{ google, map }">
                        <GoogleMapDirection
                          :google="google"
                          :map="map"
                          :origin="request.pointFromKoatuu"
                          :destination="request.pointToKoatuu"
                        />
                      </template>
                    </GoogleMap> -->
                  </el-tab-pane>

                  <!-- <el-tab-pane name="regv">
                    <span slot="label"><fa icon="book-open" style="padding-right: 5px" />
                      {{ $t('forms.request.tabs.regv') }}
                    </span>

                    <VehiclesRegistersList
                      ref="regv"
                      instant-fill-up
                      :request-guid="$route.params.guid"/>
                  </el-tab-pane> -->

                  <!-- <el-tab-pane name="races">
                    <span slot="label"><fa icon="shipping-fast" style="padding-right: 5px" />
                      {{ $t('forms.request.tabs.races') }}
                    </span>

                    <RacesList
                      ref="regv"
                      instant-fill-up
                      :request-guid="$route.params.guid"/>
                  </el-tab-pane> -->
                </el-tabs>
              </Segment>
              <div class="th-request-form-body-wrapper">
                <div class="th-request-form-body">

                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </Form>
    </div>

    <QuantityHistory
      :visible="visibleQuantityHistory"
      :request="$route.params.guid"
      @close="visibleQuantityHistory = false"/>

    <TextFullView
      :visible="infoFullView"
      :text="request.info"
      @close="infoFullView = false"/>
  </div>
</template>

<script>
import Header from '@/components/Common/FormElements/FormHeader'
import Segment from '@/components/Common/FormElements/FormSegment'
import Form from "@/components/Common/Form"
import Toolbar from "@/components/Common/ListToolbar"
// import VehiclesRegistersList from "@/components/VehiclesRegisters/SubordinateList"
// import RacesList from "@/components/Races/SubordinateList"
import Avatar from "@/components/Companies/CompanyAvatar"
import ContactInfo from "@/components/Common/ContactInfo"
import Goods from "@/components/Common/GoodsField"
import TextFullView from '@/components/Common/TextFullView'
import MainMenu from '@/components/Common/FormElements/FormMainMenu'
import QuantityHistory from '@/components/Requests/ElementQuantityHistory'
import Map from '@/components/Common/Map'
import Point from '@/components/Common/Point'
import Group from "@/components/Common/FormElements/FormGroup"
import Warehouse from '@/components/Common/Warehouse'
import DateField from '@/components/Common/DateField'

import { getStatusPresentation } from "@/utils/requests"
import { GoogleMaps } from "@/utils/maps"

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"

export default {
  name: 'th-request-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Header,
    Segment,
    Form,
    // VehiclesRegistersList,
    // RacesList,
    "th-company-avatar": Avatar,
    ContactInfo,
    Goods,
    TextFullView,
    MainMenu,
    QuantityHistory,
    Map,
    // Point,
    Group,
    Warehouse,
    DateField,
    // GoogleMap,
    // GoogleMapDirection
  },

  data() {
    return {
      request: {},

      activeTab: "main",
      visibleQuantityHistory: false,

      dialogVisible: false,
      vehicleRegisterVisible: false,
      infoFullView: false,

      vehicleRegisterCurrentGuid: '',
    }
  },

  created() {
    this.request = this.$store.getters["requests/getRequest"]
  },

  methods: {
    tabClick(tab) {
      if (tab.name !== "main") {
        this.visibleQuantityHistory = false
      }
    },
    onVehiclesRegistersRowClick(guid) {
      this.vehicleRegisterCurrentGuid = guid
      this.vehicleRegisterVisible = true
    }
  },

  computed: {
    status: function() {
      return getStatusPresentation(this.request.statusCode)
    },
    statusColor: function() {
      return this.status.color
    },
    statusTitle: function() {
      return this.status.localeKey
    }
  },

  watch: {
    $_smallDeviceMixin_isDeviceSmall(newValue) {
      if (!newValue && this.activeTab === "more") {
        this.activeTab = "main"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.RequestForm__wrapper {
  // max-width: 1000px;

  .th-request-form {
    .RequestForm__header-subtitle {
      margin-top: 8px;
      color: #909399;
    }

    .th-request-form-main-tab-body {
      .th-request-form-main-tab-body-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 15px;

        .th-request-form-main-tab-body-title-link {
          font-size: 13px;
          font-weight: 300;
          text-decoration: underline;
          cursor: pointer;
          margin-left: 10px;

          &:hover {
            color: #fecd34;
          }
        }
      }
    }

    .th-request-form-side-wrapper {
      margin-left: 20px;

      .th-request-form-side {
        overflow-y: auto;
        max-height: calc(100vh - 155px);
        background-color: #fff;
        border-radius: 5px;
        padding: 25px 40px;
        border: 1px solid #ebeef5;
        // border: 1px solid #fff;

        .th-request-form-more-container {
          margin-bottom: 35px;
        }
      }
    }
  }
}

.th-request-form-body-tab-more {
  padding: 10px 10px;
}

.th-request-form-more-link {
  margin: -10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
}

.th-request-form-more-order {
  div {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  span {
    color: #909399;
  }
}

.th-request-form-more-container {
  margin-bottom: 25px;

  .th-request-form-more-title {
    margin-bottom: 15px;
    color: #606266;
  }

  .th-request-form-more-client {
    display: flex;
    flex-direction: row;

    p {
      margin-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 40px;
    }
  }

  div .th-request-form-more-logist-field {
    margin-bottom: 5px;

    span {
      margin-right: 5px;
      font-size: 10px;
    }
  }

  div .th-request-form-more-agreement-field {
    margin-bottom: 5px;

    span {
      color: #606266;
    }
  }

  div .th-request-from-more-comment-field {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
}

.th-rightview-body-boxcard {
  width: 90%;
  display: flex;
  align-self: flex-start;

  .item {
    padding: 10px 0;
  }
}
</style>
