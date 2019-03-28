<template>
  <div>
    <FastFilters
      :filters="filters"
      :filters-init="filtersInit"
      @clear-all="handleCleanAll"
      @set-filter="setFilter"
    />
  </div>
</template>

<script>
import FastFilters from '@/components/Common/Lists/Filters/FastFilters'

import { filtersInit, setFilter } from '@/utils/railway-requests'

export default {
  name: 'th-railway-requests-list-fast-filters',

  components: { FastFilters },

  data: () => ({ filtersInit }),

  computed: {
    filters() {
      return this.$store.state.railwayRequests.filters.set;
    }
  },

  methods: {
    handleCleanAll() {
      this.$store.dispatch('railwayRequests/clearFilters')
    },
    setFilter(key, value) {
      setFilter(this, key, value)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
