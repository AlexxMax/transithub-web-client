<template>
  <ItemCard>
    <DriverAvatar :name="row.firstName"/>
    <div class="DriversListItem">
      <div class="DriversListItem__col">
        <div style="margin-left: 2px;">
          <fa class="DriversListItem__icon" icon="user"/>
          <span>{{row.fullName}}</span>
        </div>
        <div class="DriversListItem__items-line">
          <div>
            <fa class="DriversListItem__icon" icon="address-card"/>
            <span>{{row.certSerialNumber}}</span>
          </div>
          <!-- <div>
            <fa class="DriversListItem__icon" icon="phone"/>
            <span>{{row.phone}}</span>
          </div> -->
        </div>
      </div>
    </div>

    <div class="DriversListItem__footer" slot="footer-left">
      <nuxt-link :to="$i18n.path(`workspace/drivers/${row.guid}`)">
        <Button round type="primary" size="small">{{ $t('lists.open') }}</Button>
      </nuxt-link>

      <ButtonAddToBookmarks
        :currentlyInBookmarks="row.isFavorite"
        :handle-click="handleAddToBookmarksButton"
      />
    </div>
  </ItemCard>
</template>

<script>
import DriverAvatar from "@/components/Drivers/DriverAvatar.vue";
import Button from "@/components/Common/Buttons/Button";
import ItemCard from "@/components/Common/Lists/ItemCard";
import ButtonAddToBookmarks from '@/components/Common/Buttons/ButtonAddToBookmarks'

import { STORE_MODULE_NAME, ACTIONS_KEYS } from '@/utils/drivers'

export default {
  name: "th-drivers-list-item",

  components: {
    DriverAvatar,
    Button,
    ItemCard,
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
};
</script>

<style lang="scss" scoped>
.DriversListItem {
  display: flex;
  flex-direction: row;

  &__col {
    display: flex;
    flex-direction: column;
    margin-left: 55px;
    margin-top: -45px;

    &:not(:first-child) {
      align-items: flex-end;
    }

    & > :not(:first-child) {
      margin-top: 20px;
    }
  }
}

.DriversListItem__items-line {
  display: flex;
  flex-direction: row;

  & > :not(:first-child) {
    margin-left: 15px;
  }
}
.DriversListItem__icon {
  margin-right: 6px;
  margin-left: 6px;
  font-size: 16px;
  font-weight: 600;
}

@media only screen and (max-width: 991px) {
  .DriversListItem {
    flex-direction: column;

    & > :not(:first-child) {
      // margin-top: 25px;

      & > :not(:first-child) {
        margin-top: 25px;
      }
    }

    &__col:not(:first-child) {
      align-items: flex-start;

      & > :not(:first-child) {
        flex-direction: row-reverse;
      }
    }
  }

  .DriversListItem__items-line {
    flex-direction: column;

    & > :not(:first-child) {
      margin-top: 20px;
      margin-left: 0;
    }
  }
}
</style>
