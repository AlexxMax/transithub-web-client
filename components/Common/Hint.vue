<template>
  <el-popover
    placement="top"
    :title="title"
    width="400"
    trigger="hover"
    :content="text">

    <div class="th-label-info" slot="reference">
      <i class="fas fa-info-circle th-label-info-icon"></i>
      <span class="th-label-info-text">{{ $t('forms.common.hint') }}</span>
    </div>

  </el-popover>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.th-label-info {
  height: 25px;
  display: flex;
  flex-direction: row;
  color: #909399;
  width: 100px;

  .th-label-info-icon {
    font-size: 20px;
    padding: 2.5px 5px 2.5px 0;
  }

  .th-label-info-text {
    font-size: 12px;
  }
}
</style>
