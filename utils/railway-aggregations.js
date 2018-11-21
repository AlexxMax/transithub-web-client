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

export const getStatusPresentation = status => {
  return STATUS[status] || STATUS.new
}

export const getStatusFilters = translate => {
  const filters = []
  for (const key in STATUS) {
    filters.push({
      label: translate(STATUS[key].localeKey),
      value: key
    })
  }
  return filters
}
