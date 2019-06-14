<script>
import GoogleMapDirection from '@/utils/google/maps/models/direction'

export default {
  name: 'google-map-direction',

  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    origin: {
      type: String,
      required: true
    },
    destination: {
      type: String
    }
  },

  data: () => ({ direction: null }),

  mounted() {
    this.direction = new GoogleMapDirection(
      this.google,
      this.map.map,
      this.origin,
      this.destination
    )
  },

  render() {
    return null
  }
}
</script>
