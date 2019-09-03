<template>
  <el-card
    class="Card"
    shadow="hover"
    :body-style="bodyStyle"
  >
    <slot/>
  </el-card>
</template>

<script>
export default {
  name: 'th-card',

  props: {
    noPadding: Boolean,
    bodyStyle: {
      type: Object,
      default: () => ({ padding: '20px' })
    }
  }
}
</script>

<style lang='scss' scoped>
.Card {
  border-radius: 10px;
}
</style>
