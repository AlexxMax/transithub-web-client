<template>
  <Scaffold>
    <div slot="list">
      <List
        :activeItem="activeItem"
        :items="items"
        :loaded-count="loadedCount"
        :all-count="allCount"
        :loading-more="loadingMore"
        @create="$emit('create')"
        @select="handleSelectItem"
        @load-more="$emit('load-more')"
      />
    </div>

    <div slot="form">
      <EmptyPlace/>
    </div>
  </Scaffold>
</template>

<script>
import Scaffold from '@/components/Common/ListPageScaffold'
import EmptyPlace from '@/components/Common/EmptyPlace'
import List from '@/components/PQQueueProfiles/PQQueueProfilesCatalogList'

export default {
  name: 'th-pq-queue-profiles-catalog',

  components: { Scaffold, EmptyPlace, List },

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
