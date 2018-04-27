<template>
  <div>
    <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
      <th-navlink />

      <!-- Show/Hide Navmenu -->
       <el-radio-group size="medium" v-model="isCollapse" fixed-bottom>
        <el-radio-button v-show="isCollapse==true" :label="false">
          <i class="el-icon-arrow-right"></i>
        </el-radio-button>
        <el-radio-button v-show="isCollapse==false" :label="true">
          <i class="el-icon-arrow-left" style="margin-right: 11px"></i>Сховати
        </el-radio-button>
      </el-radio-group>
    </el-menu>
  </div>
</template>

<script>
import Navlink from "@/components/navmenu/Navlink";

export default {
  components: {
    "th-navlink": Navlink
  },

  data() {
    return {
      isCollapse: true
    };
  }
};
</script>

<style>
.el-menu-vertical-demo,
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: -webkit-calc(100vh - 600px); /* google, safari */
  height: -moz-calc(100% - 60px); /* firefox */
  height: calc(100vh - 60px);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
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
