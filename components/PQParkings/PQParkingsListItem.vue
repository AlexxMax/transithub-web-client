<template>
  <ItemCard>

    <div class="PQParkingsListItem">

      <div class="PQParkingsListItem__col">
        <div class="PQParkingsListItem__row">
          <fa class="PQParkingsListItem__icon" icon="parking"/>
          <span>{{ row.name }}</span>
        </div>

        <div class="PQParkingsListItem__row">
          <fa class="PQParkingsListItem__icon"  icon="map-marker-alt"/>
          <span>{{ row.address }}</span>
        </div>

        <div class="PQParkingsListItem__row">
          <fa class="PQParkingsListItem__icon"  icon="building"/>
          <span>{{ row.organisationName }}</span>
        </div>
      </div>

    </div>

    <div
      class="DriversListItem__footer"
      slot="footer-left"
    >
      <nuxt-link :to="$i18n.path(`workspace/pq-parkings/${row.guid}`)">
        <Button
          round
          type="primary"
          size="small"
        >
          {{ $t('lists.open') }}
        </Button>
      </nuxt-link>
    </div>

  </ItemCard>
</template>

<script>
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
    }
  }
}
</script>

<style lang='scss' scoped>
.PQParkingsListItem {
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
  .PQParkingsListItem {
    flex-direction: column;
  }
}
</style>
