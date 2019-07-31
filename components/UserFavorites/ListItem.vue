<template>
  <ItemCard>
    <div class="UserFavoritesListItem">
      <div class="UserFavoritesListItem__col">
          <div class="UserFavoritesListItem__col__title">
            <span v-if="title">{{ title}}</span>
            <span>{{ name }}</span>
          </div>

          <div v-if="createdAt">
            <fa class="UserFavoritesListItem__icon" icon="calendar-alt"/>
            <span>{{ `${createdAt}` }}</span>
          </div>

          <div v-if="row.certSerialNumber">
            <fa class="UserFavoritesListItem__icon" icon="address-card"/>
            <span>{{ `${row.certSerialNumber}` }}</span>
          </div>

          <div v-if="row.vNumber || row.techPassport" class="UserFavoritesListItem__row">
            <div v-if="row.vNumber">
              <fa class="UserFavoritesListItem__icon" icon="truck"/>
              <span>{{ row.vNumber }}</span>
            </div>

            <div v-if="row.techPassport">
              <fa class="UserFavoritesListItem__icon" icon="address-card"/>
              <span>{{ row.techPassport }}</span>
            </div>
          </div>

          <div>
            <fa class="UserFavoritesListItem__icon" icon="building"/>
            <span>{{ authorCred }}</span>
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
        :fa-icon="btnDeleteLoading ? null : [ 'fas', 'trash-alt' ]"
        :loading="btnDeleteLoading"
        @click="deleteFavorite">
        {{ $t('forms.common.removeFromBookmarks') }}
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
      TABLE_NAMES_ROUTE,
      btnDeleteLoading: false
    }
  },

  computed: {
    title() {
      let name = ''

      switch ( this.row.tableName) {
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

        // case TABLE_NAMES.autoDriver:
        //   name = this.$t('forms.common.driver')
        //   break

        // case TABLE_NAMES.autoVehicle:
        //   name = this.$t('forms.common.vehicle')
        //   break
       }

       return name
    },

    tableName() {
      let name = this.row.tableName

      switch (name) {
        case TABLE_NAMES.railwayAggregation:
          name = TABLE_NAMES_ROUTE.railwayAggregation;
          break;

        case TABLE_NAMES.railwayRequest:
          name = TABLE_NAMES_ROUTE.railwayRequest;
          break;

        case TABLE_NAMES.autoRace:
          name = TABLE_NAMES_ROUTE.autoRace;
          break;

        case TABLE_NAMES.autoRequest:
          name = TABLE_NAMES_ROUTE.autoRequest;
          break;

        case TABLE_NAMES.autoVehiclesRegister:
          name = TABLE_NAMES_ROUTE.autoVehiclesRegister;
          break;

        case TABLE_NAMES.autoDriver:
          name = TABLE_NAMES_ROUTE.autoDriver;
          break;

        case TABLE_NAMES.autoVehicle:
          name = TABLE_NAMES_ROUTE.autoVehicle;
          break;
       }

       return name
    },

    to() {
      let url = this.tableName
      if (this.tableName === TABLE_NAMES.railwayRequest) {
        url = 'railway-requests'
      }
      return this.$i18n.path(`workspace/${url}/${this.row.id}`)
    },

    name() {
      let name = ''

      switch (this.row.tableName) {
        case TABLE_NAMES.railwayAggregation || TABLE_NAMES.railwayRequest || TABLE_NAMES.autoRace || TABLE_NAMES.autoRequest || TABLE_NAMES.autoVehiclesRegister:
          name = `№${this.row.number}`
          break;

        case TABLE_NAMES.autoDriver:
          name = this.row.fullName
          break;

        case TABLE_NAMES.autoVehicle:
          name = `${this.row.brand} ${this.row.model} (${this.row.type.toLowerCase()})`
          break;

        case TABLE_NAMES.autoRequest:
          name = `№${this.row.number}`
          break;
       }

       return name
    },

    createdAt() {
      let createdAt = ''

      if (this.row.tableName === TABLE_NAMES.railwayAggregation ||
        this.row.tableName === TABLE_NAMES.railwayRequest ||
        this.row.tableName === TABLE_NAMES.autoRace ||
        this.row.tableName === TABLE_NAMES.autoRequest ||
        this.row.tableName === TABLE_NAMES.autoVehiclesRegister) {
        createdAt = this.row.createdAt
      }

      return createdAt
    },

    authorCred() {
      let name = ''

      if (this.row.tableName === TABLE_NAMES.railwayAggregation
        || this.row.tableName === TABLE_NAMES.railwayRequest
        || this.row.tableName === TABLE_NAMES.autoRace
        || this.row.tableName === TABLE_NAMES.autoVehiclesRegister) {
        name = `${this.row.companyName } / ${this.row.authorName}`
      } else if (this.row.tableName === TABLE_NAMES.autoDriver
        || this.row.tableName === TABLE_NAMES.autoVehicle
        || this.row.tableName === TABLE_NAMES.autoRequest) {
        name = this.row.companyName
      }

      return name
    }
  },

  methods: {
    async deleteFavorite() {
      this.btnDeleteLoading = true
      await this.$store.dispatch('favorites/deleteFavorite', { objectId: this.row.id, tableName: this.row.tableName })
      this.btnDeleteLoading = false
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

    &__title {
      color: #000000;
    }
  }

  &__row {
    display: flex;
    flex-direction: row;

    div:not(:first-child) {
      margin-left: 20px;
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
  color: #FFD74D;
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
