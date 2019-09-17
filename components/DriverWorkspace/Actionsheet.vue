<template>
<div
  class="Actionsheet"
  v-show="value"
>

  <transition name="actionsheet-fade">
    <div
      v-if="visible"
      class="Actionsheet__mask"
      @click="handleClickClose"
    />
  </transition>

  <transition name="slide-up">
    <div
      v-if="visible"
      class="Actionsheet__content mobile-driver-workspace__container"
    >

      <div
        class="Actionsheet__block"
        v-for="(block, i) in items"
        :key="`Actionsheet__block-${i}`"
      >
        <div
          class="Actionsheet__item"
          v-for="(item, j) in block.children"
          :key="`Actionsheet__item-${i}-${j}`"
          @click="handleClick(item.function)"
        >
          <span>{{ item.text }}</span>
        </div>
      </div>

      <footer class="Actionsheet__block Actionsheet__block--footer">
        <div
          class="Actionsheet__item"
          @click="handleClickClose"
        >
          <span>{{ $t('forms.driverWorkspace.cancel') }}</span>
        </div>
      </footer>

    </div>
  </transition>

</div>
</template>

<script>
export default {

  props: {
    value: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => null
    }
  },

  data() {
    return {
      visible: false,
    }
  },

  watch: {
    value(value) {
      this.visible = value
    }
  },

  methods: {
    handleClick(cb) {
      this.handleClickClose()
      cb()
    },
    handleClickClose() {
      this.visible = false
      setTimeout(() => this.$emit('close'), 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.Actionsheet {

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    padding: 0.5rem;

    display: flex;
    align-items: flex-end;
    justify-content: center;

    z-index: 6000;

    &__mask {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background-color: rgba(0, 0, 0, .25);
    }

    &__content {
        position: relative;
    }

    &__block {
        &:not(:last-child) {
            margin-bottom: 0.5rem;
        }

        border-radius: 10px;
        background-color: $--color-white;

        &--footer {
            font-weight: 500;
            color: $--color-danger;
        }
    }

    &__item {
        padding: 1rem;

        &:not(:last-child) {
            border-bottom: 1px solid $--color-info-light;
        }

        text-align: center;

        cursor: pointer;

        &:active {
            font-weight: 600;
        }
    }

}
</style>
