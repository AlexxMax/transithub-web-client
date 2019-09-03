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

      <div class="Actionsheet__block">
        <div
          class="Actionsheet__item"
          v-for="(item, index) in buttons"
          :key="index"
          @click="item.function"
        >
          <span>{{ item.text }}</span>
        </div>
      </div>

      <div class="Actionsheet__block Actionsheet__block--footer">
        <div
          class="Actionsheet__item"
          @click="handleClickClose"
        >
          <span>Cancel</span>
        </div>
      </div>

    </div>
  </transition>

</div>
</template>

<script>
import { CREATION_TYPES } from '@/utils/driver'

export default {

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    value(value) {
      this.visible = value
    }
  },

  data() {
    return {
      visible: false,

      buttons: [
        { text: 'Створити рейс по наряду', function: this.handleClick },
        { text: 'Створити рейс вручну ', function: this.handleClickManually },
      ]
    }
  },

  methods: {
    handleClick() {
      this.handleClickClose()
      this.$router.push(this.$i18n.path(`driver/new-race/${CREATION_TYPES.AUTOMATIC}`))
    },
    handleClickManually() {
      this.handleClickClose()
      this.$router.push(this.$i18n.path(`driver/new-race/${CREATION_TYPES.MANUAL}`))
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

    z-index: 10;

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
        border-radius: 10px;
        background-color: $--color-white;

        &--footer {
            margin-top: 0.5rem;

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
