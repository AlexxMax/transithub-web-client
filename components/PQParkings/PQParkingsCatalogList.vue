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

    <LoadMore
      v-if="showLoadMore"
      class="mt-5"
      :loading="loadingMore"
      @click="$emit('load-more')"
    />
  </div>
</template>

<script>
import Head from '@/components/PQParkings/PQParkingsCatalogListHead'
import Item from '@/components/PQParkings/PQParkingsCatalogListItem'
import LoadMore from '@/components/Common/Lists/ListLoadMore'

export default {
  name: 'th-pq-parkings-catalog-list',

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
    loadingMore: Boolean
  },

  computed: {
    activeItemGuid() {
      return this.activeItem ? this.activeItem.guid : null
    },

    showLoadMore() {
      return this.loadedCount < this.allCount
    }
  }
}
</script>