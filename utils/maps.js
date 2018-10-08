class Google {
  getEmbedMap(pointFrom, pointTo) {
    return `https://www.google.com/maps/embed/v1/directions?origin=${
      pointFrom
    }&destination=${
      pointTo
    }&key=AIzaSyC-NMwliNHhxomPQJaQeu24GPQablR-rDk&language=uk`
  }
}

export const GoogleMaps = new Google()
