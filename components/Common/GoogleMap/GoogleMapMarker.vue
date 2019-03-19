<template>
  <div></div>
</template>

<script>
import {
  POINT_MARKER_ICON_CONFIG,
  POINT_MARKER_STATION_REFERENCE_ICON_CONFIG,
  POINT_MARKER_ROUTE_STATION_ICON_CONFIG,
  POINT_MARKER_BLANK_STATION_ICON_CONFIG
} from '@/utils/google/maps/settings'

import { MARKER_TYPE } from '@/utils/google/maps/constants'

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
    info: String
  },

  data: () => ({
    mapMarker: null,
    infoWindow: null,
    zIndex: 1,
    icon: null
  }),

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
      map: this.map,
      icon: this.icon,
      zIndex: this.zIndex
    }
    if (this.marker.label) {
      markerCongif.label = this.marker.label
    }

    this.mapMarker = new this.google.maps.Marker(markerCongif)

    if (this.info) {
      this.infoWindow = new this.google.maps.InfoWindow({
        content: this.info
      })

      this.mapMarker.addListener('click', () => {
        this.infoWindow.open(this.map, this.mapMarker)
      })
    }
  },

  beforeDestroy() {
    if (this.infoWindow) {
      this.google.maps.event.clearInstanceListeners(this.infoWindow);
      this.infoWindow.close();
    }
    this.mapMarker.setMap(null)
  }
}
</script>
