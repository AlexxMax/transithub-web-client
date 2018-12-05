<template>
  <ItemCard>

    <div>
      <el-row>
        <el-col :xs="24" :md="18">
          <div :class="{
            'RailwayAggregationsListItem__title': !$_smallDeviceMixin_isDeviceSmall,
            'RailwayAggregationsListItem__title-mobile': $_smallDeviceMixin_isDeviceSmall
            }">
            <div>
              <fa class="RailwayAggregationsListItem__icon" icon="calendar-alt"/>
              <span>{{ `${row.periodFrom} - ${row.periodTo}` }}</span>
            </div>
            <span :class="{
              'RailwayAggregationsListItem__number': !$_smallDeviceMixin_isDeviceSmall,
              'RailwayAggregationsListItem__number-moblie': $_smallDeviceMixin_isDeviceSmall,
              }">
              {{ `№${row.number}` }}
              </span>
          </div>
        </el-col>

        <el-col :xs="24" :md="6">
          <Status
            :class="{
              'RailwayAggregationsListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'RailwayAggregationsListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
            }"
            :title="$t(row.status.localeKey)"
            :color="row.status.color"/>
        </el-col>
      </el-row>

      <el-row class="RailwayAggregationsListItem__row">
        <el-col :xs="24" :md="18">
          <RailwayRoute
            :station-from-name="row.stationFromName"
            :station-from-code="row.stationFromRWCode"
            :station-from-road="row.stationFromRoad"
            :station-to-name="row.stationToName"
            :station-to-code="row.stationToRWCode"
            :station-to-road="row.stationToRoad"/>
        </el-col>

        <el-col :xs="24" :md="6">
          <div
            :class="{
              'RailwayAggregationsListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'RailwayAggregationsListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
            }">
            <Company :name="row.companyName"/>
          </div>
        </el-col>
      </el-row>

      <el-row class="RailwayAggregationsListItem__row">
        <el-col :xs="24" :md="12">
          <div>
            <fa class="RailwayAggregationsListItem__icon" icon="train"/>
            <span>{{ `${$t('forms.common.available')}: ${row.wagonsDeficit}, ${row.wagonsAffilationName}` }}</span>
          </div>
        </el-col>

        <el-col :xs="24" :md="12">
          <div
            :class="{
              'RailwayAggregationsListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'RailwayAggregationsListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
            }">
            <fa class="RailwayAggregationsListItem__icon" icon="user"/>
            <span>{{ `${$t('forms.common.propositions')}: ${row.requestsCount}` }}</span>
          </div>
        </el-col>
      </el-row>

      <el-row class="RailwayAggregationsListItem__row">
        <el-col :xs="24" :md="12">
          <div>
            <fa class="RailwayAggregationsListItem__icon" icon="box"/>
            <span>{{ row.goodsName }}</span>
          </div>
        </el-col>
      </el-row>
    </div>

    <div slot="footer-left">
      <Button
        v-if="open"
        type="primary"
        @click="() => { open(row.guid) }">
        {{ $t('lists.open') }}
      </Button>

      <nuxt-link v-else :to="to">
        <Button type="primary">{{ $t('lists.open') }}</Button>
      </nuxt-link>
    </div>

  </ItemCard>
</template>

<script>
import ItemCard from '@/components/Common/Lists/ItemCard'
import Status from '@/components/Common/FormElements/Constituents/Status'
import Button from '@/components/Common/Buttons/Button'
import Company from '@/components/Companies/Company'
import RailwayRoute from '@/components/Common/Railway/RailwayRoute'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-railway-aggregation-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    ItemCard,
    Status,
    Button,
    Company,
    RailwayRoute
  },

  props: {
    row: Object,
    open: {
      type: Function,
      default: null
    },
    demo: Boolean
  },

  computed: {
    to() {
      return this.demo
        ? `/railway-aggregations/${this.row.guid}`
        : `/workspace/railway-aggregations/${this.row.guid}`
    }
  }
}
</script>

<style lang="scss" scoped>
.RailwayAggregationsListItem__title {
  display: flex;
  flex-direction: row;
}

.RailwayAggregationsListItem__title-mobile {
  display: flex;
  flex-direction: column;
}

.RailwayAggregationsListItem__left-item {
  display: flex;
  justify-content: flex-end;
}

.RailwayAggregationsListItem__left-item-mobile {
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
}

.RailwayAggregationsListItem__icon {
  margin-right: 10px;
  width: 15px;
}

.RailwayAggregationsListItem__number {
  color: #FECD34;
  margin-left: 20px;
}

.RailwayAggregationsListItem__number-moblie {
  color: #FECD34;
  // margin-left: 24px;
  margin-top: 15px;
}

.RailwayAggregationsListItem__row {
  margin-top: 15px;
}
</style>
