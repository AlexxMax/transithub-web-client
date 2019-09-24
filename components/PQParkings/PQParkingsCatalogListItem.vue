<template>
  <div 
    class="PQParkingsCatalogListItem" 
    :class="isBindList ? classFlex : ''"
    :style="{ 'max-width': isBindList ? '96%' : '100%'}"
  >
    <SimpleCard
      hover
      pointer
      :active="active"
      :isBindList="isBindList"
      @click="$emit('select')"
    >
      <div>
        <div class="font-semibold mb-2">{{ isBindList ? item.parkingName : item.name }}</div>
        <Status
          v-if="!itemIsActive"
          :title="statusTitle"
        />
        <div class="text-gray-800 text-xs">{{ isBindList ? item.parkingFullAddress : item.fullAddress }}</div>
      </div>
    </SimpleCard>

    <div
      v-if="isBindList"
      class="PQParkingsCatalogListItem__button-icon-delete ml-6 text-base cursor-pointer"
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
  name: 'th-pq-parkings-catalog-list-item',

  components: { SimpleCard, Status },

  props: {
    item: {
      type: Object,
      required: true
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
      return this.isBindList ? this.item.parkingActive : this.item.active
    },

    statusTitle() {
      return this.$t('forms.common.notActiveItem')
    }
  }
}
</script>

<style lang="scss" scoped>
.PQParkingsCatalogListItem {
  &__button-icon-delete {
    color: $--color-danger;
  }
}
</style>
