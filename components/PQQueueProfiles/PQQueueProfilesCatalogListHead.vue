<template>
  <ListHead
    :title="$t('forms.common.pqQueueProfiles')"
    :create-button-tooltip-text="tooltipTitle"
    :loaded-count="loadedCount"
    :all-count="allCount"
    :simplified="simplified"
    @create="$emit('create')"
  />
</template>

<script>
import ListHead from '@/components/Common/ListHead'

export default {
  name: 'th-pq-queue-profiles-catalog-list-head',

  components: { ListHead },

  props: {
    loadedCount: {
      type: Number,
      default: 0
    },
    allCount: {
      type: Number,
      default: 0
    },
    simplified: Boolean,
    tooltipTitle: String
  }
}
</script>
