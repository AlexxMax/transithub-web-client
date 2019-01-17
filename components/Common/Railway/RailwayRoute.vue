<template>
  <div class="RailwayRoute">
    <div class="RailwayRoute__segment">
      <span class="RailwayRoute__segment-icon">
        <fa style="width: 15px;" icon="map-marker-alt"/>
      </span>

      <!-- STATION FROM -->
      <div class="RailwayRoute__segment-title">
        <span class="RailwayRoute__segment-title-name">
          {{ stationFromName }}
          <span class="RailwayRoute__segment-title-code">{{ stationFromCode }}</span>
        </span>
        <span class="RailwayRoute__segment-title-road">{{ stationFromRoad }}</span>
        <span
          v-if="!noTitles"
          class="RailwayRoute__segment-title-label"
        >
          {{ $t('forms.common.stationFromShort') }}
        </span>
      </div>
    </div>


    <!-- POLYGON -->

    <div v-if="polygonCode" class="RailwayRoute__segment">
      <div class="RailwayRoute__segment-arrow">{{ '\u2192' }}</div>

      <span class="RailwayRoute__segment-icon">
        <fa style="width: 15px;" icon="map-marker-alt"/>
      </span>

      <div class="RailwayRoute__segment-title">
        <span class="RailwayRoute__segment-title-name">
          {{ polygonName }}
          <span class="RailwayRoute__segment-title-code">{{ polygonCode }}</span>
        </span>
        <span class="RailwayRoute__segment-title-road">
          {{ $t('forms.common.polygon') }}
          <span class="RailwayRoute__segment-title-road-polygon">
            {{ polygonNumber }}
          </span>
        </span>
        <span
          v-if="!noTitles"
          class="RailwayRoute__segment-title-label"
        >
          {{ $t('forms.common.stationMiddleShort') }}
        </span>
      </div>
    </div>


    <!-- STATION TO -->

    <div v-if="stationToCode" class="RailwayRoute__segment">
      <div class="RailwayRoute__segment-arrow">{{ '\u2192' }}</div>

      <span class="RailwayRoute__segment-icon">
        <fa style="width: 15px;" icon="map-marker-alt"/>
      </span>

      <div class="RailwayRoute__segment-title">
        <span class="RailwayRoute__segment-title-name">
          {{ stationToName }}
          <span class="RailwayRoute__segment-title-code">{{ stationToCode }}</span>
        </span>
        <span class="RailwayRoute__segment-title-road">{{ stationToRoad }}</span>
        <span
          v-if="!noTitles"
          class="RailwayRoute__segment-title-label"
        >
          {{ $t('forms.common.stationToShort') }}
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'th-railway-route',

  props: {
    stationFromName: {
      type: String,
      required: true
    },
    stationToName: String,
    stationFromRoad: String,
    stationToRoad: String,
    stationFromCode: [ Number, String ],
    stationToCode: [ Number, String ],
    polygonName: String,
    polygonCode: [ Number, String ],
    polygonNumber: [ Number, String ],
    noTitles: Boolean
  }
}
</script>

<style lang="scss" scoped>
.RailwayRoute {
  display: flex;
  flex-direction: row;

  &__segment {
    display: flex;
    flex-direction: row;

    &-icon {
      margin-right: 10px;
      width: 15px;
    }

    &-title {
      display: flex;
      flex-direction: column;

      &-name {
        font-size: 14px;
        font-weight: 400;
        color: #000;
      }

      &-code {
        font-size: 12px;
        color: rgb(112, 112, 112);
        margin-left: 5px;
      }

      &-label {
        font-size: 11px;
        color: #909399;
        margin-top: 10px;
      }

      &-road {
        margin-top: 8px;
        font-size: 13px;
        color: #707070;

        &-polygon {
          color: #000;
        }
      }
    }

    &-arrow {
      padding: 0 15px;
    }
  }
}

@media only screen and (max-width: 991px) {
  .RailwayRoute {
    flex-direction: column;

    &__segment {
      &:not(:first-child) {
        margin-top: 25px;
      }

      &-arrow {
        display: none;
      }
    }
  }
}
</style>
