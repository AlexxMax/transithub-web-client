<template>
  <div>
    <GoogleMap v-loading="loading" style="min-height: 800px;">
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
import GoogleMap from '@/components/Common/GoogleMap/GoogleMap'
import GoogleMapMarker from '@/components/Common/GoogleMap/GoogleMapMarker'
import GoogleMapLine from '@/components/Common/GoogleMap/GoogleMapLine'

import googleMapsMethods from '@/utils/google/maps/methods'
import { MARKER_TYPE } from '@/utils/google/maps/constants'

export default {
  name: 'th-railway-station-list-map',

  props: {
    loading: Boolean
  },

  components: {
    GoogleMap,
    GoogleMapMarker,
    GoogleMapLine
  },

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
