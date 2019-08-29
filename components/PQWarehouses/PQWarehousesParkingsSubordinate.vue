<template>
<div class="PQWarehousesParkingsSubordinate">

  <PQWarehousesParkingsDrop
    @handleDrop="handleDrop"
    :list="list"
    :editing="editing"
    :loading="loading || loadingBind"
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
          :removal="editing"
        />
      </Drag>

      <!-- <CommonLoadMore
        :list="list"
        :count="count"
        :loading="loading"
        :on-load-more="handleLoadMore"
      /> -->

      <CommonPlaceholderEmpty
        v-if="empty"
        :title="$t('forms.pqWarehouses.parkings.empty')"
        class="PQWarehousesParkingsSubordinate__empty"
      >
        <Button
          v-if="!editing"
          type="primary"
          round
          @click="$emit('handleClickCreate')"
        >Створити стоянку</Button>
      </CommonPlaceholderEmpty>
    </div>
  </PQWarehousesParkingsDrop>

</div>
</template>

<script>
import { Drag } from 'vue-drag-drop'
import _ from 'lodash'

import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS
} from '@/utils/pq.parkings'

import Button from '@/components/Common/Buttons/Button'
// import CommonLoadMore from '@/components/Common/CommonLoadMore'
import CommonPlaceholderEmpty from '@/components/Common/CommonPlaceholderEmpty'
import PQWarehousesParkingsDrop from '@/components/PQWarehouses/PQWarehousesParkingsDrop'
import PQParkingsListItem from '@/components/PQParkings/PQParkingsListItem'

export default {

  components: {
    Drag,

    Button,
    // CommonLoadMore,
    CommonPlaceholderEmpty,
    PQWarehousesParkingsDrop,
    PQParkingsListItem,
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
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].subordinate.list
    },
    warehouseName() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].subordinate.warehouseName
    },
    count() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].subordinate.count
    },
    loading() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].subordinate.loading
    },
    loadingBind() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].loadingBind
    },
    limit() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].limit
    },
    offset: {
      get() {
        return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].subordinate.offset
      },
      set(value) {
        return this.$store.commit(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_MUTATIONS_KEYS.SET_SUBORDINATE_OFFSET}`, value)
      }
    },
    empty() {
      return this.list && !this.list.length && !this.loading
    }
  },

  methods: {
    handleDrop(data) {
      const parking = data[0].parking

      if (this.list.some(item => item.guid === parking.guid)) return

      this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.BIND_PARKING_TO_WAREHOUSE}`, parking.guid)
    },

    // handleLoadMore() {
    //   this.offset += this.limit
    //   this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.FETCH_SUBORDINATE_LIST}`)
    // }
  }

}
</script>

<style lang="scss" scoped>
.PQWarehousesParkingsSubordinate {
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
