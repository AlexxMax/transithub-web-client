<template>
  <span class="BackButton" @click="$router.go(-1)">
    <fa icon="long-arrow-alt-left" />
  </span>
</template>

<script>
export default {
  name: 'th-back-button'
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
