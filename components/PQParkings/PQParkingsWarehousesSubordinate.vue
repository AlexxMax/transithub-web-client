<template>
<div class="PQParkingsWarehousesSubordinate">

  <PQParkingsWarehousesDrop
    @handleDrop="handleDrop"
    :editing="editing"
    :loading="loading || loadingBind"
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
          removal
        />
      </Drag>

      <CommonPlaceholderEmpty
        v-if="empty"
        :title="$t('forms.pqWarehouses.warehouses.empty')"
        class="PQParkingsWarehousesSubordinate__empty"
      >
        <Button
          v-if="!editing"
          type="primary"
          round
          @click="$emit('handleClickCreate')"
        >Create warehouse</Button>
      </CommonPlaceholderEmpty>
    </div>
  </PQParkingsWarehousesDrop>

</div>
</template>

<script>
import { Drag } from 'vue-drag-drop'
import _ from 'lodash'

import {
  STORE_MODULE_NAME as PQ_WAREHOUSES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_WAREHOUSES_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_WAREHOUSES_ACTIONS_KEYS
} from '@/utils/pq.warehouses'

import Button from '@/components/Common/Buttons/Button'
import CommonPlaceholderEmpty from '@/components/Common/CommonPlaceholderEmpty'
import PQParkingsWarehousesDrop from '@/components/PQParkings/PQParkingsWarehousesDrop'
import PQWarehousesListItem from '@/components/PQWarehouses/PQWarehousesListItem'

export default {

  components: {
    Drag,

    Button,
    CommonPlaceholderEmpty,
    PQParkingsWarehousesDrop,
    PQWarehousesListItem,
  },

  props: {
    editing: {
      type: Boolean,
      default: false
    },
    isEmptySubordinateList: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    list(list) {
      this.$emit('update:isEmptySubordinateList', _.isEmpty(list))
    }
  },

  computed: {
    list() {
      return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].subordinate.list
    },
    count() {
      return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].subordinate.count
    },
    loading() {
      return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].subordinate.loading
    },
    loadingBind() {
      return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].loadingBind
    },
    empty() {
      return this.list && !this.list.length && !this.loading
    }
  },

  methods: {
    handleDrop(data) {
      const warehouse = data[0].warehouse

      if (this.list.some(item => item.guid === warehouse.guid)) return

      this.$store.dispatch(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_ACTIONS_KEYS.BIND_WAREHOUSE_TO_PARKING}`, warehouse.guid)
    }
  }

}
</script>

<style lang="scss" scoped>
.PQParkingsWarehousesSubordinate {
    width: 100%;

    &__header {
        margin-left: 5px;
    }

    &__empty {
      margin: 10px 0;
    }

    &__content {
        display: flex;
        flex-direction: column;
    }

}
</style>
