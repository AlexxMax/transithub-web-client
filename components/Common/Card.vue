<template>
  <el-card class="Card" shadow="hover">
    <slot/>
  </el-card>
</template>

<script>
export default {
  name: 'th-card'
}
</script>

<style lang='scss' scoped>
.Card {
  border-radius: 10px;
}
</style>
