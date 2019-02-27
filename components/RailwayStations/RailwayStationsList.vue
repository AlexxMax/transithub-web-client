<template>
  <CommonList
    :no-pagination="true"
    :count="formatedStations.length"
    :title="$t('forms.common.railwayStations')"
  >
    <Toolbar slot="toolbar" ref="toolbar" @onSearch="handleSearch">
      <ButtonsGroup slot="items">
        <FilterMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/>
      </ButtonsGroup>

      <div slot="menu-items">
        <FilterMenu flat @close="closeToolbar"/>
      </div>
    </Toolbar>

    <div class="RailwayStationsList" v-loading="loading">
      <el-table border stripe :data="formatedStations" style="width: 100%">
        <el-table-column
          resizable
          prop="rwCode"
          :label="$t('forms.common.railwayCode')"
          width="100"
        />
        <el-table-column resizable prop="name" :label="$t('forms.common.railwayStation')"/>
        <el-table-column resizable prop="roadName" :label="$t('forms.common.railwayRoad')"/>
        <el-table-column resizable prop="isRouteStation" :label="$t('forms.common.routeStation')"/>
        <el-table-column
          resizable
          prop="referenceNameRWCode"
          :label="$t('forms.common.stationMiddle')"
        />
        <el-table-column resizable prop="polygonName" :label="$t('forms.common.polygon')"/>
      </el-table>
    </div>
  </CommonList>
</template>

<script>
import CommonList from "@/components/Common/List";
import Toolbar from "@/components/Common/Lists/Toolbar";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";
import FilterMenu from "@/components/RailwayStations/FilterMenu";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

export default {
  name: "th-railway-station-list",

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    CommonList,
    Toolbar,
    ButtonsGroup,
    FilterMenu
  },

  props: {
    stations: {
      type: Array,
      default: () => []
    },
    loading: Boolean
  },

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
    }
  }
};
</script>

<style scoped>
.RailwayStationsList {
  margin-top: 20px;
}
</style>
