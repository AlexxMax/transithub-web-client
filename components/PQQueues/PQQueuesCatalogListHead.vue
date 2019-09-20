<template>
  <ListHead
    :title="$t('forms.common.pqQueuesTypes')"
    :create-button-tooltip-text="$t('forms.pqQueues.general.createNew')"
    :loaded-count="loadedCount"
    :all-count="allCount"
    :simplified="simplified"
    @create="$emit('create')"
  />
</template>

<script>
import ListHead from '@/components/Common/ListHead'

export default {
  name: 'th-pq-queues-catalog-list-head',

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
    simplified: Boolean
  }
}
</script>