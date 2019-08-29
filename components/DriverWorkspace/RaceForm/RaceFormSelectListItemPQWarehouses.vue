<template>
  <div class="RaceFormSelectListItemPQWarehouse">
    <div class="RaceFormSelectListItemPQWarehouse__name">{{ item.name }}</div>
    <div class="RaceFormSelectListItemPQWarehouse__address">{{ item.address }}</div>
    <div class="RaceFormSelectListItemPQWarehouse__organisation">{{ item.organisationName }}</div>
  </div>
</template>

<script>
export default {
  name: 'th-driver-workspace-race-form-select-list-item-warehouses',

  props: {
    item: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang='scss' scoped>
$element-pading: 7px;

.RaceFormSelectListItemPQWarehouse {
  padding: $--driver-workspace-padding 0;
  border-bottom: $--driver-workspace-border;

  &__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    margin-bottom: $element-pading;
  }

  &__address {
    color: $--secondary-text-color;
    font-size: 13px;
    margin: $element-pading 0px;
  }

  &__organisation {
    color: $--secondary-text-color;
    font-size: 12px;
    margin-top: $element-pading;
  }
}
</style>
