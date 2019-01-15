<template>
  <span class="FormFieldCounter">
    {{ title }}
    <span class="FormFieldCounter__counter">{{ value }}</span>
  </span>
</template>

<script>
export default {
  name: 'FormFieldCounter',

  props: {
    title: [ Number, String ],
    value: {
      type: [ Number, String ],
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.FormFieldCounter {
  font-size: 12px;
  font-weight: 200;
  color: #909399;

  &__counter {
    font-size: 14px;
    font-weight: 600;
    color: #FECD34;
  }
}
</style>
