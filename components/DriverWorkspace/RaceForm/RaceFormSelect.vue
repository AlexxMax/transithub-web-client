<template>
<div
  :class="['RaceFormSelect', { 'RaceFormSelect--disabled': disabled }]"
  @click="$emit('click')"
>
  <div class="RaceFormSelect__title">{{ field }}</div>

  <div
    class="RaceFormSelect__icon"
    @click.stop="handleCleal"
  >
    <fa
      v-if="iconClose"
      icon="times"
    />

    <fa
      v-else
      icon="chevron-right"
    />
  </div>
</div>
</template>

<script>
import * as confirm from '@/utils/confirm'

export default {
  name: 'th-driver-warehouse-race-form-select',

  props: {
    title: String,
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    },
    iconClose: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    field() {
      return this.title || this.placeholder
    }
  },

  methods: {
    handleCleal() {
      if (this.iconClose)
        confirm.warning('Are you sure you want to clear input').then(() => this.$emit('clear'))
      else
        this.$emit('click')
    }
  }
}
</script>

<style lang='scss' scoped>
.RaceFormSelect {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: -$--driver-workspace-padding;
    padding: $--driver-workspace-padding;

    &--disabled {
        background-color: $--color-info-light;
        pointer-events: none;

        color: $--color-info;
    }

    &__title {
        max-width: 90%;
    }

    &__icon {
        position: relative;

        display: flex;

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;

            height: 52px;
            width: 45px;

            transform: translate(-50%, -50%);
        }
    }
}
</style>
