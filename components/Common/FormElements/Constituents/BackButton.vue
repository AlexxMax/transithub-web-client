<template>
  <span class="BackButton" @click="$router.go(-1)">
    <fa icon="long-arrow-alt-left" />
    <span v-if="text">{{ text }}</span>
  </span>
</template>

<script>
export default {
  name: 'th-back-button',

  props: {
    text: String
  }
}
</script>

<style lang="scss" scoped>
.BackButton {
  margin-right: 10px;
  padding: 3px 5px;
  color: #FECD34;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
    border-radius: 20px;
  }

  span {
    padding-left: 10px;
    color: #606266;
  }
}
</style>
