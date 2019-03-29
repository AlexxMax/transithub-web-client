<script>
import GoogleLine from '@/utils/google/maps/models/line'
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
    this.line = new GoogleLine(this.google, this.map.map, this.path, LINE_PATH_CONFIG)
  },

  beforeDestroy() {
    this.line.destroy()
  },

  render() {
    return null
  }
}
</script>
