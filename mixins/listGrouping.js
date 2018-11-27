export default {
  methods: {
    $_listGrouping_handleGrouping(type, groups, prefix = 'g') {
      groups.forEach((item, index) => {
        const group = this.$refs[`${prefix}-${index}`][0]
        if (type === 'ungroup') {
          group.openList()
        } else {
          group.closeList()
        }
      })
    }
  }
}
