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

const VEHICLES_REGISTER_STATUS = Object.freeze({
  not_sent: {
    localeKey: 'forms.request.vehiclesRegisterHandleStatus.notSent',
    color: '#F56C6C'
  },
  sent: {
    localeKey: 'forms.request.vehiclesRegisterHandleStatus.sent',
    color: '#67C23A'
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
