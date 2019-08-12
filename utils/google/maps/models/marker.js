export default class GoogleMapMarker {
  constructor(google, map, config, info = null) {
    this.google = google
    this.map = map

    this.marker = new google.maps.Marker(config)

    if (info) {
      this.infoWindow = new google.maps.InfoWindow({
        content: info
      })
    }
  }

  setPosition(position) {
    this.marker.setPosition(position)
  }

  addOnClickListener(listener) {
    this.marker.addListener('click', listener)
  }

  showInfoWindow() {
    if (this.infoWindow) {
      this.infoWindow.open(this.map, this.marker)
    }
  }

  closeInfoWindow() {
    if (this.infoWindow) {
      this.infoWindow.close()
    }
  }

  destroyInfoWindow() {
    if (this.infoWindow) {
      this.google.maps.event.clearInstanceListeners(this.infoWindow)
    }
  }

  destroy() {
    this.marker.setMap(null)
  }
}
