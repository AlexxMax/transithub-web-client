<template>
<Drop
  v-if="editing"
  style="height: 100%; width: 100%"
  @drop="$emit('handleDrop', arguments)"
  drop-effect="move"
>
  <div class="PQWarehousesParkingsDrop">
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
    text() {
      return this.removal ? this.$t('forms.pqWarehouses.parkings.titleNotSubordinate') : this.$t('forms.pqWarehouses.parkings.titleSubordinate')
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesParkingsDrop {

    @media (min-width: 801px) {
        height: 100%;

        padding: 0 .5rem .5rem .5rem;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;

        text-align: center;

        border-radius: 5px;
        background: $--color-grey-light;
    }

    &__title {
        display: none;

        font-size: 1rem;

        @media (min-width: 801px) {
            margin: 1.5rem 0 1rem;

            display: block;
        }
    }

    &__list {
        width: 100%;
    }
}
</style>
