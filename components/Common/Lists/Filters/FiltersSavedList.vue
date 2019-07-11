<template>
  <div class="FiltersSaveList" v-loading="loading">
    <FiltersSavedItem
      v-for="item of items"
      :key="item.guid"
      :labels="item.labels"
      :needSubscription="needSubscription"
      :is-subscription="item.sendNotifications"
      :subscription-loader="loaders && loaders.some(loaderGuid => loaderGuid === item.guid)"
      @set-filters="$emit('set-filters', item.values)"
      @remove-filters="$emit('remove-filters', item.guid)"
      @change-subscription="$emit('change-subscription', item.guid, !item.sendNotifications)"
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
    loading: Boolean,
    loaders: Array,
    needSubscription: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang='scss' scoped>
.FiltersSaveList {
  overflow-y: auto;
  height: calc(100vh - 120px);
}
</style>
