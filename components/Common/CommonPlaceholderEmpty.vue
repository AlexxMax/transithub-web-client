<template>
<div class="CommonPlaceholderEmpty">

  <div class="CommonPlaceholderEmpty__title">
    <span>{{ title }}</span>
  </div>

  <div
    v-if="isDivider"
    class="CommonPlaceholderEmpty__divider"
  />

  <div class="CommonPlaceholderEmpty__content">
    <slot />
  </div>

</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },

  computed: {
    isDivider() {
      return this.$slots.default && this.$slots.default.length
    }
  }
}
</script>

<style lang="scss" scoped>
.CommonPlaceholderEmpty {
    padding: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    text-align: center;

    background: $--color-primary-light;
    border-radius: 10px;

    &__title {}

    &__divider {
      margin: .5rem 0;
    }

    &__content {}
}
</style>
