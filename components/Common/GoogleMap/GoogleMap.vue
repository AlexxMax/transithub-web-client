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

export default {
  name: 'th-google-map',

  props: {
    center: Object,
    centerOnUkraine: Boolean,
    onMapClick: Function
  },

  data: () => ({
    google: null,
    map: null
  }),

  computed: {
    mapConfig() {
      const config = { ...googleMapsSettings }
      if (Boolean(this.center)) {
        config.center = this.center
      }
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

      if (this.centerOnUkraine) {
        this.map.center('Ukraine')
      }

      if (this.onMapClick) {
        this.map.addListener('click', this.onMapClick)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.GoogleMap {
  width: 100%;
  height: calc(100vh - 160px);
}
</style>
