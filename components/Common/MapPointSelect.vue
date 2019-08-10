<template>
  <GoogleMap :on-map-click="handleMapClick">
    <template v-slot:default="{ google, map }">
      <GoogleMapMarker
        ref="map-marker"
        center
        :google="google"
        :map="map"
        :marker="marker"
        :type="MARKER_TYPE.point"
      />
    </template>
  </GoogleMap>
</template>

<script>
import GoogleMap from "@/components/Common/GoogleMap/GoogleMap"
import GoogleMapMarker from "@/components/Common/GoogleMap/GoogleMapMarker"

import { MARKER_TYPE } from "@/utils/google/maps/constants"

export default {
  name: 'th-map-point-select',

  components: {
    GoogleMap,
    GoogleMapMarker
  },

  props: {
    lat: [ String, Number ],
    lng: [ String, Number ]
  },

  data: () => ({
    clickedLat: null,
    clickedLng: null,

    MARKER_TYPE
  }),

  computed: {
    position() {
      return {
        lat: this.clickedLat || this.lat,
        lng: this.clickedLng || this.lng
      }
    },
    marker() {
      return {
        position: this.position
      }
    }
  },

  methods: {
    handleMapClick(event) {
      this.clickedLat = event.latLng.lat()
      this.clickedLng = event.latLng.lng()
      this.$refs['map-marker'].setPosition(this.position)
      this.$emit('select', this.position)
    }
  }
}
</script>
