<template>
  <div :class="{ 'ItemCard__wrapper': true, 'ItemCard__wrapper-in-group': inGroup }">
    <!-- <div :class="{ 'ItemCard': true, 'ItemCard__item-in-group': inGroup }"> -->
    <Card>

      <slot/>

      <div v-if="!noFooter" class="ItemCard__footer">
        <slot name="footer-left"/>
        <slot v-if="!$_smallDeviceMixin_isDeviceSmall" name="footer-right"/>

        <!-- <div
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
        </div> -->
      </div>

      <Collapse>
        <div class="ItemCard__addon" v-if="showAddon">
          <slot name="addon"/>
        </div>
      </Collapse>

    </Card>
    <!-- </div> -->
  </div>
</template>

<script>
import Collapse from '@/components/Common/Transitions/Collapse'
import Card from '@/components/Common/Card'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-list-item-card',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    Collapse,
    Card
  },

  props: {
    showAddon: Boolean,
    noFooter: Boolean
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

//   &.ItemCard__wrapper-in-group {
//     margin: 10px -16px;
//     padding: 0;
//   }

//   .ItemCard {
//     color: #606266;
//     padding: 20px 15px;
//     background-color: white;
//     border: 1px solid #bebebe1a;
//     border-radius: 5px;
//     box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
//     transition: .5s;

//     &:hover {
//       box-shadow: 0 2px 12px 0 rgba(0,0,0,.2)
//     }

//     &.ItemCard__item-in-group {
//       border-radius: 0;
//       box-shadow: none;

//       &:hover {
//         box-shadow: none;
//         background-color: #f8f8f8;
//       }
//     }

    .ItemCard__footer {
      background-color: #fff;
      margin: 10px -20px -20px -20px;
      padding: 10px 15px;
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
//   }
}
</style>
