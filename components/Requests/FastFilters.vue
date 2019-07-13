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

import { filtersInit, setFilter } from '@/utils/requests'

export default {
  name: "th-requests-list-fast-filters",

  components: { FastFilters },

  data: () => ({ filtersInit }),

  computed: {
    filters() {
      return this.$store.state.requests.filters.set
    }
  },

  methods: {
    handleCleanAll() {
      this.$store.dispatch('requests/clearFilters')
    },
    setFilter(key, value) {
      setFilter(this, key, value)
    }
  }
};
</script>
