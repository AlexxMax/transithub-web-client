<template>
  <div class="PointPresentation__item">
    <span class="PointPresentation__item-locality-type">{{ point.type }}
      <span class="PointPresentation__item-locality-name">{{ point.name }}</span>
    </span>
    <span class="PointPresentation__item-district">{{ point.districtName }}</span>
    <span class="PointPresentation__item-region">{{ point.regionName }}</span>
    <span class="PointPresentation__item-country">{{ point.countryName }}</span>
  </div>
</template>

<script>
export default {
  name: 'th-point-presentation',

  props: {
    point: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.PointPresentation__item {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  color:#7e7e7f;

  span{
    margin-bottom: 35px;
  }

  .PointPresentation__item-locality-type {
    font-size: 20px;
    color: #b7b7b7;
  }

  .PointPresentation__item-locality-name {
    font-size: 28px;
    font-weight: bold;
    color:#7e7e7f !important;
  }

  .PointPresentation__item-district {
    font-size: 23px;
  }

  .PointPresentation__item-region {
    font-size: 20px;
  }

    .PointPresentation__item-country {
    font-size: 16px;
  }
}
</style>

