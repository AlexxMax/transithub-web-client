<template>
  <div class="Status">
    <div class="Status__point" :style="style" />
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
    editable: Boolean,
    pointStyle: Object
  },

  computed: {
    style() {
      return {
        'background-color': this.color,
        'margin-top': '4px',
        'margin-right': '8px',
        ...this.pointStyle
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$font-color: #909399;

.Status {
  display: flex;
  flex-direction: row;
  color: $font-color;

  &__point {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  &__title {
    font-size: 16px;
    font-weight: 400;
    text-transform: capitalize;
    line-height: 1.37;
  }

  &__edit {
    font-size: 12px;
    margin-left: 10px;
    line-height: 20px;
    color: $font-color;
    cursor: pointer;
  }
}
</style>
