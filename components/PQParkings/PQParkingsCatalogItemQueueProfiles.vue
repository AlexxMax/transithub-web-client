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
      :tooltip-title="$t('forms.pqQueueProfiles.general.chooseQueueProfile')"
      @create="$emit('create')"
    />

    <Item
      v-for="item in items"
      class="mt-3"
      :key="item.guid"
      :item="item"
      :is-bind-list="bind"
      @select="$emit('select', item)"
      @delete="$emit('delete', item)"
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
import Head from '@/components/PQQueueProfiles/PQQueueProfilesCatalogListHead'
import Item from '@/components/PQQueueProfiles/PQQueueProfilesCatalogListItem'
import LoadMore from '@/components/Common/Lists/ListLoadMore'

export default {
  name: 'th-pq-parkings-catalog-item-queue-profiles',

  components: { Head, Item, LoadMore },

  props: {
    items: Array,
    count: Number,
    loading: Boolean,
  },

  data: () => ({ bind: true }),

  computed: {
    showLoadMore() {
      return this.items.length < this.count
    }
  }
}
</script>