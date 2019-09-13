<template>
<el-dialog
  :title="$t('forms.queue.queues')"
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
      :key="`PQWarehousesParkingsNotSubordinateDialog-${parking.guid}`"
      :row="parking"
      adding
    />

    <CommonPlaceholderEmpty v-if="empty" />

  </div>
</el-dialog>
</template>

<script>
import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS
} from '@/utils/pq.parkings'

import CommonPlaceholderEmpty from '@/components/Common/CommonPlaceholderEmpty'
import PQParkingsListItem from '@/components/PQParkings/PQParkingsListItem'

export default {
  components: {
    CommonPlaceholderEmpty,
    PQParkingsListItem
  },

  watch: {
    visible: {
      immediate: true,
      handler() { this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST}`) }
    }
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
    empty() {
      return this.list && !this.list.length && !this.loading
    }
  }
}
</script>
