<template>
  <div>
    <div class="Map__title" v-if="title">{{ title }}</div>

    <div v-if="koatuu">
      <iframe
        width="100%"
        height="450"
        frameborder="0"
        style="border:0"
        :src="getMapByKoatuu()"
        allowfullscreen/>
    </div>
  </div>
</template>

<script>
import { GoogleMaps } from '@/utils/maps'

export default {
  name: 'th-map',

  props: {
    title: String,
    koatuu: Boolean,
    pointFromKoatuu: [ String, Number ],
    pointToKoatuu: [ String, Number ]
  },

  methods: {
    getMapByKoatuu() {
      return GoogleMaps.getEmbedMap(this.pointFromKoatuu, this.pointToKoatuu)
    }
  }
}
</script>

<style lang="scss" scoped>
.Map__title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}
</style>
