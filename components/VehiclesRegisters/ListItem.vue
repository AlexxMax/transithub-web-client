<template>
  <ItemCard :showAddon="racesSubordinateListVisible">
    <div>
      <el-row>
        <el-col :xs="24" :md="18" style="display: flex; flex-direction: row;">
          <div style="margin-right: 30px;" v-if="!showLessInfo">
            <fa class="VehicleRegisterListItem__icon" icon="calendar-alt"/>
            <span>{{ `${row.periodFrom} - ${row.periodTo}` }}</span>
          </div>

          <span>
            <fa
              class="VehicleRegisterListItem__icon"
              :icon="outcome ? 'arrow-alt-circle-up' : 'arrow-alt-circle-down'"
            />
            {{ outcome ? $t('forms.common.outcome') : $t('forms.common.income') }}
          </span>
        </el-col>

        <el-col :xs="24" :md="6">
          <Status
            :class="{
              'VehicleRegisterListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'VehicleRegisterListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
            }"
            :title="$t(row.status.localeKey)"
            :color="row.status.color"
          />
        </el-col>
      </el-row>

      <div class="VehicleRegisterListItem__row" v-if="!showLessInfo">
        <el-row>
          <el-col :xs="24" :md="18">
            <div>
              <Route
                append-to-body
                :point-from-name="row.pointFromName"
                :point-from-koatuu="row.pointFromKoatuu"
                :point-from-region="row.pointFromRegion"
                :point-to-name="row.pointToName"
                :point-to-koatuu="row.pointToKoatuu"
                :point-to-region="row.pointToRegion"
              />
            </div>
          </el-col>

          <el-col :xs="24" :md="6">
            <div
              :class="{
                'VehicleRegisterListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'VehicleRegisterListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
              }"
            >
              <span>{{ `${row.lastEventName} - ${row.lastEventDate}` }}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="VehicleRegisterListItem__row">
        <el-row>
          <el-col :xs="24" :md="18">
            <fa class="VehicleRegisterListItem__icon" icon="user"/>
            <span>{{ row.driverFullname }}</span>
          </el-col>

          <el-col :xs="24" :md="6">
            <div
              :class="{
                'VehicleRegisterListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'VehicleRegisterListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
              }"
            >
              <ContactInfo type="phone" :value="row.phone"/>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="VehicleRegisterListItem__row">
        <el-row>
          <el-col :xs="24" :md="18">
            <fa class="VehicleRegisterListItem__icon" icon="truck"/>
            <span>{{ vehicle }}</span>
          </el-col>

          <el-col :xs="24" :md="6">
            <div
              :class="{
              'VehicleRegisterListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'VehicleRegisterListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
              }"
            >
              <fa class="VehicleRegisterListItem__icon" style="height: 17px" icon="sync-alt"/>
              <span class="VehicleRegisterListItem__trips">{{ row.tripsQuantity }}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="VehicleRegisterListItem__row" v-if="!showLessInfo">
        <el-row>
          <el-col :xs="24" :md="6">
            <fa class="VehicleRegisterListItem__icon" icon="box"/>
            <span>{{ row.goodsName }}</span>
          </el-col>

          <el-col :xs="24" :md="18" v-if="row.requestGuid">
            <div
              :class="{
                'VehicleRegisterListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'VehicleRegisterListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
              }"
            >
              <nuxt-link
                :to="$i18n.path(`workspace/requests/${row.requestGuid}`)"
              >{{ `${$t('forms.request.title')} ${row.requestNumber}` }}</nuxt-link>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div slot="footer-left">
      <div v-if="!showLessInfo">
        <Button
          v-if="open"
          round
          type="primary"
          @click="() => { open(row.guid) }"
        >
          {{ $t('lists.open') }}
        </Button>

        <nuxt-link v-else :to="$i18n.path(`workspace/vehicles-registers/${row.guid}`)">
          <Button round type="primary">{{ $t('lists.open') }}</Button>
        </nuxt-link>
      </div>

      <nuxt-link
        v-if="showOpenRequestButton"
        :to="$i18n.path(`workspace/requests/${row.requestGuid}`)"
      >
        <Button round type="">
          {{ $t('forms.common.request') }}
        </Button>
      </nuxt-link>
    </div>

    <div slot="footer-right">
      <Button
        v-if="row.racesCount > 0"
        simple
        hover-underline
        fa-icon="shipping-fast"
        :fa-icon-suffix="racesSubordinateListVisible ? 'caret-down' : 'caret-right'"
        @click="toogleRacesList"
      >{{ $t('lists.races') }}</Button>
    </div>

    <div slot="footer-right-menu">
      <el-dropdown-item>
        <Button
          v-if="row.racesCount > 0"
          simple
          hover-underline
          fa-icon="shipping-fast"
          @click="toogleRacesList"
        >{{ $t('lists.races') }}</Button>
      </el-dropdown-item>
    </div>

    <div slot="addon">
      <span class="VehicleRegisterListItem__races-list-title">{{ $t('lists.races') }}</span>
      <RacesSubordinateList instant-fill-up :vehicle-register-guid="row.guid"/>
    </div>
  </ItemCard>
</template>

<script>
import Status from "@/components/Common/FormElements/Constituents/Status";
import ContactInfo from "@/components/Common/ContactInfo";
import Button from "@/components/Common/Buttons/Button";
import ItemCard from "@/components/Common/Lists/ItemCard";
import RacesSubordinateList from "@/components/Races/SubordinateList";
import Route from "@/components/Common/Route";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

export default {
  name: "th-vehicle-register-list-item",

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    Status,
    ContactInfo,
    Button,
    ItemCard,
    RacesSubordinateList,
    Route
  },

  props: {
    row: Object,
    open: {
      type: Function,
      default: null
    },
    showLessInfo: Boolean,
    outcome: Boolean,
    showOpenRequestButton: Boolean
  },

  data() {
    return {
      racesSubordinateListVisible: false
    };
  },

  computed: {
    vehicle() {
      const vehicle = `${this.row.vehicleNumber}, ${this.row.vehicleBrand}`
      if (this.row.trailerNumber) {
        const trailer = `${this.row.trailerNumber}, ${this.row.trailerBrand}`
        return `${vehicle} - ${trailer}`
      }
      return `${vehicle}`
    }
  },

  methods: {
    toogleRacesList() {
      this.racesSubordinateListVisible = !this.racesSubordinateListVisible;
    }
  }
};
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
  font-size: 18px;
}

// .VehicleRegisterListItem__driver {
//   font-weight: bold;
//   font-size: 16px;
// }

// .VehicleRegisterListItem__vehicle {
//   font-weight: bold;
//   font-size: 16px;
// }

.VehicleRegisterListItem__trips {
  font-weight: bold;
}

.VehicleRegisterListItem__icon {
  margin-right: 10px;
  width: 15px;
}

.VehicleRegisterListItem__races-list-title {
  margin-left: 5px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}
</style>

