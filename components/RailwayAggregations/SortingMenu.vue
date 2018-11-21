<template>
  <SortingMenu
    v-bind="$attrs"
    :items="items"
    :sort="sort"
    @close="$emit('close')"/>
</template>

<script>
import SortingMenu from '@/components/Common/Lists/SortingMenu'

import { LIST_SORTING_DIRECTION } from '@/utils/defaultValues'

import EventBus from "@/utils/eventBus"

export default {
  name: 'th-railway-aggregations-sorting-menu',

  components: {
    SortingMenu
  },

  data() {
    return {
      items: [ {
        key: 'period',
        title: this.$t('lists.date'),
        direction: LIST_SORTING_DIRECTION
      } ]
    }
  },

  methods: {
    sort: function(key, direction) {
      if (key === 'period') {
        this.$store.dispatch('railwayAggregations/setSortingDate', direction)
      }

      EventBus.$emit('railway-aggregations-sorting', { key, direction })
    }
  },

  created() {
    EventBus.$on('railway-aggregations-sorting', ({ key, direction }) => {
      this.items.find(item => item.key === key).direction = direction
    })
  }
}
</script>
