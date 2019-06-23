export default class Direction {
  constructor(google, map, origin, destination) {
    this.mode = 'DRIVING'

    this.google = google
    this.map = map

    this.service = new google.maps.DirectionsService()

    const request = {
      origin,
      destination,
      travelMode: google.maps.TravelMode[this.mode]
    }

    const self = this
    return new Promise((resolve, reject) => {
      this.service.route(request, (response, status) => {
        if (status === 'OK') {
          self.renderer = new google.maps.DirectionsRenderer()

          self.renderer.setMap(map)
          // self.renderer.setOptions({ preserveViewport: true })
          self.renderer.setDirections(response)


          // const markerBounds = new google.maps.LatLngBounds()
          // markerBounds.extend(origin)
          // markerBounds.extend(destination)
          // map.panToBounds(markerBounds)
          // map.fitBounds(markerBounds)
          // map.setZoom(10)
          // console.log("TCL: Direction -> constructor -> map", map)

          resolve(self)
        }

        reject(status)
      })
    })
  }
}
