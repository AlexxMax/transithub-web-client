<template>
<div
  class="PQWarehousesParkingsSubordinate"
>

  <div :class="['PQWarehousesParkingsSubordinate__header', { 'PQWarehousesParkingsSubordinate__header--empty': empty }]">
    <div
      v-if="empty"
      class="PQWarehousesParkingsSubordinate__empty"
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

    <Drop
      v-if="empty && editing"
      v-loading="loadingBind || loading"
      style="width: 100%;"
      @drop="handleDrop(list, ...arguments)"
      drop-effect="move"
    >
      <div class="PQWarehousesParkingsSubordinate__drop PQWarehousesParkingsSubordinate__drop--empty">
        <span>Перетягніть сюди, щоб добавити чергу</span>
      </div>
    </Drop>
  </div>

  <div
    v-if="list && list.length"
    v-loading="loadingBind || loading"
    class="PQWarehousesParkingsSubordinate__content"
  >

    <Drop
      v-if="editing"
      style="width: 100%;"
      @drop="handleDrop(list, ...arguments)"
      drop-effect="move"
    >
      <div class="PQWarehousesParkingsSubordinate__drop PQWarehousesParkingsSubordinate__drop--empty">
        <span>Перетягніть сюди, щоб добавити чергу</span>
      </div>
    </Drop>

    <Drop
      class="PQWarehousesParkingsSubordinate__drop"
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

    <div
      class="PQWarehousesParkingsSubordinate__load"
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
</template>

<script>
import { Drag, Drop } from 'vue-drag-drop'

import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES as PQ_QUEUES_EDIT_DIALOG_TYPES,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS
} from '@/utils/pq.parkings'

import Button from '@/components/Common/Buttons/Button'
import LoadMore from '@/components/Common/Lists/ListsLoadMore'
import PQParkingsListItem from '@/components/PQParkings/PQParkingsListItem'

export default {

  components: {
    Drag,
    Drop,

    Button,
    LoadMore,
    PQParkingsListItem
  },

  props: {
    editing: {
      type: Boolean,
      default: false
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
    handleClickCreate() {
      if (this.editing) this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: PQ_QUEUES_EDIT_DIALOG_TYPES.CREATE
      })

      else this.$emit('update:editing', true)
    },

    handleDrop(toList, data) {
      const parking = data.parking

      if (this.list.some(item => item.guid === parking.guid)) return

      this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.BIND_PARKING_TO_WAREHOUSE}`, parking.guid)
    },

    // handleLoadMore() {
    //   this.offset += this.limit
    //   this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.FETCH_SUBORDINATE_LIST}`, this.warehouse.warehouseGuid)
    // }
  }

}
</script>

<style lang="scss" scoped>
.PQWarehousesParkingsSubordinate {

    width: 100%;

    &__header {
        margin-left: 5px;

        &--empty {
            margin: 2rem 0 0;

            padding: 2rem;

            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            text-align: center;
        }
    }

    &__content {
        height: 100%;

        display: flex;
        flex-direction: column;
    }

    &__empty {
        margin-bottom: 1rem;

        font-size: 1rem;
    }

    &__drop {
      height: 100%;

      &--empty {
        height: 176px;

        margin: .5rem 5px 0 5px;

        display: flex;
        align-items: center;
        justify-content: center;

        background: $--color-primary-light;
        border-radius: 5px;
        border: 2px dashed $--color-primary;

        font-size: 1rem;
      }
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
