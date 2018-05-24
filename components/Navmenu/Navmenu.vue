<template>
  <div>
    <el-menu
      :router="true"
      default-active="m-1"
      class="el-menu-vertical"
      :collapse="isCollapse">
      <el-menu-item
        v-for="(navlink, index) in navlinks"
        :key="navlink.id"
        :index="'m-' + (index+1).toString()"
        :route="$i18n.path(navlink.link)">
        <i :class="'fas ' + navlink.icon"></i>
        <span slot="title">{{ $t(navlink.title) }}</span>
      </el-menu-item>

      <!-- Show/Hide Navmenu -->
      <el-radio-group size="medium" v-model="isCollapse" fixed-bottom>
        <el-radio-button v-show="isCollapse==true" :label="false">
          <i class="el-icon-arrow-right"></i>
        </el-radio-button>
        <el-radio-button v-show="isCollapse==false" :label="true">
          <i class="el-icon-arrow-left" style="margin-right: 11px"></i>{{ $t('links.system.hide-navmenu') }}
        </el-radio-button>
      </el-radio-group>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },

  computed: {
    navlinks: function() {
      return this.$store.state.navmenu.list.slice();
    }
  }
};
</script>

<style>
.el-menu-vertical,
.el-menu-vertical:not(.el-menu--collapse) {
  height: -webkit-calc(100vh - 60px); /* google, safari */
  height: -moz-calc(100% - 60px); /*firefox*/
  height: calc(100vh - 60px);
  /* height: 100%; */
  /* position: fixed; */
  z-index: 1;
  /* top: 0;
  width: 60px;*/
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}

.el-radio-group {
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
}

.el-radio-button__inner {
  border: none !important;
  background: transparent;
  color: #303133;
}

.el-radio-button--medium .el-radio-button__inner {
  padding: 10px 24px !important;
}

.el-radio-button__inner:hover {
  color: #606266 !important;
}

.el-radio-button:focus:not(.is-focus):not(:active) {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}

.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: white !important;
}

.el-menu-item {
  text-align: none;
}

.el-menu-item svg {
  padding-right: 10px;
}

.el-menu--collapse .el-menu-item {
  text-align: center;
}

.el-menu--collapse .el-menu-item svg {
  padding-right: 0px;
}
</style>
