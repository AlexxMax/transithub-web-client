<template>
  <ItemCard>
    <div class="UserSubscriptionsListItem">
      <div class="UserSubscriptionsListItem__col">
        <div class="UserSubscriptionsListItem__col__title">
          <span>{{ title }}</span>
        </div>

        <div class="UserSubscriptionsListItem__col__tag" v-loading="loading">
          <SubscriptionSavedItem
            :key="row.guid"
            :labels="row.labels"
          />
        </div>
      </div>
    </div>

    <div slot="footer-left">
      <Button
        class="btn-delete"
        type=""
        round
        :fa-icon="btnDeleteLoading ? null : [ 'fas', 'trash-alt' ]"
        :loading="btnDeleteLoading"
        @click="deleteSubscription">
        {{ $t('forms.common.removeFromSubscriptions') }}
      </Button>
    </div>
  </ItemCard>
</template>

<script>
import ItemCard from '@/components/Common/Lists/ItemCard'
import Button from '@/components/Common/Buttons/Button'
import SubscriptionSavedItem from '@/components/UserSubscriptions/SubscriptionSavedItem'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { TABLE_NAMES } from '@/utils/constants'

export default {
  name: 'th-user-subscriptions-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    ItemCard,
    Button,
    SubscriptionSavedItem
  },

  props: {
    row: Object,
    items: Array,
    loading: Boolean
  },

  data() {
    return {
      TABLE_NAMES,
      TABLE_NAMES_ROUTE,
      btnDeleteLoading: false
    }
  },

  computed: {
    title() {
      let name = this.row.listName

      switch (name) {
        case TABLE_NAMES.railwayAggregation:
          name = this.$t('links.documents.railwayAggregations');
          break;

        case TABLE_NAMES.railwayRequest:
          name = this.$t('links.documents.railwayRequests');
          break;

        case TABLE_NAMES.autoRace:
          name = this.$t('links.documents.races');
          break;

        case TABLE_NAMES.autoRequest:
          name = this.$t('links.documents.requests');
          break;

        case TABLE_NAMES.autoVehiclesRegister:
          name = this.$t('links.documents.vehiclesRegisters');
          break;
       }

       return name
    }
  },

  methods: {
    async deleteSubscription() {
      this.btnDeleteLoading = true
      await this.$store.dispatch('subscriptions/deleteSubscription', { guid: this.row.guid })
      this.btnDeleteLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.UserSubscriptionsListItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__col {
    display: flex;
    flex-direction: column;

    &:not(:first-child) {
      align-items: flex-end;

      & > :not(:first-child) {
        margin-top: 12px;
      }
    }

    & > :not(:first-child) {
      margin: 20px 0 5px;
    }

    &__title {
      color: #000000;
    }

    &__tag {
      cursor: default;
    }
  }
}

.UserSubscriptionsListItem__items-line {
  display: flex;
  flex-direction: row;

  & > :not(:first-child) {
    margin-left: 20px;
  }
}

.UserSubscriptionsListItem__icon {
  margin-right: 6px;
  width: 15px;
}

.UserSubscriptionsListItem__no-icon {
  margin-left: 26px !important;
}

.UserSubscriptionsListItem__number {
  color: #FECD34;
}

.btn-delete {
  background-color: #eeeeee;
  border-color: #eeeeee;
  color: #606266;

  &:hover {
    background-color: #f1f1f1;
    border-color: #f1f1f1;
  }
}

@media only screen and (max-width: 401px) {
  .btn-delete {
   margin-top: 10px;
  }
}

@media only screen and (max-width: 991px) {
  .UserSubscriptionsListItem {
    flex-direction: column;

    & > :not(:first-child) {
      margin-top: 25px;

      & > :not(:first-child) {
        margin-top: 25px;
      }
    }

    &__col:not(:first-child) {
      align-items: flex-start;
    }
  }

  .UserSubscriptionsListItem__items-line {
    flex-direction: column;

    & > :not(:first-child) {
      margin-top: 25px;
      margin-left: 0;
    }

    &.UserSubscriptionsListItem__items-line-still {
      flex-direction: row;

      & > :not(:first-child) {
        margin-top: 0;
        margin-left: 10px;
      }
    }
  }
}
</style>
