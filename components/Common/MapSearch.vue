<template>
<div class="MapSearch">

  <GoogleMap
    style="height: 500px"
    center-on-ukraine
    :zoom="zoom"
    :on-map-click="handleMapClick"
  >
    <template v-slot:default="{ google, map }">

      <GoogleMapSearch
        :google="google"
        :map="map"
        :query="query"
        :position="position"
      />

    </template>
  </GoogleMap>

</div>
</template>

<script>
import GoogleMap from "@/components/Common/GoogleMap/GoogleMap"
import GoogleMapSearch from '@/components/Common/GoogleMap/GoogleMapSearch'

export default {
  name: 'th-map',

  components: {
    GoogleMap,
    GoogleMapSearch
  },

  props: {
    query: {
      type: String,
      default: ''
    },

    zoom: {
      type: [Number, String],
      default: 15
    }
  },

  data: () => ({
    clickedAt: {}
  }),

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
