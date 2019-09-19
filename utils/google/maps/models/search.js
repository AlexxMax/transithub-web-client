import GoogleMapMarker from '@/utils/google/maps/models/marker'

export default class GoogleMapSearch {
  constructor(google, map) {
    this.google = google
    this.map = map
    this.service = new google.maps.places.PlacesService(map)
  }

  async findPlaceFromQuery(query) {
    const request = {
      query,
      fields: ['geometry.location']
    }

    return new Promise((resolve, reject) => {

      this.service.findPlaceFromQuery(request, (results, status) => {

        status === google.maps.places.PlacesServiceStatus.OK ? resolve(results) : reject(null)

      })

    })
  }
}
