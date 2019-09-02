<template>
<div class="PQParkingsWarehousesNotSubordinate">

  <PQParkingsWarehousesDrop
    @handleDrop="handleDrop"
    :loading="loading || loadingBind"
    removal
  >
    <div>
      <Drag
        v-for="warehouse of list"
        :key="warehouse.guid"
        style="width: 100%"
        :transfer-data="{ warehouse }"
      >
        <PQWarehousesListItem
          :row="warehouse"
          adding
        />
      </Drag>

      <CommonPlaceholderEmpty v-if="empty" />
    </div>
  </PQParkingsWarehousesDrop>

</div>
</template>

<script>
import { Drag } from 'vue-drag-drop'

import {
  STORE_MODULE_NAME as PQ_WAREHOUSES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_WAREHOUSES_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_WAREHOUSES_ACTIONS_KEYS
} from '@/utils/pq.warehouses'

import CommonPlaceholderEmpty from '@/components/Common/CommonPlaceholderEmpty'
import PQParkingsWarehousesDrop from '@/components/PQParkings/PQParkingsWarehousesDrop'
import PQWarehousesListItem from '@/components/PQWarehouses/PQWarehousesListItem'

export default {
  components: {
    Drag,

    CommonPlaceholderEmpty,
    PQParkingsWarehousesDrop,
    PQWarehousesListItem,
  },

  computed: {
    list() {
      return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].notSubordinate.list
    },
    loading() {
      return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].notSubordinate.loading
    },
    loadingBind() {
      return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].loadingBind
    },
    count() {
      return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].notSubordinate.count
    },
    empty() {
      return this.list && !this.list.length && !this.loading
    }
  },

  created() {
    this.$store.dispatch(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST}`)
  },

  methods: {
    handleDrop(data) {
      const warehouse = data[0].warehouse

      if (this.list.some(item => item.guid === warehouse.guid)) return

      this.$store.dispatch(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_ACTIONS_KEYS.UNBIND_WAREHOUSE_TO_PARKING}`, warehouse.guid)
    }
  }
}
</script>

<style lang="scss" scoped>
.PQParkingsWarehousesNotSubordinate {
    width: 100%;

    &__empty {
        margin: 10px 0;
        padding: 2rem;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        text-align: center;

        background: $--color-primary-light;
        border-radius: 10px;

        span {
            line-height: 3rem;
        }
    }
}
</style>
