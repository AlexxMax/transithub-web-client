<template>
  <div>
    <CommonList
      :count="count"
      :title="$t('lists.railwayAggregations')"
      store-module="railwayAggregations"
      @eventFetch="fetch">

      <Toolbar
        slot="toolbar"
        ref="toolbar">

        <ButtonsGroup slot="items">
          <GroupsMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"
          />
          <SortingMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"
          />
        </ButtonsGroup>

        <ButtonsGroup>
          <Button
            type="primary"
            @click="handleCreateRailwayAggregation">
            {{ $t('forms.railwayAggregator.createAggregation') }}
          </Button>
        </ButtonsGroup>

        <div slot="menu-items">
          <Button
            flat
            type="primary"
            @click="handleCreateRailwayAggregation">
            {{ $t('forms.railwayAggregator.createAggregation') }}
          </Button>

          <GroupsMenu flat @close="closeToolbar"/>
          <SortingMenu flat @close="closeToolbar"/>
        </div>

      </Toolbar>

      <ListWrapper :loading="$store.state.railwayAggregations.loading">
        <ItemsWrapper no-header>

          <div v-if="grouped">
            <ListItemGroupe
              v-for="r of groupedList"
              :key="r.group"
              :title="r.group"
              :value="r.group"
              :count="r.items.length">
              <ListItem
                v-for="ra of r.items"
                :key="ra.guid"
                :row="ra"/>
            </ListItemGroupe>
          </div>

          <div v-else>
            <ListItem
              v-for="ra of list"
              :key="ra.guid"
              :row="ra"/>
          </div>

        </ItemsWrapper>
      </ListWrapper>

    </CommonList>

    <RailwayAggregationEditForm
      ref="edit-form"
      creation
    />
  </div>
</template>

<script>
import CommonList from '@/components/Common/List'
import Toolbar from '@/components/Common/Lists/Toolbar'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ItemsWrapper from '@/components/Common/Lists/ItemsWrapper'
import ListItemGroupe from '@/components/Common/Lists/ItemGroupe'
import ListItem from '@/components/RailwayAggregations/ListItem'
import Button from '@/components/Common/Buttons/Button'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import RailwayAggregationEditForm from '@/components/RailwayAggregations/RailwayAggregationEditForm'
import GroupsMenu from '@/components/RailwayAggregations/GroupsMenu'
import SortingMenu from '@/components/RailwayAggregations/SortingMenu'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-railway-aggregations-list',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    CommonList,
    Toolbar,
    ListWrapper,
    ItemsWrapper,
    ListItem,
    ListItemGroupe,
    Button,
    ButtonsGroup,
    RailwayAggregationEditForm,
    GroupsMenu,
    SortingMenu
  },

  props: {
    list: Array,
    groupedList: Array,
    grouped: Boolean
  },

  computed: {
    count() {
      return this.$store.state.railwayAggregations.count
    }
  },

  methods: {
    fetch() {
      this.$emit("eventFetch")
    },
    handleCreateRailwayAggregation() {
      this.closeToolbar()
      this.$refs['edit-form'].show()
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu()
    }
  }
}
</script>
