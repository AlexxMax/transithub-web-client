<template>
  <div>
    <Head
      :loaded-count="loadedCount"
      :all-count="allCount"
      @create="$emit('create')"
    />

    <Item
      class="mt-3"
      v-for="item of items"
      :key="item.guid"
      :active="item.guid === activeItemGuid"
      :item="item"
      @select="$emit('select', item)"
    />

    <!-- <FastCommands/> -->
    <LoadMore
      v-if="showLoadMore"
      class="mt-5"
      :loading="loadingMore"
      @click="$emit('load-more')"
    />
  </div>
</template>

<script>
import Head from '@/components/PQWarehouses/PQWarehousesCatalogListHead'
import Item from '@/components/PQWarehouses/PQWarehousesCatalogListItem'
// import FastCommands from '@/components/PQWarehouses/PQWarehousesCatalogListFastCommands'
import LoadMore from '@/components/Common/Lists/ListLoadMore'

export default {
  name: 'th-pq-warehpouses-catalog-list',

  components: { Head, Item, LoadMore },

  props: {
    activeItem: Object,
    items: Array,
    loadedCount: {
      type: Number,
      default: 0
    },
    allCount: {
      type: Number,
      default: 0
    },
    loadingMore: Boolean,
  },

  computed: {
    activeItemGuid() {
      return this.activeItem ? this.activeItem.guid : null
    },

    showLoadMore() {
      return this.loadedCount < this.allCount
    }
  },
}
</script>
