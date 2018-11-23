import _uniqby from 'lodash.uniqby'

export const generateStationsByRoadsTree = stations => {
  const result = []

  const _stations = stations.map(({ guid, name, rwCode, roadGuid, roadName }) => ({
    guid, name, rwCode, roadGuid, roadName
  }))

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
        rwCode: item.rwCode
      }))
    })
  })

  return result
}
