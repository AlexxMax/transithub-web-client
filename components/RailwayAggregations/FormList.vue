<template>
  <div>
    <CommonList
      :count="count"
      :title="$t('lists.railwayAggregations')"
      store-module="railwayAggregations"
      @eventFetch="fetch">

      <Toolbar
        slot="toolbar"
        ref="toolbar"
        @onSearch="handleSearch">

        <ButtonsGroup slot="items">
          <FilterMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"
          />
          <GroupsMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"
            @grouping="type => $_listGrouping_handleGrouping(type, groupedList)"
          />
          <!-- <SortingMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"
          /> -->
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

          <FilterMenu flat @close="closeToolbar"/>
          <GroupsMenu flat @close="closeToolbar"/>
          <!-- <SortingMenu flat @close="closeToolbar"/> -->
        </div>

      </Toolbar>

      <ListWrapper :loading="$store.state.railwayAggregations.loading">
        <ItemsWrapper no-header>

          <div v-if="grouped">
            <ListItemGroupe
              v-for="(r, index) of groupedList"
              :ref="`g-${index}`"
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

    <InaccessibleFunctionality
      ref="inaccessible-functionality"
      :text="$t('forms.common.inaccessibleFunctionalityRailwayAggregationsCreateWithoutCompany')"
      no-login-btn
    >
      <Button
        class="FormList__inaccessible-functionality-btn"
        type="primary"
        @click="handleCreateCompany"
      >
        {{ $t('links.navmenu.company.createNewCompany') }}
      </Button>
    </InaccessibleFunctionality>
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
// import SortingMenu from '@/components/RailwayAggregations/SortingMenu'
import FilterMenu from '@/components/RailwayAggregations/FilterMenu'
import InaccessibleFunctionality from '@/components/Common/InaccessibleFunctionality'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import grouping from '@/mixins/listGrouping'

export default {
  name: 'th-railway-aggregations-list',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list), grouping ],

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
    // SortingMenu,
    FilterMenu,
    InaccessibleFunctionality
  },

  props: {
    list: Array,
    groupedList: Array,
    grouped: Boolean
  },

  computed: {
    count() {
      return this.$store.state.railwayAggregations.count
    },
    userHasCompany() {
      return !!this.$store.state.companies.currentCompany.guid
    }
  },

  methods: {
    fetch() {
      this.$emit("eventFetch")
    },
    handleCreateRailwayAggregation() {
      this.closeToolbar()
      if (this.userHasCompany) {
        this.$refs['edit-form'].show()
      } else {
        this.$refs['inaccessible-functionality'].show()
      }
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu()
    },
    handleSearch(value) {
      this.$store.dispatch('railwayAggregations/setSearch', value)
    },
    handleCreateCompany() {
      this.$store.dispatch('companies/showCreateNewDialog', true)
      this.$refs['inaccessible-functionality'].hide()
    }
  }
}
</script>

<style lang="scss" scoped>
.FormList__inaccessible-functionality-btn {
  margin-top: 30px;
}
</style>
