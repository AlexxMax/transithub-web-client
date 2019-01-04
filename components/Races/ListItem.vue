<template>
  <div>
    <ItemCard :showAddon="mapVisible">

      <div>
        <el-row>
          <el-col :xs="24" :md="18">
            <div>
              <fa class="RacesListItem__icon" icon="clock"/>
              <span>{{ row.date }}</span>
            </div>
          </el-col>

          <el-col :xs="24" :md="6">
            <Status
              :class="{
                'RacesListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'RacesListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
              }"
              :title="$t(row.status.localeKey)"
              :color="row.status.color"/>
          </el-col>
        </el-row>

        <div class="RacesListItem__row">
          <el-row>
            <el-col :xs="24" :md="18">
              <div>
                <Route
                  :point-from-name="row.pointFromName"
                  :point-from-koatuu="row.pointFromKoatuu"
                  :point-from-region="row.pointFromRegion"
                  :point-to-name="row.pointToName"
                  :point-to-koatuu="row.pointToKoatuu"
                  :point-to-region="row.pointToRegion"/>
              </div>
            </el-col>

            <el-col :xs="24" :md="6">
              <div
                :class="{
                  'RacesListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'RacesListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
                }">
                <span>{{ `${row.lastEvent} - ${row.lastEventDate}` }}</span>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="RacesListItem__row">
          <el-row>
            <el-col :xs="24" :md="18">
              <fa class="RacesListItem__icon" icon="user"/>
              <span class="RacesListItem__driver">{{ row.driverFullname }}</span>
            </el-col>

            <el-col :xs="24" :md="6">
              <div
                :class="{
                  'RacesListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'RacesListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
                }">
                <ContactInfo
                  type="phone"
                  :value="row.phone"/>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="RacesListItem__row">
          <el-row>
            <el-col :xs="24" :md="18">
              <fa class="RacesListItem__icon" icon="truck"/>
              <span>{{ `${row.vehicleNumber}, ${row.vehicleBrand} - ${row.trailerNumber}, ${row.trailerBrand}` }}</span>
            </el-col>

            <el-col :xs="24" :md="6" v-if="row.vehiclesRegisterGuid">
              <div
                :class="{
                'RacesListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'RacesListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
                }">
                <nuxt-link :to="`/workspace/vehicles-registers/${row.vehiclesRegisterGuid}`">
                  {{ $t('forms.vehicleRegister.title') }}
                </nuxt-link>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="RacesListItem__row">
          <el-row>
            <el-col :xs="24" :md="6">
              <fa class="RacesListItem__icon" icon="box"/>
              <span>{{ row.goodsName }}</span>
            </el-col>

            <el-col :xs="24" :md="18" v-if="row.requestGuid">
              <div
                :class="{
                  'RacesListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'RacesListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
                }">
                <nuxt-link :to="`/workspace/requests/${row.requestGuid}`">{{ `${$t('forms.request.title')} ${row.requestNumber}` }}</nuxt-link>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div slot="footer-left">
        <Button
          v-if="open"
          type="primary"
          @click="() => { open(row.guid) }">
          {{ $t('lists.open') }}
        </Button>

        <nuxt-link v-else :to="$i18n.path(`workspace/races/${row.guid}`)">
          <Button type="primary">{{ $t('lists.open') }}</Button>
        </nuxt-link>
      </div>
      <div slot="footer-right">
        <ButtonsGroup>
          <Button
            simple
            hover-underline
            fa-icon="map-marked-alt"
            :fa-icon-suffix="mapVisible ? 'caret-down' : 'caret-right'"
            @click="toogleMap">
            {{ $t('forms.common.map') }}
          </Button>
          <Button
            v-if="!noEvents"
            simple
            hover-underline
            fa-icon="archive"
            style="margin-left: 25px"
            @click="eventsHistoryVisible = true">
            {{ $t('forms.race.events') }}
          </Button>
        </ButtonsGroup>
      </div>

      <div slot="footer-right-menu">
        <el-dropdown-item>
          <Button
            simple
            hover-underline
            -icon="map-marked-alt"
            @click="toogleMap">
            {{ $t('forms.common.map') }}
          </Button>
        </el-dropdown-item>

        <el-dropdown-item>
          <Button
            v-if="!noEvents"
            simple
            hover-underline
            fa-icon="archive"
            @click="eventsHistoryVisible = true">
            {{ $t('forms.race.events') }}
          </Button>
        </el-dropdown-item>
      </div>

      <div slot="addon">
        <div v-if="mapVisible">
          <Map
            :title="$t('forms.common.map')"
            koatuu
            :point-from-koatuu="row.pointFromKoatuu"
            :point-to-koatuu="row.pointToKoatuu"/>
        </div>
      </div>
    </ItemCard>

    <EventsHistory
      :visible="eventsHistoryVisible"
      @close="eventsHistoryVisible = false"/>
  </div>
</template>

<script>
import Status from '@/components/Common/FormElements/Constituents/Status'
import ContactInfo from '@/components/Common/ContactInfo'
import Button from "@/components/Common/Buttons/Button"
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup"
import ItemCard from '@/components/Common/Lists/ItemCard'
import Map from '@/components/Common/Map'
import EventsHistory from '@/components/Races/EventsHistory'
import Route from '@/components/Common/Route'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-race-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    Status,
    ContactInfo,
    ButtonsGroup,
    Button,
    ItemCard,
    Map,
    EventsHistory,
    Route
  },

  props: {
    row: Object,
    noEvents: Boolean,
    open: {
      type: Function,
      default: null
    }
  },

  data() {
    return {
      mapVisible: false,
      eventsHistoryVisible: false
    }
  },

  methods: {
    toogleMap() {
      this.mapVisible = !this.mapVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.RacesListItem__left-item {
  display: flex;
  justify-content: flex-end;
}

.RacesListItem__left-item-mobile {
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
}

.RacesListItem__row {
  margin-top: 15px;

  &.RacesListItem__row-point {
    margin-bottom: -20px;
  }
}

.RacesListItem__points {
  // font-weight: bold;
  font-size: 18px;
}

.RacesListItem__driver {
  font-weight: bold;
  font-size: 16px;
}

.RacesListItem__trips {
  font-weight: bold;
}

.RacesListItem__icon {
  margin-right: 10px;
  width: 15px;
}
</style>
