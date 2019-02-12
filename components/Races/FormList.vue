<template>
  <div>
    <CommonList
      :count="count"
      :title="$t('lists.races')"
      store-module="races"
      @eventFetch="_fetch">
      <Toolbar
        slot="toolbar"
        ref="toolbar"
        :filterSet="filterSet"
        @onSearch="setSearch">
        <div slot="items">
          <ButtonsGroup>
            <FilterMenu
              v-if="!$_smallDeviceMixin_isDeviceSmall"
              @close="closeToolbar"/>
            <GroupsMenu
              v-if="!$_smallDeviceMixin_isDeviceSmall"
              @close="closeToolbar"
              @grouping="type => $_listGrouping_handleGrouping(type, groupedList)"/>
            <SortingMenu
              v-if="!$_smallDeviceMixin_isDeviceSmall"
              @close="closeToolbar"/>

            <CompaniesFilter @change="_fetch"/>
          </ButtonsGroup>
        </div>

        <div slot="menu-items">
          <FilterMenu flat @close="closeToolbar"/>
          <GroupsMenu flat @close="closeToolbar"/>
          <SortingMenu flat @close="closeToolbar"/>
        </div>
      </Toolbar>

      <ListWrapper :loading="$store.state.races.loading">
        <ItemsWrapper no-header>
          <div v-if="grouped">
            <ListItemGroupe
              v-for="(g, index) of groupedList"
              :ref="`g-${index}`"
              :key="g.group"
              :title="g.group"
              :value="g.group"
              :count="g.items.length">
              <ListItem
                v-for="r of g.items"
                :key="r.guid"
                :row="r"/>
            </ListItemGroupe>
          </div>

          <div v-else>
            <ListItem
              v-for="r of list"
              :key="r.guid"
              :row="r"/>
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
import FilterMenu from '@/components/Races/FilterMenu'
import GroupsMenu from '@/components/Races/GroupsMenu'
import SortingMenu from '@/components/Races/SortingMenu'
import ListItem from '@/components/Races/ListItem'
import CompaniesFilter from '@/components/Companies/CompaniesFilter'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import grouping from '@/mixins/listGrouping'

export default {
  name: "th-races-list",

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list), grouping ],

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
    ListItem,
    CompaniesFilter
  },

  props: {
    list: Array,
    groupedList: Array,
    grouped: Boolean
  },

  computed: {
    count() {
      return this.$store.state.races.count
    },
    filterSet: function() {
      return this.$store.getters['races/listFiltersSet']
    }
  },

  methods: {
    _fetch: function() {
      this.$emit("eventFetch")
    },
    setSearch: function(value) {
      this.$store.dispatch('races/setSearch', value)
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu()
    }
  }
}
</script>
