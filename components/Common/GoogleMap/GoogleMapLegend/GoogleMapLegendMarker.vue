<template>
  <div class="GoogleMapLegendMarker">
    <div class="GoogleMapLegendMarker__point" :style="style"/>
    <div class="GoogleMapLegendMarker__title">{{ title }}</div>
  </div>
</template>

<script>
import colors from '@/utils/google/maps/colors'

export default {
  name: 'th-google-map-legend-marker',

  props: {
    mainColor: {
      type: String,
      default: colors.COLOR_POINT_FILL
    },
    borderColor: {
      type: String,
      default: colors.COLOR_SELECTED_POINT
    },
    title: {
      type: String,
      required: true
    }
  },

  computed: {
    style() {
      return {
        'background-color': this.mainColor,
        'border': `4px solid ${this.borderColor}`
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.GoogleMapLegendMarker {
  padding: 5px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;

  &__point {
     min-height: 20px;
    min-width: 20px;
    max-height: 20px;
    max-width: 20px;
    border-radius: 50%;
  }

  &__title {
    margin-left: 10px;
    line-height: 2;
  }
}
</style>
