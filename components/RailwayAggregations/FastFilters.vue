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
import FastFilters from '@/components/Common/lists/Filters/FastFilters'

import { filtersInit, setFilter } from '@/utils/railway-aggregations'

export default {
  name: "th-railway-aggregations-list-fast-filters",

  components: { FastFilters },

  data: () => ({ filtersInit }),

  computed: {
    filters() {
      return this.$store.state.railwayAggregations.filters.set;
    }
  },

  methods: {
    handleCleanAll() {
      this.$store.dispatch('railwayAggregations/clearFilters')
    },
    setFilter(key, value) {
      setFilter(this, key, value)
    }
  }
};
</script>

