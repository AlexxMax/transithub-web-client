import GoogleMapMarker from '@/utils/google/maps/models/marker'

export default class GoogleMapSearch {
  constructor(google, map) {
    this.google = google
    this.map = map
    this.marker = null
    this.service = new google.maps.places.PlacesService(map)
  }

  findPlaceFromQuery(query) {

    const request = {
      query,
      fields: ['geometry.location']
    }

    this.service.findPlaceFromQuery(request, (results, status) => {

      if (status !== google.maps.places.PlacesServiceStatus.OK) return

      results.forEach(item => this.createMarker(item.geometry.location))

    })

  }

  createMarker(position) {
    if (this.marker)
      this.marker.destroy()

    this.map.setCenter(position)
    this.marker = new GoogleMapMarker(this.google, this.map, {
      map: this.map,
      position
    })
  }
}