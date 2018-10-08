<template>
  <div class="FormGroup">
    <span v-if="title" class="FormGroup__title">{{ title }}</span>
    <div class="FormGroup__body">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-form-group',

  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.FormGroup {
  margin-top: 20px;

  .FormGroup__title {
    font-size: 16px;
    font-weight: 400;
  }

  .FormGroup__body {
    margin-top: 10px;
  }
}
</style>
