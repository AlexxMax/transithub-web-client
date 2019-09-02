<template>
  <ItemCard class="PQParkingsListItem">

    <div class="PQParkingsListItem__content">

      <div class="PQParkingsListItem__col">
        <div class="PQParkingsListItem__row">
          <fa class="PQParkingsListItem__icon" icon="parking"/>
          <span class="PQParkingsListItem__text">{{ row.name }}</span>
        </div>

        <div class="PQParkingsListItem__row">
          <fa class="PQParkingsListItem__icon"  icon="map-marker-alt"/>
          <span class="PQParkingsListItem__text">{{ row.address }}</span>
        </div>

        <div class="PQParkingsListItem__row">
          <fa class="PQParkingsListItem__icon"  icon="building"/>
          <span class="PQParkingsListItem__text">{{ row.organisationName }}</span>
        </div>
      </div>

    </div>

    <div
      :class="['PQParkingsListItem__footer', { 'PQParkingsListItem__footer--reverse': adding || removal }]"
      slot="footer-left"
    >
      <nuxt-link :to="$i18n.path(`workspace/pq-parkings/${row.guid}`)">
        <Button
          round
          :type="adding || removal ? '' : 'primary'"
          size="small"
          @click="handleClickView"
        >{{ $t('lists.open') }}</Button>
      </nuxt-link>

      <Button
        v-if="!adding && !removal"
        style="margin: .5rem 0 .5rem .5rem"
        round
        type
        @click="handleClickWarehouses"
      >{{ $t('lists.pqWarehouses') }}</Button>

      <Button
        v-if="adding"
        style="margin: .5rem .5rem .5rem 0"
        round
        type="primary"
        @click="bindParking(row.guid)"
      >{{ $t('forms.pqWarehouses.parkings.buttonSelect') }}</Button>

      <Button
        v-if="removal"
        style="margin: .5rem .5rem .5rem 0"
        round
        type="primary"
        @click="unbindParking(row.guid)"
      >{{ $t('forms.pqWarehouses.parkings.buttonRemove') }}</Button>
    </div>

  </ItemCard>
</template>

<script>
import { STORE_MODULE_NAME, MUTATIONS_KEYS, ACTIONS_KEYS } from '@/utils/pq.parkings'
import {
  STORE_MODULE_NAME as PQ_WAREHOUSES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_WAREHOUSES_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_WAREHOUSES_ACTIONS_KEYS
} from '@/utils/pq.warehouses'

import ItemCard from '@/components/Common/Lists/ItemCard'
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-pq-parkings-list-item',

  components: {
    ItemCard,
    Button
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

  methods: {
    async handleClickWarehouses() {
      await this.$store.commit(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_MUTATIONS_KEYS.SET_SUBORDINATE_PARKING}`, this.row)

      this.$store.dispatch(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_ACTIONS_KEYS.FETCH_SUBORDINATE_LIST}`)
    },

    bindParking(guid) {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.BIND_PARKING_TO_WAREHOUSE}`, guid)
    },

    unbindParking(guid) {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.UNBIND_PARKING_TO_WAREHOUSE}`, guid)
    },

    handleClickView() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE}`, false)
    }
  }
}
</script>

<style lang='scss' scoped>
.PQParkingsListItem {

  &__content {
    display: flex;
    flex-direction: row;
  }

  &__col {
    display: flex;
    flex-direction: column;

    &:not(:first-child) {
      align-items: flex-end;
    }

    & > :not(:first-child) {
      margin-top: 20px;
    }
  }

  &__row {
    display: flex;
    flex-direction: row;

    & > :not(:first-child) {
      margin-left: 15px;
    }
  }

  &__icon {
    margin-right: 6px;
    margin-left: 6px;
    font-size: 16px;
    font-weight: 600;
  }

  &__text {
    text-align: left;
  }

  &__footer {
    &--reverse {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
    }
  }
}

@media only screen and (max-width: 991px) {
  .PQParkingsListItem {
    flex-direction: column;
  }
}
</style>
