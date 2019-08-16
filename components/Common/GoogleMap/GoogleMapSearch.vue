<script>
import GoogleMapSearch from '@/utils/google/maps/models/search'
import GoogleMapMarker from '@/utils/google/maps/models/marker'

export default {
  render: _ => null,

  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    query: {
      type: String,
      default: ''
    },
    position: {
      type: Object,
      default: () => {}
    },
  },

  data: () => ({
    mapSearch: null
  }),

  watch: {
    query(value) {
      if (value) this.search(value)
    },

    position(value) {
      if (Object.keys(value).length) this.createMarker(value)
    }
  },

  mounted() {
    this.mapSearch = new GoogleMapSearch(this.google, this.map.map)

    if (!this.query) return
    this.search(this.query)
  },

  methods: {
    search(value) {
      this.mapSearch.findPlaceFromQuery(value)
    },

    createMarker(value) {
      this.mapSearch.createMarker(value)
    }
  }
}
</script>
