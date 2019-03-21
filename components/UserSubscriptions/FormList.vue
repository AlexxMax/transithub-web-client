<template>
  <div class="UserSubscriptionsFormList">
    <div
      store-module="subscriptions"
      @eventFetch="fetch">

      <span class="UserSubscriptionsFormList__title"> {{ $t('links.system.userSubscriptions') }} </span>

      <FiltersSimpleButtonsView :items="items" @click="handleFiltersClick"/>

      <ListWrapper :loading="$store.state.subscriptions.loading">
        <ItemsWrapperFullHeight no-header>
          <ListItem
            v-for="item of list"
            :key="item.guid"
            :row="item"
          />
        </ItemsWrapperFullHeight>
      </ListWrapper>
    </div>
  </div>
</template>

<script>
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ItemsWrapperFullHeight from '@/components/Common/Lists/ItemsWrapperFullHeight'
import ListItem from '@/components/UserSubscriptions/ListItem'
import FiltersSimpleButtonsView from '@/components/Common/Lists/Filters/FiltersSimpleButtonsView'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import grouping from '@/mixins/listGrouping'
import { TABLE_NAMES } from '@/utils/constants'

export default {
  name: 'th-user-subscriptions-list',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    ListWrapper,
    ItemsWrapperFullHeight,
    ListItem,
    FiltersSimpleButtonsView
  },

  props: {
    list: Array
  },

  data() {
    return {
      items: [
        { name: TABLE_NAMES.railwayAggregation, title: this.$t('lists.railwayAggregations'), toggled: false },
        { name: TABLE_NAMES.railwayRequest, title: this.$t('lists.railwayRequests'), toggled: false },
        { name: TABLE_NAMES.autoRequest, title: this.$t('lists.requests'), toggled: false },
        { name: TABLE_NAMES.autoVehiclesRegister, title: this.$t('lists.vehiclesRegisters'), toggled: false },
        { name: TABLE_NAMES.autoRace, title: this.$t('lists.races'), toggled: false }
      ]
    }
  },

  methods: {
    fetch() {
      this.$emit("eventFetch")
    },
    handleFiltersClick(filters) {
      const _filters = {}
      filters.forEach(element => {
        _filters[element.name] = element.toggled
      });
      this.$store.commit('subscriptions/SET_FILTERS', _filters)
    }
  }
}
</script>

<style lang="scss" scoped>
.UserSubscriptionsFormList {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 688px;

  &__title {
    font-size: 16px;
    font-weight: 500;
    padding: 0 5px;
  }

  &__switch-button {
    margin: 30px 0 20px;
    display: flex;
    flex-direction: row;

    span {
      width: fit-content;
      text-decoration: none;
      margin-right: 20px;
      padding: 9px 15px;
      color: #606266;
      font-size: 12px;
      font-weight: 400;
      border-radius: 50px;
      transition: all .3s cubic-bezier(.645,.045,.355,1);
      background-color: #f1ede3;

      &.current {
        background: #fecd34;
        color: #ffffff;
      }

      &:hover {
        cursor: pointer;
        opacity: .8;
      }
    }
  }
}
</style>
