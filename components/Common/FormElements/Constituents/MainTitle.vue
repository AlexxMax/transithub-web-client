<template>
  <span class="FormMainTitle">
    {{ title }}
  </span>
</template>

<script>
export default {
  name: 'th-form-main-title',

  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.FormMainTitle {
  font-size: 16px;
  font-weight: 500;
}
</style>
