<template>
  <div>
    <ItemCard :showAddon="mapVisible">

      <div>
        <el-row>
          <el-col :xs="24" :md="18">
            <div>
              <fa class="RacesListItem__icon" icon="user"/>
              <span class="RacesListItem__driver">{{ row.driverFullname }}</span>
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
            <el-col :xs="24" :md="14">
              <fa class="RacesListItem__icon" icon="truck" v-if="row.vehicleNumber"/>
              <span>{{ `${row.vehicleNumber}` }}</span> - 

              <fa class="RacesListItem__icon" icon="truck-loading" v-if="row.trailerNumber"/>
              <span>{{ `${row.trailerNumber}` }}</span>
            </el-col>

            <el-col :xs="24" :md="10">
              <div
                :class="{
                  'RacesListItem__left-item': !$_smallDeviceMixin_isDeviceSmall, 'RacesListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
                }">
                <span>{{ `${row.lastEvent} - ${row.lastEventDate}` }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div slot="footer-left" style="margin-top: 20px;">
        <Button
          round
          type=""
          disabled
        >
          {{ $t('forms.common.waybill') }}
        </Button>
      </div>

      <div slot="footer-right" style="margin-top: 20px;">
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
            fa-icon="map-marked-alt"
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
    ButtonsGroup,
    Button,
    ItemCard,
    Map,
    EventsHistory
  },

  props: {
    row: Object,
    noEvents: Boolean
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
}

.RacesListItem__driver {
  font-weight: bold;
  font-size: 16px;
}

.RacesListItem__icon {
  margin-right: 10px;
  width: 15px;
}
</style>
