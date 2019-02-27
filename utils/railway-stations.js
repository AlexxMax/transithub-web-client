import _uniqby from 'lodash.uniqby'
import _orderBy from 'lodash.orderby'

export const FILTERS_IS_ROUTE_STATION = {
  isRoute: 'is',
  notRoute: 'not'
}

export const generateStationsByRoadsTree = (stations, polygonRWCode = null, polygonId = null) => {
	const result = []

  const _stations = stations.filter(({
    guid,
    name,
    rwCode,
    roadGuid,
    roadName,
    isRouteStation,
    referenceRwCode,
    polygonId: _polygonId
  }) => {
    if (polygonRWCode && polygonId) {
      if (polygonRWCode === referenceRwCode && polygonId === _polygonId) {
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
    return {
      polygonId: station.polygonId,
      polygonName: station.polygonName
    }
  }
  return {}
}

export const getStationPolygons = (polygons, stationsRWCodes) => {
  if (!stationsRWCodes || stationsRWCodes.length === 0 || !stationsRWCodes[0]) {
    return _orderBy(polygons, 'name')
  }

  const _polygons = []
  stationsRWCodes.forEach(stationRWCode => {
    (polygons.filter(polygon => polygon.stationRwCode === stationRWCode) || []).forEach(p => {
      _polygons.push(p)
    })

    // polygons.forEach(polygon => {
    //   if (polygon.stationRwCode === station.rwCode) {
    //     _polygons.push(polygon)
    //   }
    // })
  })

  return _orderBy(_polygons, 'name')
}
