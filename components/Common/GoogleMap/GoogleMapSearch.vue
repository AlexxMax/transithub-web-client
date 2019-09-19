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
    }
  },

  data: () => ({
    mapSearch: null
  }),

  watch: {
    query: _.debounce(function() {
      if (this.query) this.search(this.query)
    }, 500)
  },

  mounted() {
    this.mapSearch = new GoogleMapSearch(this.google, this.map.map)

    if (!this.query) return
    this.search(this.query)
  },

  methods: {
    async search(value) {
      const results = await this.mapSearch.findPlaceFromQuery(value)
      this.$emit('on-search', results)
    }
  }
}
</script>
