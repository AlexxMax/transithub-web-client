<template>
  <div class="SubordinateListToolbar">
    <span class="SubordinateListToolbar__title">
      {{ title }}
    </span>

    <div class="SubordinateListToolbar__right">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-subordinate-list-toolbar',

  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.SubordinateListToolbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .SubordinateListToolbar__title {
    font-size: 16px;
    font-weight: 500;
    line-height: 32px;
  }

  .SubordinateListToolbar__right {

  }
}
</style>
