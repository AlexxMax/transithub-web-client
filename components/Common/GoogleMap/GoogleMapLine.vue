<script>
import { LINE_PATH_CONFIG } from '@/utils/google/maps/settings'

export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    path: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    line: null
  }),

  mounted() {
    this.line = new this.google.maps.Polyline({
      path: this.path,
      map: this.map,
      ...LINE_PATH_CONFIG
    })
  },

  beforeDestroy() {
    this.line.setMap(null)
  },

  render() {
    return null
  }
}
</script>
