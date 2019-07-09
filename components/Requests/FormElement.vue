<template>
  <div class="RequestForm__wrapper">
    <div class="RequestForm__wrapper__form">
      <Form>
        <Header
          slot="header"
          :title="`${$t('forms.request.title')} №${request.number}`"
          :status-title="$t(request.status.localeKey)"
          :status-color="request.status.color">

          <div class="RequestForm__wrapper__form__header__subtitle">
            <div>
              {{ `${$t('forms.common.createdAt')}: ${request.createdAt}` }}
            </div>
          </div>
        </Header>

        <div slot="toolbar">
          <ButtonsGroup>
            <Button
              v-if="!$_smallDeviceMixin_isDeviceSmall && request.userStatus !== USER_STATUSES.ARCHIVED"
              type=""
              faIcon="archive"
              round
              style="margin-right: 10px"
              :loading="archiveLoading"
              @click="handleArchive"
            >
              {{ $t('forms.common.archive') }}
            </Button>

            <MainMenu v-if="$_smallDeviceMixin_isDeviceSmall">
              <Button
                v-if="request.userStatus !== USER_STATUSES.ARCHIVED"
                type=""
                fa-icon="archive"
                round
                flat
                :loading="archiveLoading"
                @click="handleArchive"
              >
                {{ $t('forms.common.archive') }}
              </Button>
            </MainMenu>
          </ButtonsGroup>
        </div>

        <div slot="content">
          <Segment>
            <div class="RequestForm__wrapper__form-main">

              <div class="RequestForm__wrapper__form-main__main">
                 <div class="RequestForm__wrapper__form-main__main__left">
                  <Group
                    class="RequestForm__wrapper__form-main__main__left-group"
                    :title="$t('forms.common.essential')"
                    big-title>

                    <div class="RequestForm__wrapper__form-main__main__left-group__date-goods">
                      <FormField
                        :title="$t('forms.common.warehouseLoadDate')"
                        :value="request.scheduleDate"/>

                      <FormField
                        class="RequestForm__wrapper__form-main__main__left-group__date-goods__field"
                        :title="$t('forms.common.goods')"
                        :value="request.goodsName"
                      />
                    </div>
                  </Group>

                  <Group
                    class="RequestForm__wrapper__form-main__main__left-quantity-group small-margin"
                    :title="$t('forms.request.quantity')"
                    big-title>
                    <span
                        class="RequestForm__wrapper__form-main__main__left-quantity-group__link"
                        @click="visibleQuantityHistory = true">
                        {{ $t('forms.request.quantityHistory') }}
                    </span>

                    <div class="RequestForm__wrapper__form-main__main__left-quantity-group__quantity">
                      <FormField
                        :title="$t('forms.request.quantityT')"
                        :value="request.quantityT"/>

                      <FormField
                        class="RequestForm__wrapper__form-main__main__left-quantity-group__quantity__field"
                        :title="$t('forms.request.quantityVehicles')"
                        :value="request.quantityVehicles"
                      />

                      <FormField
                        class="RequestForm__wrapper__form-main__main__left-quantity-group__quantity__field"
                        :title="$t('forms.common.rate')"
                        :value="request.goodsCost"
                      />

                      <FormField
                        class="RequestForm__wrapper__form-main__main__left-quantity-group__quantity__field"
                        :title="$t('forms.common.rateOfLoss')"
                        :value="request.rateOfLoss"
                      />

                      <div class="RequestForm__wrapper__form-main__main__left-quantity-group__quantity__limit">
                        <FormField
                          class="RequestForm__wrapper__form-main__main__left-quantity-group__quantity__title"
                          :title="$t('forms.request.vehiclesLimitation')"
                        />
                        <el-switch
                          :value="request.vehiclesLimitation === 1"
                          :active-text="$t('forms.common.yes')"
                          :inactive-text="$t('forms.common.no')"
                          readonly
                          style="margin-top: -4px;"/>
                      </div>
                    </div>

                    <div
                      v-if="request.comment"
                      class="RequestForm__wrapper__form-main__main__left-quantity-group__quantity__comment"
                    >
                      <FormField
                        :title="$t('forms.common.comment')"
                        :value="request.comment"
                      />
                    </div>
                  </Group>
                </div>

                <div class="RequestForm__wrapper__form-main__main__right">
                   <FormField
                    style="padding-top: 0"
                    :title="$t('forms.common.client')"
                    big-title>
                    <Company :name="request.clientName"/>
                  </FormField>

                  <FormField
                    :style="{ 'padding-top': 0, 'margin-top': '30px' }"
                    :title="$t('forms.request.logist')"
                    big-title>
                    <User
                      username-only
                      :username="request.logistName"
                      :email="request.logistEmail"
                      :phone="request.logistPhone"
                    />
                  </FormField>
                </div>
              </div>

              <Group
                class="RequestForm__wrapper__form-main__map small-margin"
                :title="$t('forms.request.tabs.route')"
                big-title>

                <Map
                  class="RequestForm__wrapper__form-main__map__item"
                  koatuu
                  :origin="{ lat: +request.warehouseFromLat ,lng: +request.warehouseFromLng }"
                  :destination="{ lat: +request.warehouseToLat ,lng: +request.warehouseToLng }"
                />
              </Group>

              <Group
                class="RequestForm__wrapper__form-main__warehouses"
                :title="$t('forms.request.warehouses')"
                big-title>

                <Warehouse
                  :code="request.warehouseFromCode"
                  :label="$t('forms.common.warehouseFrom')"
                  :isInRequest="true"
                  :scheduleFrom="request.warehouseFromScheduleFrom"
                  :scheduleTo="request.warehouseFromScheduleTo"
                  :lat="request.warehouseFromLat"
                  :lng="request.warehouseFromLng"
                />

                <Warehouse
                  :code="request.warehouseToCode"
                  :label="$t('forms.common.warehouseTo')"
                  :isInRequest="true"
                  :scheduleFrom="request.warehouseToScheduleFrom"
                  :scheduleTo="request.warehouseToScheduleTo"
                  :lat="request.warehouseToLat"
                  :lng="request.warehouseToLng"
                />
              </Group>
            </div>
          </Segment>

          <!-- <el-row>
            <el-col :span="24">
              <Segment>
                <el-form :model="request" label-position="top" label-width="100px" size="mini">
                  <el-row :gutter="20">
                    <el-col :xs="24" :md="6">
                      <DateField
                        :loadDate="request.scheduleDate"
                        :horizontal="!$_smallDeviceMixin_isDeviceSmall"
                      />
                    </el-col>

                    <el-col :xs="24" :md="6">
                      <Goods
                        :goods="request.goodsName"
                        :desc="request.goodsDesc"
                        :horizontal="!$_smallDeviceMixin_isDeviceSmall"
                      />
                    </el-col>

                    <el-col :xs="24" :md="24">
                      <Group :title="$t('forms.common.points')">
                      <Group>
                        <Point
                          :name="request.pointFromName"
                          :koatuu="request.pointFromKoatuu"
                          :lat="+request.pointFromLat"
                          :lng="+request.pointFromLng"
                          :label="$t('forms.common.pointFrom')"
                        />

                        <Point
                          :name="request.pointToName"
                          :koatuu="request.pointToKoatuu"
                          :lat="+request.pointToLat"
                          :lng="+request.pointToLng"
                          :label="$t('forms.common.pointTo')"/>
                      </Group>
                    </el-col>
                  </el-row>
                </el-form>

                <el-tabs v-model="activeTab" @tab-click="tabClick">
                  <el-tab-pane name="main">
                    <span slot="label">{{ $t('forms.request.tabs.main') }}</span>

                    <el-form :model="request" label-position="top" label-width="100px" size="mini">
                      <div
                        class="RequestForm__wrapper__form-main-tab-body"
                        style=" padding-bottom: 30px ">
                        <div class="RequestForm__wrapper__form-main-tab-body-title">
                          <span>{{ $t('forms.request.quantity') }}</span>
                          <span
                            class="RequestForm__wrapper__form-main-tab-body-title-link"
                            @click="visibleQuantityHistory = true">{{ $t('forms.request.quantityHistory') }}</span>
                        </div>
                        <el-row :gutter="20">
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
                          <el-col :xs="24" :md="5">
                            <el-form-item :label="$t('forms.common.rate')">
                              <el-input v-model="request.goodsCost" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :md="3">
                            <el-form-item :label="$t('forms.common.rateOfLoss')">
                              <el-input v-model="request.rateOfLoss" readonly></el-input>
                            </el-form-item>
                          </el-col>

                          <el-col :xs="24" :md="4">
                            <el-form-item :label="$t('forms.request.typeVehicle')">
                              <el-input v-model="request.typeVehicle" readonly></el-input>
                            </el-form-item>
                          </el-col>

                          <el-col :xs="24" :md="4">
                            <el-form-item :label="$t('forms.request.vehiclesLimitation')">
                              <el-switch
                                :value="request.vehiclesLimitation === 1"
                                :active-text="$t('forms.common.yes')"
                                :inactive-text="$t('forms.common.no')"
                                readonly
                              />
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="24">
                            <el-form-item :label="$t('forms.common.comment')">
                              <el-input
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 20}"
                                :placeholder="$t('forms.common.comment')"
                                :value="comment"
                                readonly
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>

                      <div class="RequestForm__wrapper__form-main-tab-body">
                        <div class="RequestForm__wrapper__form-main-tab-body-title">{{ $t('forms.request.warehouses') }}</div>
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
                      </div>
                    </el-form>
                  </el-tab-pane>

                  <el-tab-pane name="route">
                    <span slot="label">{{ $t('forms.request.tabs.route') }}</span>

                    <Map
                      :title="$t('forms.request.tabs.route')"
                      koatuu
                      :origin="{ lat: +request.warehouseFromLat ,lng: +request.warehouseFromLng }"
                      :destination="{ lat: +request.warehouseToLat ,lng: +request.warehouseToLng }"
                    />
                  </el-tab-pane>

                  <el-tab-pane name="warehouses">
                    <span slot="label">{{ $t('forms.request.tabs.warehouses') }}</span>

                    <Group :title="$t('forms.request.warehouses')">
                      <Warehouse
                        :code="request.warehouseFromCode"
                        :label="$t('forms.common.warehouseFrom')"
                        :isInRequest="true"
                        :scheduleFrom="request.warehouseFromScheduleFrom"
                        :scheduleTo="request.warehouseFromScheduleTo"
                        :lat="request.warehouseFromLat"
                        :lng="request.warehouseFromLng"
                        :type-train="request.warehouseFromAutotrainType"
                        :height-train="request.warehouseFromMaxHeight"
                        :load-capacity="request.warehouseFromMaxWeight"
                        :type-scale="request.warehouseFromWeightType"
                        :length-platform="request.warehouseFromMaxLength"
                      />

                      <Warehouse
                        :code="request.warehouseToCode"
                        :label="$t('forms.common.warehouseTo')"
                        :isInRequest="true"
                        :scheduleFrom="request.warehouseToScheduleFrom"
                        :scheduleTo="request.warehouseToScheduleTo"
                        :lat="request.warehouseToLat"
                        :lng="request.warehouseToLng"
                        :type-train="request.warehouseToAutotrainType"
                        :height-train="request.warehouseToMaxHeight"
                        :load-capacity="request.warehouseToMaxWeight"
                        :type-scale="request.warehouseToWeightType"
                        :length-platform="request.warehouseToMaxLength"
                      />
                    </Group>
                    <el-form :model="request" label-position="top" label-width="100px" size="mini">
                      <div class="RequestForm__wrapper__form-warehouses-tab-body">
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
                    </el-form>
                  </el-tab-pane>


                  <el-tab-pane name="regv">
                    <span slot="label"><fa icon="book-open" style="padding-right: 5px" />
                      {{ $t('forms.request.tabs.regv') }}
                    </span>

                    <VehiclesRegistersList
                      ref="regv"
                      instant-fill-up
                      :request-guid="$route.params.guid"/>
                  </el-tab-pane>

                  <el-tab-pane name="races">
                    <span slot="label"><fa icon="shipping-fast" style="padding-right: 5px" />
                      {{ $t('forms.request.tabs.races') }}
                    </span>

                    <RacesList
                      ref="regv"
                      instant-fill-up
                      :request-guid="$route.params.guid"/>
                  </el-tab-pane>
                </el-tabs>
              </Segment>
              <div class="RequestForm__wrapper__form-body-wrapper">
                <div class="RequestForm__wrapper__form-body">

                </div>
              </div>
            </el-col>
          </el-row> -->
        </div>
      </Form>
    </div>

    <QuantityHistory
      :visible="visibleQuantityHistory"
      :request="$route.params.guid"
      @close="visibleQuantityHistory = false"
    />

    <TextFullView :visible="infoFullView" :text="request.info" @close="infoFullView = false"/>
  </div>
</template>

<script>
import Header from "@/components/Common/FormElements/FormHeader";
import Segment from "@/components/Common/FormElements/FormSegment";
import Form from "@/components/Common/Form";
import Toolbar from "@/components/Common/ListToolbar";
// import VehiclesRegistersList from "@/components/VehiclesRegisters/SubordinateList"
// import RacesList from "@/components/Races/SubordinateList"
// import Avatar from "@/components/Companies/CompanyAvatar"
// import ContactInfo from "@/components/Common/ContactInfo"
//import Goods from "@/components/Common/GoodsField"
import TextFullView from '@/components/Common/TextFullView'
import MainMenu from '@/components/Common/FormElements/FormMainMenu'
import QuantityHistory from '@/components/Requests/ElementQuantityHistory'
import Map from '@/components/Common/Map'
//import Point from '@/components/Common/Point'
import Group from "@/components/Common/FormElements/FormGroup"
import Warehouse from '@/components/Common/Warehouse'
//import DateField from '@/components/Common/DateField'
import FormField from '@/components/Common/FormElements/FormField'
import Company from '@/components/Companies/Company'
import User from '@/components/Users/User'

import { USER_STATUSES } from "@/utils/requests";
import { GoogleMaps } from "@/utils/maps";
import Button from '@/components/Common/Buttons/Button';
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup';

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

export default {
  name: "th-request-form",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Header,
    Segment,
    Form,
    // VehiclesRegistersList,
    // RacesList,
    // "th-company-avatar": Avatar,
    // ContactInfo,
    // Goods,
    TextFullView,
   MainMenu,
    QuantityHistory,
    Map,
    //Point,
    Group,
    Warehouse,
    //DateField,
    FormField,
    Company,
    User,
    // GoogleMap,
    // GoogleMapDirection,
    Button,
    ButtonsGroup
  },

  data() {
    return {
      activeTab: "route",
      visibleQuantityHistory: false,

      dialogVisible: false,
      vehicleRegisterVisible: false,
      infoFullView: false,

      vehicleRegisterCurrentGuid: "",

      archiveLoading: false,

      USER_STATUSES
    };
  },

  computed: {
    request() {
      return this.$store.getters["requests/getRequest"]
    },
    comment() {
      let comment = "";
      if (this.request.comment2) {
        comment = this.request.comment2;
      }

      if (this.request.comment) {
        comment = this.request.comment + "\r\n" + comment;
      }

      return comment;
    },
    status: function() {
      return this.request.status
    },
    statusColor: function() {
      return this.status.color;
    },
    statusTitle: function() {
      return this.status.localeKey;
    }
  },

  methods: {
    tabClick(tab) {
      if (tab.name !== "main") {
        this.visibleQuantityHistory = false;
      }
    },
    onVehiclesRegistersRowClick(guid) {
      this.vehicleRegisterCurrentGuid = guid;
      this.vehicleRegisterVisible = true;
    },
    async handleArchive() {
      this.archiveLoading = true
      await this.$store.dispatch('requests/archiveRequest', this.request.guid)
      this.archiveLoading = false
    }
  },

  watch: {
    $_smallDeviceMixin_isDeviceSmall(newValue) {
      if (!newValue && this.activeTab === "more") {
        this.activeTab = "main";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.RequestForm__wrapper {
  // max-width: 1000px;

  &__form {
    &__header__subtitle {
      margin-top: 8px;
      color: #909399;
    }

    &-main-tab-body {
      &-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 15px;

        &-link {
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

    &-body-tab-more {
      padding: 10px 10px;
    }

    &__container-side {
      margin-bottom: 35px;

      &__order {
        div {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 5px;
        }

        span {
          color: #909399;
        }
      }

      &__title {
        margin-bottom: 15px;
        color: #606266;
      }

      &__client {
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

      &__logist {
        margin-bottom: 5px;

        span {
          margin-right: 5px;
          font-size: 10px;
        }
      }

      &__agreement {
        margin-bottom: 5px;

        span {
          color: #606266;
        }
      }

      &__comment {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
      }
    }

    &-main {
      width: 100%;

      .small-margin {
        margin-top: 24px;
      }

      &__main {
        display: flex;
        flex-direction: row;

        &__left {
          min-width: 70%;
          display: flex;
          flex-direction: column;

          &-group {
            display: flex;
            flex-direction: column;

            &__date-goods {
              display: flex;
              flex-direction: row;

              &__field {
                margin-left: 45px;
              }
            }
          }

           &-quantity-group {
            margin-top: 50px;
            display: flex;
            flex-direction: column;

            &__link {
              font-size: 13px;
              font-weight: 300;
              text-decoration: underline;
              cursor: pointer;
              color: #000;

              &:hover {
                color: #fecd34;
                transition: ease-in-out .3s;
              }
            }

            &__quantity {
              display: flex;
              flex-direction: row;

              &__limit {
                display: flex;
                flex-direction: column;
              }

              &__field, &__limit {
                margin-left: 45px;
              }

              &__limit {
                padding: 10px 0;
              }

              &__title {
                padding: 0;
              }
            }
          }
        }

        &__right {
          min-width: 25%;
          display: flex;
          flex-direction: column;
          margin-top: 25px;
          padding-left: 5%;
        }
      }

      &__map {
        &__item {
          margin-top: 30px;
        }
      }

      &__warehouses {
        margin: {
          top: 50px;
          bottom: 50px;
        }
      }
    }
  }
}

.link {
  margin: -10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
}

.Warehouse {
  padding: 15px !important;
  margin: 0 !important;
}

@media only screen and (max-width: 991px) {
  .RequestForm__wrapper__form-main__main {
    flex-direction: column !important;

    .small-margin {
      margin-top: 14px;
    }

    &__right {
      width: 100%;
      padding-left: 0 !important;
    }

    &__left {
      width: 100%;
      display: flex;
      flex-direction: column;

      &-group {
        &__date-goods {
          flex-direction: column;

          &__field {
            margin-left: 0;
          }
        }
      }

      &-quantity-group {
        &__quantity {
          flex-direction: column;

          &__field, &__limit {
            margin-left: 0;
          }

          &__comment {
            margin-top: 18px;
          }
        }
      }
    }
  }

  .RequestForm__wrapper__form-main .small-margin {
    margin-top: 38px !important;
  }
}
</style>
