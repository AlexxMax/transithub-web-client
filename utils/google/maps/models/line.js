export default class GoogleLine {
  constructor(google, map, path, config) {
    this.line = new google.maps.Polyline({
      path: path,
      map: map,
      ...config
    })
  }

  destroy() {
    this.line.setMap(null)
  }
}
