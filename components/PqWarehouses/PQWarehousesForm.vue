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
        @openQueue="openQueue"
      />
    </div>

  </div>

</div>
</template>

<script>
import { STORE_MODULE_NAME, MUTATIONS_KEYS } from '@/utils/pq.warehouses'
import {
  STORE_MODULE_NAME as PQ_QUEUES_STORE_MODULE_NAME,
  ACTIONS_KEYS as PQ_QUEUES_ACTIONS_KEYS
} from '@/utils/pq.queues'

import PQWarehousesFormSidebar from '@/components/PQWarehouses/PQWarehousesFormSidebar'
import PQWarehousesFormContent from '@/components/PQWarehouses/PQWarehousesFormContent'

export default {
  components: {
    PQWarehousesFormSidebar,
    PQWarehousesFormContent
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
    },

    openQueue() {
      this.$store.dispatch(`${PQ_QUEUES_STORE_MODULE_NAME}/${PQ_QUEUES_ACTIONS_KEYS.FETCH_SUBORDINATE_LIST}`, { warehouseName: this.item.name, warehouseGuid: this.item.guid })
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
