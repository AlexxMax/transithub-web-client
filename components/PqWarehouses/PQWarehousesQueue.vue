<template>
<RightView
  width="600px"
  :title="title"
  :loading="loading"
  :visible="visible"
  @close="visible = false"
>
  <div class="PQWarehousesQueue">

    <div :class="['PQWarehousesQueue__header', { 'PQWarehousesQueue__header--empty': empty }]">

      <div
        v-if="empty"
        class="PQWarehousesQueue__empty"
      >
        <span>{{ $t('forms.pqWarehouses.queues.empty') }} 🙁</span>
      </div>

      <Button
        type="primary"
        faIcon="plus"
        round
        @click="handleClickCreate"
      >
        {{ $t('forms.common.create') }}
      </Button>
    </div>

    <div
      v-if="list && list.length"
      class="PQWarehousesQueue__content"
    >
      <PQQueuesListItem
        v-for="queue of list"
        :key="queue.guid"
        :row="queue"
      />

      <div
        class="PQWarehousesQueue__load"
        v-if="list && list.length < count"
      >
        <span>{{ `${$t('forms.common.loaded')}: ${list.length}/${count}` }}</span>

        <LoadMore
          :loading="loading"
          :on-load-more="handleLoadMore"
        />
      </div>
    </div>

  </div>

</RightView>
</template>

<script>
import {
  STORE_MODULE_NAME as PQ_QUEUES_STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES as PQ_QUEUES_EDIT_DIALOG_TYPES,
  MUTATIONS_KEYS as PQ_QUEUES_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_QUEUES_ACTIONS_KEYS
} from '@/utils/pq.queues'

import Button from '@/components/Common/Buttons/Button'
import LoadMore from '@/components/Common/Lists/ListsLoadMore'
import RightView from '@/components/Common/RightView'
import PQQueuesListItem from '@/components/PQQueues/PQQueuesListItem'

export default {
  components: {
    Button,
    LoadMore,
    RightView,
    PQQueuesListItem
  },

  data: () => ({
    PQ_QUEUES_STORE_MODULE_NAME,
    PQ_QUEUES_MUTATIONS_KEYS
  }),

  computed: {
    list() {
      return this.$store.state[PQ_QUEUES_STORE_MODULE_NAME].subordinate.list
    },
    warehouseName() {
      return this.$store.state[PQ_QUEUES_STORE_MODULE_NAME].subordinate.warehouseName
    },
    count() {
      return this.$store.state[PQ_QUEUES_STORE_MODULE_NAME].subordinate.count
    },
    loading() {
      return this.$store.state[PQ_QUEUES_STORE_MODULE_NAME].subordinate.loading
    },
    visible: {
      set(value) {
        this.$store.commit(`${PQ_QUEUES_STORE_MODULE_NAME}/${PQ_QUEUES_MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE}`, value)
      },
      get() {
        return this.$store.state[PQ_QUEUES_STORE_MODULE_NAME].subordinate.visible
      }
    },
    limit() {
      return this.$store.state[PQ_QUEUES_STORE_MODULE_NAME].limit
    },
    offset: {
      get() {
        return this.$store.state[PQ_QUEUES_STORE_MODULE_NAME].subordinate.offset
      },
      set(value) {
        return this.$store.commit(`${PQ_QUEUES_STORE_MODULE_NAME}/${PQ_QUEUES_MUTATIONS_KEYS.SET_SUBORDINATE_OFFSET}`, value)
      }
    },

    title() {
      return this.warehouseName ? `${this.$t('forms.queue.queue')} ${this.$t('forms.queue.warehouse')} «${this.warehouseName}»` : this.$t('forms.queue.queue')
    },

    empty() {
      return this.list && !this.list.length && !this.loading
    }
  },

  methods: {
    handleClickCreate() {
      this.$store.dispatch(`${PQ_QUEUES_STORE_MODULE_NAME}/${PQ_QUEUES_ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: PQ_QUEUES_EDIT_DIALOG_TYPES.CREATE
      })
    },

    handleLoadMore() {
      this.offset += this.limit
      this.$store.dispatch(`${PQ_QUEUES_STORE_MODULE_NAME}/${PQ_QUEUES_ACTIONS_KEYS.FETCH_SUBORDINATE_LIST}`, this.warehouse.warehouseGuid)
    }
  }

}
</script>

<style lang="scss" scoped>
.PQWarehousesQueue {

    &__title {
        margin-bottom: 1rem;

        font-size: 1rem;
        color: $--color-info;
    }

    &__subtitle {
        margin-bottom: 1rem;
    }

    &__header {
        margin-left: 5px;

        &--empty {
          margin: 0;
          margin-top: 2rem;

          padding: 2rem;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          text-align: center;

          // background-color: $--color-primary-light;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
    }

    &__empty {
      margin-bottom: 1rem;

      font-size: 1rem;
    }

    &__load {
        margin-top: 1rem;

        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        text-align: center;
    }

}
</style>
