<template>
  <div class="FormFieldStatistics">
    <span class="FormFieldStatistics__title">{{ title }}</span>
    <span class="FormFieldStatistics__value">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'FormFieldStatistics',

  props: {
    title: [ String, Number ],
    value: {
      type: [ String, Number ],
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.FormFieldStatistics {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  text-align: center;

  &__value {
    font-size: 26px;
    font-weight: 600;
    color: #FFD74D;
  }

  &__title {
    font-size: 11px;
    font-weight: 400;
    line-height: 28px;
    box-sizing: border-box;
    color: #909399;
  }
}
</style>
