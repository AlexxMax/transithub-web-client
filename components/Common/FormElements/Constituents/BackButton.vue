<template>
  <el-tooltip
    effect="dark"
    :content="tooltip"
    placement="bottom">
    <span class="BackButton" @click="$router.push(to)">
      <fa icon="long-arrow-alt-left" />
    </span>
  </el-tooltip>
</template>

<script>
export default {
  name: 'th-back-button',

  props: {
    tooltip: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.BackButton {
  margin-right: 10px;
  padding: 3px 5px;

  &:hover {
    background-color: #f8f8f8;
    border-radius: 20px;
  }
}
</style>
