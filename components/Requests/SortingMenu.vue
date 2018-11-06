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
  name: 'th-requests-sorting-menu',

  components: {
    SortingMenu
  },

  data() {
    return {
      items: [ {
        key: 'number',
        title: this.$t('forms.common.number'),
        direction: LIST_SORTING_DIRECTION
      }, {
        key: 'date',
        title: this.$t('lists.date'),
        direction: LIST_SORTING_DIRECTION
      } ]
    }
  },

  methods: {
    sort: function(key, direction) {
      if (key === 'date') {
        this.$store.dispatch('requests/setSortingDate', direction)
      } else if (key === 'number') {
        this.$store.dispatch('requests/setSortingNumber', direction)
      }

      EventBus.$emit('requests-sorting', { key, direction })
    }
  },

  created() {
    EventBus.$on('requests-sorting', ({ key, direction }) => {
      this.items.find(item => item.key === key).direction = direction
    })
  }
}
</script>
