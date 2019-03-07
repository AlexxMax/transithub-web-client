<template>
  <ItemCard>
    <div class="UserFavoritesListItem">
      <div class="UserFavoritesListItem__col">
          <div>
            <span>{{ title}}</span>
            <span>{{ `№${row.number}` }}</span>
          </div>

          <div>
            <fa class="UserFavoritesListItem__icon" icon="calendar-alt"/>
            <span>{{ `${row.createdAt}` }}</span>
          </div>

          <div>
            <fa class="UserFavoritesListItem__icon" icon="building"/>
            <span>{{ row.companyName }} / {{ row.authorName }}</span>
          </div>
        </div>
    </div>

    <div slot="footer-left">
      <Button
        v-if="open"
        type="primary"
        round
        @click="() => { open(row.id) }">
        {{ $t('lists.open') }}
      </Button>

      <nuxt-link v-else :to="to">
        <Button round type="primary">{{ $t('lists.open') }}</Button>
      </nuxt-link>

      <Button
        class="btn-delete"
        type=""
        round
        :fa-icon="[ 'fas', 'trash-alt' ]"
        @click="deleteFavorite">
        {{ $t('lists.delete') }}
      </Button>
    </div>

  </ItemCard>
</template>

<script>
import ItemCard from '@/components/Common/Lists/ItemCard'
import Button from '@/components/Common/Buttons/Button'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { TABLE_NAMES, TABLE_NAMES_ROUTE } from '@/utils/constants'

export default {
  name: 'th-user-favorites-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    ItemCard,
    Button
  },

  props: {
    row: Object,
    open: {
      type: Function,
      default: null
    }
  },

  data() {
    return { 
      TABLE_NAMES,
      TABLE_NAMES_ROUTE
    }
  },

  computed: {
    title() {
      let name = this.row.tableName

      switch (name) {
        case TABLE_NAMES.railwayAggregation:
          name = this.$t('forms.railwayAggregator.title');
          break;

        case TABLE_NAMES.railwayRequest:
          name = this.$t('forms.railwayRequest.title');
          break;

        case TABLE_NAMES.autoRace:
          name = this.$t('forms.race.title');
          break;

        case TABLE_NAMES.autoRequest:
          name = this.$t('forms.request.title');
          break;
            
        case TABLE_NAMES.autoVehiclesRegister:
          name = this.$t('forms.vehicleRegister.title');
          break;
       }

       return name
    },

    tableName() {
      let name = this.row.tableName

      switch (name) {
        case 'railway-aggregation':
          name = TABLE_NAMES_ROUTE.railwayAggregation;
          break;

        case 'railway_request':
          name = TABLE_NAMES_ROUTE.railwayRequest;
          break;

        case 'auto-races':
          name = TABLE_NAMES_ROUTE.autoRace;
          break;

        case 'auto-requests':
          name = TABLE_NAMES_ROUTE.autoRequest;
          break;
            
        case 'auto-vehicles-register':
          name = TABLE_NAMES_ROUTE.autoVehiclesRegister;
          break;
       }

       return name
    },

    to() {
      return this.$i18n.path(`workspace/${this.tableName}/${this.row.id}`)
    }
  },

  methods: {
    deleteFavorite() {
      this.$store.dispatch('favorites/deleteFavorite', { objectId: this.row.id, tableName: this.row.tableName })
    }
  }
}
</script>

<style lang="scss" scoped>
.UserFavoritesListItem {
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
      margin-top: 25px;
    }
  }
}

.UserFavoritesListItem__items-line {
  display: flex;
  flex-direction: row;

  & > :not(:first-child) {
    margin-left: 20px;
  }
}

.UserFavoritesListItem__icon {
  margin-right: 6px;
  width: 15px;
}

.UserFavoritesListItem__no-icon {
  margin-left: 26px !important;
}

.UserFavoritesListItem__number {
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
  .UserFavoritesListItem {
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

  .UserFavoritesListItem__items-line {
    flex-direction: column;

    & > :not(:first-child) {
      margin-top: 25px;
      margin-left: 0;
    }

    &.UserFavoritesListItem__items-line-still {
      flex-direction: row;

      & > :not(:first-child) {
        margin-top: 0;
        margin-left: 10px;
      }
    }
  }
}
</style>