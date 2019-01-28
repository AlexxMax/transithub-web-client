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
