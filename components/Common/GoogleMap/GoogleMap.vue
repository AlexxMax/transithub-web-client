<template>
  <div class="GoogleMap" ref="googleMap">
    <no-ssr placeholder="Loading Map...">
      <template v-if="Boolean(this.google) && Boolean(this.map)">
        <slot :google="google" :map="map"/>
      </template>
    </no-ssr>
  </div>
</template>

<script>
import { mapSettings as googleMapsSettings } from '@/utils/google/maps/settings'
import GoogleMap from '@/utils/google/maps/models/map'

const CENTER_UKRAINE = { lat: 48.379433, lng: 31.1655799 }

export default {
  name: 'th-google-map',
  props: {
    center: Object,
    onMapClick: Function,
    zoom: {
      type: [Number, String],
      default: googleMapsSettings.minZoom
    },
  },
  data: () => ({
    google: null,
    map: null
  }),

  watch: {
    zoom(value) {
      this.setZoom(value)
    },

    center(value) {
      this.setCenter(value)
    }
  },

  computed: {
    mapConfig() {
      let config = { ...googleMapsSettings }

      if (this.zoom)
        config.zoom = this.zoom

      if (this.center && Object.keys(this.center).length)
        config.center = this.center
      else
        config.center = CENTER_UKRAINE

      return config
    }
  },
  mounted() {
    if (process.client) {
      this.google = window.google
      this.initializeMap()
    }
  },
  methods: {
    initializeMap() {
      this.map = new GoogleMap(this.google, this.$refs.googleMap, this.mapConfig)

      if (this.onMapClick)
        this.map.addListener('click', this.onMapClick)

    },

    setZoom(value) {
      this.map.setZoom(value)
    },

    setCenter(value) {
      this.map.setCenter(value)
    }
  }
}
</script>

<style lang='scss' scoped>
.GoogleMap {
  width: 100%;
  height: calc(100vh - 100px);
}
</style>
