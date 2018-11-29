export /**
 * Generate grouped list (array) by groups
 *
 * @param {*} list
 * @param {*} groups
 * @param {*} constGroups
 * @returns []
 */
const getGroupedList = (list, groups, constGroups) => {
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
