<template>
  <div class="th-list-requests">
    <CommonList
      :count="count"
      :title="$t('lists.requests')"
      store-module="requests"
      @eventFetch="_fetch">
      <Toolbar
        slot="toolbar"
        ref="toolbar">
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

      <ListWrapper :loading="$store.state.requests.loading">
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
import Toolbar from '@/components/Common/Lists/Toolbar'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ItemsWrapper from '@/components/Common/Lists/ItemsWrapper'
import ListItemGroupe from '@/components/Common/Lists/ItemGroupe'
import ListItem from '@/components/Requests/ListItem'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import FilterMenu from '@/components/Requests/FilterMenu'
import GroupsMenu from '@/components/Requests/GroupsMenu'
import SortingMenu from '@/components/Requests/SortingMenu'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-requests-list',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    CommonList,
    Toolbar,
    ListWrapper,
    ItemsWrapper,
    ListItemGroupe,
    ListItem,
    ButtonsGroup,
    FilterMenu,
    GroupsMenu,
    SortingMenu
  },

  props: {
    list: Array,
    groupedList: Array,
    grouped: Boolean
  },

  computed: {
    count: function() {
      return this.$store.state.requests.count
    }
  },

  methods: {
    _fetch: function() {
      this.$emit("eventFetch")
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu()
    }
  }
}
</script>
