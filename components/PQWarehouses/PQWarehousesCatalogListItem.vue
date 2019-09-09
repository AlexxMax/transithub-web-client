<template>
  <SimpleCard
    hover
    pointer
    :active="active"
    @click.native="$emit('select')"
  >
    <div>
      <div class="font-semibold mb-2">{{ item.name }}</div>
      <div class="text-gray-800 text-xs">{{ item.fullAddress }}</div>
    </div>
  </SimpleCard>
</template>

<script>
import SimpleCard from '@/components/Common/SimpleCard'

export default {
  name: 'th-pq-warehouses-catalog-list-item',

  components: { SimpleCard },

  props: {
    item: {
      type: Object,
      required: true,
    },
    active: Boolean,
  },
}
</script>
