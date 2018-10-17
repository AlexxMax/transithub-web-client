<template>
  <div>
    <Button type="" @click="menuVisible = true">
      <fa icon="bars" />
      <span v-if="!$_smallDeviceMixin_isDeviceSmall" class="FormMainMenu__btn-title">{{ __buttonTitle }}</span>
    </Button>

    <RightView
      :visible="menuVisible"
      :title="__menuTitle"
      @close="menuVisible = false">

      <slot/>

    </RightView>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import RightView from '@/components/Common/RightView'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-form-main-menu',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Button,
    RightView
  },

  props: {
    buttonTitle: String,
    menuTitle: String
  },

  data() {
    return {
      menuVisible: false
    }
  },

  computed: {
    __buttonTitle() {
      return this.buttonTitle || this.$t('forms.common.menu')
    },

    __menuTitle() {
      return this.menuTitle || this.$t('forms.common.menu')
    }
  }
}
</script>

<style lang="scss" scoped>
.FormMainMenu__btn-title {
  margin-left: 5px;
}
</style>
