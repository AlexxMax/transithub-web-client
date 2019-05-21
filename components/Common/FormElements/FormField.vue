<template>
  <div class="FormField">
    <span v-if="title" :class="{ 'FormField__title': true, 'FormField__title-big': bigTitle }">{{ title }}</span>
    <span v-if="value" :class="{ 'FormField__value': true, 'FormField__value-bold': boldValue}">{{ value }}</span>
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
    value: [ String, Number ],
    bigTitle: Boolean,
    boldValue: Boolean
  }
}
</script>

<style lang="scss" scoped>
.FormField {
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  &__title {
    font-size: 11px;
    font-weight: 400;
    line-height: 28px;
    text-align: left;
    box-sizing: border-box;
    color: #BABABA;
  }

  &__title-big {
    font-size: 14px;
  }

  &__value {
    color: #000;
    line-height: 28px;
  }

  &__value-bold {
    font-weight: 600;
  }

  &__slot {
    margin-top: 10px;
  }
}
</style>
