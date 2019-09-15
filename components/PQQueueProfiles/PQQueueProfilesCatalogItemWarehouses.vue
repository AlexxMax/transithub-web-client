<template>
  <div
    v-loading="loading"
    class="max-w-lg mx-auto"
  >
    <Head
      class="-mt-4"
      simplified
      :loaded-count="items.length"
      :all-count="count"
      @create="$emit('create')"
    />

    <Item
      v-for="item in items"
      class="mt-3"
      :key="item.guid"
      :item="item"
      @select="$emit('select', item)"
    />

    <LoadMore
      v-if="showLoadMore"
      class="mt-5"
      :loading="loading"
      @click="$emit('load-more')"
    />
  </div>
</template>

<script>
import Head from '@/components/PQWarehouses/PQWarehousesCatalogListHead'
import Item from '@/components/PQWarehouses/PQWarehousesCatalogListItem'
import LoadMore from '@/components/Common/Lists/ListLoadMore'

export default {
  name: 'th-pq-queue-profiles-catalog-item-warehouses',

  components: { Head, Item, LoadMore },

  props: {
    items: Array,
    count: Number,
    loading: Boolean,
  },

  computed: {
    showLoadMore() {
      return this.items.length < this.count
    },
  },
}
</script>
