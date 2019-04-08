<template>
  <TransitionSlideLeft>
    <el-tabs :value="tab" @tab-click="handleTabClick">
      <el-tab-pane
        :label="`${$t('forms.common.all')} (${loadedCountAll}/${countAll})`"
        :name="LIST_TABS.all"
      >
        <RailwayAggreagtionList :loading="loading" :list="list"/>
      </el-tab-pane>

      <el-tab-pane
        :label="`${$t('forms.common.my')} (${loadedCountByAuthor}/${countByAuthor})`"
        :name="LIST_TABS.my"
      >
        <RailwayAggreagtionList :loading="loadingByAuthor" :list="listByAuthor"/>
      </el-tab-pane>

      <el-tab-pane 
        :label="$t('forms.common.map')" 
        :name="LIST_TABS.map"
      >
        <RailwayAggreagtionListMap/>
      </el-tab-pane>
    </el-tabs>
  </TransitionSlideLeft>
</template>

<script>
import ListWrapper from "@/components/Common/Lists/ListWrapper";
import ItemsWrapper from "@/components/Common/Lists/ItemsWrapper";
import ListItem from "@/components/RailwayAggregations/ListItem";
import TransitionSlideLeft from "@/components/Common/Transitions/SlideLeft";
import RailwayAggreagtionListMap from "@/components/RailwayAggregations/RailwayAggregationsList/RailwayAggregationsListMap";

import { LIST_TABS } from "@/utils/railway-aggregations";

const RailwayAggreagtionList = {
  name: "th-railway-aggregation-list",

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

export default {
  name: "th-railway-aggregations-list-all",

  components: {
    RailwayAggreagtionList,
    TransitionSlideLeft,
    RailwayAggreagtionListMap
  },

  props: {
    tab: {
      type: String,
      default: LIST_TABS.all
    },
    list: Array,
    listByAuthor: Array
  },

  data: () => ({ LIST_TABS: LIST_TABS }),

  computed: {
    loadedCountAll() {
      return this.$store.state.railwayAggregations.list.length;
    },
    countAll() {
      return this.$store.state.railwayAggregations.count;
    },
    loadedCountByAuthor() {
      return this.$store.state.railwayAggregations.listByAuthor.length;
    },
    countByAuthor() {
      return this.$store.state.railwayAggregations.countByAuthor;
    },
    loading() {
      return this.$store.state.railwayAggregations.loading;
    },
    loadingByAuthor() {
      return this.$store.state.railwayAggregations.loadingByAuthor;
    }
  },

  methods: {
    handleTabClick({ name }) {
      this.$emit("tab-change", name);
    }
  }
};
</script>
