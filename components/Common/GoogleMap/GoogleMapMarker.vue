<script>
import {
  POINT_MARKER_ICON_CONFIG,
  POINT_MARKER_STATION_REFERENCE_ICON_CONFIG,
  POINT_MARKER_ROUTE_STATION_ICON_CONFIG,
  POINT_MARKER_BLANK_STATION_ICON_CONFIG
} from '@/utils/google/maps/settings'

import { MARKER_TYPE } from '@/utils/google/maps/constants'
import GoogleMapMarker from '@/utils/google/maps/models/marker'

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
      default: MARKER_TYPE.point
    },
    info: String,
    center: Boolean
  },

  data: () => ({
    mapMarker: null,
    zIndex: 1,
    icon: null
  }),

  methods: {
    setPosition(position) {
      this.mapMarker.setPosition(position)
    }
  },

  mounted() {

    if (this.type === MARKER_TYPE.working) {
      this.icon = POINT_MARKER_ICON_CONFIG
      this.zIndex = 10000 + this.marker.data.railwayAggregations.length
    } else if (this.type === MARKER_TYPE.reference) {
      this.icon = POINT_MARKER_STATION_REFERENCE_ICON_CONFIG
      this.zIndex = 1000
    } else if (this.type === MARKER_TYPE.route) {
      this.icon = POINT_MARKER_ROUTE_STATION_ICON_CONFIG
      this.zIndex = 100
    } else if (this.type === MARKER_TYPE.blank) {
      this.icon = POINT_MARKER_BLANK_STATION_ICON_CONFIG
      this.zIndex = 10
    }

    const markerCongif = {
      position: this.marker.position,
      marker: this.marker,
      map: this.map.map,
      icon: this.icon,
      zIndex: this.zIndex,
      optimized: false
    }
    if (this.marker.label) {
      markerCongif.label = this.marker.label
    }

    this.mapMarker = new GoogleMapMarker(this.google, this.map.map, markerCongif, this.info)
  
    this.map.addMarker(this.mapMarker)

    this.mapMarker.addOnClickListener(() => {
      this.map.hideAllMarkers()
      this.mapMarker.showInfoWindow()
    })

    if (this.center) {
      const loc = new google.maps.LatLng(this.mapMarker.marker.position.lat(), this.mapMarker.marker.position.lng())

      const markerBounds = new this.google.maps.LatLngBounds()
      markerBounds.extend(loc)

      this.map.map.fitBounds(markerBounds)
      this.map.map.panToBounds(markerBounds)
    }
  },

  beforeDestroy() {
    this.mapMarker.destroyInfoWindow()
    this.mapMarker.closeInfoWindow()
    this.mapMarker.destroy()
  },

  render() {
    return null
  }
}
</script>
