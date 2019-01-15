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
  margin-top: 20px;

  &__title {
    font-size: 16px;
    font-weight: 400;
  }

  &__title-big {
    font-size: 30px;
    color: #BABABA;
    font-weight: 100;
  }

  &__body {
    margin-top: 10px;
  }
}

@media only screen and (max-width: 991px) {
  .FormGroup {
    &__title-big {
      font-size: 26px;
    }
  }
}
</style>
