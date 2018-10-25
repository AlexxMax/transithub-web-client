<template>
  <div :class="{ 'VehicleRegisterListItem__wrapper': true, 'VehicleRegisterListItem__wrapper-in-group': inGroup }">
    <div :class="{ 'VehicleRegisterListItem': true, 'VehicleRegisterListItem__item-in-group': inGroup }">
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
              <fa class="VehicleRegisterListItem__icon" style="vertical-align: baseline" icon="map-marker-alt"/>
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

      <div class="VehicleRegisterListItem__footer">
        <div>
          <nuxt-link :to="`/workspace/vehicles-registers/${row.guid}`">
            <Button type="primary">{{ $t('lists.open') }}</Button>
          </nuxt-link>
        </div>
        <div>
          <Button
            simple
            hover-underline
            fa-icon="angle-double-down">
            {{ $t('lists.races') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Status from '@/components/Common/FormElements/Constituents/Status'
import ContactInfo from '@/components/Common/ContactInfo'
import Button from "@/components/Common/Buttons/Button"

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-vehicle-register-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    Status,
    ContactInfo,
    Button
  },

  props: {
    row: Object
  },

  data() {
    return {
      inGroup: false
    }
  },

  mounted() {
    // if Item is in group
    if (this.$parent.$el.className === 'ListItemGroupe__body') {
      this.inGroup = true
    }
  }
}
</script>

<style lang="scss" scoped>
.VehicleRegisterListItem__wrapper {
  margin: 10px 0;
  padding: 0 5px;

  &.VehicleRegisterListItem__wrapper-in-group {
    margin: 10px -16px;
    padding: 0;
  }

  .VehicleRegisterListItem {
    color: #606266;
    padding: 20px 15px;
    background-color: white;
    border: 1px solid #bebebe1a;
    border-radius: 5px;

    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    .VehicleRegisterListItem__left-item {
      display: flex;
      justify-content: flex-end;
    }

    .VehicleRegisterListItem__left-item-mobile {
      display: flex;
      justify-content: flex-start;
      margin-top: 15px;
    }

    &.VehicleRegisterListItem__item-in-group {
      border-radius: 0;

      &:hover {
        box-shadow: none;
        background-color: #f8f8f8;
      }
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

    .VehicleRegisterListItem__footer {
      background-color: #f8f8f8;
      margin: 10px -15px -20px -15px;
      padding: 5px 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>

