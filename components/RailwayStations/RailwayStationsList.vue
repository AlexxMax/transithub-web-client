<template>
  <CommonList
    :no-pagination="true"
    :count="formatedStations.length"
    :title="$t('forms.common.railwayStations')"
  >
    <Toolbar slot="toolbar" ref="toolbar" @onSearch="handleSearch">
      <ButtonsGroup slot="items">
        <FilterMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/>

        <Button
          class="RailwayStationsList__toolbar-display"
          round
          icon-only
          :fa-icon="display === DISPLAYS.map ? 'list' : 'map-marked-alt'"
          :type="null"
          @click="handleDisplayChangeButton"
        >
          {{ display === DISPLAYS.map ? $t('forms.common.list') : $t('forms.common.map') }}
        </Button>
      </ButtonsGroup>

      <div slot="menu-items">
        <FilterMenu flat @close="closeToolbar"/>
      </div>
    </Toolbar>

    <div>
      <RailwayStationsListAll
        v-if="display === DISPLAYS.list"
        :loading="loading"
        :stations="formatedStations"
      />

      <RailwayStationsListMap
        v-else
        :loading="loading"
        :stations="stations"
      />
    </div>
  </CommonList>
</template>

<script>
import CommonList from "@/components/Common/List";
import Toolbar from "@/components/Common/Lists/Toolbar";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";
import FilterMenu from "@/components/RailwayStations/FilterMenu";
import Button from '@/components/Common/Buttons/Button'
import RailwayStationsListAll from '@/components/RailwayStations/RailwayStationsList/RailwayStationsListAll'
import RailwayStationsListMap from '@/components/RailwayStations/RailwayStationsList/RailwayStationsListMap'

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

const DISPLAYS = Object.freeze({
  list: 'list',
  map: 'map'
})

export default {
  name: "th-railway-station-list",

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    CommonList,
    Toolbar,
    ButtonsGroup,
    FilterMenu,
    Button,
    RailwayStationsListAll,
    RailwayStationsListMap
  },

  props: {
    stations: {
      type: Array,
      default: () => []
    },
    loading: Boolean
  },

  data: () => ({
    display: DISPLAYS.list,

    DISPLAYS: DISPLAYS
  }),

  computed: {
    formatedStations() {
      return this.stations.map(item => ({
        ...item,
        isRouteStation: item.isRouteStation
          ? this.$t("forms.common.yes")
          : this.$t("forms.common.no"),
        referenceNameRWCode: item.referenceName
          ? `${item.referenceName} (${item.referenceRwCode})`
          : ""
      }));
    }
  },

  methods: {
    handleSearch(value) {
      this.$store.dispatch("railwayStations/setCatalogSearch", value);
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu();
    },
    handleDisplayChangeButton() {
      this.display = this.display === DISPLAYS.list ? DISPLAYS.map : DISPLAYS.list
    }
  }
};
</script>

<style scoped>
.RailwayStationsList {
  margin-top: 20px;
}

.RailwayStationsList__toolbar-display {
  margin-left: 5px;
}
</style>
