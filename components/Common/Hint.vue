<template>
  <el-popover
    placement="top"
    :title="title"
    width="400"
    trigger="hover"
    :content="text">

    <div class="th-label-info" slot="reference">
      <fa icon="info-circle" class="th-label-info-icon" />
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
  // height: 25px;
  // display: flex;
  // flex-direction: row;
  color: #909399;

  .th-label-info-icon {
    font-size: 16px;
    // padding: 2.5px 5px 2.5px 0;
  }
}
</style>
