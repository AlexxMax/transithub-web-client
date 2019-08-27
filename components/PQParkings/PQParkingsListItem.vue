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
      class="DriversListItem__footer"
      slot="footer-left"
    >
      <nuxt-link :to="$i18n.path(`workspace/pq-parkings/${row.guid}`)">
        <Button
          style="margin-right: 5px;"
          round
          type="primary"
          size="small"
        >{{ $t('lists.open') }}</Button>
      </nuxt-link>

      <Button
        v-if="adding"
        round
        faIcon="plus"
        type="success"
        @click="bindParking(row.guid)"
      >Додати</Button>

      <Button
        v-if="removal"
        round
        faIcon="minus"
        type="danger"
        @click="unbindParking(row.guid)"
      >Прибрати</Button>
    </div>

  </ItemCard>
</template>

<script>
import { STORE_MODULE_NAME, ACTIONS_KEYS } from '@/utils/pq.parkings'

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
    bindParking(guid) {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.BIND_PARKING_TO_WAREHOUSE}`, guid)
    },

    unbindParking(guid) {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.UNBIND_PARKING_TO_WAREHOUSE}`, guid)
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
}

@media only screen and (max-width: 991px) {
  .PQParkingsListItem {
    flex-direction: column;
  }
}
</style>
