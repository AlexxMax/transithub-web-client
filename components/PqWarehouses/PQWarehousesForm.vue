<template>
<div class="PQWarehousesForm">

  <div class="PQWarehousesForm__wrapper">

    <div class="PQWarehousesForm__sidebar">
      <PQWarehousesFormSidebar :warehouse="item" />
    </div>

    <div class="PQWarehousesForm__content">
      <PQWarehousesFormContent
        :warehouse="item"
        @openPattern="dialog = true"
        @openParking="openParking"
      />
    </div>

  </div>

  <!-- <PQWarehousesPattern
    :default="item"
    :visible.sync="dialog"
    @close="dialog = false"
  /> -->

</div>
</template>

<script>
import { STORE_MODULE_NAME, MUTATIONS_KEYS } from '@/utils/pq.warehouses'

import PQWarehousesFormSidebar from '@/components/PQWarehouses/PQWarehousesFormSidebar'
import PQWarehousesFormContent from '@/components/PQWarehouses/PQWarehousesFormContent'
// import PQWarehousesPattern from '@/components/PQWarehouses/PQWarehousesPattern'

export default {
  components: {
    PQWarehousesFormSidebar,
    PQWarehousesFormContent,
    // PQWarehousesPattern
  },

  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    openParking() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_PARKING}`, this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesForm {
    height: 100%;

    margin: -20px;

    &__wrapper {
      display: flex;
      justify-content: space-between;

      @media (max-width: 991px) {
        flex-direction: column;
      }

    }

    &__content {
        width: 100%;
    }
}
</style>
