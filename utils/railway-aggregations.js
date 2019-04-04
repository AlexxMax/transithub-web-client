const STATUS = Object.freeze({
  actual: {
    localeKey: 'forms.railwayAggregator.status.actual',
    color: '#67C23A'
  },
  closed: {
    localeKey: 'forms.railwayAggregator.status.closed',
    color: '#F56C6C'
  }
})

export const STATUSES_IDS = {
  actual: 2,
  closed: 3
}

export const getStatusPresentation = status => {
  return STATUS[status] || STATUS.new
}

export const getStatusFilters = context => {
  const filters = []
  for (const key in STATUS) {
    filters.push({
      label: context.$t(STATUS[key].localeKey),
      value: key
    })
  }
  return filters
}

export const getOppositeStatusId = (currentStatusId) => (
  currentStatusId === 2 ? 3 : 2
)

export const getOppositeStatus = (currentStatus) => (
  currentStatus === STATUS.actual.localeKey ? STATUS.closed : STATUS.actual
)

export const LIST_TABS = Object.freeze({
  all: 'all',
  my: 'my',
  map: 'map'

})

export const filtersInit = Object.freeze({
  goods: [],
  railwayAffilations: [],
  railwayStationsFrom: [],
  railwayStationsTo: [],
  statuses: [ STATUSES_IDS.actual ],
  author: null,
  companies: [],
  railwayStationsRoadsFrom: [],
  railwayStationsRoadsTo: [],
  railwayReferenceStations: [],
  polygonNumbers: [],
  periodFrom: null,
  periodTo: null
})

export const setFilter = (context, key, value) => {
  if (!key) {
    return
  }

  switch (key) {
    case 'goods':
      context.$store.dispatch('railwayAggregations/setFilterGoods', value)
      break
    case 'period':
      context.$store.dispatch('railwayAggregations/setFilterPeriod', value)
      break
    case 'railwayAffilations':
      context.$store.dispatch('railwayAggregations/setFilterAffilations', value)
      break
    case 'railwayStationsFrom':
      context.$store.dispatch('railwayAggregations/setFilterStationsFrom', value)
      break
    case 'railwayStationsTo':
      context.$store.dispatch('railwayAggregations/setFilterStationsTo', value)
      break
    case 'statuses':
      context.$store.dispatch('railwayAggregations/setFilterStatuses', value)
      break
    case 'author':
      context.$store.dispatch('railwayAggregations/setFilterAuthor', value ? context.$store.state.user.guid : null)
      break
    case 'companies':
      context.$store.dispatch('railwayAggregations/setFilterCompanies', value)
      break
    case 'railwayStationsRoadsFrom':
      context.$store.dispatch('railwayAggregations/setFilterStationsRoadsFrom', value)
      break
    case 'railwayStationsRoadsTo':
      context.$store.dispatch('railwayAggregations/setFilterStationsRoadsTo', value)
      break
    case 'railwayReferenceStations':
      context.$store.dispatch('railwayAggregations/setFilterReferenceStations', value)
      break
    case 'polygonNumbers':
      context.$store.dispatch('railwayAggregations/setFilterPolygonNumbers', value)
      break
  }
}
