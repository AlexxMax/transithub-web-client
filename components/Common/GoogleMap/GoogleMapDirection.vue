<script>
import GoogleMapDirection from '@/utils/google/maps/models/direction'
import GoogleMapLatLng from '@/utils/google/maps/models/latLng'

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
      type: [ String, Object ],
      required: true
    },
    destination: {
      type: [ String, Object ]
    }
  },

  data: () => ({ direction: null }),

  async mounted() {
    let from = this.origin
    let to = this.destination
    if (typeof this.origin === 'object') {
      from = new GoogleMapLatLng(this.google, this.origin.lat, this.origin.lng)
      to = new GoogleMapLatLng(this.google, this.destination.lat, this.destination.lng)
      from = from.latLng
      to = to.latLng
    }

    try {
      this.direction = await new GoogleMapDirection(
        this.google,
        this.map.map,
        from,
        to
      )
    } catch (error) {
      console.error(error)
    }
  },

  render() {
    return null
  }
}
</script>
