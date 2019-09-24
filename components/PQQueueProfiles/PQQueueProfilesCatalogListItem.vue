<template>
  <div 
    class="PQQueueProfilesCatalogListItem"
    :class="isBindList ? classFlex : ''"
    :style="{ 'max-width': isBindList ? '96%' : '100%'}"
  >
    <SimpleCard
      class="PQQueueProfilesCatalogListItem__card"
      hover
      pointer
      :active="active"
      :isBindList="isBindList"
      @click="$emit('select')"
    >
      <div>
        <div class="font-semibold mb-2">{{ isBindList ? item.queueProfileName : item.name }}</div>
        <Status
          v-if="!itemIsActive"
          :title="statusTitle"
        />
        <div class="text-gray-800 text-xs">{{ isBindList ? item.queueProfileFullAddress : item.fullAddress }}</div>
      </div>
    </SimpleCard>

    <div
      v-if="isBindList"
      class="PQQueueProfilesCatalogListItem__button-icon-delete ml-6 text-base cursor-pointer"
      @click="$emit('delete')"
    >
      <fa icon="trash-alt"/>
    </div>
   
  </div>
</template>

<script>
import SimpleCard from '@/components/Common/SimpleCard'
import Status from '@/components/Common/Status'

export default {
  name: 'th-pq-queue-profiles-catalog-list-item',

  components: { SimpleCard, Status },

  props: {
    item: {
      type: Object,
      required: true,
    },
    active: Boolean,
    isBindList: Boolean
  },

  data() {
    return {
      classFlex: 'flex justify-between items-center'
    }
  },

  computed: {
    itemIsActive() {
      return this.isBindList ? this.item.profileActive : this.item.active
      
    },

    statusTitle() {
      return this.$t('forms.common.notActiveItem')
    }
  }
}
</script>

<style lang="scss" scoped>
.PQQueueProfilesCatalogListItem {
  &__button-icon-delete {
    color: $--color-danger;
  }
}
</style>
