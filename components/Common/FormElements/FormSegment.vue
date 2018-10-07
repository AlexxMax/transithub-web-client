<template>
  <div class="FormSegment" :style="{ 'max-height': maxHeight }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'th-form-segment',

  props: {
    minus: Number
  },

  computed: {
    maxHeight() {
      const height = 123 + this.minus
      return `calc(100vh - ${height}px)`
    }
  }
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
}
</style>
