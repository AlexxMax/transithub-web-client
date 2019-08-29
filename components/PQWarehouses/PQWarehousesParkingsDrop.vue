<template>
<Drop
  v-if="editing"
  style="height: 100%; width: 100%"
  @drop="$emit('handleDrop', arguments)"
  drop-effect="move"
>
  <div :class="['PQWarehousesParkingsDrop', mods]">
    <span
      class="PQWarehousesParkingsDrop__title"
      v-html="text"
    />

    <div
      v-loading="loading"
      class="PQWarehousesParkingsDrop__list"
    >
      <slot />
    </div>
  </div>
</Drop>

<div
  v-else
  v-loading="loading"
  class="PQWarehousesParkingsDrop__list"
>
  <slot />
</div>
</template>

<script>
import { Drop } from 'vue-drag-drop'

export default {

  components: {
    Drop
  },

  props: {
    list: {
      type: Array,
      default: () => null
    },

    loading: {
      type: Boolean,
      default: false
    },

    removal: {
      type: Boolean,
      default: false
    },

    editing: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    mods() {
      const prefix = 'PQWarehousesParkingsDrop'

      return {
        [`${prefix}--adding`]: !this.removal,
        [`${prefix}--removal`]: this.removal,
      }
    },

    text() {
      return this.removal
      ? 'Натисніть на кнопку <b style="color: #67c23a;">"+ Додати"</b> <br/>або<br/>перетягніть в цю колонку, щоб прибрати стоянку'
      : 'Натисніть на кнопку <b style="color: #f56c6c;">"− Прибрати"</b> <br/>або<br/>перетягніть в цю колонку, щоб додати стоянку'
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesParkingsDrop {

    @media (min-width: 801px) {
        height: 100%;

        padding: 0 0.5rem;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;

        font-size: 1rem;
        text-align: center;

        border-radius: 5px;

        &--adding {
            background: $--color-success-light;
            border: 2px dashed $--color-success;
        }

        &--removal {
            background: $--color-danger-light;
            border: 2px dashed $--color-danger;
        }
    }

    &__title {
        display: none;

        @media (min-width: 801px) {
            margin: 1.5rem 0 1rem;

            display: block;
        }
    }

    &__list {
        // height: 100%;
        width: 100%;
    }
}
</style>
