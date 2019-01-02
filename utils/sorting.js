export const SORTING_DIRECTION = Object.freeze({
  asc: 'asc',
  desc: 'desc',
  disabled: 'disabled'
})

export const SORTING_DIRECTION_CODES = Object.freeze({
  asc: 0,
  desc: 1,
  disabled: null
})

const SORTING_ICON = Object.freeze({
  asc: 'sort-up',
  desc: 'sort-down',
  disabled: 'sort'
})

export const getSortingDirectionCode = direction => {
  return SORTING_DIRECTION_CODES[direction]
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
