<template>
  <div :class="{ 'ItemsWrapperFullHeight': true, 'ItemsWrapperFullHeight__no-header': noHeader, 'ItemsWrapperFullHeight__with-tabs': withTabs }">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'th-list-items-wrapper-full-height',

  props: {
    noHeader: Boolean,
    withTabs: Boolean
  }
}
</script>

<style lang="scss" scoped>
.ItemsWrapperFullHeight {
  overflow-y: auto;
}
</style>