<template>
  <div
    :class="{ 'ItemsWrapper': true, 'ItemsWrapper__no-header': noHeader, 'ItemsWrapper__with-tabs': withTabs }"
    :style="{ 'max-width': width }"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'th-list-items-wrapper',

  props: {
    noHeader: Boolean,
    withTabs: Boolean,
    width: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style lang="scss" scoped>
.ItemsWrapper {
  margin: auto;
  // overflow-y: auto;
  // height: calc(100vh - 277px);

  &.ItemsWrapper__no-header{
    // height: calc(100vh - 252px);
  }

  &.ItemsWrapper__with-tabs {
    // height: calc(100vh - 302px);
  }
}

@media only screen and (max-width: 990px) {
  .ItemsWrapper {
    // overflow-y: auto;
    // height: calc(100vh - 253px);

    &.ItemsWrapper__no-header{
      // height: calc(100vh - 252px);
    }

    &.ItemsWrapper__with-tabs {
      // height: calc(100vh - 302px);
    }
  }
}
</style>
