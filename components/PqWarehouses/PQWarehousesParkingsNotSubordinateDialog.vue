<template>
<el-dialog
  title="Черги"
  :visible.sync="visible"
  :before-close="() => visible = false"
  :z-index="4000"
>
  <div
    class="PQWarehousesParkingsNotSubordinateDialog"
    v-loading="loading || loadingBind"
  >

    <PQParkingsListItem
      v-for="parking of list"
      :key="parking.guid"
      :no-footer="false"
      :row="parking"
      adding
    />

    <CommonLoadMore
      :list="list"
      :count="count"
      :loading="loading"
      :on-load-more="handleLoadMore"
    />

  </div>
</el-dialog>
</template>

<script>
import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS
} from '@/utils/pq.parkings'

import CommonLoadMore from '@/components/Common/CommonLoadMore'
import PQParkingsListItem from '@/components/PQParkings/PQParkingsListItem'

export default {
  components: {
    CommonLoadMore,
    PQParkingsListItem
  },

  computed: {
    list() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].notSubordinate.list
    },
    visible: {
      get() {
        return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].notSubordinate.dialog
      },
      set(value) {
        this.$store.commit(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_MUTATIONS_KEYS.SET_NOT_SUBORDINATE_DIALOG}`, value)
      }
    },
    loading() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].notSubordinate.loading
    },
    loadingBind() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].loadingBind
    },
    count() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].notSubordinate.count
    },
    limit() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].notSubordinate.limit
    },
    offset: {
      get() {
        return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].notSubordinate.offset
      },
      set(value) {
        return this.$store.commit(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_MUTATIONS_KEYS.SET_NOT_SUBORDINATE_OFFSET}`, value)
      }
    },
    empty() {
      return this.list && !this.list.length && !this.loading
    }
  },

  created() {
    this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST}`)
  },

  methods: {
    handleLoadMore() {
      this.offset += this.limit
      this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesParkingsNotSubordinateDialog {}
</style>
