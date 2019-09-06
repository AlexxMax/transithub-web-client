<template>
<div class="RaceFormGroup">

  <header class="RaceFormGroup__header">
    <span class="RaceFormGroup__title">{{ title }}</span>
    <small
      class="RaceFormGroup__subtitle"
      v-if="subtitle"
    >{{ subtitle }}</small>
  </header>

  <div class="RaceFormGroup__content">
    <slot />
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
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss' scoped>
.RaceFormGroup {
    display: flex;
    flex-direction: column;
    background-color: inherit;
    margin-bottom: 25px;

    &__header {
        margin-bottom: 10px;
        padding: {
            left: $--driver-workspace-padding;
            right: $--driver-workspace-padding;
        };

        display: flex;
        flex-direction: column;
    }

    &__title {
      font-weight: 600;
    }

    &__subtitle {}

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
