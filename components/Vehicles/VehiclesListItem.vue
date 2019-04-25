<template>
  <ItemCard>

    <div class="VehiclesLietItem">
      <div class="VehiclesLietItem__avatar-col">
        <VehicleAvatar :name="row.brand"/>
      </div>

      <div class="VehiclesLietItem__info-col">
        <div class="VehiclesLietItem__info-col__right">
          <div class="VehiclesLietItem__info-col__row">
            <div class="VehiclesLietItem__info-col__item">
              <fa class="VehiclesLietItem__info-col__item__icon" icon="truck"/>
              <span>{{ row.vNumber }}</span>
            </div>

            <div class="VehiclesLietItem__info-col__item">
              <fa class="VehiclesLietItem__info-col__item__icon" icon="address-card"/>
              <span>{{ row.techPassport }}</span>
            </div>
          </div>

          <div class="VehiclesLietItem__info-col__row">
            <div class="VehiclesLietItem__info-col__item">
              <span>{{ `${row.typeName}, ${row.brand}, ${row.model}` }}</span>
            </div>
          </div>
        </div>

        <div class="VehiclesLietItem__info-col__left">

        </div>
      </div>
    </div>

    <div slot="footer-left">
      <nuxt-link :to="$i18n.path(`workspace/vehicles/${row.guid}`)">
        <Button round type="primary">{{ $t('lists.open') }}</Button>
      </nuxt-link>

      <ButtonAddToBookmarks
        :currentlyInBookmarks="row.isFavorite"
        :handle-click="handleAddToBookmarksButton"
      />
    </div>

  </ItemCard>
</template>

<script>
import ItemCard from '@/components/Common/Lists/ItemCard'
import Button from '@/components/Common/Buttons/Button'
import VehicleAvatar from '@/components/Vehicles/VehicleAvatar'
import ButtonAddToBookmarks from '@/components/Common/Buttons/ButtonAddToBookmarks'

import { STORE_MODULE_NAME, ACTIONS_KEYS } from '@/utils/vehicles'

export default {
  name: 'th-vehicles-list-item',

  components: {
    ItemCard,
    Button,
    VehicleAvatar,
    ButtonAddToBookmarks
  },

  props: {
    row: Object
  },

  methods: {
    async handleAddToBookmarksButton() {
      if (this.row.isFavorite) {
        await this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.REMOVE_ITEM_FROM_BOOKMARKS}`, this.row.guid)
      } else {
        await this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.ADD_ITEM_TO_BOOKMARKS}`, this.row.guid)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.VehiclesLietItem {
  display: flex;
  flex-direction: row;

  &__avatar-col {
    margin-right: 15px;
  }

  &__info-col {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__right {
      display: flex;
      flex-direction: column;
    }

    &__left {
      display: flex;
      flex-direction: column;
    }

    & &__row {
      display: flex;
      flex-direction: row;

      &:not(:first-child) {
        margin-top: 20px;
      }
    }

    & &__item {
      display: flex;
      flex-direction: row;

      &:not(:first-child) {
        margin-left: 20px;
      }

      & *:not(:first-child) {
        margin-left: 10px;
      }

      &__icon {
        width: 20px;
        font-size: initial;
      }
    }
  }
}

@media only screen and (max-width: 991px) {
  .VehiclesLietItem {
    &__info-col {
      & &__row {
        flex-direction: column;

        &:not(:first-child) {
          margin-top: 10px;
        }
      }

      & &__item {
        &:not(:first-child) {
          margin-left: 0;
        }

        &:not(:first-child) {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
