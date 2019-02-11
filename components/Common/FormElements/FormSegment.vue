<template>
  <div class="FormSegment">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'th-form-segment',
}
</script>

<style lang="scss" scoped>
.FormSegment {
  background-color: #fff;
  padding: 25px 40px;
}
</style>
