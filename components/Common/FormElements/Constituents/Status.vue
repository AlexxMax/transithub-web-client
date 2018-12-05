<template>
  <div class="Status">
    <div class="Status__point" :style="{ 'background-color': color }" />
    <span class="Status__title">
      {{ title }}
    </span>
    <span
      v-if="editable"
      class="Status__edit"
      @click="$emit('edit')"
    >
      <fa icon="pen" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'th-status',

  props: {
    title: {
      type: String,
      reguired: true
    },
    color: {
      type: String,
      required: true
    },
    editable: Boolean
  }
}
</script>

<style lang="scss" scoped>
.Status {
  display: flex;
  flex-direction: row;

  &__point {
    width: 12px;
    height: 12px;
    margin: 4px 8px 5px 0;
    border-radius: 50%;
  }

  &__title {
    font-size: 16px;
    font-weight: 400;
    text-transform: capitalize;
    line-height: 1.37;
  }

  &__edit {
    margin-left: 10px;
    line-height: 20px;
    color: #5B5B5B;
    cursor: pointer;
  }
}
</style>
