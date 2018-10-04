<template>
  <div class="FormSegment">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'th-form-segment'
}
</script>

<style lang="scss" scoped>
.FormSegment {
  overflow-y: auto;
  max-height: calc(100vh - 145px);
  background-color: #fff;
  border-radius: 5px;
  padding: 25px 40px;
  border: 1px solid #EBEEF5;
  // border: 1px solid #fff;
}
</style>
