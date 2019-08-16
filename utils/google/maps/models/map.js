export default class GoogleMap {
  constructor(google, domEl, config) {
    this.google = google
    this.map = new google.maps.Map(domEl, config)
    this.markers = []
  }

  center(locationName) {
    const self = this
    var geocoder = new this.google.maps.Geocoder()
    geocoder.geocode({ 'address': locationName }, function (results, status) {
      if (status == this.google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location
        if (location) {
          self.map.setCenter(location)
        }
      } else {
        console.error("Could not find location: " + location)
      }
    })
  }

  addListener(event, cb) {
    const self = this
    this.map.addListener(event, function (event) {
      cb(event, self.map)
    })
  }

  addMarker(marker) {
    this.markers.push(marker)
  }

  hideAllMarkers() {
    this.markers.forEach((marker) => {
      if (marker.infoWindow) {
        marker.closeInfoWindow()
      }
    })
  }
}