<template>
<header class="CommonListsToolbar">

  <span
    v-if="title"
    class="CommonListsToolbar__title"
  >{{ title }}</span>

  <div class="CommonListsToolbar__content-pc">
    <slot />
  </div>

  <template v-if="burger">
    <div class="CommonListsToolbar__content-mob">
      <slot />

      <Button
        class="CommonListsToolbar__burger"
        type
        @click="sidebar = true"
      >
        <fa icon="bars" />
      </Button>
    </div>

    <RightView
      :visible="sidebar"
      @close="sidebar = false"
      :title="$t('forms.common.menu')"
    >
      <div class="CommonListsToolbar__sidebar">
        <slot />
      </div>
    </RightView>
  </template>

</header>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import RightView from '@/components/Common/RightView'
// import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  components: {
    Button,
    RightView
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    burger: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    sidebar: false
  })
}
</script>

<style lang="scss" scoped>
.CommonListsToolbar {

    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title {
        color: #606266;
        font-size: 18px;
        font-weight: 500;
    }

    &__content-pc {
        flex: 1;
        display: flex;
        justify-content: flex-end;

        @include for-extra-small {
            display: none;
        }
    }

    &__content-mob {
        flex: 1;
        display: none;

        @include for-extra-small {
            display: flex;
            justify-content: flex-end;
        }
    }

    &__burger {
      display: flex;
    }

    &__sidebar {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
}
</style>
