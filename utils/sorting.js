export const SORTING_DIRECTION = {
  asc: 'asc',
  desc: 'desc',
  disabled: 'disabled'
}

const SORTING_ICON = {
  asc: 'sort-up',
  desc: 'sort-down',
  disabled: 'sort'
}

export const nextSort = current => {
  if (current === SORTING_DIRECTION.disabled) {
    return SORTING_DIRECTION.desc
  } else if (current === SORTING_DIRECTION.desc) {
    return SORTING_DIRECTION.asc
  }
  return SORTING_DIRECTION.disabled
}

export const getIcon = current => {
  if (current === SORTING_DIRECTION.asc) {
    return SORTING_ICON.asc
  } else if (current === SORTING_DIRECTION.desc) {
    return SORTING_ICON.desc
  }
  return SORTING_ICON.disabled
}
