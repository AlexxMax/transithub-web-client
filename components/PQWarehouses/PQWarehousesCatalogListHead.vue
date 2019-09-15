<template>
  <ListHead
    :title="$t('forms.common.pqWarehouses')"
    :create-button-tooltip-text="$t('forms.pqWarehouses.general.createNew')"
    :loaded-count="loadedCount"
    :all-count="allCount"
    :simplified="simplified"
    @create="$emit('create')"
  />
</template>

<script>
import ListHead from '@/components/Common/ListHead'

export default {
  name: 'th-pq-warehouses-catalog-list-head',

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
  }
}
</script>
