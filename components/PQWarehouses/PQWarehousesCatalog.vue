<template>
  <Scaffold>
    <div slot="list">
      <List
        :active-item="activeItem"
        :items="items"
        :loaded-count="loadedCount"
        :all-count="allCount"
        :loading-more="loadingMore"
        @create="$emit('create')"
        @select="handleSelectItem"
        @load-more="$emit('load-more')"
      />
    </div>

    <template slot="form">
      <Item
        v-if="activeItem"
        :key="keyItem"
        embed
        show-close
        :item="activeItem"
        @close="handleClose"
      />

      <EmptyPlace v-else/>
    </template>
  </Scaffold>
</template>

<script>
import Scaffold from '@/components/Common/ListPageScaffold'
import EmptyPlace from '@/components/Common/EmptyPlace'
import List from '@/components/PQWarehouses/PQWarehousesCatalogList'

const Item = () => ({
  component: import(/* webpackChunkName: 'PQWarehousesCatalogItem' */ '@/components/PQWarehouses/PQWarehousesCatalogItem'),
  loading: EmptyPlace,
  error: EmptyPlace,
})

export default {
  name: 'th-pq-warehouses-catalog',

  components: {
    Scaffold,
    EmptyPlace,
    List,
    Item,
  },

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

  data: () => ({
    keyItem: 0,
  }),

  methods: {
    handleSelectItem(item) {
      this.keyItem += 1
      this.$emit('select', item)
    },

    handleClose() {
      this.$emit('close-active-item', null)
      this.keyItem = 0
    }
  }
}
</script>
