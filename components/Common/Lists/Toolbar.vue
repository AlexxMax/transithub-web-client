<template>
  <ToolbarPattern>
    <div slot="left">
      <div class="Toolbar__left">
        <el-input
          class="Toolbar__left-search"
          size="small"
          :placeholder="$t('lists.search')"
          prefix-icon="el-icon-search"
          clearable
          v-model="search"
          @change="$emit('onSearch', search)">
        </el-input>

        <slot name="items"/>
      </div>
    </div>

    <div slot="right">
      <div class="Toolbar__right">
        <slot v-if="!$_smallDeviceMixin_isDeviceSmall"/>

        <Button
          v-if="$_smallDeviceMixin_isDeviceSmall && showMenu"
          type=""
          @click="openMenu"
          :style="{ 'margin-left': $_smallDeviceMixin_isDeviceSmall ? 0 : '5px' }">
          <fa icon="bars" />
          <!-- <span v-if="!$_smallDeviceMixin_isDeviceSmall" class="Toolbar__right-btn-title">{{ __buttonTitle }}</span> -->
        </Button>
      </div>

      <RightView
        v-if="showMenu"
        :visible="menuVisible"
        :title="__menuTitle"
        @close="closeMenu">

        <slot name="menu-items"/>

      </RightView>
    </div>
  </ToolbarPattern>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import ToolbarPattern from '@/components/Common/ListToolbar'
import RightView from '@/components/Common/RightView'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-list-toolbar',

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    Button,
    ToolbarPattern,
    RightView
  },

  data() {
    return {
      search: '',
      menuVisible: false,
      showMenu: true
    }
  },

  computed: {
    __buttonTitle() {
      return this.buttonTitle || this.$t('forms.common.menu')
    },

    __menuTitle() {
      return this.menuTitle || this.$t('forms.common.menu')
    }
  },

  methods: {
    openMenu() {
      this.menuVisible = true
      this.$emit('open')
    },
    closeMenu() {
      this.menuVisible = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.Toolbar__left {
  display: flex;
  flex-direction: row;
}

.Toolbar__right {
  display: flex;
  flex-direction: row;

  .Toolbar__right-btn-title {
    margin-left: 5px;
  }
}

@media only screen and (max-width: 600px) {
  .Toolbar__left {
    display: flex;
    flex-direction: column;

    .Toolbar__left-search {
      width: 100%;
    }
  }
}
</style>
