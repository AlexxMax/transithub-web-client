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

import { filtersInit, setFilter } from '@/utils/drivers'

export default {
  name: "th-drivers-list-fast-filters",

  components: { FastFilters },

  data: () => ({ filtersInit }),

  computed: {
    filters() {
      return this.$store.state.drivers.filters.set;
    }
  },

  methods: {
    handleCleanAll() {
      this.$store.dispatch('drivers/CLEAR_FILTERS')
    },
    setFilter(key, value) {
      setFilter(this, key, value)
    }
  }
};
</script>

