<template>
  <div>
    <h3 class="VehiclesList__title">{{ $t('forms.common.vehicles') }}</h3>

    <CommonList
      no-pagination
      show-load-more
      :loading="$store.state.vehicles.loading"
      :count="$store.state.vehicles.count"
      :loaded-count="$store.state.vehicles.list.length"
      :store-mutation="MUTATIONS_KEYS.SET_OFFSET"
      store-module="vehicles"
      offset-name="offset"
      @eventFetch="$emit('fetch')"
    >

      <ToolbarRight
        class="VehiclesList__toolbar"
        slot="toolbar"
        ref="toolbar"
        @onSearch="handleSearch"
      >
        <div slot="items">
          <ButtonsGroup>
            <FilterMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/>
          </ButtonsGroup>
        </div>

        <div slot="menu-items">
          <FilterMenu flat @close="closeToolbar"/>
        </div>
      </ToolbarRight>

      <FastFilters class="VehiclesList__fast-filters"/>

      <ListWrapper :loading="$store.state.vehicles.loading">
        <ItemsWrapper no-header width="620px">
          <VehiclesListItem
            v-for="vehicle of list"
            :key="vehicle.guid"
            :row="vehicle"
          />
        </ItemsWrapper>
      </ListWrapper>

    </CommonList>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List"
import ToolbarRight from "@/components/Common/Lists/ToolbarRight"
import ListWrapper from "@/components/Common/Lists/ListWrapper"
import ItemsWrapper from "@/components/Common/Lists/ItemsWrapper"
import VehiclesListItem from '@/components/Vehicles/VehiclesListItem'
import FilterMenu from "@/components/Vehicles/FilterMenu"
import FastFilters from "@/components/Vehicles/FastFilters"
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup"

import { STORE_MODULE_NAME, MUTATIONS_KEYS, ACTIONS_KEYS } from '@/utils/vehicles'

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"

export default {
  name: 'th-vehicles-list',

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    CommonList,
    ToolbarRight,
    ListWrapper,
    ItemsWrapper,
    VehiclesListItem,
    FilterMenu,
    FastFilters,
    ButtonsGroup
  },

  props: {
    list: Array
  },

  data: () => ({
    MUTATIONS_KEYS
  }),

  methods: {
    handleSearch(value) {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.SET_SEARCH}`, value)
    },

    closeToolbar() {
      this.$refs.toolbar.closeMenu();
    }
  }
}
</script>

<style lang='scss' scoped>
.VehiclesList {
  &__title {
    display: flex;
    font-size: 18px;
    font-weight: 500;
    color: #606266;
    position: absolute;
    margin-top: 5px;
    margin-left: 5px;
  }

  &__toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 35px;
  }

  &__fast-filters {
    margin-bottom: 20px;
  }
}
@media (max-width: 600px) {
  .VehiclesList {
    &__title {
      width: 108%;
      margin: -35px;
      justify-content: center;
      align-items: center;
    }

    &__toolbar {
      margin-top: 50px;
      display: block;
      justify-content: center;
      align-items: center;
      margin-left: -15px;
    }
  }
}
</style>
