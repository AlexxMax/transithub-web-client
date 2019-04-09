<template>
  <div>
    <h3 class="RacesFormList__title">{{ $t('lists.races') }}</h3>
    <CommonList
      no-pagination
      show-load-more
      :loading="loading"
      :count="count"
      :loaded-count="loadedCount"
      store-module="races"
      @eventFetch="_fetch"
    >
      <ToolbarRight
        class="RacesFormList__toolbar-right"
        slot="toolbar"
        ref="toolbar"
        :filterSet="filterSet"
        @onSearch="setSearch"
      >
        <div slot="items">
          <ButtonsGroup>
            <CompaniesFilter class="RacesFormList__companies-filter" @change="_fetch"/>
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
          <FilterMenu flat @close="closeToolbar"/>
          <GroupsMenu flat @close="closeToolbar"/>
          <SortingMenu flat @close="closeToolbar"/>
        </div>
      </ToolbarRight>

      <ListWrapper :loading="$store.state.races.loading">
        <ItemsWrapper no-header>
          <div v-if="grouped">
            <ListItemGroupe
              v-for="(g, index) of groupedList"
              :ref="`g-${index}`"
              :key="g.group"
              :title="g.group"
              :value="g.group"
              :count="g.items.length"
            >
              <ListItem v-for="r of g.items" :key="r.guid" :row="r"/>
            </ListItemGroupe>
          </div>

          <div v-else>
            <ListItem v-for="r of list" :key="r.guid" :row="r"/>
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
import FilterMenu from "@/components/Races/FilterMenu";
import GroupsMenu from "@/components/Races/GroupsMenu";
import SortingMenu from "@/components/Races/SortingMenu";
import ListItem from "@/components/Races/ListItem";
import CompaniesFilter from "@/components/Companies/CompaniesFilter";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";
import grouping from "@/mixins/listGrouping";

export default {
  name: "th-races-list",

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
    CompaniesFilter
  },

  props: {
    list: Array,
    groupedList: Array,
    grouped: Boolean
  },

  computed: {
    loading() {
      return this.$store.state.races.loading;
    },
    count() {
      return this.$store.state.races.count;
    },
    loadedCount() {
      return this.$store.state.races.list.length;
    },
    filterSet: function() {
      return this.$store.getters["races/listFiltersSet"];
    }
  },

  methods: {
    _fetch: function() {
      this.$emit("eventFetch");
    },
    setSearch: function(value) {
      this.$store.dispatch("races/setSearch", value);
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu();
    }
  }
};
</script>

<style lang="scss" scoped>
.RacesFormList__title {
  display: flex;
  font-size: 18px;
  font-weight: 500;
  color: #606266;
  position: absolute;
  margin: 5px 7px;
}
.RacesFormList__toolbar-right {
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-bottom: 40px;
}
.RacesFormList__toolbar-display {
  margin-left: 5px;
}

@media (max-width: 880px) {
  .RacesFormList__toolbar-display {
    margin: 12px 0;
  }
  .RacesFormList__title {
    width: 104%;
    display: flex;
    margin: -35px;
    justify-content: center;
    align-items: center;
  }
  .RacesFormList__toolbar-right {
    margin-top: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-left: -10px;
  }
}
@media (max-width: 600px) {
  .RacesFormList__toolbar-right {
    display: block;
    width: 102%;
    margin-left: -8px;
  }
  .RacesFormList__companies-filter {
    display: flex;
    height: 5px;
    width: 100%;
    justify-content: center;
    position: relative;
    margin: 10px 0 10px 50px;
  }
}
@media (max-width: 450px) {
  .RacesFormList__title {
    width: 107%;
  }
  .RacesFormList__companies-filter {
    margin: 10px 0 10px 53px;
  }
}
</style>

