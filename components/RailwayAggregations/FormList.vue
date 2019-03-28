<template>
  <div>
    <CommonList
      no-pagination
      :show-load-more="display === DISPLAYS.list"
      :loading="loading"
      :count="count"
      :loaded-count="loadedCount"
      :title="$t('lists.railwayAggregations')"
      store-module="railwayAggregations"
      :store-mutation="storeMutation"
      :offset-name="offsetName"
      @eventFetch="fetch"
    >
      <Toolbar slot="toolbar" ref="toolbar" @onSearch="handleSearch">
        <ButtonsGroup slot="items">
          <FilterMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/>

          <Button
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            class="RailwayAggregationsFormList__toolbar-display"
            round
            plain
            icon-only
            :fa-icon="display === DISPLAYS.map ? 'list' : 'map-marked-alt'"
            :type="null"
            @click="handleDisplayChangeButton"
          >
            {{ display === DISPLAYS.map ? $t('forms.common.list') : $t('forms.common.map') }}
          </Button>

          <!-- <CompaniesFilter/> -->
        </ButtonsGroup>

        <ButtonsGroup>
          <ButtonTelegram/>
        </ButtonsGroup>

        <div slot="menu-items">
          <ButtonTelegram flat/>

          <FilterMenu flat @close="closeToolbar"/>
        </div>
      </Toolbar>

      <FastFilters/>

      <RailwayAggreagtionListAll
        v-if="display === DISPLAYS.list"
        :tab="tab"
        :list="list"
        :listByAuthor="listByAuthor"
        @tab-change="handleListTabChange"
      />
      <RailwayAggreagtionListMap v-else-if="display === DISPLAYS.map"/>
    </CommonList>
  </div>
</template>

<script>
import CommonList from '@/components/Common/List'
import Toolbar from '@/components/Common/Lists/Toolbar'
import Button from '@/components/Common/Buttons/Button'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import FilterMenu from '@/components/RailwayAggregations/FilterMenu'
import ButtonTelegram from '@/components/Common/Buttons/ButtonTelegram'
import RailwayAggreagtionListAll from '@/components/RailwayAggregations/RailwayAggregationsList/RailwayAggregationsListAll'
import RailwayAggreagtionListMap from '@/components/RailwayAggregations/RailwayAggregationsList/RailwayAggregationsListMap'
import FastFilters from '@/components/RailwayAggregations/FastFilters'

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
    Toolbar,
    Button,
    ButtonTelegram,
    ButtonsGroup,
    FilterMenu,
    RailwayAggreagtionListAll,
    RailwayAggreagtionListMap,
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
    handleDisplayChangeButton() {
      this.display =
        this.display === DISPLAYS.list ? DISPLAYS.map : DISPLAYS.list;
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
.FormList__inaccessible-functionality-btn {
  margin-top: 30px;
}

.RailwayAggregationsFormList__toolbar-display {
  margin-left: 5px;
}
@media (max-width: 599px) {
  .RailwayAggregationsFormList__toolbar-display {
    margin: 12px 0;
  }
}
</style>
