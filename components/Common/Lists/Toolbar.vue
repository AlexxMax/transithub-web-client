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

        <Button
          v-show="!$_smallDeviceMixin_isDeviceSmall"
          type=""
          @click="$emit('showFilter')">
          <fa icon="filter" />
          <span>{{ `${$t('lists.filter')}${filterSet ? ': ' + $t('lists.filterSet') : ''}` }}</span>
        </Button>

        <slot name="left"/>
      </div>
    </div>

    <div slot="right">
      <slot/>

      <el-dropdown size="mini" v-show="$_smallDeviceMixin_isDeviceSmall">
        <Button type="">
          <fa icon="bars" />
        </Button>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-show="$_smallDeviceMixin_isDeviceSmall">
            <slot name="dropdown-items"/>
          </el-dropdown-item>

          <el-dropdown-item divided v-show="$_smallDeviceMixin_isDeviceSmall">
            <span @click="$emit('showFilter')">
              <span>{{ `${$t('lists.filter')}${filterSet ? ': ' + $t('lists.filterSet') : ''}` }}</span>
            </span>
          </el-dropdown-item>

          <slot v-show="$_smallDeviceMixin_isDeviceSmall" name="right-menu-item-0"/>
          <slot v-show="$_smallDeviceMixin_isDeviceSmall" name="right-menu-item-1"/>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </ToolbarPattern>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import ToolbarPattern from '@/components/Common/ListToolbar'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-list-toolbar',

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    Button,
    ToolbarPattern
  },

  props: {
    filterSet: Boolean
  },

  data() {
    return {
      search: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.Toolbar__left {
  display: flex;
  flex-direction: row;

  .Toolbar__left-search {
    margin-right: 10px;
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
