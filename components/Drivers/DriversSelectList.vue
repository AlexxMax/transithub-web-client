<template>
  <div v-loading="loading">
    <div class="DriversSelectList">
      <DriversCard
        class="DriversSelectList__item"
        v-for="driver of drivers"
        :key="driver.guid"
        :draggable="draggable"
        :driver="driver"
        show-open-button
        @open="handleOpen"
      />
    </div>

    <DriverFastView
      ref="driver-fast-view"
      :driver="currentDriver"
    />
  </div>
</template>

<script>
import DriversCard from '@/components/Drivers/DriversCard'
import DriverFastView from '@/components/Drivers/DriverFastView'

import { STORE_MODULE_NAME } from '@/utils/drivers'

export default {
  name: 'th-drivers-select-list',

  components: { DriversCard, DriverFastView },

  props: {
    draggable: Boolean
  },

  data: () => ({
    currentDriver: {}
  }),

  computed: {
    drivers() {
      return this.$store.state[STORE_MODULE_NAME].list
    },
    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    }
  },

  methods: {
    handleOpen(driver) {
      this.currentDriver = driver
      this.$refs['driver-fast-view'].show()
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
