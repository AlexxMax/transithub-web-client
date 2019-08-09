<template>
<div class="CommonSteps">

  <div
    :class="['CommonSteps__step', { 'CommonSteps__step--finished': index < active }, { 'CommonSteps__step--active': index == active }]"
    v-for="(step, index) in steps"
    :key="index"
  >
    <span class="CommonSteps__text">{{ step }}</span>

    <fa
      class="CommonSteps__icon"
      v-if="index !== steps.length - 1"
      icon="angle-right"
    />
  </div>

</div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      default: () => []
    },

    active: {
      type: [Number, String],
      default: 0
    }
  },
}
</script>

<style lang="scss" scoped>
.CommonSteps {

    display: flex;
    align-items: center;
    justify-content: center;

    &__step {

      color: $--color-info;
      font-size: 1rem;
      line-height: 1;

      display: flex;
      align-items: center;

      &--finished {

        color: $--color-primary;

        .CommonSteps {
          &__text {
            font-weight: bold;
          }

          &__icon {
            color: $--color-primary;
          }
        }
      }

      &--active {

        color: inherit;

        .CommonSteps {
          &__text {
            font-weight: bold;
          }

          &__icon {
            color: inherit
          }
        }
      }
    }

    &__text {
    }

    &__icon {
        padding: 0 1rem;

        color: lighten($--color-info, 25%);
        font-size: 1.5rem;
    }
}
</style>
