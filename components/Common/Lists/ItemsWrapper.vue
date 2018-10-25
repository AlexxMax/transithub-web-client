<template>
  <div :class="{ 'ItemsWrapper': true, 'ItemsWrapper__no-header': noHeader }">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'th-list-items-wrapper',

  props: {
    noHeader: Boolean
  }
}
</script>

<style lang="scss" scoped>
.ItemsWrapper {
  overflow-y: auto;
  height: calc(100vh - 213px);

  &.ItemsWrapper__no-header{
    height: calc(100vh - 188px);
  }
}

@media only screen and (max-width: 990px) {
  .ItemsWrapper {
    overflow-y: auto;
    height: calc(100vh - 189px);

    &.ItemsWrapper__no-header{
      height: calc(100vh - 188px);
    }
  }
}
</style>
