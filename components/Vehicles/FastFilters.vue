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

import { filtersInit, setFilter } from '@/utils/vehicles'

export default {
  name: "th-vehicles-list-fast-filters",

  components: { FastFilters },

  data: () => ({ filtersInit }),

  computed: {
    filters() {
      return this.$store.state.vehicles.filters.set;
    }
  },

  methods: {
    handleCleanAll() {
      this.$store.dispatch('vehicles/CLEAR_FILTERS')
    },
    setFilter(key, value) {
      setFilter(this, key, value)
    }
  }
};
</script>

