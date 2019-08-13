<template>
  <div class="FormSegment">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'th-form-segment',
}
</script>

<style lang="scss" scoped>
.FormSegment {
  padding: 2.75rem 4rem;

  @include for-small-and-less {
      padding: 1rem 2rem;
  }

  @include for-extra-small {
      padding: 1rem;
  }
}
</style>
