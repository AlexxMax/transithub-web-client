<template>
  <el-tag
    class="Tag"
    :closable="editable"
    size="medium"
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

<style lang="scss">
.Tag {
  color: #606266;
  background-color: #F8F8F8;
  border: none;
  font-size: 12px;
  font-weight: 400;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  border-radius: 50px;
  line-height: 2.4;

  .el-icon-close {
    top: 0px !important;
    transform: scale(1.1) !important;
    color: #909399;
  }

  .el-icon-close:hover {
    background-color: #909399 !important;
    color: #FFFFFF !important;
  }
}
</style>




