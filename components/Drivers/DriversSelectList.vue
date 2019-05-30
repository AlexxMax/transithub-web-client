<template>
  <div v-loading="loading">
    <div class="DriversSelectList">
      <component
        :is="component"
        v-for="driver of drivers"
        :key="driver.guid"
        :transfer-data="{ ...driver, _type: 'driver' }"
      >
        <DriversCard
          class="DriversSelectList__item"
          :draggable="draggable"
          :driver="driver"
          show-open-button
          @open="$emit('item-open', driver)"
        />
      </component>
    </div>
  </div>
</template>

<script>
import { Drag } from 'vue-drag-drop'

import DriversCard from '@/components/Drivers/DriversCard'

export default {
  name: 'th-drivers-select-list',

  components: { Drag, DriversCard },

  props: {
    draggable: Boolean,
    drivers: {
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
.DriversSelectList {
  padding: 5px;

  &__item {
    margin: 8px 0;
  }
}
</style>
