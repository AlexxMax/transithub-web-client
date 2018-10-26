<template>
  <div>
    <ItemCard :showAddon="mapVisible">

      <div>
        <el-row>
          <el-col :xs="24" :md="18">
            <div>
              <fa class="RacesListItem__icon" icon="clock"/>
              <span>{{ row.date}}</span>
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
                <fa class="RacesListItem__icon" style="vertical-align: baseline" icon="map-signs"/>
                <span class="RacesListItem__points">{{ `${row.pointFromName} \u2192 ${row.pointToName}` }}</span>
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

            <el-col :xs="24" :md="6">
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

            <el-col :xs="24" :md="18">
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

        <nuxt-link v-else :to="`/workspace/races/${row.guid}`">
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

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-race-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    Status,
    ContactInfo,
    Button,
    ItemCard,
    Map,
    EventsHistory
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
