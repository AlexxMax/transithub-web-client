<template>
  <ItemCard>

    <div>
      <el-row>
        <el-col :xs="24" :md="18">
          <div>
            <fa class="VehicleRegisterListItem__icon" icon="calendar-alt"/>
            <span>{{ `${row.periodFrom} - ${row.periodTo}` }}</span>
          </div>
        </el-col>

        <el-col :xs="24" :md="6">
          <Status
            :class="{
              'VehicleRegisterListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'VehicleRegisterListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
            }"
            :title="$t(row.status.localeKey)"
            :color="row.status.color"/>
        </el-col>
      </el-row>

      <div class="VehicleRegisterListItem__row">
        <el-row>
          <el-col :xs="24" :md="18">
            <div>
              <fa class="VehicleRegisterListItem__icon" style="vertical-align: baseline" icon="map-signs"/>
              <span class="VehicleRegisterListItem__points">{{ `${row.pointFromName} \u2192 ${row.pointToName}` }}</span>
            </div>
          </el-col>

          <el-col :xs="24" :md="6">
            <div
              :class="{
                'VehicleRegisterListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'VehicleRegisterListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
              }">
              <span>{{ `${row.lastEventName} - ${row.lastEventDate}` }}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="VehicleRegisterListItem__row">
        <el-row>
          <el-col :xs="24" :md="18">
            <fa class="VehicleRegisterListItem__icon" icon="user"/>
            <span class="VehicleRegisterListItem__driver">{{ row.driverFullname }}</span>
          </el-col>

          <el-col :xs="24" :md="6">
            <div
              :class="{
                'VehicleRegisterListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'VehicleRegisterListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
              }">
              <ContactInfo
                type="phone"
                :value="row.phone"/>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="VehicleRegisterListItem__row">
        <el-row>
          <el-col :xs="24" :md="18">
            <fa class="VehicleRegisterListItem__icon" icon="truck"/>
            <span>{{ `${row.vehicleNumber}, ${row.vehicleBrand} - ${row.trailerNumber}, ${row.trailerBrand}` }}</span>
          </el-col>

          <el-col :xs="24" :md="6">
            <div
              :class="{
              'VehicleRegisterListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'VehicleRegisterListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
              }">
              <fa class="VehicleRegisterListItem__icon" style="height: 17px" icon="sync-alt"/>
              <span class="VehicleRegisterListItem__trips">{{ row.tripsQuantity }}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="VehicleRegisterListItem__row">
        <el-row>
          <el-col :xs="24" :md="6">
            <fa class="VehicleRegisterListItem__icon" icon="box"/>
            <span>{{ row.goodsName }}</span>
          </el-col>

          <el-col :xs="24" :md="18">
            <div
              :class="{
                'VehicleRegisterListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'VehicleRegisterListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
              }">
              <nuxt-link :to="`/workspace/requests/${row.requestGuid}`">{{ `${$t('forms.request.title')} ${row.requestNumber}` }}</nuxt-link>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div slot="footer-left">
      <nuxt-link :to="`/workspace/vehicles-registers/${row.guid}`">
        <Button type="primary">{{ $t('lists.open') }}</Button>
      </nuxt-link>
    </div>
    <div slot="footer-right">
      <Button
        simple
        hover-underline
        fa-icon="shipping-fast">
        {{ $t('lists.races') }}
      </Button>
    </div>
  </ItemCard>
</template>

<script>
import Status from '@/components/Common/FormElements/Constituents/Status'
import ContactInfo from '@/components/Common/ContactInfo'
import Button from "@/components/Common/Buttons/Button"
import ItemCard from '@/components/Common/Lists/ItemCard'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-vehicle-register-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    Status,
    ContactInfo,
    Button,
    ItemCard
  },

  props: {
    row: Object
  }
}
</script>

<style lang="scss" scoped>
.VehicleRegisterListItem__left-item {
  display: flex;
  justify-content: flex-end;
}

.VehicleRegisterListItem__left-item-mobile {
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
}

.VehicleRegisterListItem__row {
  margin-top: 15px;

  &.VehicleRegisterListItem__row-point {
    margin-bottom: -20px;
  }
}

.VehicleRegisterListItem__points {
  // font-weight: bold;
  font-size: 18px;
}

.VehicleRegisterListItem__driver {
  font-weight: bold;
  font-size: 16px;
}

.VehicleRegisterListItem__trips {
  font-weight: bold;
}

.VehicleRegisterListItem__icon {
  margin-right: 10px;
  width: 15px;
}
</style>

