import _uniqby from 'lodash.uniqby'

export const generateStationsByRoadsTree = (stations, polygon = null) => {
  const result = []

  const _stations = stations.filter(({ guid, name, rwCode, roadGuid, roadName, isRouteStation, polygonId}) => {
    if (polygon) {
      if (polygonId === polygon) {
        return { guid, name, rwCode, roadGuid, roadName, isRouteStation }
      }
    } else {
      return { guid, name, rwCode, roadGuid, roadName, isRouteStation }
    }
  })

  const roads = _uniqby(_stations.map(({ roadGuid, roadName }) => ({ roadGuid, roadName })), 'roadGuid')

  roads.forEach(({ roadGuid, roadName }) => {
    result.push({
      id: roadGuid,
      label: roadName,
      children: (_stations.filter(station => station.roadGuid === roadGuid)).map(item => ({
        id: item.rwCode,
        label: `${item.name} (${item.rwCode})`,
        name: item.name,
        road: roadName,
        rwCode: item.rwCode,
        isRouteStation: item.isRouteStation
      }))
    })
  })

  return result
}
