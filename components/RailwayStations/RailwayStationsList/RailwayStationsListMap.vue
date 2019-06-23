<template>
  <div class="RailwayStationsListMap">
    <div class="RailwayStationsListMap__legend">
      <div class="RailwayStationsListMap__legend-title">{{ $t('forms.common.mapLegend') }}</div>

      <GoogleMapLegendMarker :border-color="colors.COLOR_REFERENCE_POINT" :title="$t('forms.common.mapPointReference')"/>
      <GoogleMapLegendMarker :border-color="colors.COLOR_ROUTE_POINT" :title="$t('forms.common.mapPointRoute')"/>
      <GoogleMapLegendMarker :border-color="colors.COLOR_POINT" :title="$t('forms.common.mapPointBlank')"/>
    </div>

    <GoogleMap v-loading="loading" center-on-ukraine>
      <template v-slot:default="{ google, map }">
        <div>
          <GoogleMapMarker
            v-for="marker of markers"
            :key="marker.id"
            :google="google"
            :map="map"
            :marker="marker"
            :type="marker.type"
            :info="generateContent(marker)"
          />
        </div>

        <div>
          <GoogleMapLine
            v-for="line of lines"
            :key="line.id"
            :google="google"
            :map="map"
            :path="line.path"
          />
        </div>
      </template>
    </GoogleMap>
  </div>
</template>

<script>
import GoogleMap from "@/components/Common/GoogleMap/GoogleMap"
import GoogleMapMarker from '@/components/Common/GoogleMap/GoogleMapMarker'
import GoogleMapLine from '@/components/Common/GoogleMap/GoogleMapLine'
import GoogleMapLegendMarker from '@/components/Common/GoogleMap/GoogleMapLegend/GoogleMapLegendMarker'

import googleMapsMethods from '@/utils/google/maps/methods'
import { MARKER_TYPE } from '@/utils/google/maps/constants'
import colors from '@/utils/google/maps/colors'

export default {
  name: 'th-railway-station-list-map',

  components: {
    GoogleMap,
    GoogleMapMarker,
    GoogleMapLine,
    GoogleMapLegendMarker
  },

  props: {
    loading: Boolean
  },

  data: () => ({ colors }),

  computed: {
    markers() {
      return this.$store.getters['railwayStations/getMapMarkers']
    },
    lines() {
      return this.$store.getters['railwayStations/getMapLines']
    }
  },

  methods: {
    generateContent(marker) {
      if (marker.type === MARKER_TYPE.working) {
        return googleMapsMethods.generateStationContent(marker.data, this)
      } else if (marker.type === MARKER_TYPE.reference) {
        return googleMapsMethods.generateReferenceStationContent(marker.data, this)
      } else if (marker.type === MARKER_TYPE.route) {
        return googleMapsMethods.generateRouteStationContent(marker.data, this)
      } else if (marker.type === MARKER_TYPE.blank) {
        return googleMapsMethods.generateBlankStationContent(marker.data)
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.RailwayStationsListMap {
  display: flex;
  flex-direction: row;
  &__legend {
    margin-right: 20px;
    &-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 15px;
    }
  }
}
@media (max-width: 991px) {
  .RailwayStationsListMap {
    display: flex;
    flex-direction: column-reverse;
    &__legend {
      margin-top: 20px;
      margin-right: 0;
    }
  }
}
</style>
