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

export default {
  name: 'th-pq-parkings-catalog-list-item',

  components: { SimpleCard },

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
