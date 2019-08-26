<template>
  <div class="RaceFormGroup">
    <span class="RaceFormGroup__title">{{ title }}</span>
    <div class="RaceFormGroup__content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-race-form-group',

  props: {
    title: {
      type: String,
      required: true,
    }
  },
}
</script>

<style lang='scss' scoped>
.RaceFormGroup {
  display: flex;
  flex-direction: column;
  background-color: inherit;
  margin-bottom: 25px;

  &__title {
    font-weight: 600;
    margin-bottom: 10px;
    padding: {
      left: $--driver-workspace-padding;
      right: $--driver-workspace-padding;
    };
  }

  &__content {
    background-color: $--color-white;
    padding: $--driver-workspace-padding;
    border: {
      top: $--driver-workspace-border;
      bottom: $--driver-workspace-border;
    };
  }
}
</style>
