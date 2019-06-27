const STATUS = Object.freeze({
  new: {
    localeKey: 'forms.request.status.new',
    color: '#409EFF'
  },
  active: {
    localeKey: 'forms.request.status.active',
    color: '#67C23A'
  },
  to_replace: {
    localeKey: 'forms.request.status.toReplace',
    color: '#E5973D'
  },
  replace: {
    localeKey: 'forms.request.status.replace',
    color: '#E6A23C'
  },
  cancel: {
    localeKey: 'forms.request.status.cancel',
    color: '#F56C6C'
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
