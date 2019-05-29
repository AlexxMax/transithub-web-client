<template>
  <div v-loading="loading">
    <div class="VehiclesSelectList">
      <VehiclesCard
        class="VehiclesSelectList__item"
        v-for="vehicle of vehicles"
        :key="vehicle.guid"
        :draggable="draggable"
        :vehicle="vehicle"
        show-open-button
        @open="handleOpen"
      />
    </div>

    <VehicleFastView
      ref="vehicle-fast-view"
      :vehicle="currentVehicle"
    />
  </div>
</template>

<script>
import VehiclesCard from '@/components/Vehicles/VehiclesCard'
import VehicleFastView from '@/components/Vehicles/VehicleFastView'

import { STORE_MODULE_NAME } from '@/utils/vehicles'

export default {
  name: 'th-vehicles-select-list',

  components: { VehiclesCard, VehicleFastView },

  props: {
    draggable: Boolean
  },

  data: () => ({
    currentVehicle: {}
  }),

  computed: {
    vehicles() {
      return this.$store.state[STORE_MODULE_NAME].list
    },
    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    }
  },

  methods: {
    handleOpen(vehicle) {
      this.currentVehicle = vehicle
      this.$refs['vehicle-fast-view'].show()
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
