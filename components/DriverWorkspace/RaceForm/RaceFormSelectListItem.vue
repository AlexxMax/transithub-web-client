<template>
  <div class="RaceFormSelectListItem">
    <span class="RaceFormSelectListItem__title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'th-driver-workspace-race-form-select-list-item',

  props: {
    title: {
      type: String,
      required: true,
    },
  }
}
</script>

<style lang='scss' scoped>
.RaceFormSelectListItem {
  padding: $--driver-workspace-padding 0;
  border-bottom: $--driver-workspace-border;

  &__title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
  }
}
</style>
