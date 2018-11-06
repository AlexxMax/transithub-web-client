<template>
  <div :class="{ 'ItemCard__wrapper': true, 'ItemCard__wrapper-in-group': inGroup }">
    <div :class="{ 'ItemCard': true, 'ItemCard__item-in-group': inGroup }">

      <slot/>

      <div class="ItemCard__footer">
        <slot name="footer-left"/>
        <slot v-if="!$_smallDeviceMixin_isDeviceSmall" name="footer-right"/>

        <div
          v-if="$_smallDeviceMixin_isDeviceSmall"
          class="ItemCard__footer-menu">
          <el-dropdown>
            <span>
              <fa icon="ellipsis-v"/>
            </span>

            <el-dropdown-menu slot="dropdown">
              <slot name="footer-right-menu"/>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <Collapse>
        <div class="ItemCard__addon" v-if="showAddon">
          <slot name="addon"/>
        </div>
      </Collapse>
    </div>
  </div>
</template>

<script>
import Collapse from '@/components/Common/Transitions/Collapse'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-list-item-card',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    Collapse
  },

  props: {
    showAddon: Boolean
  },

  data() {
    return {
      inGroup: false
    }
  },

  mounted() {
    // if Item is in group
    if (this.$parent.$el.className === 'ListItemGroupe__body'
      || this.$parent.$parent.$el.className === 'ListItemGroupe__body') {
      this.inGroup = true
    }
  }
}
</script>

<style lang="scss" scoped>
.ItemCard__wrapper {
  margin: 10px 0;
  padding: 0 5px;

  &.ItemCard__wrapper-in-group {
    margin: 10px -16px;
    padding: 0;
  }

  .ItemCard {
    color: #606266;
    padding: 20px 15px;
    background-color: white;
    border: 1px solid #bebebe1a;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    &.ItemCard__item-in-group {
      border-radius: 0;
      box-shadow: none;

      &:hover {
        box-shadow: none;
        background-color: #f8f8f8;
      }
    }

    .ItemCard__footer {
      background-color: #f8f8f8;
      margin: 10px -15px -20px -15px;
      padding: 5px 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .ItemCard__footer-menu {
        line-height: 30px;
      }
    }

    .ItemCard__addon {
      margin-top: 40px;
    }
  }
}
</style>
