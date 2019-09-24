<template>
  <div>
    <h3 class="VehiclesList__title">{{ $t('forms.common.vehicles') }}</h3>

    <CommonList
      no-pagination
      show-load-more
      :loading="loading"
      :count="count"
      :loaded-count="loadedCount"
      :store-mutation="storeMutation"
      store-module="vehicles"
      :offset-name="offsetName"
      @eventFetch="fetch"
    >
      <ToolbarRight
        class="VehiclesList__toolbar"
        slot="toolbar"
        ref="toolbar"
        @onSearch="handleSearch"
      >
        <div slot="items">
          <ButtonsGroup>
            <FilterMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar" />
          </ButtonsGroup>
        </div>

        <div slot="menu-items">
          <FilterMenu flat @close="closeToolbar" />
        </div>
      </ToolbarRight>

      <FastFilters class="VehiclesList__fast-filters" />

      <el-tabs v-model="listType">
        <el-tab-pane
          :label="`${$t('forms.common.trucks')} ${loadedListTrucks}/${countListTrucks}`"
          :name="LIST_TYPES.TRUCK"
        >
          <VehiclesList v-loading="loadingTrucks" :list="listTrucks" />
        </el-tab-pane>

        <el-tab-pane
          :label="`${$t('forms.common.trailers')} ${loadedListTrailers}/${countListTrailers}`"
          :name="LIST_TYPES.TRAILER"
        >
          <VehiclesList v-loading="loadingTrailers" :list="listTrailers" />
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
import VehiclesListItem from "@/components/Vehicles/VehiclesListItem";
import FilterMenu from "@/components/Vehicles/FilterMenu";
import FastFilters from "@/components/Vehicles/FastFilters";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";

import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  LIST_TYPES
} from "@/utils/vehicles";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

const VehiclesList = {
  name: "th-vehicles-list",

  components: {
    ListWrapper,
    ItemsWrapper,
    VehiclesListItem
  },

  props: {
    list: {
      type: Array,
      default: []
    }
  },

  render(h) {
    const self = this;
    return h(
      ListWrapper,
      {
        props: {
          loading: self.loading,
          listIsEmpty: self.list.length === 0,
          emptyListTitle: self.$t("lists.requestsEmptyList")
        }
      },
      [
        h(
          ItemsWrapper,
          { props: { noHeader: true, withTabs: true, width: "620px" } },
          self.list.map(function(item) {
            return h(VehiclesListItem, {
              key: item.guid,
              props: { row: item }
            });
          })
        )
      ]
    );
  }
};

export default {
  name: "th-vehicles-list",

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    CommonList,
    ToolbarRight,
    VehiclesList,
    FilterMenu,
    FastFilters,
    ButtonsGroup
  },

  props: {
    listTrucks: Array,
    listTrailers: Array
  },

  data: () => ({
    listType: LIST_TYPES.TRUCK,
    MUTATIONS_KEYS,
    LIST_TYPES
  }),

  computed: {
    loadingTrucks() {
      return this.$store.state.vehicles.loadingTrucks;
    },
    loadingTrailers() {
      return this.$store.state.vehicles.loadingTrailers;
    },
    loading() {
      return this.loadingTrucks || this.loadingTrailers;
    },
    loadedListTrucks() {
      return this.listTrucks.length;
    },
    loadedListTrailers() {
      return this.listTrailers.length;
    },
    countListTrucks() {
      return this.$store.state.vehicles.countTrucks;
    },
    countListTrailers() {
      return this.$store.state.vehicles.countTrailers;
    },
    count() {
      let count = this.countListTrucks;
      if (this.listType === LIST_TYPES.TRAILER) {
        count = this.countListTrailers;
      }
      return count;
    },
    loadedCount() {
      let loadedCount = this.loadedListTrucks;
      if (this.listType === LIST_TYPES.TRAILER) {
        loadedCount = this.loadedListTrailers;
      }
      return loadedCount;
    },
    storeMutation() {
      let mutation = "SET_TRUCKS_OFFSET";
      if (this.listType === LIST_TYPES.TRAILER) {
        mutation = "SET_TRAILERS_OFFSET";
      }
      return mutation;
    },
    offsetName() {
      let offset = "offsetTrucks";
      if (this.listType === LIST_TYPES.TRAILER) {
        offset = "offsetTrailers";
      }
      return offset;
    }
  },

  methods: {
    fetch() {
      this.$emit("fetch", this.listType);
    },
    handleSearch(value) {
      this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.SET_SEARCH}`,
        value
      );
    },

    closeToolbar() {
      this.$refs.toolbar.closeMenu();
    }
  }
};
</script>

<style lang='scss' scoped>
.VehiclesList {
  &__title {
    display: flex;
    font-size: 18px;
    font-weight: 500;
    color: #606266;
    position: absolute;
    margin-top: 5px;
    margin-left: 5px;
  }

  &__toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 35px;
  }

  &__fast-filters {
    margin-bottom: 20px;
  }
}
@media (max-width: 600px) {
  .VehiclesList {
    &__title {
      width: 108%;
      margin: -35px;
      justify-content: center;
      align-items: center;
    }

    &__toolbar {
      margin-top: 50px;
      display: block;
      margin-left: -10px;
    }
  }
}
</style>
