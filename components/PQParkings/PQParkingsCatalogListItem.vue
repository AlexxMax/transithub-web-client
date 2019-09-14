<template>
  <SimpleCard
    hover
    pointer
    :active="active"
    @click="$emit('select')"
  >
    <div>
      <div class="font-semibold mb-2">{{ item.name }}</div>
      <div class="text-gray-800 text-xs">{{ item.address }}</div>
      <div class="text-gray-800 font-light mt-4 text-xs">{{ item.organisationName }}</div>
    </div>
  </SimpleCard>
</template>

<script>
import SimpleCard from '@/components/Common/SimpleCard'

export default {
  name: 'th-pq-parkings-catalog-list-item',

  components: { SimpleCard },

  props: {
    item: {
      type: Object,
      required: true
    },
    active: Boolean
  }
}
</script>