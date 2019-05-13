<template>
  <el-dropdown trigger="click" class="NavmenuItem" @visible-change="handleDropdownVisibleChange">
    <span class="NavmenuItem__link">
      {{ label }}
      <fa :icon="icon"/>
    </span>

    <el-dropdown-menu slot="dropdown" style="overflow-x: hidden;">
      <div v-for="item of items" :key="item.key">
        <NavmenuGroupTitle v-if="item.isGroup" :title="item.label" :add-margin-top="item.addMarginTop"/>

        <el-dropdown-item v-else class="NavmenuItem__item">
          <div class="NavmenuItem__item-link">
            <nuxt-link class="NavmenuItem__item-link-content" :to="item.href">
              {{ item.label }}
            </nuxt-link>
          </div>
        </el-dropdown-item>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import NavmenuGroupTitle from '@/components/Navmenu/NavmenuGroupTitle'

export default {
  name: 'th-navmenu-item',

  components: { NavmenuGroupTitle },

  data: () => ({ dropdownVisible: false }),

  props: {
    label: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },

  computed: {
    icon() {
      return this.dropdownVisible ? 'angle-up' : 'angle-down'
    }
  },

  methods: {
    handleDropdownVisibleChange(value) {
      this.dropdownVisible = value
    }
  }
}
</script>

<style lang='scss' scoped>
.NavmenuItem {
  padding: 15px 0;
  margin: {
    left: 30px;
  };

  &__link {
    cursor: pointer;
    font-weight: 500;
    outline: none;
  }

  &__item {
    line-height: 16px;
  }

  &__item:not(.is-disabled):hover, &__item:focus {
    background-color: rgba(254, 205, 52, 0.15) !important;
    color: #606266 !important;
  }

  &__item-link {
    margin: 0 -20px;
    transition: .5s;

    &:hover {
      border-left: 2px solid #fecd34;
      margin: 0 -22px 0 -20px;
    }

    &-content {
      color: #606266 !important;
      width: 100%;
      text-align: left;
      display: block;
      padding: 10px 20px;
    }
  }
}

.el-dropdown-menu {
  border-radius: 10px !important;
}
</style>
