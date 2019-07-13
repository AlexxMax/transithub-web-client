const STATUS = Object.freeze({
  new: {
    localeKey: 'forms.request.status.new',
    color: '#409EFF'
  },
  in_work: {
    localeKey: 'forms.request.status.inWork',
    color: '#67C23A'
  },
  archived: {
    localeKey: 'forms.request.status.archived',
    color: '#E6A23C'
  }
})

export const VEHICLES_REGISTER_STATUS = Object.freeze({
  not_sent: {
    localeKey: 'forms.request.vehiclesRegisterHandleStatus.notSent',
    color: '#F56C6C'
  },
  sent: {
    localeKey: 'forms.request.vehiclesRegisterHandleStatus.sent',
    color: '#67C23A'
  },
  no_registers: {
    localeKey: 'forms.request.vehiclesRegisterHandleStatus.noRegisters',
    color: '#303133'
  }
})

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

export const getVehiclesRegisterStatus = status => {
  return VEHICLES_REGISTER_STATUS[status] || null
}

export const USER_STATUSES = Object.freeze({
  NEW: 'new',
  IN_WORK: 'in_work',
  ARCHIVED: 'archived'
})

export const DISTANCE = Object.freeze({
  FROM: 0,
  TO: 800
})

export const getVehiclesRegisterStatusSelect = context => {
  const vehiclesRegistersStatuses = []
  for (const key in VEHICLES_REGISTER_STATUS) {
    vehiclesRegistersStatuses.push({
      code: key,
      name: context.$t(getVehiclesRegisterStatus(key).localeKey)
    })
  }

  return vehiclesRegistersStatuses
}

export const filtersInit = Object.freeze({
  numbers: [],
  periodFrom: null,
  periodTo: null,
  clients: [],
  goods: [],
  pointsFrom: [],
  pointsTo: [],
  statuses: [],
  logists: [],
  distanceFrom: DISTANCE.FROM,
  distanceTo: DISTANCE.TO,
  regionsFrom: [],
  regionsTo: [],
  noVehiclesRegisters: false,
  organisations: [],
  vehiclesRegistersStatuses: []
})

export const setFilter = (context, key, value) => {
  if (!key) {
    return
  }

  switch (key) {
    case 'number':
      context.$store.dispatch('requests/setFilterNumber', value)
      break
    case 'period':
      context.$store.dispatch('requests/setFilterPeriod', value)
      break
    case 'status':
      context.$store.dispatch('requests/setFilterStatuses', value)
      break
    case 'client':
      context.$store.dispatch('requests/setFilterClient', value)
      break
    case 'logist':
      context.$store.dispatch('requests/setFilterLogists', value)
      break
    case 'goods':
      context.$store.dispatch('requests/setFilterGoods', value)
      break
    case 'pointsFrom':
      context.$store.dispatch('requests/setFilterPointsFrom', value)
      break
    case 'pointsTo':
      context.$store.dispatch('requests/setFilterPointsTo', value)
      break
    case 'distanceFrom':
      context.$store.dispatch('requests/setFilterDistanceFrom', value)
      break
    case 'distanceTo':
      context.$store.dispatch('requests/setFilterDistanceTo', value)
      break
    case 'regionsFrom':
      context.$store.dispatch('requests/setFilterRegionsFrom', value)
      break
    case 'regionsTo':
      context.$store.dispatch('requests/setFilterRegionsTo', value)
      break
    case 'noVehiclesRegisters':
      context.$store.dispatch('requests/setFilterNoVehiclesRegisters', value)
      break
    case 'organisations':
      context.$store.dispatch('requests/setFilterOrganisations', value)
      break
    case 'vehiclesRegistersStatuses':
      context.$store.dispatch('requests/setFilterVehiclesRegistersStatus', value)
      break
  }
}
