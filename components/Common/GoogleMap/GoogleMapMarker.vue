<script>
import { POINT_MARKER_ICON_CONFIG } from '@/utils/google/maps/settings'

const TYPE = Object.freeze({
  route: 'route',
  point: 'point'
})

export default {
  name: 'google-map-marker',

  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: TYPE.point
    }
  },

  mounted() {
    let icon
    if (this.type === TYPE.route) {
      icon = POINT_MARKER_ICON_CONFIG
    }

    new this.google.maps.Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      icon
    })
  }
}
</script>

<style lang='scss' scoped>

</style>
