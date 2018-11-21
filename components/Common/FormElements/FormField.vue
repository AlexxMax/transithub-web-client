<template>
  <div class="FormField">
    <span v-if="title" class="FormField__title">{{ title }}</span>
    <span v-if="value" class="FormField__value">{{ value }}</span>
    <span class="FormField__slot">
      <slot/>
    </span>
  </div>
</template>

<script>
export default {
  name: 'th-form-field',

  props: {
    title: [ String, Number ],
    value: [ String, Number ]
  }
}
</script>

<style lang="scss" scoped>
.FormField {
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  .FormField__title {
    line-height: 28px;
    text-align: left;
    box-sizing: border-box;
    color: #606266;
  }

  .FormField__value {
    color: #000;
    line-height: 28px;
  }

  .FormField__slot {
    margin-top: 10px;
  }
}
</style>
