<template>
<div
  class="PQWarehousesParkingsNotSubordinate"
  v-loading="loadingBind || loading"
>

  <Drop
    class="PQWarehousesParkingsNotSubordinate__drop"
    @drop="handleDrop(list, ...arguments)"
    drop-effect="move"
  >
    <Drag
      v-for="parking of list"
      :key="parking.guid"
      :transfer-data="{ parking }"
    >
      <PQParkingsListItem :row="parking" />
    </Drag>
  </Drop>

</div>
</template>

<script>
import { Drag, Drop } from 'vue-drag-drop'

import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS
} from '@/utils/pq.parkings'

import PQParkingsListItem from '@/components/PQParkings/PQParkingsListItem'

export default {
  components: {
    Drag,
    Drop,

    PQParkingsListItem
  },

  computed: {
    list() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].notSubordinate.list
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
    handleDrop(toList, data) {
      const parking = data.parking

      if (this.list.some(item => item.guid === parking.guid)) return

      this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.UNBIND_PARKING_TO_WAREHOUSE}`, parking.guid)
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesParkingsNotSubordinate {
    height: 100%;
    width: 100%;

    margin-top: 2rem;

    &__drop {
      height: 100%;
    }
}
</style>
