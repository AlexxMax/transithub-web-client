<template>
<ItemCard no-footer>

  <div class="PQWarehousesListItem">

    <div
      class="PQWarehousesListItem__meta"
      v-for="(item, index) in info"
      :key="index"
    >
      <fa
        class="PQWarehousesListItem__icon"
        :icon="item.icon"
      />
      <span>{{ item.name }}</span>
    </div>

    <div class="PQWarehousesListItem__footer">
      <Button
        round
        v-for="(button, index) in buttons"
        :type="button.type"
        :key="index"
        @click="button.function"
      >{{ button.text }}</Button>
    </div>

  </div>

</ItemCard>
</template>

<script>
import { STORE_MODULE_NAME, ACTIONS_KEYS, MUTATIONS_KEYS } from '@/utils/pq.warehouses'
import {
  STORE_MODULE_NAME as PQ_QUEUES_STORE_MODULE_NAME,
  ACTIONS_KEYS as PQ_QUEUES_ACTIONS_KEYS
} from '@/utils/pq.queues'
import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS
} from '@/utils/pq.parkings'
import {
  STORE_MODULE_NAME as GOODS_STORE_MODULE_NAME,
  MUTATIONS_KEYS as GOODS_MUTATIONS_KEYS,
  ACTIONS_KEYS as GOODS_ACTIONS_KEYS,
} from '@/utils/goods'

import Button from '@/components/Common/Buttons/Button'
import ItemCard from '@/components/Common/Lists/ItemCard'

export default {
  components: {
    Button,
    ItemCard
  },

  props: {
    row: {
      type: Object,
      required: true
    },

    removal: {
      type: Boolean,
      default: false
    },

    adding: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {

      info: [
        { icon: 'parking', name: this.row.name },
        { icon: 'map-marker-alt', name: this.row.fullAddress },
        // { icon: 'building', name: this.row.organisationName }
      ]

    }
  },

  computed: {
    buttons() {

      if (!this.adding && !this.removal)
        return [{
            type: 'primary',
            text: this.$t('forms.pqWarehouses.item.buttonReview'),
            function: this.handleClickReview
          },
          {
            type: '',
            text: this.$t('forms.pqWarehouses.item.buttonParking'),
            function: this.handleClickParking
          },
          {
            type: '',
            text: this.$t('forms.pqWarehouses.item.buttonQueue'),
            function: this.handleClickQueue
          },
          {
            type: '',
            text: this.$t('forms.pqWarehouses.goods.goods'),
            function: this.handleClickGoods
          }
        ]
      else
        return [{
            type: 'primary',
            text: this.adding ? this.$t('forms.pqWarehouses.parkings.buttonSelect') : this.$t('forms.pqWarehouses.parkings.buttonRemove'),
            function: this.adding ? this.bindWarehouse : this.unbindWarehouse
          },
          {
            type: '',
            text: this.$t('forms.pqWarehouses.item.buttonReview'),
            function: this.handleClickReview
          }
        ]

    }
  },

  methods: {
    handleClickReview() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE}`, false)
      this.$router.push(this.$i18n.path(`workspace/pq-warehouses/${this.row.guid}`))
    },

    async handleClickParking() {
      await this.$store.commit(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_MUTATIONS_KEYS.SET_SUBORDINATE_WAREHOUSE}`, this.row)

      this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.FETCH_SUBORDINATE_LIST}`)
    },

    handleClickQueue() {
      this.$store.dispatch(`${PQ_QUEUES_STORE_MODULE_NAME}/${PQ_QUEUES_ACTIONS_KEYS.FETCH_SUBORDINATE_LIST}`, { warehouseName: this.row.name, warehouseGuid: this.row.guid })
    },

    async handleClickGoods() {
      await this.$store.commit(`${GOODS_STORE_MODULE_NAME}/${GOODS_MUTATIONS_KEYS.SET_SUBORDINATE_WAREHOUSE}`, this.row)

      this.$store.dispatch(`${GOODS_STORE_MODULE_NAME}/${GOODS_ACTIONS_KEYS.FETCH_LIST}`)

      this.$store.dispatch(`${GOODS_STORE_MODULE_NAME}/${GOODS_ACTIONS_KEYS.FETCH_SUBORDINATE_LIST}`)
    },

    bindWarehouse() {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.BIND_WAREHOUSE_TO_PARKING}`, this.row.guid)
    },

    unbindWarehouse() {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.UNBIND_WAREHOUSE_TO_PARKING}`, this.row.guid)
    },

    // handleClickAddToBookmarks() {}
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesListItem {

    display: flex;
    align-items: flex-start;
    flex-direction: column;

    &__meta {
        margin-bottom: 1rem;

        display: flex;
        align-items: flex-start;

        text-align: left;
        line-height: 1rem;
    }

    &__icon {
        margin: 0 2rem 0 0.5rem;

        font-size: 16px;
        font-weight: 600;
    }

    &__footer {

        margin-top: 1rem;

        @include for-small-and-less {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;

            button {
                margin: 0;

                &:not(:last-child) {
                    margin: 0 0.5rem 0.5rem 0;
                }
            }
        }
    }

}
</style>
