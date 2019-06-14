export default class Direction {
  constructor(google, map, origin, destination) {
    this.mode = 'DRIVING'

    this.google = google
    this.map = map

    this.service = new google.maps.DirectionsService()
    this.renderer = new google.maps.DirectionsRenderer()

    this.renderer.setMap(this.map)

    const request = {
      origin,
      destination,
      travelMode: google.maps.TravelMode[this.mode]
    }

    const self = this
    this.service.route(request, (response, status) => {
      if (status === 'OK') {
        self.renderer.setDirections(response)
      }
    })
  }
}
