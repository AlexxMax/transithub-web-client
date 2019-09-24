<template>
  <SimpleCard
    hover
    pointer
    :active="active"
    @click="$emit('select')"
  >
    <div>
      <div class="font-semibold mb-2">{{ item.name }}</div>
      <Status
        v-if="!itemIsActive"
        :title="statusTitle"
      />
      <div class="text-gray-800 text-xs">{{ item.fullAddress }}</div>
    </div>
  </SimpleCard>
</template>

<script>
import SimpleCard from '@/components/Common/SimpleCard'
import Status from '@/components/Common/Status'

export default {
  name: 'th-pq-warehouses-catalog-list-item',

  components: { SimpleCard, Status },

  props: {
    item: {
      type: Object,
      required: true,
    },
    active: Boolean,
  },

  computed: {
    itemIsActive() {
      return this.item.active
      //return this.item.active && this.item.profileActive
    },

    statusTitle() {
      return this.$t('forms.common.notActiveItem')
    }
  }
}
</script>
