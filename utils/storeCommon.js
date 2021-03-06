/**
 * Generate grouped list (array) by groups
 *
 * @param {*} list
 * @param {*} groups
 * @param {*} constGroups
 * @returns []
 */
export const getGroupedList = (list, groups, constGroups) => {
  const groupsFiltered = groups.filter(item => item.use)
  const listCopy = list.map((item) => ({ ...item }))
  const _groups = []

  listCopy.forEach(item => {
    item._group = ''
    groupsFiltered.forEach(group => {
      const key = constGroups[group.name]
      if (key && item[key]) {
        item._group = (item._group === '' ? item._group : item._group + ', ') + item[key]
      }
    })
    const _group = _groups.find(_group => _group.group === item._group)
    if (_group) {
      _group.items.push(item)
    } else {
      _groups.push({
        group: item._group,
        items: [ item ]
      })
    }
  })

  return _groups
}

export const filtersSet = filters => {
  let filtersSet = false
  const filtersValues = Object.values(filters)
  for (const filterValue of filtersValues) {
    if (Object.prototype.toString.call(filterValue) === '[object Array]') {
      filtersSet = filterValue.length !== 0
    } else if (Object.prototype.toString.call(filterValue) === '[object Object]') {
      filtersSet = Object.keys(filterValue).length !== 0
    } else if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
      filtersSet = true
    }

    if (filtersSet) {
      break
    }
  }

  return filtersSet
}

