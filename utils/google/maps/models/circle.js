import GoogleMapMarker from '@/utils/google/maps/models/marker'
import { CIRCLE_CONFIG } from '@/utils/google/maps/settings'

export default class GoogleMapCircle {
  constructor(google, map, center, radius, editable = false) {
    this.google = google
    this.map = map

    let config = { ...CIRCLE_CONFIG }
    if (editable) config = { ...config, geodesic: true, editable: true }

    this.marker = new GoogleMapMarker(google, map, { map: map, position: center })

    this.center = center
    this.circle = new google.maps.Circle({ ...config, map: map, center, radius })
  }

  addOnRadiusChangeListener(listener) {
    this.circle.addListener('radius_changed', listener)
  }

  addOnCenterChangeListener(listener) {
    this.circle.addListener('center_changed', listener)
  }

  setRadius(radius) {
    this.circle.setRadius(radius)
  }

  getRadius() {
    return this.circle.getRadius()
  }

  setCenter(center) {
    this.circle.setCenter(center)
  }

  getCenter() {
    return this.circle.getCenter()
  }

  destroy() {
    this.circle.setMap(null)
  }
}
