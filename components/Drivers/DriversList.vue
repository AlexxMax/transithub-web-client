<template>
  <div>
    <h3 class="DriversList__title">{{ $t('forms.common.drivers') }}</h3>

    <CommonList
      no-pagination
      show-load-more
      :loading="$store.state.drivers.loading"
      :count="$store.state.drivers.count"
      :loaded-count="$store.state.drivers.list.length"
      :store-mutation="MUTATIONS_KEYS.SET_OFFSET"
      store-module="drivers"
      offset-name="offset"
      @eventFetch="$emit('fetch')"
    >
      <ToolbarRight
        class="DriversList__toolbar"
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

      <FastFilters class="DriversList__fast-filters"/>

      <ListWrapper :loading="$store.state.drivers.loading">
        <ItemsWrapper no-header width="620px">
          <DriversListItem v-for="driver of list" :key="driver.guid" :row="driver"/>
        </ItemsWrapper>
      </ListWrapper>
    </CommonList>
  </div>
</template>

<script>
import ToolbarRight from "@/components/Common/Lists/ToolbarRight"
import CommonList from "@/components/Common/List"
import ListWrapper from "@/components/Common/Lists/ListWrapper"
import ItemsWrapper from "@/components/Common/Lists/ItemsWrapper"
import DriversListItem from "@/components/Drivers/DriversListItem"
import FilterMenu from "@/components/Drivers/FilterMenu"
import FastFilters from "@/components/Drivers/FastFilters"
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup"

import { STORE_MODULE_NAME, MUTATIONS_KEYS, ACTIONS_KEYS } from "@/utils/drivers"

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"

export default {
  name: "th-drivers-list",

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    ToolbarRight,
    CommonList,
    ListWrapper,
    ItemsWrapper,
    DriversListItem,
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
      this.$refs.toolbar.closeMenu()
    }
  }
}
</script>

<style lang="scss" scoped>
.DriversList {
  &__title {
    display: flex;
    font-size: 18px;
    font-weight: 500;
    color: #606266;
    position: absolute;
    margin-top: 5px;
    margin-left: 5px;
  }

  &__fast-filters {
    margin-bottom: 20px;
  }
}
.DriversList__toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 35px;
}
@media (max-width: 600px) {
  .DriversList__title {
    width: 108%;
    margin: -35px;
    justify-content: center;
    align-items: center;
  }
  .DriversList__toolbar {
    margin-top: 50px;
    display: block;
    justify-content: center;
    align-items: center;
    margin-left: -15px;
  }
}
</style>
