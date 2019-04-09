<template>
  <div>
    <h3 class="RailwayStationsList__title">{{ $t('forms.common.railwayStations') }}</h3>
    <CommonList :no-pagination="true" :count="formatedStations.length">
      <ToolbarRight
        class="RailwayStationsList__toolbar-right"
        slot="toolbar"
        ref="toolbar"
        @onSearch="handleSearch"
      >
        <div slot="items">
          <ButtonsGroup>
            <FilterMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/>

            <Button
              class="RailwayStationsList__toolbar-display"
              round
              plain
              icon-only
              :fa-icon="display === DISPLAYS.map ? 'list' : 'map-marked-alt'"
              :type="null"
              @click="handleDisplayChangeButton"
            >{{ display === DISPLAYS.map ? $t('forms.common.list') : $t('forms.common.map') }}</Button>
          </ButtonsGroup>
        </div>
        <div slot="menu-items">
          <FilterMenu flat @close="closeToolbar"/>
        </div>
      </ToolbarRight>

      <div class="RailwayStationsListAll">
        <RailwayStationsListAll
          v-if="display === DISPLAYS.list"
          :loading="loading"
          :stations="formatedStations"
        />

        <RailwayStationsListMap
          class="RailwayStationsListMap"
          v-else
          :loading="loading"
          :stations="stations"
        />
      </div>
    </CommonList>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List";
import ToolbarRight from "@/components/Common/Lists/ToolbarRight";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";
import FilterMenu from "@/components/RailwayStations/FilterMenu";
import Button from "@/components/Common/Buttons/Button";
import RailwayStationsListAll from "@/components/RailwayStations/RailwayStationsList/RailwayStationsListAll";
import RailwayStationsListMap from "@/components/RailwayStations/RailwayStationsList/RailwayStationsListMap";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

const DISPLAYS = Object.freeze({
  list: "list",
  map: "map"
});

export default {
  name: "th-railway-station-list",

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    CommonList,
    ToolbarRight,
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
      this.display =
        this.display === DISPLAYS.list ? DISPLAYS.map : DISPLAYS.list;
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
.RailwayStationsList__title {
  display: flex;
  font-size: 18px;
  font-weight: 500;
  color: #606266;
  position: absolute;
  margin: 5px 7px;
}
.RailwayStationsList__toolbar-right {
  display: flex;
  justify-content: flex-end;
  position: relative;
}
.RailwayStationsListAll {
  margin-top: 45px;
}

@media (max-width: 770px) {
  .RailwayStationsList__title {
    width: 103%;
    display: flex;
    margin: -35px;
    justify-content: center;
    align-items: center;
  }
  .RailwayStationsList__toolbar-right {
    margin-top: 45px;
    margin-left: -18px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
}
@media (max-width: 600px) {
  .RailwayStationsList__toolbar-display {
    margin: 10px 0 8px 5px;
  }
  .RailwayStationsList__toolbar-right {
    display: block;
    width: 100%;
    margin-left: -10px;
  }
  .RailwayStationsListMap {
    margin-left: 0;
    color: blue;
  }
  .RailwayStationsListAll {
    margin-top: -10px;
  }
}
@media (max-width: 450px) {
  .RailwayStationsList__title {
    width: 107%;
  }
}
</style>
