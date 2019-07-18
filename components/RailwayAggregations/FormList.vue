<template>
  <div>
    <h3 class="RailwayAggregationsFormList__title">{{ $t('lists.railwayAggregations') }}</h3>
    <CommonList
      no-pagination
      :show-load-more="display === DISPLAYS.list"
      :loading="loading"
      :count="count"
      :loaded-count="loadedCount"
      store-module="railwayAggregations"
      :store-mutation="storeMutation"
      :offset-name="offsetName"
      @eventFetch="fetch"
    >
      <ToolbarRight
        class="RailwayAggregationsFormList__toolbar-right"
        slot="toolbar"
        ref="toolbar"
        @onSearch="handleSearch"
      >
        <ButtonsGroup slot="items">
          <FilterMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"
            style="margin-left: 7px; order: 1;"
          />

          <ButtonTelegram
            class="RailwayAggregationsFormList__button-telegram"
            style=" margin-left: 7px;"
          />

          <!-- <CompaniesFilter/> -->
        </ButtonsGroup>

        <div slot="menu-items">
          <ButtonTelegram flat/>

          <FilterMenu flat @close="closeToolbar"/>
        </div>
      </ToolbarRight>

      <FastFilters/>

      <RailwayAggreagtionListAll
        v-if="display === DISPLAYS.list"
        :tab="tab"
        :list="list"
        :listByAuthor="listByAuthor"
        @tab-change="handleListTabChange"
      />
    </CommonList>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List";
import ToolbarRight from "@/components/Common/Lists/ToolbarRight";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";
import FilterMenu from "@/components/RailwayAggregations/FilterMenu";
import ButtonTelegram from "@/components/Common/Buttons/ButtonTelegram";
import RailwayAggreagtionListAll from "@/components/RailwayAggregations/RailwayAggregationsList/RailwayAggregationsListAll";
import FastFilters from "@/components/RailwayAggregations/FastFilters";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";
import { LIST_TABS } from "@/utils/railway-aggregations";

const DISPLAYS = Object.freeze({
  list: "list",
  map: "map"
});

export default {
  name: "th-railway-aggregations-list",

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    CommonList,
    ToolbarRight,
    ButtonTelegram,
    ButtonsGroup,
    FilterMenu,
    RailwayAggreagtionListAll,
    FastFilters
  },

  props: {
    list: Array,
    listByAuthor: Array
  },

  data: () => ({
    display: DISPLAYS.list,
    tab: LIST_TABS.all,

    DISPLAYS: DISPLAYS,
    LIST_TABS: LIST_TABS
  }),

  computed: {
    loading() {
      return this.$store.state.railwayAggregations.loading;
    },
    count() {
      const { count, countByAuthor } = this.$store.state.railwayAggregations;
      return this.tab === LIST_TABS.all ? count : countByAuthor;
    },
    loadedCount() {
      const { list, listByAuthor } = this.$store.state.railwayAggregations;
      return this.tab === LIST_TABS.all ? list.length : listByAuthor.length;
    },
    userHasCompany() {
      return !!this.$store.state.companies.currentCompany.guid;
    },
    filterAuthor: {
      get() {
        return this.$store.state.railwayAggregations.filters.set.author
          ? true
          : false;
      },
      set(value) {
        // this.$store.commit('railwayAggregations/RESET')
        // this.$store.dispatch('railwayAggregations/setFilterAuthor', value ? this.$store.state.user.guid : null)
      }
    },
    storeMutation() {
      return this.tab === LIST_TABS.my ? "SET_OFFSET_BY_AUTHOR" : "SET_OFFSET";
    },
    offsetName() {
      return this.tab === LIST_TABS.my ? "offsetByAuthor" : "offset";
    }
  },

  methods: {
    fetch() {
      this.$emit("eventFetch", this.tab === LIST_TABS.my);
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu();
    },
    handleSearch(value) {
      this.$store.dispatch("railwayAggregations/setSearch", value);
    },
    handleCreateCompany() {
      this.$store.dispatch("companies/showCreateNewDialog", true);
      this.$refs["inaccessible-functionality"].hide();
    },
    handleListTabChange(currentTab) {
      this.tab = currentTab;
    }
  },

  created() {
    this.LIST_TABS = LIST_TABS;
  }
};
</script>

<style lang="scss" scoped>
.RailwayAggregationsFormList__title {
  display: flex;
  font-size: 18px;
  font-weight: 500;
  color: #606266;
  position: absolute;
  margin: 5px 7px;
}

.RailwayAggregationsFormList__toolbar-right {
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.RailwayAggregationsFormList__toolbar-display {
  margin-left: 5px;
}

@media (max-width: 850px) {
  .RailwayAggregationsFormList__toolbar-display {
    margin: 12px 0;
  }

  .RailwayAggregationsFormList__title {
    width: 104%;
    display: flex;
    margin: -35px;
    justify-content: center;
    align-items: center;
  }

  .RailwayAggregationsFormList__toolbar-right {
    margin-top: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
}

@media (max-width: 600px) {
  .RailwayAggregationsFormList__toolbar-right {
    display: block;
    width: 101%;
    margin-left: -8px;
  }

  .RailwayAggregationsFormList__button-telegram, .RailwayAggregationsFormList__button-support-telegram {
    display: none;
  }
}

@media (max-width: 450px) {
  .RailwayAggregationsFormList__title {
    width: 108%;
  }
}
</style>