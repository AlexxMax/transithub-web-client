<template>
  <div v-if="visible" class="RaceFormSelectListScaffold">

    <div class="RaceFormSelectListScaffold__inner">
      <div class="RaceFormSelectListScaffold__header">
        <div class="RaceFormSelectListScaffold__header__nav">
          <ButtonBack
            :use-router="false"
            @click="$emit('update:visible', false)"
          />
        </div>

        <div class="RaceFormSelectListScaffold__header__title">{{ title }}</div>
      </div>

      <div class="RaceFormSelectListScaffold__content">
        <slot/>
      </div>
    </div>

  </div>
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
}
</script>

<style lang='scss' scoped>
.RaceFormSelectListScaffold {
  z-index: 10;
  position: fixed;
  top: 56px;
  width: $--driver-workspace-width;
  max-width: 100%;
  background-color: $--color-white;
  min-height: calc(100vh - 56px);
  border-left: $--driver-workspace-border;
  border-right: $--driver-workspace-border;

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
