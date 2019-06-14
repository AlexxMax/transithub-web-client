<template>
  <div>
    <ItemCard>

      <div>
        <el-row>
          <el-col :xs="24" :md="18">
            <div>
              <fa class="RequestsListItem__icon" icon="calendar-alt"/>
              <span>{{ row.scheduleDate }}</span>
              <span class="RequestsListItem__number">{{ `№${row.number}` }}</span>
              <span
                v-if="row.vehiclesRegisterStatus"
                class="RequestsListItem__vehicles-register-status"
                :style="{ color: row.vehiclesRegisterStatus.color }"
              >
                {{ $t(row.vehiclesRegisterStatus.localeKey) }}
              </span>
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
              <div class="RequestsListItem__row--horizontal">
                <Route
                  :point-from-name="row.pointFromName"
                  :point-from-koatuu="row.pointFromKoatuu"
                  :point-from-region="row.pointFromRegion"
                  :point-to-name="row.pointToName"
                  :point-to-koatuu="row.pointToKoatuu"
                  :point-to-region="row.pointToRegion"
                />

                <div class="RequestsListItem__row--horizontal--last">
                  <fa class="RequestsListItem__icon" icon="road"/>
                  <span>{{ `${row.distance} ${$t('forms.common.km')}` }}</span>
                </div>
              </div>
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
              <div class="RequestsListItem__row--horizontal">
                <div>
                  <fa class="RequestsListItem__icon" icon="box"/>
                  <span>{{ row.goodsName }}</span>
                </div>

                <div class="RequestsListItem__row--horizontal--last">
                  <fa class="RequestsListItem__icon" icon="wallet"/>
                  <span>{{ `${row.goodsCost} ${$t('forms.common.grnT')}` }}</span>
                </div>
              </div>
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
          <Button round type="primary">{{ $t('lists.open') }}</Button>
        </nuxt-link>

        <Button
          round
          type=""
          @click="$emit('open-vehicle-register-generation-form', row)"
        >
          {{ $t('forms.common.vehiclesRegisterOutfits') }}
        </Button>
      </div>

      <div slot="footer-right">
        <ButtonsGroup>
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
            simple
            hover-underline
            fa-icon="book-open"
            @click="$emit('open-vehicle-register-generation-form', row)">
            {{ $t('forms.common.vehiclesRegisterOutfits') }}
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

    </ItemCard>

    <QuantityHistory
      :visible="visibleQuantityHistory"
      :request="row.guid"
      @close="visibleQuantityHistory = false"
    />
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
    QuantityHistory

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
      visibleQuantityHistory: false
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

  &--horizontal {
    display: flex;
    flex-direction: row;

    &--last {
      margin-left: 30px;
      display: flex;
      align-items: center;
    }
  }
}

.RequestsListItem__number {
  color: #FFD74D;
  margin-left: 20px;
}

.RequestsListItem__vehicles-register-status {
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
