<template>
<div
  class="RaceFormItem"
  @click="$emit('click')"
>

  <div class="RaceFormItem__title">
    <span>{{ title }}</span>
  </div>

  <div class="RaceFormItem__content">
    <slot />

    <div
      class="RaceFormItem__arrow"
      v-if="arrow"
    >
      <fa icon="chevron-right" />
    </div>
  </div>

</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    arrow: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style lang='scss' scoped>
.RaceFormItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    &__title {
        max-width: 90%;

        margin-bottom: $--driver-workspace-padding;
        padding: 0 $--driver-workspace-padding;

        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;

        overflow: hidden;
    }

    &__content {
        padding: $--driver-workspace-padding;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    &__arrow {
        font-size: 1rem;
    }
}
</style>
