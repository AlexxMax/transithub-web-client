<template>
  <ListHead
    :title="$t('forms.common.pqParkings')"
    :create-button-tooltip-text="$t('forms.pqParkings.general.createNew')"
    :loaded-count="loadedCount"
    :all-count="allCount"
    @create="$emit('create')"
  />
</template>

<script>
import ListHead from '@/components/Common/ListHead'

export default {
  name: 'th-pq-parkings-catalog-list-head',

  components: { ListHead },

  props: {
    loadedCount: {
      type: Number,
      default: 0
    },
    allCount: {
      type: Number,
      default: 0
    }
  }
}
</script>