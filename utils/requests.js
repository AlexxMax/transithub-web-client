const REQUESTS_STATUS = {
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
}

export const getStatusPresentation = status => {
  return REQUESTS_STATUS[status] || REQUESTS_STATUS.new
}

export const getStatusFilters = translate => {
  const filters = []
  for (const key in REQUESTS_STATUS) {
    filters.push({
      label: translate(REQUESTS_STATUS[key].localeKey),
      value: key
    })
  }
  return filters
}
