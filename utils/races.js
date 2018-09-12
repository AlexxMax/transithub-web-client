const STATUS = {
  registered: {
    localeKey: 'forms.race.status.registered',
    color: '#409EFF'
  },
  in_progress: {
    localeKey: 'forms.race.status.inProgress',
    color: '#67C23A'
  },
  done: {
    localeKey: 'forms.race.status.done',
    color: '#E5973D'
  },
  pause: {
    localeKey: 'forms.race.status.pause',
    color: '#E6A23C'
  },
  canceled: {
    localeKey: 'forms.race.status.canceled',
    color: '#F56C6C'
  }
}

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
