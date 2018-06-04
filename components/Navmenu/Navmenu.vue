<template>
  <div>
    <el-menu :router="true" default-active="m-1" class="el-menu-vertical th-side-menu" :collapse="isCollapse" background-color="rgb(244, 245, 247)">

      <el-menu-item index="1" :route="$i18n.path('workspace')">
        <svg class="center" x="0px" y="0px"  viewBox="0 0 227 119" xml:space="preserve">
          <g>
            <rect x="49.9" y="42.4" class="st0" width="23.8" height="71.5" />
            <polygon class="st0" points="135.5,6.7 115.3,6.7 111.7,6.7 8.1,6.7 8.1,30.5 111.7,30.5 111.7,113.9 135.5,113.9 135.5,72.1 
	          	183.3,72.1 183.3,48.3 135.5,48.3 	" />
            <rect x="195.2" y="6.7" class="st0" width="23.8" height="107.2" />
          </g>
        </svg>
        <!-- <span slot="title">TransitHub</span> -->
      </el-menu-item>

      <th-company-select />

      <el-menu-item v-if="currentCompany.guid" v-for="(navlink, index) in navlinks" :key="navlink.id" :index="'m-' + (index+1).toString()"
        :route="$i18n.path(navlink.link)">
        <i :class="'fas ' + navlink.icon"></i>
        <span slot="title">{{ $t(navlink.title) }}</span>
      </el-menu-item>

      <!-- <el-submenu index="99" class="el-menu-item-right" fixed-bottom>
        <template slot="title">
          <i :class="'fas fa-user'"></i>
          <span>{{ username }}</span>
        </template>
        <el-menu-item index="99-1" :route="$i18n.path('workspace/profile')">
          {{ $t('links.system.profile') }}
        </el-menu-item>
        <el-menu-item index="99-2" @click="logout">
          {{ $t('links.system.logout') }}
        </el-menu-item>
      </el-submenu> -->

      <th-user class="th-user-item" />

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
import CompanySelect from "@/components/Navmenu/CompanySelect";
import Popover from "@/components/Common/Popover";

export default {
  components: {
    "th-company-select": CompanySelect,
    "th-user": Popover
  },

  data() {
    return {
      isCollapse: true
    };
  },

  computed: {
    navlinks: function() {
      return this.$store.state.navmenu.list.slice();
    },

    username: function() {
      return this.$store.getters["user/username"];
    },

    currentCompany: function() {
      return this.$store.state.companies.currentCompany;
    }
  },

  methods: {
    logout: async function() {
      this.$nuxt.layoutName = "public";
      await this.$store.dispatch("user/userLogout");
      window.location.reload(true);
    }
  }
};
</script>

<style>
.el-menu-vertical,
.el-menu-vertical:not(.el-menu--collapse) {
  height: 100vh;
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

.th-side-menu {
  border-right: none;
  /* position: fixed;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden; */
}

.el-submenu__title {
  padding-left: 24px !important;
}

.th-user-item {
  position: absolute;
  bottom: 60px;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  /* margin-top: 360px; */
}

.center {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  width: 40px;
}

.st0 {
  fill: #123458;
}
</style>
