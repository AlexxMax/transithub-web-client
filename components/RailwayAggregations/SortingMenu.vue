<template>
  <SortingMenu
    v-bind="$attrs"
    :items="items"
    :sort="sort"
    @close="$emit('close')"/>
</template>

<script>
import SortingMenu from '@/components/Common/Lists/SortingMenu'

import { SORTING_DIRECTION } from '@/utils/sorting'
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
        title: this.$t('forms.common.dateLoadFrom'),
        direction: SORTING_DIRECTION.desc
      }, {
        key: 'stationFrom',
        title: this.$t('forms.common.stationFrom'),
        direction: SORTING_DIRECTION.disabled
      }, {
        key: 'stationTo',
        title: this.$t('forms.common.stationTo'),
        direction: SORTING_DIRECTION.disabled
      }]
    }
  },

  methods: {
    sort: function(key, direction) {
      if (key === 'period') {
        this.$store.dispatch('railwayAggregations/setSortingDate', direction)
      } else if (key === 'stationFrom') {
        this.$store.dispatch('railwayAggregations/setSortingStationFrom', direction)
      } else if (key === 'stationTo') {
        this.$store.dispatch('railwayAggregations/setSortingStationTo', direction)
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
