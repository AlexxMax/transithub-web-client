<template>
  <div v-loading="loading">
    <div class="VehiclesSelectList">
      <component
        :is="component"
        v-for="vehicle of vehicles"
        :key="vehicle.guid"
        :transfer-data="{ ...vehicle, _type: 'vehicle' }"
      >
        <VehiclesCard
          class="VehiclesSelectList__item"
          :draggable="draggable"
          :vehicle="vehicle"
          show-open-button
          @open="$emit('item-open', vehicle)"
        />
      </component>
    </div>
  </div>
</template>

<script>
import { Drag } from 'vue-drag-drop'

import VehiclesCard from '@/components/Vehicles/VehiclesCard'

export default {
  name: 'th-vehicles-select-list',

  components: { Drag, VehiclesCard },

  props: {
    draggable: Boolean,
    vehicles: {
      type: Array,
      required: true
    },
    loading: Boolean
  },

  computed: {
    component() {
      return this.draggable ? 'Drag' : 'div'
    }
  }
}
</script>

<style lang='scss' scoped>
.VehiclesSelectList {
  padding: 5px;

  &__item {
    margin: 8px 0;
  }
}
</style>
