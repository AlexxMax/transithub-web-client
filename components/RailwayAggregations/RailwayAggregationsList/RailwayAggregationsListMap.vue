<template>
  <div class="RailwayAggregationsListMap">
    <div class="RailwayAggregationsListMap__legend">
      <div class="RailwayAggregationsListMap__legend-title">{{ $t('forms.common.mapLegend') }}</div>
      <div>
        <GoogleMapLegendMarker
          :title="$t('forms.common.mapPointCount')"
        />
        <GoogleMapLegendMarker
          :border-color="colors.COLOR_REFERENCE_POINT"
          :title="$t('forms.common.mapPointReference')"
        />
        <GoogleMapLegendMarker
          :border-color="colors.COLOR_ROUTE_POINT"
          :title="$t('forms.common.mapPointRoute')"
        />
        <GoogleMapLegendMarker
          :border-color="colors.COLOR_POINT"
          :title="$t('forms.common.mapPointBlank')"
        />
      </div>

      <div class="RailwayAggregationsListMap__legend-filters">
        <div class="RailwayAggregationsListMap__legend-filters-title">{{ $t('forms.common.option') }}</div>
        <el-checkbox class="RailwayAggregationsListMap__legend-filters-filter" border v-model="showLines">
          {{ $t('forms.common.mapLegendShowLines') }}
        </el-checkbox>
      </div>
    </div>

    <GoogleMap v-loading="loading" center-on-ukraine>
      <template v-slot:default="{ google, map }">
        <div>
          <GoogleMapMarker
            v-for="marker of markers"
            :key="marker.id"
            :google="google"
            :map="map"
            :marker="marker"
            :type="marker.type"
            :info="generateContent(marker)"
          />
        </div>

        <div>
          <GoogleMapLine
            v-for="line of lines"
            :key="line.id"
            :google="google"
            :map="map"
            :path="line.path"
          />
        </div>
      </template>
    </GoogleMap>

    <RailwayAggregationFasView
      :guid="currentRailwayAggregationGuid"
      :visible="Boolean(currentRailwayAggregationGuid)"
      @close="handleFastViewClick"
    />
  </div>
</template>

<script>
import GoogleMap from "@/components/Common/GoogleMap/GoogleMap";
import GoogleMapMarker from "@/components/Common/GoogleMap/GoogleMapMarker";
import GoogleMapLine from "@/components/Common/GoogleMap/GoogleMapLine";
import RailwayAggregationFasView from "@/components/RailwayAggregations/FastView";
import GoogleMapLegendMarker from "@/components/Common/GoogleMap/GoogleMapLegend/GoogleMapLegendMarker";

import googleMapsMethods from "@/utils/google/maps/methods";
import { MARKER_TYPE } from "@/utils/google/maps/constants";
import colors from "@/utils/google/maps/colors";

export default {
  name: "th-railway-aggregations-list-map",

  components: {
    GoogleMap,
    GoogleMapMarker,
    GoogleMapLine,
    RailwayAggregationFasView,
    GoogleMapLegendMarker,
  },

  data: () => ({
    colors,
    showLines: true
  }),

  computed: {
    markers() {
      return this.$store.getters["railwayAggregationsMap/getMarkers"]
    },
    lines() {
      return this.showLines && this.$store.getters["railwayAggregationsMap/getMapLines"]
    },
    loading() {
      return this.$store.state.railwayAggregationsMap.mapData.loading;
    },
    currentRailwayAggregationGuid: {
      get() {
        return this.$store.state.railwayAggregationsMap.mapData
          .railwayAggregationGuidToOpen;
      },
      set(value) {
        this.$store.commit(
          "railwayAggregationsMap/SET_RAILWAY_AGGREGATION_ID_TO_OPEN",
          value
        );
      }
    }
  },

  methods: {
    generateContent(marker) {
      if (marker.type === MARKER_TYPE.working) {
        return googleMapsMethods.generateStationContent(marker.data, this);
      } else if (marker.type === MARKER_TYPE.reference) {
        return googleMapsMethods.generateReferenceStationContent(
          marker.data,
          this
        );
      } else if (marker.type === MARKER_TYPE.route) {
        return googleMapsMethods.generateRouteStationContent(marker.data, this);
      } else if (marker.type === MARKER_TYPE.blank) {
        return googleMapsMethods.generateBlankStationContent(marker.data);
      }
      return "";
    },
    handleFastViewClick() {
      this.currentRailwayAggregationGuid = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.RailwayAggregationsListMap {
  display: flex;
  flex-direction: row;

  &__legend {
    margin-right: 20px;

    &-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 15px;
    }

    &-filters {
      margin: {
        top: 50px;
        left: 5px;
      }

      &-title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 15px;
      }

      &-filter {
        width: 100%;
      }
    }
  }
}

@media (max-width: 991px) {
  .RailwayAggregationsListMap {
    display: flex;
    flex-direction: column-reverse;

    &__legend {
      margin-top: 20px;
      margin-right: 0;
    }
  }
}
</style>
