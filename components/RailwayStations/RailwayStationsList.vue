<template>
  <CommonList
    :no-pagination="true"
    :count="formatedStations.length"
    :title="$t('forms.common.railwayStations')"
  >
    <div class="RailwayStationsList">
      <el-table v-loading="loading" border stripe :data="formatedStations" style="width: 100%">
        <el-table-column
          fixed
          resizable
          prop="rwCode"
          :label="$t('forms.common.railwayCode')"
          width="100"
        />
        <el-table-column fixed resizable prop="name" :label="$t('forms.common.railwayStation')"/>
        <!-- <el-table-column prop="isRouteStation" label="Маршрут" width="246"/> -->
        <el-table-column resizable prop="roadName" :label="$t('forms.common.railwayRoad')"/>
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

export default {
  name: "th-railway-station-list",

  components: { CommonList },

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
        referenceNameRWCode: item.referenceName
          ? `${item.referenceName} (${item.referenceRwCode})`
          : ""
      }));
    }
  }
};
</script>

<style scoped>
.RailwayStationsList {
  margin-top: 20px;
}
</style>