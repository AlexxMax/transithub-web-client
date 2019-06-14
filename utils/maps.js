class Google {
  getEmbedMap(pointFrom, pointTo) {
    return `https://www.google.com/maps/embed/v1/directions?origin=${
      pointFrom
    }&destination=${
      pointTo
    }&key=AIzaSyAAn4hNzISJpFeA2Q-YX9YPPvc9t5RUdWU&language=uk&igu=1`
  }
}

export const GoogleMaps = new Google()
