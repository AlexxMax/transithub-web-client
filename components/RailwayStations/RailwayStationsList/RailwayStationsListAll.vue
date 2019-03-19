<template>
  <div class="RailwayStationsList" v-loading="loading">
    <el-table border stripe :data="stations" style="width: 100%">
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
</template>

<script>
export default {
  name: 'th-railway-station-list-all',

  props: {
    stations: {
      type: Array,
      default: () => []
    },
    loading: Boolean
  }
}
</script>
