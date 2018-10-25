<template>
  <div>
    <CommonList
      :count="count"
      :title="$t('lists.vehiclesRegisters')"
      store-module="vehiclesRegisters"
      @eventFetch="_fetch">
      <Toolbar
        slot="toolbar"
        ref="toolbar"
        :filterSet="filterSet"
        @showFilter="showFilters = !showFilters"
        @onSearch="setSearch">
        <ButtonsGroup slot="items">
          <FilterMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"/>
          <GroupsMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"/>
          <SortingMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"/>
        </ButtonsGroup>

        <div slot="menu-items">
          <FilterMenu flat @close="closeToolbar"/>
          <GroupsMenu flat @close="closeToolbar"/>
          <SortingMenu flat @close="closeToolbar"/>
        </div>
      </Toolbar>

      <ListWrapper :loading="$store.state.vehiclesRegisters.loading">
        <ItemsWrapper no-header>
          <div v-if="grouped">
            <ListItemGroupe
              v-for="r of groupedList"
              :key="r.group"
              :title="r.group"
              :value="r.group"
              :count="r.items.length">
              <ListItem
                v-for="vr of r.items"
                :key="vr.guid"
                :row="vr"/>
            </ListItemGroupe>
          </div>

          <div v-else>
            <ListItem
              v-for="vr of list"
              :key="vr.guid"
              :row="vr"/>
          </div>
        </ItemsWrapper>
      </ListWrapper>
    </CommonList>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List"
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ListItemGroupe from '@/components/Common/Lists/ItemGroupe'
import ItemsWrapper from '@/components/Common/Lists/ItemsWrapper'
import Toolbar from '@/components/Common/Lists/Toolbar'
import FilterMenu from '@/components/VehiclesRegisters/FilterMenu'
import GroupsMenu from '@/components/VehiclesRegisters/GroupsMenu'
import ListItem from '@/components/VehiclesRegisters/ListItem'
import SortingMenu from '@/components/VehiclesRegisters/SortingMenu'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-vehicles-registers-list',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    CommonList,
    ButtonsGroup,
    Toolbar,
    ListWrapper,
    ListItemGroupe,
    ItemsWrapper,
    FilterMenu,
    GroupsMenu,
    SortingMenu,
    ListItem
  },

  props: {
    list: Array,
    groupedList: Array,
    grouped: Boolean
  },

  computed: {
    count: function() {
      return this.$store.state.vehiclesRegisters.count
    },
    filterSet: function() {
      return this.$store.getters['vehiclesRegisters/listFiltersSet']
    }
  },

  methods: {
    _fetch: function() {
      this.$emit("eventFetch")
    },
    setSearch: function(value) {
      this.$store.dispatch('vehiclesRegisters/setSearch', value)
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu()
    }
  }
}
</script>
