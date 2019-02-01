<template>
  <el-tag 
    class="Tag"
    :closable="editable"
    size="medium"
    color="#F8F8F8"
    @close="$emit('close')"
  >
  {{ value }}
  </el-tag>
</template>

<script>
export default {
  name: 'th-tag',

  props: {
    value: String,
    editable: Boolean
  }
}
</script>

<style lang="scss" scoped>
.Tag {
  color: #606266;
  border-color: darken(#F8F8F8, 10%);
}
</style>




