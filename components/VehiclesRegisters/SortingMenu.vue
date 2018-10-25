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
  name: 'th-vehicles-registers-sorting-menu',

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
        this.$store.dispatch('vehiclesRegisters/setSortingDate', direction)
      }

      EventBus.$emit('vehicles-registers-sorting', { key, direction })
    }
  },

  created() {
    EventBus.$on('vehicles-registers-sorting', ({ key, direction }) => {
      this.items.find(item => item.key === key).direction = direction
    })
  }
}
</script>
