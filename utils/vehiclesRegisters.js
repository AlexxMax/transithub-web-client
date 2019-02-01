const STATUS = Object.freeze({
  active: {
    localeKey: 'forms.vehicleRegister.status.active',
    color: '#67C23A'
  },
  replaced: {
    localeKey: 'forms.vehicleRegister.status.replaced',
    color: '#E6A23C'
  },
  cancel: {
    localeKey: 'forms.vehicleRegister.status.cancel',
    color: '#F56C6C'
  }
})

export const VIEWS = {
  default: 'default',
  grouped: 'grouped'
}

export const getStatusPresentation = status => {
  return STATUS[status] || STATUS.active
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
