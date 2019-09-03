<template>
<transition name="slide-left">
  <div
    v-if="visible"
    class="RaceFormSelectListScaffold"
  >

    <div class="RaceFormSelectListScaffold__inner">
      <div class="RaceFormSelectListScaffold__header">
        <div class="RaceFormSelectListScaffold__header__nav">
          <ButtonBack
            :use-router="false"
            @click="handleClickClose"
          />
        </div>

        <div class="RaceFormSelectListScaffold__header__title">{{ title }}</div>
      </div>

      <div class="RaceFormSelectListScaffold__content">
        <slot />
      </div>
    </div>

  </div>
</transition>
</template>

<script>
import ButtonBack from '@/components/Common/FormElements/Constituents/ButtonBack'

export default {
  name: 'th-driver-workspace-select-list-scaffold',

  components: { ButtonBack },

  props: {
    title: {
      type: String,
      required: true,
    },
    visible: Boolean,
  },

  methods: {
    handleClickClose() {
      this.$emit('update:visible', false)
    }
  }

}
</script>

<style lang='scss' scoped>
.RaceFormSelectListScaffold {
    position: fixed;
    top: 56px;

    min-height: calc(100vh - 56px);
    width: $--driver-workspace-width;
    max-width: 100%;

    background-color: $--color-white;

    border-left: $--driver-workspace-border;
    border-right: $--driver-workspace-border;

    z-index: 10;

    @include for-extra-small {
        border-left: none;
        border-right: none;
    };

    &__inner {
        padding: $--driver-workspace-padding;
    }

    &__header {
        display: flex;
        flex-direction: row;

        &__nav {
            flex: 1;
        }

        &__title {
            font-weight: bold;
        }

        &::after {
            content: '';
            flex: 1;
        }
    }

    &__content {
        overflow-y: auto;
    }
}
</style>
