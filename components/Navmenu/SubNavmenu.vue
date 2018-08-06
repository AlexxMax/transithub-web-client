<template>
  <div class="th-subnavmenu" v-show="show" :class="{ 'th-subnavmenu-margin-left-60px': collapse }">
    <div class="th-subnavmenu-container">
      <div class="th-subnavmenu-header">
        <span class="th-subnavmenu-header-title">{{ $t(title) }}</span>
        <i class="el-icon-close th-subnavmenu-header-close" @click="$emit('close')"></i>
      </div>
    </div>

    <div class="th-subnavmenu-container">
      <th-navlink
        v-for="(item, index) in items"
        :key="index"
        :link="item.link"
        :icon="item.icon"
        :title="item.title"
        @clicked="$emit('close')">
      </th-navlink>
    </div>
  </div>
</template>

<script>
import Navlink from '@/components/Navmenu/Navlink'

export default {
  components: {
    "th-navlink": Navlink
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    items: Array,
    collapse: Boolean
  }
}
</script>

<style lang="scss" scoped>
.th-subnavmenu {
  z-index: 1000;
  top: 0;
  position: absolute;
  margin-left: 200px;
  width: 300px;
  background-color: white;
  border-right: 1px solid rgb(235, 238, 245);
  height: 100vh;

  &.th-subnavmenu-margin-left-60px {
    margin-left: 60px;
  }

  .th-subnavmenu-container {
    margin: 20px;

    .th-subnavmenu-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: #A3A2A2;

      .th-subnavmenu-header-title {
        text-transform: uppercase;
        font-size: 11px;
        font-weight: 500;
      }

      .th-subnavmenu-header-close {
        font-size: 16px;
      }
    }

  }

}
</style>


