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
      this.map = new this.google.maps.Map(this.$refs.googleMap, this.mapConfig)

      if (!Boolean(this.center)) {
        this.centerMap()
      }
    },

    centerMap() {
      const self = this
      const country = 'Ukraine'
      var geocoder = new this.google.maps.Geocoder()
      geocoder.geocode( { 'address': country }, function(results, status) {
        if (status == this.google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location
          if (location) {
            self.map.setCenter(location)
          }
        } else {
          console.error("Could not find location: " + location)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.GoogleMap {
  width: 100%;
  min-height: 100%;
}
</style>
