<template>
  <div class="FiltersSaveList" v-loading="loading">
    <FiltersSavedItem
      v-for="item of items"
      :key="item.guid"
      :labels="item.labels"
      @set-filters="$emit('set-filters', item.values)"
      @remove-filters="$emit('remove-filters', item.guid)"
    />
  </div>
</template>

<script>
import FiltersSavedItem from '@/components/Common/Lists/Filters/FiltersSavedItem'

export default {
  name: 'th-filters-menu-saved-list',

  components: { FiltersSavedItem },

  props: {
    items: Array,
    loading: Boolean
  }
}
</script>

<style lang='scss' scoped>
.FiltersSaveList {
  overflow-y: auto;
  height: calc(100vh - 120px);
}
</style>
