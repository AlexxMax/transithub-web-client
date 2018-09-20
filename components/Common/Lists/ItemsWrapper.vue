<template>
  <div class="ItemsWrapper">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'th-list-items-wrapper'
}
</script>

<style lang="scss" scoped>
.ItemsWrapper {
  overflow-y: auto;
  height: calc(100vh - 213px);
}

@media only screen and (max-width: 990px) {
  .ItemsWrapper {
    overflow-y: auto;
    height: calc(100vh - 189px);
  }
}
</style>
