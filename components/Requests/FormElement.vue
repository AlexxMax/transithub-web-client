<template>
  <div class="th-request-form-wrapper">
    <div class="th-request-form">
      <th-form v-loading="$store.state.requests.loading">
        <div slot="header">
          <div class="th-request-form-header" @click="$router.push($i18n.path('workspace/requests'))">
            <el-tooltip effect="dark" :content="$t('forms.request.backBtn')" placement="bottom">
              <span class="th-request-form-heade-arrow">
                <fa icon="long-arrow-alt-left" />
              </span>
            </el-tooltip>

            <span class="th-request-form-header-title">{{ `${$t('forms.request.title')} №${request.number}` }}</span>

            <span
              class="th-request-form-header-status"
              :style="{ 'color': statusColor }">
              {{ $t(statusTitle) }}
            </span>
          </div>
        </div>

        <div slot="toolbar">
          <th-button v-if="!smallDevice" type="primary">{{ $t('forms.common.save') }}</th-button>

          <el-dropdown size="mini" v-show="smallDevice">
            <th-button type="">
              <fa icon="bars" />
            </th-button>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span>{{ $t('forms.common.save') }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div slot="content">
          <el-row>
            <el-col :xs="24" :lg="18">
              <div class="th-request-form-body-wrapper">
                <div class="th-request-form-body">
                  <el-form :model="request" label-position="top" label-width="100px" size="mini">
                    <el-row :gutter="20">
                      <el-col :xs="24" :md="12">
                        <el-form-item :label="$t('forms.common.date')">
                          <el-input v-model="request.scheduleDate" readonly></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :xs="24" :md="12">
                        <el-form-item :label="$t('forms.common.goods')">
                          <el-input v-model="request.goodsName" readonly></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :xs="24" :md="12">
                        <el-form-item :label="$t('forms.common.pointFrom')">
                          <el-input v-model="request.pointFromName" readonly></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :xs="24" :md="12">
                        <el-form-item :label="$t('forms.common.pointTo')">
                          <el-input v-model="request.pointToName" readonly></el-input>
                        </el-form-item>
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
                            <el-col :xs="24" :md="4">
                              <el-form-item :label="$t('forms.request.quantityT')">
                                <el-input v-model="request.quantityT" readonly></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :xs="24" :md="4">
                              <el-form-item :label="$t('forms.request.quantityVehicles')">
                                <el-input v-model="request.quantityVehicles" readonly></el-input>
                              </el-form-item>
                            </el-col>
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

                        <div class="th-request-form-main-tab-body">
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
                        </div>
                      </el-form>
                    </el-tab-pane>

                    <el-tab-pane name="route">
                      <span slot="label"><fa icon="map-marked-alt" style="padding-right: 5px" />
                        {{ $t('forms.request.tabs.route') }}
                      </span>
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <iframe width="100%" height="450" frameborder="0" style="border:0" :src="getMap()" allowfullscreen></iframe>
                        </el-col>
                      </el-row>
                    </el-tab-pane>

                    <el-tab-pane name="regv">
                      <span slot="label"><fa icon="truck" style="padding-right: 5px" />
                        {{ $t('forms.request.tabs.regv') }}
                        <el-badge :value="$store.state.vehiclesRegisters.count" />
                      </span>

                      <VehiclesRegistersList
                        ref="regv"
                        :requestGuid="$route.params.guid"
                        @showFilter="visibleFilterVehiclesRegisters = true"/>
                    </el-tab-pane>

                    <el-tab-pane name="races">
                      <span slot="label"><fa icon="road" style="padding-right: 5px" />
                        {{ $t('forms.request.tabs.races') }}
                        <el-badge class="mark" :value="$store.state.races.count" />
                      </span>

                      <RacesList
                        :requestGuid="$route.params.guid"
                        @showFilter="visibleFilterRaces = true"/>
                    </el-tab-pane>

                    <el-tab-pane v-if="smallDevice" name="more">
                      <span slot="label"><fa icon="stream" style="padding-right: 5px" />
                        {{ $t('forms.request.tabs.more') }}
                      </span>

                      <div class="th-request-form-body-tab-more">
                        <el-row :gutter="20" v-if="!!request.orderGuid">
                          <el-col :span="24">
                            <div class="th-request-form-more-container">
                              <nuxt-link
                                style="text-decoration: none; color: inherit"
                                :to="$i18n.path(`workspace/orders/${request.orderGuid}`)">
                                <div class="th-request-form-more-order th-request-form-more-link">
                                  <div>{{ $t('forms.request.order') + ' №' + request.orderNumber }}</div>
                                  <span>{{ request.orderDate }}</span>
                                </div>
                              </nuxt-link>
                            </div>
                          </el-col>
                        </el-row>

                        <el-row :gutter="20">
                          <el-col :xs="24" :md="12">
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
                          </el-col>

                          <el-col :xs="24" :md="12">
                            <div class="th-request-form-more-container">
                              <div class="th-request-form-more-title">{{ $t('forms.request.carrier') }}</div>
                              <div>
                                {{ request.carrierName }}
                              </div>
                            </div>
                          </el-col>
                        </el-row>

                        <el-row :gutter="20">
                          <el-col :xs="24" :md="12" v-show="!!request.logistName">
                            <div class="th-request-form-more-container">
                              <div class="th-request-form-more-title">{{ $t('forms.request.logist') }}</div>
                              <div>
                                <div class="th-request-form-more-logist-field">
                                  <span><fa icon="user"/></span>
                                  {{ request.logistName }}
                                </div>
                                <div class="th-request-form-more-logist-field">
                                  <span><fa icon="at"/></span>
                                  {{ request.logistEmail }}
                                </div>
                                <div class="th-request-form-more-logist-field">
                                  <span><fa icon="phone"/></span>
                                  {{ request.logistPhone }}
                                </div>
                              </div>
                            </div>
                          </el-col>

                          <el-col :xs="24" :md="12" v-show="!!request.agreementNumber">
                            <div class="th-request-form-more-container">
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
                          </el-col>
                        </el-row>

                        <el-row :gutter="20" v-show="!!request.info">
                          <el-col :span="24">
                            <div class="th-request-form-more-container">
                              <div class="th-request-form-more-title">{{ $t('forms.request.more') }}</div>
                              <div>
                                <div class="th-request-from-more-comment-field th-request-form-more-link">
                                  {{ request.info }}
                                </div>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
            </el-col>

            <el-col :lg="6" class="hidden-md-and-down">
              <div class="th-request-form-side-wrapper">
                <div class="th-request-form-side">
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

                  <div class="th-request-form-more-container">
                    <div class="th-request-form-more-title">{{ $t('forms.request.carrier') }}</div>
                    <div>
                      {{ request.carrierName }}
                    </div>
                  </div>

                  <div class="th-request-form-more-container" v-show="!!request.logistName">
                    <div class="th-request-form-more-title">{{ $t('forms.request.logist') }}</div>
                    <div>
                      <div class="th-request-form-more-logist-field">
                        <span><fa icon="user"/></span>
                        {{ request.logistName }}
                      </div>
                      <div class="th-request-form-more-logist-field">
                        <span><fa icon="at"/></span>
                        {{ request.logistEmail }}
                      </div>
                      <div class="th-request-form-more-logist-field">
                        <span><fa icon="phone"/></span>
                        {{ request.logistPhone }}
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
                      <div class="th-request-from-more-comment-field th-request-form-more-link">
                        {{ request.info }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </th-form>
    </div>

    <RightView
      :visible="visibleQuantityHistory"
      :title="$t('forms.request.quantityHistorySideMenu')"
      @close="visibleQuantityHistory = false">
    </RightView>

    <VehiclesRegisterFilterMenu
      :visible="visibleFilterVehiclesRegisters"
      :request="$route.params.guid"
      @close="visibleFilterVehiclesRegisters = false"/>

    <RacesFilterMenu
      :visible="visibleFilterRaces"
      :request="$route.params.guid"
      @close="visibleFilterRaces = false"/>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import CommonForm from '@/components/Common/Form'
import RightView from '@/components/Common/RightView'
import Toolbar from '@/components/Common/ListToolbar'
import VehiclesRegistersList from '@/components/VehiclesRegisters/SubordinateList'
import VehiclesRegisterFilterMenu from '@/components/VehiclesRegisters/FilterMenu'
import RacesList from '@/components/Races/SubordinateList'
import RacesFilterMenu from '@/components/Races/FilterMenu'
import Avatar from '@/components/Companies/CompanyAvatar'

import { getStatusPresentation } from '@/utils/requests'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    'th-button': Button,
    'th-form': CommonForm,
    RightView,
    VehiclesRegistersList,
    VehiclesRegisterFilterMenu,
    RacesList,
    RacesFilterMenu,
    "th-company-avatar": Avatar
  },

  data() {
    return {
      request: {},

      activeTab: 'main',
      visibleQuantityHistory: false,
      visibleFilterVehiclesRegisters: false,
      visibleFilterRaces: false
    }
  },

  async created() {
    await this._fetch()
  },

  methods: {
    _fetch: async function() {
      const guid = this.$route.params.guid
      await this.$store.dispatch(
        "requests/loadElement",
        guid
      )
      this.request = this.$store.getters['requests/getRequest']
    },
    getMap: function() {
      return `https://www.google.com/maps/embed/v1/directions?origin=${
        this.request.pointFromCode
      }&destination=${
        this.request.pointToCode
      }&key=AIzaSyC-NMwliNHhxomPQJaQeu24GPQablR-rDk&language=uk`
    },
    tabClick(tab) {
      if (tab.name !== 'main') {
        this.visibleQuantityHistory = false
      }

      if (tab.name !== 'regv') {
        this.visibleFilterVehiclesRegisters = false
      }

      if (tab.name !== 'races') {
        this.visibleFilterRaces = false
      }
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
    smallDevice(newValue) {
      if (!newValue && this.activeTab === 'more') {
        this.activeTab = 'main'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.th-request-form-wrapper {
  // max-width: 1000px;

  .th-request-form {

    .th-request-form-heade-arrow {
      margin-right: 10px;
      padding: 3px 5px;

      &:hover {
        background-color: #f8f8f8;
        border-radius: 20px;
      }
    }

    .th-request-form-header {
      display: flex;
      flex-direction: row;

      .th-request-form-header-title {
        font-size: 16px;
        font-weight: 500;
      }

      .th-request-form-header-status {
        text-transform: capitalize;
        margin-left: 15px;
        margin-top: 3px;
        font-size: 14px;
      }
    }

    .th-request-form-body-wrapper {

      .th-request-form-body {
        overflow-y: auto;
        height: calc(100vh - 145px);
        background-color: #fff;
        border-radius: 5px;
        padding: 25px 40px;
        border: 1px solid #EBEEF5;

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
                color: #FECD34;
              }
            }
          }
        }
      }
    }

    .th-request-form-side-wrapper {
      margin-left: 20px;

      .th-request-form-side {
        overflow-y: auto;
        height: calc(100vh - 145px);
        background-color: #fff;
        border-radius: 5px;
        padding: 25px 40px;
        border: 1px solid #EBEEF5;

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

</style>