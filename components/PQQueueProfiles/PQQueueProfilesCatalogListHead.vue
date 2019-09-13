<template>
  <ListHead
    :title="$t('forms.common.pqQueueProfiles')"
    :create-button-tooltip-text="$t('forms.pqQueueProfiles.general.createNew')"
    :loaded-count="loadedCount"
    :all-count="allCount"
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
  }
}
</script>
