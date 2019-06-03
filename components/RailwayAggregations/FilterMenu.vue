<template>
  <FiltersMenu
    ref="filters-menu"
    v-bind="$attrs"
    use-save-filters
    :filterSet="filterSet"
    :saved-filters-loading="loadingSavedFilters"
    :saved-filters-items="savedFilters"
    :loaders="savedFiltersLoaders"
    @clear-filters="clearFilters"
    @save-filters="saveFilters"
    @set-filters="setFilters"
    @remove-filters="removeFilters"
    @change-subscription="changeSubscription"
    @open="handleOpenFiltersMenu"
    @close="$emit('close')"
  >
    <el-form ref="form" label-width="120px" label-position="top" size="mini" @submit.native.prevent>
      <el-form-item v-loading="loadingStatuses" :label="$t('forms.common.status')">
        <el-checkbox-group v-model="filterStatuses" class="RailwayAggregationsStatuses">
          <el-checkbox
            v-for="item in select.statuses"
            :key="item.guid"
            :label="item.guid"
          >{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item :label="$t('lists.filters.period')">
        <el-date-picker
          style="width: 100%"
          v-model="filterPeriod"
          type="daterange"
          format="dd.MM.yyyy"
          :range-separator="$t('lists.filters.periodTo')"
          :start-placeholder="$t('lists.filters.periodStart')"
          :end-placeholder="$t('lists.filters.periodEnd')"
          :picker-options="pickerOptions"
        />
      </el-form-item>

      <el-form-item v-loading="loadingGoods" :label="$t('lists.filters.goods')">
        <el-select
          style="width: 100%"
          v-model="filterGoods"
          multiple
          filterable
          placeholder="Select"
        >
          <el-option
            v-for="item in select.goods"
            :key="item.guid"
            :label="item.name"
            :value="item.guid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-loading="loadingRailwayAffilations"
        :label="$t('forms.railwayAggregator.wagonsType')"
      >
        <el-select
          style="width: 100%"
          v-model="filterRailwayAffilations"
          multiple
          filterable
          placeholder="Select"
        >
          <el-option
            v-for="item in select.railwayAffilations"
            :key="item.guid"
            :label="item.name"
            :value="item.guid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-loading="loadingRailwayStationsRoads"
        :label="$t('forms.common.railwayStationRoadFrom')"
      >
        <el-select
          style="width: 100%"
          v-model="filterRailwayStationsRoadsFrom"
          multiple
          filterable
          placeholder="Select"
        >
          <el-option
            v-for="item in select.railwayStationsRoads"
            :key="item.guid"
            :label="item.name"
            :value="item.guid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('forms.common.stationFrom')">
        <el-select
          ref="filter-railway-stations-from"
          style="width: 100%"
          v-model="filterRailwayStationsFrom"
          multiple
          :multiple-limit="10"
          filterable
          remote
          reserve-keyword
          :remote-method="handleRailwayStationFromFiltered"
          placeholder="Select"
          :loading="loadingStationsFrom"
        >
          <el-option-group
            v-for="group in railwayStationsFromOptions"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.children"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
              <RailwayStation :name="item.name" :road="item.road" :rw-code="item.rwCode" no-icon/>
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item v-loading="loadingReferenceStations" :label="$t('forms.common.stationMiddle')">
        <el-select
          style="width: 100%"
          v-model="filterRailwayReferenceStations"
          filterable
          clearable
          placeholder="Select"
        >
          <el-option
            v-for="item in select.railwayReferenceStations"
            :key="item.guid"
            :label="item.name"
            :value="item.rwCode"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-loading="loadingPolygons" :label="$t('forms.common.polygon')">
        <el-select
          style="width: 100%"
          v-model="filterPolygonNumbers"
          multiple
          filterable
          placeholder="Select"
        >
          <el-option
            v-for="item in select.polygonNumbers"
            :key="item.guid"
            :label="item.name"
            :value="item.guid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('forms.common.stationTo')">
        <el-select
          style="width: 100%"
          v-model="filterRailwayStationsTo"
          multiple
          :multiple-limit="10"
          filterable
          remote
          reserve-keyword
          :remote-method="handleRailwayStationToFiltered"
          :loading="loadingStationsTo"
          placeholder="Select"
        >
          <el-option-group
            v-for="group in railwayStationsToOptions"
            :key="group.id"
            :label="group.label"
          >
            <el-option
              v-for="item in group.children"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
              <RailwayStation :name="item.name" :road="item.road" :rw-code="item.rwCode" no-icon/>
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

      <!-- <el-form-item
        v-loading="loadingRailwayStationsRoads"
        :label="$t('forms.common.railwayStationRoadTo')" >
        <el-select
          style="width: 100%"
          v-model="filters.railwayStationsRoadsTo"
          multiple
          filterable
          placeholder="Select"
          @change="value => { setFilter('railwayStationsRoadsTo', value) }">
          <el-option
            v-for="item in select.railwayStationsRoads"
            :key="item.guid"
            :label="item.name"
            :value="item.guid">
          </el-option>
        </el-select>
      </el-form-item>-->

      <!-- <el-form-item v-loading="loadingCompanies" :label="$t('forms.common.company')">
        <el-select
          style="width: 100%"
          v-model="filterCompanies"
          multiple
          filterable
          placeholder="Select"
        >
          <el-option
            v-for="item in select.companies"
            :key="item.guid"
            :label="item.name"
            :value="item.guid"
          ></el-option>
        </el-select>
      </el-form-item>-->

      <!-- <el-checkbox v-model="filterAuthor">
        {{ $t('forms.common.onlyMine') }}
      </el-checkbox>-->
    </el-form>
  </FiltersMenu>
</template>

<script>
import FiltersMenu from "@/components/Common/Lists/FiltersMenu";
import RailwayStation from "@/components/Common/Railway/RailwayStation";

import { generateStationsByRoadsTree } from "@/utils/railway-stations";
import {
  setFilter,
  getOppositeStatusId,
  STATUSES_IDS
} from "@/utils/railway-aggregations";
import { DatePeriod } from "@/utils/datetime";
import {
  generateFilterValue,
  generateStationFilterValue,
  getFilterValue
} from "@/utils/filters";
// import EventBus from "@/utils/eventBus"

const filters = Object.freeze({
  goods: [],
  railwayAffilations: [],
  railwayStationsFrom: [],
  railwayStationsTo: [],
  statuses: [STATUSES_IDS.actual],
  checkedAuthor: false,
  companies: [],
  railwayStationsRoadsFrom: [],
  railwayReferenceStations: [],
  polygonNumbers: [],
  railwayStationsRoadsTo: []
});

export default {
  name: "th-railway-aggregations-filter-menu",

  components: {
    FiltersMenu,
    RailwayStation
  },

  data() {
    return {
      // filters: { ...filters },

      pickerOptions: {
        firstDayOfWeek: 1
      },

      railwayStationsFromOptions: [],
      railwayStationsToOptions: [],

      loadingStationsFrom: false,
      loadingStationsTo: false
    };
  },

  computed: {
    filterStatuses: {
      get() {
        return this.$store.state.railwayAggregations.filters.set.statuses;
      },
      set(value) {
        this.setFilter("statuses", value);
      }
    },
    filterPeriod: {
      get() {
        const {
          periodFrom,
          periodTo
        } = this.$store.state.railwayAggregations.filters.set;
        return new DatePeriod(periodFrom, periodTo).period;
      },
      set(value) {
        this.setFilter("period", value);
      }
    },
    filterGoods: {
      get() {
        return getFilterValue(
          this.$store.state.railwayAggregations.filters.set.goods
        );
      },
      set(value) {
        this.setFilter("goods", generateFilterValue(value, this.select.goods));
      }
    },
    filterRailwayAffilations: {
      get() {
        return getFilterValue(
          this.$store.state.railwayAggregations.filters.set.railwayAffilations
        );
      },
      set(value) {
        this.setFilter(
          "railwayAffilations",
          generateFilterValue(value, this.select.railwayAffilations)
        );
      }
    },
    filterRailwayStationsFrom: {
      get() {
        return getFilterValue(
          this.$store.state.railwayAggregations.filters.set.railwayStationsFrom
        );
      },
      async set(value) {
        this.setFilter(
          "railwayStationsFrom",
          generateStationFilterValue(
            value,
            await this.getStationsTree(null, value)
          )
        );
      }
    },
    filterRailwayStationsRoadsFrom: {
      get() {
        return getFilterValue(
          this.$store.state.railwayAggregations.filters.set
            .railwayStationsRoadsFrom
        );
      },
      set(value) {
        this.setFilter(
          "railwayStationsRoadsFrom",
          generateFilterValue(value, this.select.railwayStationsRoads)
        );
      }
    },
    filterRailwayReferenceStations: {
      get() {
        return getFilterValue(
          this.$store.state.railwayAggregations.filters.set
            .railwayReferenceStations
        )[0];
      },
      set(value) {
        this.setFilter(
          "railwayReferenceStations",
          generateFilterValue(
            [value],
            this.select.railwayReferenceStations,
            "rwCode"
          )
        );
      }
    },
    filterPolygonNumbers: {
      get() {
        return getFilterValue(
          this.$store.state.railwayAggregations.filters.set.polygonNumbers
        );
      },
      set(value) {
        this.setFilter(
          "polygonNumbers",
          generateFilterValue(value, this.select.polygonNumbers)
        );
      }
    },
    filterRailwayStationsTo: {
      get() {
        return getFilterValue(
          this.$store.state.railwayAggregations.filters.set.railwayStationsTo
        );
      },
      async set(value) {
        this.setFilter(
          "railwayStationsTo",
          generateStationFilterValue(
            value,
            await this.getStationsTree(null, value)
          )
        );
      }
    },
    filterCompanies: {
      get() {
        return getFilterValue(
          this.$store.state.railwayAggregations.filters.set.companies
        );
      },
      set(value) {
        this.setFilter(
          "companies",
          generateFilterValue(value, this.select.companies)
        );
      }
    },
    // filterAuthor: {
    //   get() {
    //     return this.$store.state.railwayAggregations.filters.set.author ? true : false
    //   },
    //   set(value) {
    //     this.setFilter('author', value)
    //   }
    // },
    filterSet() {
      return this.$store.getters["railwayAggregations/listFiltersSet"];
    },
    select() {
      const select = {
        goods: this.$store.state.goods.list,
        railwayAffilations: this.$store.state.railwayAffilations.list,
        statuses: this.$store.state.railwayStatuses.list,
        companies: this.$store.state.railwayAggregations.filters.data.companies
          .items,
        railwayStationsRoads: this.$store.state.railwayStations.roads,
        railwayReferenceStations: this.$store.state.railwayStations
          .referenceStations,
        polygonNumbers: this.$store.getters[
          "railwayPolygons/getStationsPolygons"
        ]([this.filterRailwayReferenceStations])
      };

      return select;
    },
    loadingGoods() {
      return this.$store.state.goods.loading;
    },
    loadingRailwayAffilations() {
      return this.$store.state.railwayAffilations.loading;
    },
    loadingStatuses() {
      return this.$store.state.railwayStatuses.loading;
    },
    loadingCompanies() {
      return this.$store.state.railwayAggregations.filters.data.companies
        .loading;
    },
    loadingRailwayStationsRoads() {
      return this.$store.state.railwayStations.roadsLoading;
    },
    loadingReferenceStations() {
      return this.$store.state.railwayStations.referenceStationsLoading;
    },
    loadingPolygons() {
      return this.$store.state.railwayPolygons.loading;
    },
    loadingSavedFilters: {
      get() {
        return this.$store.state.railwayAggregations.filters.saved.loading;
      },
      set(value) {
        this.$store.commit(
          "railwayAggregations/SET_FILTERS_SAVED_LOADING",
          value
        );
      }
    },
    savedFilters() {
      return this.$store.state.railwayAggregations.filters.saved.list;
    },
    savedFiltersLoaders() {
      return this.$store.state.railwayAggregations.filters.saved.loaders;
    }
  },

  methods: {
    setFilter(key, value) {
      setFilter(this, key, value);

      // Sync between filters. We have filters menus in tollbar
      // and in tollbar menu, and they are using v-model (Element.IO),
      // so we need to sync them by event bus
      // EventBus.$emit('railway-aggregations-filters', { key, value })
    },
    clearFilters() {
      this.$store.dispatch("railwayAggregations/clearFilters");
    },
    async saveFilters() {
      this.loadingSavedFilters = true;
      this.$store.dispatch(
        "railwayAggregations/createNewSavedFilters",
        await this.generateFiltersLabels()
      );
    },
    setFilters(filters) {
      this.$store.dispatch("railwayAggregations/setFilters", filters);
      this.getStationsTree(null, filters.railwayStationsFrom);
      this.getStationsTree(null, filters.railwayStationsTo);
    },
    removeFilters(guid) {
      this.$store.dispatch("railwayAggregations/removeSavedFilters", guid);
    },
    async generateFiltersLabels() {
      const getFilterNames = (filter, collection, key = "guid") => {
        return collection
          .filter(element => filter.some(item => item === element[key]))
          .map(item => item.name);
      };

      const getStationsNames = async filter => {
        const collection = await this.getStationsTree(null, filter);
        let stations = [];
        collection.forEach(group => {
          stations = [
            ...stations,
            ...group.children
              .filter(element => filter.some(item => item === element.id))
              .map(item => item.name)
          ];
        });
        return stations;
      };

      let labels = [];

      // Statuses
      labels = [
        ...labels,
        ...getFilterNames(this.filterStatuses, this.select.statuses)
      ];

      // Period
      if (Array.isArray(this.filterPeriod) && this.filterPeriod.length > 0) {
        labels = [
          ...labels,
          `${this.filterPeriod[0].pFormatDate()} - ${this.filterPeriod[1].pFormatDate()}`
        ];
      }

      // Goods
      labels = [
        ...labels,
        ...getFilterNames(this.filterGoods, this.select.goods)
      ];

      // Railway Affilations
      labels = [
        ...labels,
        ...getFilterNames(
          this.filterRailwayAffilations,
          this.select.railwayAffilations
        )
      ];

      // Railway Roads
      labels = [
        ...labels,
        ...getFilterNames(
          this.filterRailwayStationsRoadsFrom,
          this.select.railwayStationsRoads
        )
      ];

      // Railway Stations
      const [stationsFrom, stationsTo] = await Promise.all([
        getStationsNames(
          this.filterRailwayStationsFrom,
          this.railwayStationsFromOptions
        ),
        getStationsNames(
          this.filterRailwayStationsTo,
          this.railwayStationsToOptions
        )
      ]);
      // Railway Stations From
      labels = [...labels, ...stationsFrom];

      // Railway Stations Middle
      labels = [
        ...labels,
        ...getFilterNames(
          [this.filterRailwayReferenceStations],
          this.select.railwayReferenceStations,
          "rwCode"
        )
      ];

      // Railway Polygons
      labels = [
        ...labels,
        ...getFilterNames(this.filterPolygonNumbers, this.select.polygonNumbers)
      ];

      // Railway Stations To
      labels = [...labels, ...stationsTo];

      // Companies
      labels = [
        ...labels,
        ...getFilterNames(this.filterCompanies, this.select.companies)
      ];

      return labels;
    },
    handleOpenFiltersMenu() {
      // Cached Stations
      const loadCachedStations = async (
        filterKey,
        filterOptionsKey,
        loadingFilterKey
      ) => {
        this[loadingFilterKey] = true;
        const rwCodes =
          getFilterValue(
            this.$store.state.railwayAggregations.filters.set[filterKey]
          ) || [];
        if (rwCodes.length > 0) {
          this[filterOptionsKey] = await this.getStationsTree(null, rwCodes);
        }
        this[loadingFilterKey] = false;
      };

      Promise.all([
        loadCachedStations(
          "railwayStationsFrom",
          "railwayStationsFromOptions",
          "loadingStationsFrom"
        ),
        loadCachedStations(
          "railwayStationsTo",
          "railwayStationsToOptions",
          "loadingStationsTo"
        )
      ]);

      // // Goods
      // if (!this.$store.state.goods.fetched && !this.loadingGoods) {
      //   this.$store.dispatch('goods/load')
      // }

      // // Wagons Types
      // if (!this.$store.state.railwayAffilations.fetched && !this.loadingRailwayAffilations) {
      //   this.$store.dispatch('railwayAffilations/loadList')
      // }

      // // Statuses
      // if (!this.$store.state.railwayStatuses.fetched && !this.loadingStatuses) {
      //   this.$store.dispatch('railwayStatuses/loadList')
      // }

      // // Companies
      // if (!this.$store.state.railwayAggregations.filters.data.companies.fetched && !this.loadingCompanies) {
      //   this.$store.dispatch('railwayAggregations/loadCompanies')
      // }

      // // Railway Stations Roads
      // if (!this.$store.state.railwayStations.roadsFetched && !this.loadingRailwayStationsRoads) {
      //   this.$store.dispatch('railwayStations/loadRoads')
      // }

      // // Railway Reference Stations
      // if (!this.$store.state.railwayStations.referenceStationsFetched && !this.loadingReferenceStations) {
      //   this.$store.dispatch('railwayStations/loadReferenceStations')
      // }

      // // Railway Polygons
      // if (!this.$store.state.railwayPolygons.fetched && !this.loadingPolygons) {
      //   this.$store.dispatch('railwayPolygons/loadList')
      // }

      // // Saved Filters
      // if (!this.$store.state.railwayAggregations.filters.saved.fetched && !this.loadingSavedFilters) {
      //   this.$store.dispatch('railwayAggregations/loadSavedFilters')
      // }
    },
    async getStationsTree(query, rwCodes = []) {
      const { status, items } = await this.$api.railway.getRailwayStations(
        null,
        query,
        rwCodes
      );
      if (status) {
        return generateStationsByRoadsTree(items);
      }
      return [];
    },
    async handleRailwayStationFromFiltered(query) {
      this.railwayStationsFromOptions = [];
      if (query !== "" && query.length >= 3) {
        this.loadingStationsFrom = true;
        this.railwayStationsFromOptions = await this.getStationsTree(query);
        // EventBus.$emit('railway-aggregations-options', {
        //   key: 'railwayStationsFromOptions',
        //   value: this.railwayStationsFromOptions
        // })
        this.loadingStationsFrom = false;
      }
    },
    async handleRailwayStationToFiltered(query) {
      this.railwayStationsToOptions = [];
      if (query !== "" && query.length >= 3) {
        this.loadingStationsTo = true;
        this.railwayStationsToOptions = await this.getStationsTree(query);
        // EventBus.$emit('railway-aggregations-options', {
        //   key: 'railwayStationsToOptions',
        //   value: this.railwayStationsToOptions
        // })
        this.loadingStationsTo = false;
      }
    },
    async changeSubscription(guid, sendNotifications) {
      await this.$store.dispatch(
        "railwayAggregations/changeFilterSubscription",
        { guid, sendNotifications }
      );
    }
  },

  created() {
    // Sync between filters. We have filters menus in tollbar
    // and in tollbar menu, and they are using v-model (Element.IO),
    // so we need to sync them by event bus
    // EventBus.$on('railway-aggregations-filters', ({ key, value }) => {
    //   this.filters[key] = value
    // })
    // EventBus.$on('railway-aggregations-options', ({ key, value }) => {
    //   this[key] = value
    // })
    // EventBus.$on('workspace-changed', () => {
    //   this.filters = { ...filters }
    //   this.$store.commit('railwayAggregations/CLEAR_FILTERS')
    // })
  }
};
</script>

<style lang="scss" scoped>
.RailwayAggregationsStatuses {
  display: flex;
  flex-direction: column;
}
</style>

