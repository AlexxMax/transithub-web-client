<template>
<div class="PQWarehousesGuid">

  <div class="PQWarehousesGuid__wrapper">

    <div class="PQWarehousesGuid__sidebar">
      <PQWarehousesGuidSidebar :item="item" />
    </div>

    <div class="PQWarehousesGuid__content">
      <PQWarehousesGuidContent
        :item="item"
        @openPattern="dialog = true"
        @openParking="openParking"
      />
    </div>

  </div>

  <PQWarehousesPattern
    :default="item"
    :visible.sync="dialog"
    @close="dialog = false"
  />

</div>
</template>

<script>
import { STORE_MODULE_NAME, MUTATIONS_KEYS } from '@/utils/pq.warehouses'

import PQWarehousesGuidSidebar from '@/components/PQWarehouses/PQWarehousesGuidSidebar'
import PQWarehousesGuidContent from '@/components/PQWarehouses/PQWarehousesGuidContent'
import PQWarehousesPattern from '@/components/PQWarehouses/PQWarehousesPattern'

export default {
  components: {
    PQWarehousesGuidSidebar,
    PQWarehousesGuidContent,
    PQWarehousesPattern
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
.PQWarehousesGuid {
    height: 100%;

    margin: -20px;

    &__wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      @include for-medium-and-less {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

    }

    &__content {
        width: 100%;
    }
}
</style>
