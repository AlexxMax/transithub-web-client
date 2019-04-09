<template>
  <div>
    <h3 class="RailwayRequestsFormList__title">{{ $t('lists.railwayRequests') }}</h3>
    <CommonList
      no-pagination
      show-load-more
      :loading="loading"
      :count="count"
      :loaded-count="loadedCount"
      store-module="railwayRequests"
      @eventFetch="fetch"
    >
      <ToolbarRight
        class="RailwayRequestsFormList__toolbar-right"
        slot="toolbar"
        ref="toolbar"
        @onSearch="handleSearch"
      >
        <div slot="items">
          <ButtonsGroup>
            <FilterMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/>

            <CompaniesFilter
              class="RailwayRequests__companies-filter"
              v-if="listType === LIST_TYPE.outcome"
              @change="fetchWithCompaniesFilter"
            />
          </ButtonsGroup>
        </div>

        <div slot="menu-items">
          <FilterMenu flat @close="closeToolbar"/>
        </div>
      </ToolbarRight>

      <FastFilters/>

      <el-tabs v-model="listType">
        <el-tab-pane :label="$t('forms.common.propositionsOut')" :name="LIST_TYPE.outcome">
          <RailwayRequestsList :loading="$store.state.railwayRequests.loading" :list="list"/>
        </el-tab-pane>

        <el-tab-pane :label="$t('forms.common.propositionsIn')" :name="LIST_TYPE.income">
          <RailwayRequestsList :loading="$store.state.railwayRequests.loading" :list="list"/>
        </el-tab-pane>
      </el-tabs>
    </CommonList>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List";
import ToolbarRight from "@/components/Common/Lists/ToolbarRight";
import ListWrapper from "@/components/Common/Lists/ListWrapper";
import ItemsWrapper from "@/components/Common/Lists/ItemsWrapper";
import ListItem from "@/components/RailwayRequests/ListItem";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";
import FilterMenu from "@/components/RailwayRequests/FilterMenu";
import CompaniesFilter from "@/components/Companies/CompaniesFilter";
import FastFilters from "@/components/RailwayRequests/FastFilters";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

const RailwayRequestsList = {
  name: "th-railway-requests-list",

  components: {
    ListWrapper,
    ItemsWrapper,
    ListItem
  },

  props: {
    list: {
      type: Array,
      default: []
    },
    loading: Boolean
  },

  render(h) {
    return h(ListWrapper, { props: { loading: this.loading } }, [
      h(
        ItemsWrapper,
        { props: { noHeader: true, withTabs: true } },
        this.list.map(function(item) {
          return h(ListItem, { key: item.guid, props: { row: item } });
        })
      )
    ]);
  }
};

const LIST_TYPE = Object.freeze({
  income: "in",
  outcome: "out"
});

export default {
  name: "th-railway-requests-list",

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    CommonList,
    ToolbarRight,
    ButtonsGroup,
    FilterMenu,
    CompaniesFilter,
    RailwayRequestsList,
    FastFilters
  },

  props: {
    list: Array
  },

  computed: {
    loading() {
      return this.$store.state.railwayRequests.loading;
    },
    count() {
      return this.$store.state.railwayRequests.count;
    },
    loadedCount() {
      return this.$store.state.railwayRequests.list.length;
    },
    userHasCompany() {
      return !!this.$store.state.companies.currentCompany.guid;
    },
    listType: {
      get() {
        return this.$store.state.railwayRequests.filters.set.income === 0
          ? LIST_TYPE.outcome
          : LIST_TYPE.income;
      },
      set(value) {
        this.$store.dispatch(
          "railwayRequests/setFilterIncome",
          value === LIST_TYPE.outcome ? 0 : 1
        );
      }
    }
  },

  methods: {
    fetch(dropLimit = false) {
      this.$emit("eventFetch", dropLimit);
    },
    fetchWithCompaniesFilter() {
      this.fetch(true);
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu();
    },
    handleSearch(value) {
      this.$store.dispatch("railwayRequests/setSearch", value);
    }
  },

  created() {
    this.LIST_TYPE = LIST_TYPE;
  }
};
</script>

<style lang="scss" scoped>
// .FormList__inaccessible-functionality-btn {
//   margin-top: 30px;
.RailwayRequestsFormList__title {
  display: block;
  font-size: 18px;
  font-weight: 500;
  color: #606266;
  position: absolute;
  margin: 5px 7px;
}
.RailwayRequests__companies-filter {
  order: -1;
  margin-right: 5px;
}
.RailwayRequestsFormList__toolbar-right {
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.RailwayRequestsFormList__toolbar-display {
  margin-left: 5px;
}
@media (max-width: 800px) {
  .RailwayRequestsFormList__toolbar-display {
    margin: 12px 0;
  }
  .RailwayRequestsFormList__title {
    width: 104%;
    display: flex;
    margin: -35px;
    justify-content: center;
    align-items: center;
  }
  .RailwayRequestsFormList__toolbar-right {
    margin-top: 45px;
    margin-left: -20px;
    display: flex;
    justify-content: center;
    position: relative;
  }
}
@media (max-width: 600px) {
  .RailwayRequestsFormList__toolbar-right {
    display: block;
    width: 100%;
    margin-left: -8px;
  }
  .RailwayRequests__companies-filter {
    display: flex;
    width: 100%;
    justify-content: center;
    position: relative;
    margin: 10px 0 -10px 55px;
  }
}
@media (max-width: 450px) {
  .RailwayRequestsFormList__title {
    width: 108%;
  }
  .RailwayRequests__companies-filter {
    margin: 10px 0 -10px 53px;
  }
}
</style>
