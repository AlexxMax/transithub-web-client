<template>
  <div class="RailwayStation">
    <span class="RailwayStation__icon">
      <fa style="width: 15px;" icon="map-marker-alt"/>
    </span>

    <div class="RailwayStation__title">
      <span class="RailwatStation__title-name">
        {{ name }}
        <span class="RailwatStation__title-code">{{ rwCode }}</span>
      </span>
      <span class="RailwatStation__title-road">{{ road }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-railway-station',

  props: {
    name: {
      type: String,
      required: true
    },
    road: String,
    rwCode: [ Number, String ]
  }
}
</script>

<style lang="scss" scoped>
.RailwayStation {
  display: flex;
  flex-direction: row;

  .RailwayStation__icon {
    margin-right: 10px;
    width: 15px;
  }

  .RailwayStation__title {
    display: flex;
    flex-direction: column;

    .RailwatStation__title-name {
      font-size: 14px;
      font-weight: 400;
      color: #000;

      .RailwatStation__title-code {
        font-size: 12px;
        color: rgb(112, 112, 112);
        margin-left: 5px;
      }
    }

    .RailwatStation__title-road {
      margin-top: 5px;
      font-size: 13px;
      color: rgb(112, 112, 112);
    }
  }
}
</style>
