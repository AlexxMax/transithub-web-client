<template>
<div class="PQWarehousesFormButtons">

  <template v-if="!$_smallDeviceMixin_isDeviceSmall">
    <slot />
  </template>

  <MainMenu v-if="$_smallDeviceMixin_isDeviceSmall">
    <div class="PQWarehousesFormButtons__sidebar">
      <slot />
    </div>
  </MainMenu>

</div>
</template>

<script>
import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

import MainMenu from '@/components/Common/FormElements/FormMainMenu'

export default {
  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    MainMenu
  }
}
</script>

<style lang="scss">
.PQWarehousesFormButtons {
  display: flex;

  &__sidebar {
    display: flex;
    flex-direction: column;

    button {
      margin: 0 !important;

      &:not(:last-child) {
        margin-bottom: 1rem !important;
      }
    }
  }
}
</style>
