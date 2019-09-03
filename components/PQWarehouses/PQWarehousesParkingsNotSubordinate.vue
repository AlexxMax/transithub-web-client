<template>
<div class="PQWarehousesParkingsNotSubordinate">

  <PQWarehousesParkingsDrop
    @handleDrop="handleDrop"
    :loading="loading || loadingBind"
    removal
  >
    <div>
      <Drag
        v-for="parking of list"
        :key="parking.guid"
        style="width: 100%"
        :transfer-data="{ parking }"
      >
        <PQParkingsListItem
          :no-footer="false"
          :row="parking"
          adding
        />
      </Drag>

      <CommonPlaceholderEmpty v-if="empty" :title="$t('forms.pqWarehouses.parkings.emptyToSelect')"/>
    </div>
  </PQWarehousesParkingsDrop>

</div>
</template>

<script>
import { Drag } from 'vue-drag-drop'

import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS
} from '@/utils/pq.parkings'

import CommonPlaceholderEmpty from '@/components/Common/CommonPlaceholderEmpty'
import PQWarehousesParkingsDrop from '@/components/PQWarehouses/PQWarehousesParkingsDrop'
import PQParkingsListItem from '@/components/PQParkings/PQParkingsListItem'

export default {
  components: {
    Drag,

    CommonPlaceholderEmpty,
    PQWarehousesParkingsDrop,
    PQParkingsListItem,
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
    empty() {
      return this.list && !this.list.length && !this.loading
    }
  },

  created() {
    this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.FETCH_NOT_SUBORDINATE_LIST}`)
  },

  methods: {
    handleDrop(data) {
      const parking = data[0].parking

      if (this.list.some(item => item.guid === parking.guid)) return

      this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.UNBIND_PARKING_TO_WAREHOUSE}`, parking.guid)
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesParkingsNotSubordinate {
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
