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
  padding: 1rem 0;

  display: flex;
  flex-direction: column;

  &__title {
    margin-bottom: 0.75rem;

    display: block;

    color: $--color-info;
    font-size: 0.75rem;
  }

  &__title-big {
    font-size: 1rem;
  }

  &__value {}

  &__value-bold {
    font-weight: 600;
  }

  &__slot {
    margin-top: .75rem;
  }
}
</style>
