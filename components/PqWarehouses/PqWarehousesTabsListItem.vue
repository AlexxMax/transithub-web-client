<template>
<ItemCard v-if="data" noFooter>

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

    <!-- <pre>{{ data }}</pre> -->

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

      buttons: [
        { text: 'Переглянути', function: this.handleClickReview },
        { text: 'Стоянки', function: this.handleClick },
        { text: 'Черги', function: this.handleClick },
      ]

    }
  },

  methods: {
    handleClickReview() {
      this.$router.push(this.$i18n.path(`workspace/pq-warehouses/${this.data.guid}`))
    },

    handleClick() {
      console.log('handleClick');
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

    &__company {
        display: flex;
        align-items: center;
    }

    &__avatar {
      margin-right: 1rem;
    }

}
</style>
