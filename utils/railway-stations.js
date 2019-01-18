import _uniqby from 'lodash.uniqby'

export const generateStationsByRoadsTree = (stations, polygonRWCode = null, polygonNumber = null) => {
	const result = []

  const _stations = stations.filter(({
    guid,
    name,
    rwCode,
    roadGuid,
    roadName,
    isRouteStation,
    referenceRwCode,
    polygonNumber: _polygonNumber
  }) => {
    if (polygonRWCode && polygonNumber) {
      if (polygonRWCode === referenceRwCode && polygonNumber === _polygonNumber) {
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
        isRouteStation: item.isRouteStation,
        polygonNumber: item.polygonNumber,
        referenceStationGuid: item.referenceStationGuid
      }))
    })
  })

  return result
}

export const getMiddleStation = (stations, stationRwCode) => {
  const station = stations.find(item => item.rwCode === stationRwCode)
  if (station) {
    return {
      guid: station.referenceGuid,
      rwCode: station.referenceRwCode,
      name: station.referenceName
    }
  }
  return {}
}

export const getStationPolygon = (stations, stationRwCode) => {
  const station = stations.find(item => item.rwCode === stationRwCode)
  if (station) {
    return station.polygonNumber
  }
  return ''
}
