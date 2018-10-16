<template>
  <div class="Status">
    <div class="Status__point" :style="{ 'background-color': color }" />
    <span class="Status__title">
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'th-status',

  props: {
    title: {
      type: String,
      reguired: true
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.Status {
  display: flex;
  flex-direction: row;

  .Status__point {
    width: 8px;
    height: 8px;
    margin: 6.5px 8px 5px 0;
    border-radius: 50%;
  }

  .Status__title {
    font-size: 16px;
    font-weight: 400;
    text-transform: capitalize;
    line-height: 1.37;
  }
}
</style>
