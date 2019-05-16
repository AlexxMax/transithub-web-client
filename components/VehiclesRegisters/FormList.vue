<template>
  <div>
    <h3 class="VehiclesRegistersFormList__title">{{ $t('lists.vehiclesRegisters') }}</h3>
    <CommonList
      no-pagination
      show-load-more
      :loading="loading"
      :count="count"
      :loaded-count="loadedCount"
      store-module="vehiclesRegisters"
      @eventFetch="_fetch"
    >
      <ToolbarRight
        class="VehiclesRegistersFormList__toolbar-right"
        slot="toolbar"
        ref="toolbar"
        :filterSet="filterSet"
        @showFilter="showFilters = !showFilters"
        @onSearch="setSearch"
      >
        <div slot="items">
          <ButtonsGroup>
            <!-- <CompaniesFilter class="VehiclesRegisters__companies-filter" @change="_fetch"/> -->
            <FilterMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/>
            <GroupsMenu
              v-if="!$_smallDeviceMixin_isDeviceSmall"
              @close="closeToolbar"
              @grouping="type => $_listGrouping_handleGrouping(type, groupedList)"
            />
            <SortingMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/>
          </ButtonsGroup>
        </div>
        <div slot="menu-items">
          <FilterMenu flat @close="closeToolbar"/>s
          <GroupsMenu flat @close="closeToolbar"/>
          <SortingMenu flat @close="closeToolbar"/>
        </div>
      </ToolbarRight>

      <ListWrapper :loading="$store.state.vehiclesRegisters.loading">
        <ItemsWrapper no-header>
          <div v-if="grouped">
            <ListItemGroupe
              v-for="(r, index) of groupedList"
              :ref="`g-${index}`"
              :key="r.group"
              :title="r.group"
              :value="r.group"
              :count="r.items.length"
            >
              <ListItem v-for="vr of r.items" :key="vr.guid" :row="vr"/>
            </ListItemGroupe>
          </div>

          <div v-else>
            <ListItem v-for="vr of list" :key="vr.guid" :row="vr"/>
          </div>
        </ItemsWrapper>
      </ListWrapper>
    </CommonList>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";
import ListWrapper from "@/components/Common/Lists/ListWrapper";
import ListItemGroupe from "@/components/Common/Lists/ItemGroupe";
import ItemsWrapper from "@/components/Common/Lists/ItemsWrapper";
import ToolbarRight from "@/components/Common/Lists/ToolbarRight";
import FilterMenu from "@/components/VehiclesRegisters/FilterMenu";
import GroupsMenu from "@/components/VehiclesRegisters/GroupsMenu";
import ListItem from "@/components/VehiclesRegisters/ListItem";
import SortingMenu from "@/components/VehiclesRegisters/SortingMenu";
// import CompaniesFilter from "@/components/Companies/CompaniesFilter";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";
import grouping from "@/mixins/listGrouping";

export default {
  name: "th-vehicles-registers-list",

  mixins: [screen(SCREEN_TRIGGER_SIZES.list), grouping],

  components: {
    CommonList,
    ButtonsGroup,
    ToolbarRight,
    ListWrapper,
    ListItemGroupe,
    ItemsWrapper,
    FilterMenu,
    GroupsMenu,
    SortingMenu,
    ListItem,
    // CompaniesFilter
  },

  props: {
    list: Array,
    groupedList: Array,
    grouped: Boolean
  },

  computed: {
    loading() {
      return this.$store.state.vehiclesRegisters.loading;
    },
    count: function() {
      return this.$store.state.vehiclesRegisters.count;
    },
    loadedCount() {
      return this.$store.state.vehiclesRegisters.list.length;
    },
    filterSet: function() {
      return this.$store.getters["vehiclesRegisters/listFiltersSet"];
    }
  },

  methods: {
    _fetch: function() {
      this.$emit("eventFetch");
    },
    setSearch: function(value) {
      this.$store.dispatch("vehiclesRegisters/setSearch", value);
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu();
    }
  }
};
</script>

<style lang="scss" scoped>
.VehiclesRegistersFormList__title {
  display: flex;
  font-size: 18px;
  font-weight: 500;
  color: #606266;
  position: absolute;
  margin: 5px 7px;
}
.VehiclesRegistersFormList__toolbar-right {
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-bottom: 40px;
}

.VehiclesRegistersFormList__toolbar-display {
  margin-left: 5px;
}
@media (max-width: 1080px) {
  .VehiclesRegistersFormList__toolbar-display {
    margin: 12px 0;
  }
  .VehiclesRegistersFormList__title {
    width: 104%;
    display: flex;
    margin: -35px;
    justify-content: center;
    align-items: center;
  }
  .VehiclesRegistersFormList__toolbar-right {
    margin-top: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -8px;
  }
}
@media (max-width: 600px) {
  .VehiclesRegistersFormList__toolbar-right {
    display: block;
    width: 100%;
    margin-left: -7px;
  }
  .VehiclesRegisters__companies-filter {
    display: flex;
    width: 100%;
    justify-content: center;
    position: relative;
    margin: 10px 0 -15px 57px;
  }
}
@media (max-width: 450px) {
  .VehiclesRegistersFormList__title {
    width: 108%;
  }
  .VehiclesRegisters__companies-filter {
    margin: 10px 0 -15px 53px;
  }
}
</style>

