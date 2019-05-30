<template>
  <div v-loading="loading">
    <div class="VehiclesSelectList">
      <Draggable
        :list="vehicles"
        :group="{ name: 'vehreg', pull: 'clone', put: false }"
        :clone="handleClone"
      >
        <VehiclesCard
          class="VehiclesSelectList__item"
          v-for="vehicle of vehicles"
          :key="vehicle.guid"
          :draggable="draggable"
          :vehicle="vehicle"
          show-open-button
          @open="handleOpen"
        />
      </Draggable>
    </div>

    <VehicleFastView
      ref="vehicle-fast-view"
      :vehicle="currentVehicle"
    />
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

import VehiclesCard from '@/components/Vehicles/VehiclesCard'
import VehicleFastView from '@/components/Vehicles/VehicleFastView'

import { STORE_MODULE_NAME } from '@/utils/vehicles'

export default {
  name: 'th-vehicles-select-list',

  components: {
    Draggable,
    VehiclesCard,
    VehicleFastView
  },

  props: {
    draggable: Boolean,
    cloneMethod: {
      type: Function,
      default: null
    },
    vehicles: Array
  },

  data: () => ({
    currentVehicle: {}
  }),

  computed: {
    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    }
  },

  methods: {
    handleOpen(vehicle) {
      this.currentVehicle = vehicle
      this.$refs['vehicle-fast-view'].show()
    },

    handleClone(vehicle) {
      console.log('1111');
      if (this.cloneMethod) {
        console.log(vehicle);
        this.cloneMethod(vehicle)
      }
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
