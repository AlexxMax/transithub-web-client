<template>
<RightView
  width="600px"
  :title="$t('forms.pqWarehouses.goods.warehouseGoods')"
  :visible="visible"
  @close="visible = false"
>
  <div class="PQWarehousesGoods">
    <div
      class="PQWarehousesGoods__content"
      v-loading="loading || loadingSubordinate"
    >

      <div class="PQWarehousesGoods__row">
        <div
          class="PQWarehousesGoods__cell PQWarehousesGoods__cell--header-name"
          :title="$t('forms.pqWarehouses.goods.goods')"
        >
          <span>{{ $t('forms.pqWarehouses.goods.goods') }}</span>
        </div>

        <div
          class="PQWarehousesGoods__cell PQWarehousesGoods__cell--header-status"
          :title="$t('forms.pqWarehouses.goods.unloading')"
        >
          <span>{{ $t('forms.pqWarehouses.goods.unloading') }}</span>
        </div>

        <div
          class="PQWarehousesGoods__cell PQWarehousesGoods__cell--header-status"
          :title="$t('forms.pqWarehouses.goods.uploading')"
        >
          <span>{{$t('forms.pqWarehouses.goods.uploading') }}</span>
        </div>
      </div>

      <div
        class="PQWarehousesGoods__row"
        v-for="(item, index) of list"
        :key="index"
        v-loading="activeGuid == item.guid && loadingBind"
      >
        <div
          :class="['PQWarehousesGoods__cell', 'PQWarehousesGoods__cell--name', { 'PQWarehousesGoods__cell--name-active': item.unloading || item.uploading }]"
          :title="item.name"
        >
          <span>{{ item.name }}</span>
        </div>

        <div
          :class="['PQWarehousesGoods__cell', 'PQWarehousesGoods__cell--status', { 'PQWarehousesGoods__cell--status-active': item.unloading }]"
          @click="handleClickStatus(item.guid, item.unloading, 'unloading')"
        >
          <fa :icon="item.unloading ? 'check' : 'times'" />
        </div>

        <div
          :class="['PQWarehousesGoods__cell', 'PQWarehousesGoods__cell--status', { 'PQWarehousesGoods__cell--status-active': item.uploading }]"
          @click="handleClickStatus(item.guid, item.uploading, 'uploading')"
        >
          <fa :icon="item.uploading ? 'check' : 'times'" />
        </div>
      </div>

    </div>
  </div>
</RightView>
</template>

<script>
import {
  STORE_MODULE_NAME as GOODS_STORE_MODULE_NAME,
  GETTERS_KEYS as GOODS_GETTERS_KEYS,
  MUTATIONS_KEYS as GOODS_MUTATIONS_KEYS,
  ACTIONS_KEYS as GOODS_ACTIONS_KEYS,
} from '@/utils/goods'

import RightView from '@/components/Common/RightView'

export default {
  components: {
    RightView
  },

  data: () => ({
    activeGuid: null
  }),

  computed: {
    combined() {
      return this.$store.getters[`${GOODS_STORE_MODULE_NAME}/${GOODS_GETTERS_KEYS.COMBINED}`]
    },
    visible: {
      get() {
        return this.$store.state[GOODS_STORE_MODULE_NAME].subordinate.visible
      },
      set(value) {
        return this.$store.commit(`${GOODS_STORE_MODULE_NAME}/${GOODS_MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE}`, value)
      }
    },
    loading() {
      return this.$store.state[GOODS_STORE_MODULE_NAME].loading
    },
    loadingSubordinate() {
      return this.$store.state[GOODS_STORE_MODULE_NAME].subordinate.loading
    },
    loadingBind() {
      return this.$store.state[GOODS_STORE_MODULE_NAME].loadingBind
    },

    list() {
      return this.combined.map(item => ({
        ...item,
        unloading: item.direction == 'unloading' || false,
        uploading: item.direction == 'uploading' || false,
      }))
    }
  },

  methods: {
    handleClickStatus(guid, status, direction) {

      this.activeGuid = guid

      if (status) this.$store.dispatch(`${GOODS_STORE_MODULE_NAME}/${GOODS_ACTIONS_KEYS.UNBIND_GOODS_TO_WAREHOUSE}`, guid)

      else this.$store.dispatch(`${GOODS_STORE_MODULE_NAME}/${GOODS_ACTIONS_KEYS.BIND_GOODS_TO_WAREHOUSE}`, { guid, direction })
    }
  }
}
</script>

<style lang="scss" scoped>
$color-border: $--color-info-light;

.PQWarehousesGoods {

    &__content {
        display: flex;
        flex-direction: column;

        border-radius: 10px;
        border: 1px solid $color-border;
    }

    &__row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        &:not(:last-child) {
            border-bottom: 1px solid $color-border;
        }
    }

    &__cell {
        padding: 0.75rem;

        @include text-crop;

        &--header-status,
        &--status {
            width: 15%;

            font-weight: bold;

            border-left: 1px solid $color-border;
        }

        &--status {
            text-align: center;
            color: $--color-info;

            cursor: pointer;

            svg {
                transition: 0.2s;
            }

            &:hover {
                svg {
                    transition: 0.2s;
                    transform: scale(1.5);
                }
            }

        }

        &--header-name,
        &--name {
            width: 70%;
        }

        &--header-name {
            font-weight: bold;
        }

        &--name-active {
            font-weight: bold;
            color: $--color-success;
        }

        &--status-active {
            color: $--color-success;

            background: $--color-success-light;
        }

    }
}
</style>
