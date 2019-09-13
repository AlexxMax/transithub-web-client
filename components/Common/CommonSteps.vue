<template>
<div class="CommonSteps">

  <div
    :class="['CommonSteps__step', { 'CommonSteps__step--finished': index < active }, { 'CommonSteps__step--active': index == active }]"
    v-for="(step, index) in steps"
    :key="index"
  >
    <fa
      v-if="step.icon"
      :class="['CommonSteps__icon', 'CommonSteps__icon--small']"
      :icon="step.icon"
    />

    <span class="CommonSteps__text">{{ step.text }}</span>

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
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    &__step {

      margin: .5rem 0;

      display: flex;
      align-items: center;

      color: $--color-info;
      font-size: 1rem;
      line-height: 1;

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
        margin: 0 1rem;

        color: lighten($--color-info, 25%);
        font-size: 1.5rem;

        &--small {
          font-size: 1rem;
        }
    }
}
</style>
