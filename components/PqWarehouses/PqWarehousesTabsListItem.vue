<template>
<ItemCard
  v-if="data"
  noFooter
>

  <div class="PQWarehousesTabsListItem">

    <div class="PQWarehousesTabsListItem__main">

      <div class="PQWarehousesTabsListItem__meta">
        <div :class="['PQWarehousesTabsListItem__icon', 'PQWarehousesTabsListItem__icon--warehouse']">
          <fa icon="warehouse" />
        </div>

        <span>{{ data.name }}</span>
      </div>

      <div class="PQWarehousesTabsListItem__meta">
        <div class="PQWarehousesTabsListItem__icon">
          <fa icon="map-marker-alt" />
        </div>

        <span>{{ data.fullAddress }}</span>
      </div>

      <div class="PQWarehousesTabsListItem__footer">
        <Button
          round
          type="primary"
          v-for="(button, index) in buttons"
          :key="index"
          @click="button.function"
        >{{ button.text }}</Button>

        <ButtonAddToBookmarks
          :currentlyInBookmarks="true"
          :handle-click="handleClickAddToBookmarks"
        />
      </div>

    </div>

    <div class="PQWarehousesTabsListItem__company">
      <PQWarehousesAvatar
        class="PQWarehousesTabsListItem__avatar"
        :name="data.organisationName"
      />

      <span>{{ data.organisationName }}</span>
    </div>

  </div>

</ItemCard>
</template>

<script>
import { STORE_MODULE_NAME, MUTATIONS_KEYS } from '@/utils/pq.warehouses'

import Button from '@/components/Common/Buttons/Button'
import ButtonAddToBookmarks from '@/components/Common/Buttons/ButtonAddToBookmarks'
import PQWarehousesAvatar from '@/components/PQWarehouses/PQWarehousesAvatar'
import ItemCard from '@/components/Common/Lists/ItemCard'

export default {
  components: {
    Button,
    ButtonAddToBookmarks,
    PQWarehousesAvatar,
    ItemCard
  },

  props: {
    data: {
      type: Object,
      default: () => null
    }
  },

  data() {
    return {

      buttons: [{
          text: this.$t('forms.pqWarehouses.item.buttonReview'),
          function: this.handleClickReview
        },
        {
          text: this.$t('forms.pqWarehouses.item.buttonParking'),
          function: this.handleClickParking
        },
        {
          text: this.$t('forms.pqWarehouses.item.buttonQueue'),
          function: this.handleClickQueue
        },
      ]

    }
  },

  methods: {
    handleClickReview() {
      this.$router.push(this.$i18n.path(`workspace/pq-warehouses/${this.data.guid}`))
    },

    handleClickParking() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_PARKING}`, this.data)
    },

    handleClickQueue() {

    },

    handleClickAddToBookmarks() {

    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesTabsListItem {

    display: flex;
    align-items: center;
    justify-content: space-between;

    @include for-small-and-less {
      align-items: flex-start;
      flex-direction: column-reverse;
    }

    &__meta {
        margin-bottom: 1rem;

        display: flex;
        align-items: flex-start;
        line-height: 1rem;
    }

    &__icon {
        height: 1rem;
        width: 1rem;

        margin-right: 0.35rem;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 12px;

        &--warehouse {
            font-size: 0.625rem;
        }
    }

    &__footer {
      @include for-small-and-less {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;

        button {
          margin: 0;

          &:not(:last-child) {
            margin: 0 .5rem .5rem 0;
          }
        }
      }
    }

    &__company {
        display: flex;
        align-items: center;

        @include for-small-and-less {
          margin-bottom: 1rem;
        }
    }

    &__avatar {
        margin-right: 1rem;
    }

}
</style>
