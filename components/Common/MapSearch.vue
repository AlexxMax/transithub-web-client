<template>
<div class="MapSearch">

  <GoogleMap
    style="height: 500px"
    :center="position"
    :zoom="zoom"
    :on-map-click="handleMapClick"
  >
    <template v-slot:default="{ google, map }">

      <GoogleMapSearch
        :google="google"
        :map="map"
        :query="query"
        @on-search="results => $emit('on-search', results)"
      />

      <GoogleMapMarker
        :key="googleMapMarkerKey"
        :google="google"
        :map="map"
        :marker="{ position }"
      />

    </template>
  </GoogleMap>

</div>
</template>

<script>
import GoogleMap from "@/components/Common/GoogleMap/GoogleMap"
import GoogleMapSearch from '@/components/Common/GoogleMap/GoogleMapSearch'
import GoogleMapMarker from '@/components/Common/GoogleMap/GoogleMapMarker'

export default {
  name: 'th-map',

  components: {
    GoogleMap,
    GoogleMapSearch,
    GoogleMapMarker
  },

  props: {
    query: {
      type: String,
      default: ''
    },

    zoom: {
      type: [Number, String],
      default: 15
    },

    marker: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    clickedAt: {},
    googleMapMarkerKey: 0
  }),

  watch: {
    marker: {
      immediate: true,
      handler(value) {
        if (Object.keys(value).length) {
          this.clickedAt = { lat: value.lat, lng: value.lng }
          this.googleMapMarkerKey += 1
        }
      }
    }
  },

  computed: {
    position() {
      return this.clickedAt
    }
  },

  methods: {
    handleMapClick(event) {
      this.clickedAt = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      this.$emit('on-map-click', this.clickedAt)
    }
  }
}
</script>

<style lang="scss" scoped>
.MapSearch {}
</style>
