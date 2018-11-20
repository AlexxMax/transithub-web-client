<template>
  <div class="RailwayRoute">
    <span class="RailwayRoute__icon">
      <fa style="width: 15px;" icon="map-marker-alt"/>
    </span>

    <div class="RailwayRoute__title">
      <span class="RailwayRoute__title-name">
        {{ stationFromName }}
        <span class="RailwayRoute__title-code">{{ stationFromCode }}</span>
      </span>
      <span class="RailwayRoute__title-road">{{ stationFromRoad }}</span>
    </div>

    <div class="RailwayRoute__arrow">{{ '\u2192' }}</div>

    <div class="RailwayRoute__title">
      <span class="RailwayRoute__title-name">
        {{ stationToName }}
        <span class="RailwayRoute__title-code">{{ stationToCode }}</span>
      </span>
      <span class="RailwayRoute__title-road">{{ stationToRoad }}</span>
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
    stationToName: {
      type: String,
      required: true
    },
    stationFromRoad: String,
    stationToRoad: String,
    stationFromCode: [ Number, String ],
    stationToCode: [ Number, String ]
  }
}
</script>

<style lang="scss" scoped>
.RailwayRoute {
  display: flex;
  flex-direction: row;

  .RailwayRoute__icon {
    margin-right: 10px;
    width: 15px;
  }

  .RailwayRoute__title {
    display: flex;
    flex-direction: column;

    .RailwayRoute__title-name {
      font-size: 14px;
      font-weight: 400;
      color: #000;

      .RailwayRoute__title-code {
        font-size: 12px;
        color: rgb(112, 112, 112);
        margin-left: 5px;
      }
    }

    .RailwayRoute__title-road {
      margin-top: 5px;
      font-size: 13px;
      color: rgb(112, 112, 112);
    }
  }

  .RailwayRoute__arrow {
    padding: 0 10px;
  }
}
</style>
