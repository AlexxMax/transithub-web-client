import { STATUSES_IDS } from '@/utils/railway-aggregations'

export const filtersInit = Object.freeze({
  goods: [],
  railwayAffilations: [],
  railwayStationsFrom: [],
  railwayStationsTo: [],
  statuses: [ STATUSES_IDS.actual ],
  companies: [],
  railwayStationsRoadsFrom: [],
  railwayStationsRoadsTo: [],
  railwayReferenceStations: [],
  polygonNumbers: [],
  income: 0
})

export const setFilter = (context, key, value) => {
  switch (key) {
    case 'goods':
      context.$store.dispatch('railwayRequests/setFilterGoods', value)
      break
    case 'railwayAffilations':
      context.$store.dispatch('railwayRequests/setFilterAffilations', value)
      break
    case 'railwayStationsFrom':
      context.$store.dispatch('railwayRequests/setFilterStationsFrom', value)
      break
    case 'railwayStationsTo':
      context.$store.dispatch('railwayRequests/setFilterStationsTo', value)
      break
    case 'statuses':
      context.$store.dispatch('railwayRequests/setFilterStatuses', value)
      break
    case 'author':
      context.$store.dispatch('railwayRequests/setFilterAuthor', value ? context.$store.state.user.guid : null)
      break
    case 'companies':
      context.$store.dispatch('railwayRequests/setFilterCompanies', value)
      break
    case 'railwayStationsRoadsFrom':
      context.$store.dispatch('railwayRequests/setFilterStationsRoadsFrom', value)
      break
    case 'railwayStationsRoadsTo':
      context.$store.dispatch('railwayRequests/setFilterStationsRoadsTo', value)
      break
    case 'railwayReferenceStations':
      context.$store.dispatch('railwayRequests/setFilterReferenceStations', value)
      break
    case 'polygonNumbers':
      context.$store.dispatch('railwayRequests/setFilterPolygonNumbers', value)
      break
  }
}
