<template>
  <div>
    <CommonList
      :count="count"
      :title="$t('lists.railwayRequests')"
      store-module="railwayRequests"
      @eventFetch="fetch">

      <Toolbar
        slot="toolbar"
        ref="toolbar"
        @onSearch="handleSearch">

        <el-switch
          :active-text="$t('forms.common.propositionsIn')"
          :inactive-text="$t('forms.common.propositionsOut')"
          readonly/>
        <!-- <ButtonsGroup slot="items">
          <FilterMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"
          />
          <GroupsMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"
            @grouping="type => $_listGrouping_handleGrouping(type, groupedList)"
          />
          <SortingMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"
          />
        </ButtonsGroup>

        <ButtonsGroup>
          <Button
            type="primary"
            @click="handleCreateRailwayRequest">
            {{ $t('forms.railwayRequest.createProposition') }}
          </Button>
        </ButtonsGroup>

        <div slot="menu-items">
          <Button
            flat
            type="primary"
            @click="handleCreateRailwayRequest">
            {{ $t('forms.railwayRequest.createProposition') }}
          </Button>

          <FilterMenu flat @close="closeToolbar"/>
          <GroupsMenu flat @close="closeToolbar"/>
          <SortingMenu flat @close="closeToolbar"/>
        </div> -->

      </Toolbar>

      <ListWrapper :loading="$store.state.railwayRequests.loading">
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

    <RailwayRequestsEditForm
      ref="edit-form"
      creation/>

    <!-- <InaccessibleFunctionality
      ref="inaccessible-functionality"
      :text="$t('forms.common.inaccessibleFunctionalityRailwayRequestsCreateRequestWithoutCompany')"
      no-login-btn>
      <Button
        class="FormList__inaccessible-functionality-btn"
        type="primary"
        @click="handleCreateCompany"
      >
        {{ $t('links.navmenu.company.createNewCompany') }}
      </Button>
    </InaccessibleFunctionality> -->
  </div>
</template>

<script>
import CommonList from '@/components/Common/List'
import Toolbar from '@/components/Common/Lists/Toolbar'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ItemsWrapper from '@/components/Common/Lists/ItemsWrapper'
import ListItemGroupe from '@/components/Common/Lists/ItemGroupe'
import ListItem from '@/components/RailwayRequests/ListItem'
import Button from '@/components/Common/Buttons/Button'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import RailwayRequestsEditForm from '@/components/RailwayRequests/RailwayRequestsEditForm'
// import GroupsMenu from '@/components/RailwayRequests/GroupsMenu'
// import SortingMenu from '@/components/RailwayRequests/SortingMenu'
// import FilterMenu from '@/components/RailwayRequests/FilterMenu'
//import InaccessibleFunctionality from '@/components/Common/InaccessibleFunctionality'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import grouping from '@/mixins/listGrouping'

export default {
  name: 'th-railway-requests-list',

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
    RailwayRequestsEditForm,
    // GroupsMenu,
    // SortingMenu,
    // FilterMenu,
    //InaccessibleFunctionality
  },

  props: {
    list: Array,
    groupedList: Array,
    grouped: Boolean
  },

  computed: {
    count() {
      return this.$store.state.railwayRequests.count
    },
    userHasCompany() {
      return !!this.$store.state.companies.currentCompany.guid
    }
  },

  methods: {
    fetch() {
      this.$emit("eventFetch")
    },
    handleCreateRailwayRequest() {
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
      this.$store.dispatch('railwayRequests/setSearch', value)
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