<template>
<el-dialog
  :title="$t('lists.pqWarehouses')"
  :visible.sync="visible"
  :before-close="() => visible = false"
  :z-index="4000"
>
  <div
    class="PQParkingsWarehousesNotSubordinateDialog"
    v-loading="loading || loadingBind"
  >

    <PQWarehousesListItem
      v-for="warehouse of list"
      :key="`PQParkingsWarehousesNotSubordinateDialog-${warehouse.guid}`"
      :row="warehouse"
      adding
    />

    <CommonPlaceholderEmpty v-if="empty" />

  </div>
</el-dialog>
</template>

<script>
import {
  STORE_MODULE_NAME as PQ_WAREHOUSES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_WAREHOUSES_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_WAREHOUSES_ACTIONS_KEYS
} from '@/utils/pq.warehouses'

import CommonPlaceholderEmpty from '@/components/Common/CommonPlaceholderEmpty'
import PQWarehousesListItem from '@/components/PQWarehouses/PQWarehousesListItem'

export default {
  components: {
    CommonPlaceholderEmpty,
    PQWarehousesListItem
  },

  watch: {
    visible: {
      immediate: true,
      handler() { this.$store.dispatch(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST}`) }
    }
  },

  computed: {
    list() {
      return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].notSubordinate.list
    },
    visible: {
      get() {
        return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].notSubordinate.dialog
      },
      set(value) {
        this.$store.commit(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_MUTATIONS_KEYS.SET_NOT_SUBORDINATE_DIALOG}`, value)
      }
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
  }
}
</script>

<style lang="scss" scoped>
.PQParkingsWarehousesNotSubordinateDialog {}
</style>
