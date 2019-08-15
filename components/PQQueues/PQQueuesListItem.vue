<template>
  <ItemCard>

    <div class="PQQueuesListItem">

      <div class="PQQueuesListItem__col">
        <div class="PQQueuesListItem__row">
          <fa class="PQQueuesListItem__icon" icon="user-friends"/>
          <span>{{ row.name }}</span>
        </div>

        <div class="PQQueuesListItem__row" style="margin-left: 1px;">
          <fa
            class="PQQueuesListItem__icon"
            style="font-size: 14px;"
            icon="warehouse"
          />
          <span>{{ row.warehouseName }}</span>
        </div>

        <div class="PQQueuesListItem__row" style="margin-left: 3px;">
          <fa class="PQQueuesListItem__icon"  icon="building"/>
          <span>{{ row.organisationName }}</span>
        </div>
      </div>

    </div>

    <div
      class="DriversListItem__footer"
      slot="footer-left"
    >
      <nuxt-link :to="$i18n.path(`workspace/pq-queues/${row.guid}`)">
        <Button
          round
          type="primary"
          size="small"
          @click="handleClickView"
        >
          {{ $t('lists.open') }}
        </Button>
      </nuxt-link>
    </div>

  </ItemCard>
</template>

<script>
import { STORE_MODULE_NAME, MUTATIONS_KEYS } from '@/utils/pq.queues'
import ItemCard from '@/components/Common/Lists/ItemCard'
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-pq-Queues-list-item',

  components: {
    ItemCard,
    Button
  },

  props: {
    row: {
      type: Object,
      required: true
    }
  },

  methods: {
    handleClickView() {
      // Закрити PQWarehousesQueue (сайдбар) перед переходом на інший роут
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE}`, false)
    }
  }
}
</script>

<style lang='scss' scoped>
.PQQueuesListItem {
  display: flex;
  flex-direction: row;

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
}

@media only screen and (max-width: 991px) {
  .PQQueuesListItem {
    flex-direction: column;
  }
}
</style>
