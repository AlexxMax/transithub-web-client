<script>
import _ from 'lodash'

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
    query: _.debounce(function() {
      if (this.query) this.search(this.query)
    }, 500),

    position(value) {
      if (Object.keys(value).length) this.createMarker(value)
    }
  },

  mounted() {
    this.mapSearch = new GoogleMapSearch(this.google, this.map.map)

    if (Object.keys(this.position).length)
      this.createMarker(this.position)

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
