<template>
  <div class="GoogleMap" ref="googleMap">
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map"/>
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

import { mapSettings as googleMapsSettings } from '@/utils/google/maps/settings'
import GoogleMap from '@/utils/google/maps/models/map'
import config from '@/config'

const MAIN_COUNTRY = 'Ukraine'

export default {
  name: 'google-map',

  props: {
    center: Object
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

  async mounted() {
    let language = this.$store.state.locale
    if (this.$store.state.locale === 'ua') {
      language = 'uk'
    }
    this.google = await GoogleMapsApiLoader({
      apiKey: config.google.maps.apiKey,
      language
    })
    this.initializeMap()
  },

  methods: {
    initializeMap() {
      this.map = new GoogleMap(this.google, this.$refs.googleMap, this.mapConfig)

      if (!Boolean(this.center)) {
        this.map.center('Ukraine')
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
