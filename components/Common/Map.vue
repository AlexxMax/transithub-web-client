<template>
  <div>
    <div class="Map__title" v-if="title">{{ title }}</div>

    <GoogleMap>
      <template v-slot:default="{ google, map }">
        <div v-if="(pointFromKoatuu && pointToKoatuu) || (origin && destination)">
          <GoogleMapDirection
            :google="google"
            :map="map"
            :origin="pointFromKoatuu || origin"
            :destination="pointToKoatuu || destination"
          />
        </div>

        <div v-else>
          <GoogleMapMarker
            :google="google"
            :map="map"
            :marker="marker"
            :type="MARKER_TYPE.point"
          />
        </div>
      </template>
    </GoogleMap>
  </div>
</template>

<script>
import GoogleMap from "@/components/Common/GoogleMap/GoogleMap"
import GoogleMapDirection from "@/components/Common/GoogleMap/GoogleMapDirection"
import GoogleMapMarker from "@/components/Common/GoogleMap/GoogleMapMarker"

import { MARKER_TYPE } from "@/utils/google/maps/constants"

export default {
  name: 'th-map',

  components: {
    GoogleMap,
    GoogleMapDirection,
    GoogleMapMarker
  },

  props: {
    title: String,
    koatuu: Boolean,
    pointFromKoatuu: [ String, Number ],
    pointToKoatuu: [ String, Number ],
    lat: [ String, Number ],
    lng: [ String, Number ],
    origin: Object,
    destination: Object
  },

  data: () => ({
    MARKER_TYPE
  }),

  computed: {
    marker() {
      return {
        position: {
          lat: this.lat,
          lng: this.lng
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Map__title {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 15px;
}
</style>
