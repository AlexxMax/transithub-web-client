<template>
  <div>
    <ItemCard :showAddon="vehiclesRegisterSubordinateListVisible || racesSubordinateListVisible">

      <div>
        <el-row>
          <el-col :xs="24" :md="18">
            <div>
              <fa class="RequestsListItem__icon" icon="calendar-alt"/>
              <span>{{ row.scheduleDate }}</span>
              <span class="RequestsListItem__number">{{ `№${row.number}` }}</span>
            </div>
          </el-col>

          <el-col :xs="24" :md="6">
            <Status
              :class="{
                'RequestsListItem__left-item': !$_smallDeviceMixin_isDeviceSmall,
                'RequestsListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
              }"
              :title="$t(row.status.localeKey)"
              :color="row.status.color"/>
          </el-col>
        </el-row>

        <div class="RequestsListItem__row">
          <el-row>
            <el-col :xs="24" :md="18">
              <Route
                :point-from-name="row.pointFromName"
                :point-from-koatuu="row.pointFromKoatuu"
                :point-from-region="row.pointFromRegion"
                :point-to-name="row.pointToName"
                :point-to-koatuu="row.pointToKoatuu"
                :point-to-region="row.pointToRegion"/>
            </el-col>

            <el-col :xs="24" :md="6">
              <div
                :class="{
                  'RequestsListItem__left-item': !$_smallDeviceMixin_isDeviceSmall,
                  'RequestsListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
                }">
                <Company :name="row.clientName"/>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="RequestsListItem__row">
          <el-row>
            <el-col :xs="24" :md="12">
              <fa class="RequestsListItem__icon" icon="box"/>
              <span>{{ row.goodsName }}</span>
            </el-col>

            <el-col :xs="24" :md="12">
              <div
                v-if="row.orderGuid"
                :class="{
                  'RequestsListItem__left-item': !$_smallDeviceMixin_isDeviceSmall,
                  'RequestsListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
                }"
                style="line-height: 40px">
                <nuxt-link :to="$i18n.path(`workspace/orders/${row.orderGuid}`)">{{ $t('forms.order.title') }}</nuxt-link>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div slot="footer-left">
        <nuxt-link :to="$i18n.path(`workspace/requests/${row.guid}`)">
          <Button type="primary">{{ $t('lists.open') }}</Button>
        </nuxt-link>
      </div>

      <div slot="footer-right">
        <ButtonsGroup>
          <Button
            v-if="row.vehiclesRegistersCount > 0"
            simple
            hover-underline
            fa-icon="book-open"
            :fa-icon-suffix="vehiclesRegisterSubordinateListVisible ? 'caret-down' : 'caret-right'"
            @click="toogleVehiclesRegistersList">
            {{ $t('lists.vehiclesRegisters') }}
          </Button>

          <Button
            v-if="row.racesCount > 0"
            simple
            hover-underline
            fa-icon="shipping-fast"
            :fa-icon-suffix="racesSubordinateListVisible ? 'caret-down' : 'caret-right'"
            style="margin-left: 25px"
            @click="toogleRacesList">
            {{ $t('lists.races') }}
          </Button>

          <Button
            simple
            hover-underline
            fa-icon="history"
            style="margin-left: 25px"
            @click="visibleQuantityHistory = true">
            {{ $t('forms.request.quantityHistory') }}
          </Button>
        </ButtonsGroup>
      </div>

      <div slot="footer-right-menu">
        <el-dropdown-item>
          <Button
            v-if="row.vehiclesRegistersCount > 0"
            simple
            hover-underline
            fa-icon="book-open"
            @click="toogleVehiclesRegistersList">
            {{ $t('lists.vehiclesRegisters') }}
          </Button>
        </el-dropdown-item>

        <el-dropdown-item>
          <Button
            v-if="row.racesCount > 0"
            simple
            hover-underline
            fa-icon="shipping-fast"
            @click="toogleRacesList">
            {{ $t('lists.races') }}
          </Button>
        </el-dropdown-item>

        <el-dropdown-item>
          <Button
            simple
            hover-underline
            fa-icon="history"
            @click="visibleQuantityHistory = true">
            {{ $t('forms.request.quantityHistory') }}
          </Button>
        </el-dropdown-item>
      </div>

      <div slot="addon">
        <div v-if="vehiclesRegisterSubordinateListVisible">
          <span class="RequestListItem__races-list-title">{{ $t('lists.vehiclesRegisters') }}</span>
          <VehiclesRegistersList
            instant-fill-up
            :request-guid="row.guid"/>
        </div>

        <div v-if="racesSubordinateListVisible">
          <span class="RequestListItem__races-list-title">{{ $t('lists.races') }}</span>
          <RacesSubordinateList
            instant-fill-up
            :request-guid="row.guid"/>
        </div>
      </div>

    </ItemCard>

    <QuantityHistory
      :visible="visibleQuantityHistory"
      :request="row.guid"
      @close="visibleQuantityHistory = false"/>
  </div>
</template>

<script>
import ItemCard from '@/components/Common/Lists/ItemCard'
import Status from '@/components/Common/FormElements/Constituents/Status'
import Route from '@/components/Common/Route'
import Company from '@/components/Companies/Company'
import Button from '@/components/Common/Buttons/Button'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import QuantityHistory from '@/components/Requests/ElementQuantityHistory'
import VehiclesRegistersList from "@/components/VehiclesRegisters/SubordinateList"
import RacesSubordinateList from "@/components/Races/SubordinateList"

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-request-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    ItemCard,
    Status,
    Route,
    Company,
    Button,
    ButtonsGroup,
    QuantityHistory,
    VehiclesRegistersList,
    RacesSubordinateList
  },

  props: {
    row: Object,
    open: {
      type: Function,
      default: null
    }
  },

  data() {
    return {
      visibleQuantityHistory: false,
      vehiclesRegisterSubordinateListVisible: false,
      racesSubordinateListVisible: false
    }
  },

  methods: {
    toogleVehiclesRegistersList() {
      this.racesSubordinateListVisible = false
      this.vehiclesRegisterSubordinateListVisible = !this.vehiclesRegisterSubordinateListVisible
    },
    toogleRacesList() {
      this.vehiclesRegisterSubordinateListVisible = false
      this.racesSubordinateListVisible = !this.racesSubordinateListVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.RequestsListItem__left-item {
  display: flex;
  justify-content: flex-end;
}

.RequestsListItem__left-item-mobile {
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
}

.RequestsListItem__row {
  margin-top: 15px;
}

.RequestsListItem__number {
  color: #FECD34;
  margin-left: 20px;
}

.RequestsListItem__icon {
  margin-right: 10px;
  width: 15px;
}

.RequestListItem__races-list-title {
  margin-left: 5px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}
</style>
