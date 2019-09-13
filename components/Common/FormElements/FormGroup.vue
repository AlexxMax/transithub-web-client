<template>
  <div class="FormGroup">
    <span v-if="title" :class="{ 'FormGroup__title': true, 'FormGroup__title-big': bigTitle }">
      {{ title }}
    </span>

    <div class="FormGroup__body">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-form-group',

  props: {
    title: String,
    bigTitle: Boolean
  }
}
</script>

<style lang="scss" scoped>
.FormGroup {

  &__title {
    font-size: 1rem;
    text-transform: uppercase;
  }

  &__title-big {
    color: $--color-info;
    font-size: 1.75rem;
  }

  // &__body {
  //   margin-top: 1rem;
  // }
}
</style>
