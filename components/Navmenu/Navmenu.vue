<template>
  <SlideLeft>
    <div>
      <el-menu
        :router="true"
        default-active="m-1"
        class="el-menu-vertical th-side-menu"
        :collapse="collapse"
        style="border-right: 1px solid rgb(235, 238, 245);"
        background-color="white">

        <th-main-logo />
        <th-company-select :collapse="collapse" />

        <!-- <el-menu-item
          v-if="currentCompanySet"
          v-for="(navlink, index) in navlinks"
          :key="navlink.id"
          :index="'m-' + (index+1).toString()"
          :route="$i18n.path(navlink.link)">
          <fa :icon="navlink.icon" />
          <span slot="title">{{ $t(navlink.title) }}</span>
        </el-menu-item> -->

        <div>
          <th-navlink
            v-for="(navlink, index) in navlinks"
            :key="index"
            :link="navlink.link"
            :icon="navlink.icon"
            :title="navlink.title"
            :menu="navlink.menu"
            :toggled="currentNavlink === index"
            :collapse="collapse"
            @clicked="changeNavlink(index)">
          </th-navlink>
        </div>

        <th-user-menu :collapse="collapse" />

        <!-- Show/Hide Navmenu -->
        <el-radio-group size="medium" v-model="collapse" fixed-bottom>
          <el-radio-button v-show="collapse==true" :label="false">
            <i class="el-icon-arrow-right"></i>
          </el-radio-button>
          <el-radio-button v-show="collapse==false" :label="true">
            <i class="el-icon-arrow-left" style="margin-right: 11px"></i>{{ $t('links.system.hide-navmenu') }}
          </el-radio-button>
        </el-radio-group>
      </el-menu>
      <th-subnavmenu
        :show="showSubNavmenu"
        :title="submenuTitle"
        :items="submenuItems"
        :collapse="collapse"
        @close="changeNavlink(null)"/>
    </div>
  </SlideLeft>
</template>

<script>
import MainLogo from "@/components/Navmenu/MainLogo"
import CompanyMenu from "@/components/Navmenu/Company/CompanyMenu"
import UserMenu from "@/components/Navmenu/User/UserMenu"
import Navlink from '@/components/Navmenu/Navlink'
import SubNavmenu from '@/components/Navmenu/SubNavmenu'
import SlideLeft from '@/components/Common/Transitions/SlideLeft'

export default {
  components: {
    "th-main-logo": MainLogo,
    "th-company-select": CompanyMenu,
    "th-user-menu": UserMenu,
    "th-navlink": Navlink,
    "th-subnavmenu": SubNavmenu,
    SlideLeft
  },

  data() {
    return {
      navlinks: [{
        icon: 'store',
        title: 'links.documents.orders',
        link: 'workspace/orders'
      }, {
        icon: 'briefcase',
        title: 'links.documents.workPlace',
        menu: true,
        items: [{
          icon: 'list',
          title: 'links.documents.requests',
          link: 'workspace/requests'
        }, {
          icon: 'book-open',
          title: 'links.documents.vehiclesRegisters',
          link: 'workspace/vehicles-registers'
        }, {
          icon: 'truck',
          title: 'links.catalogs.vehicles',
          link: 'workspace/vehicles'
        }, {
          icon: 'user',
          title: 'links.catalogs.drivers',
          link: 'workspace/drivers'
        }]
      }],

      currentNavlink: null,
      showSubNavmenu: false,
      currentSubNavmenu: null
    };
  },

  computed: {
    currentCompanySet: function() {
      return !!this.$store.state.companies.currentCompany.guid;
    },
    collapse: {
      get() {
        return this.$store.state.navmenu.collapse
      },
      set(value) {
        this.$store.commit('navmenu/SET_COLLAPSE', value)
      }
    },
    linkIsSubmenu: function() {
      if (this.currentNavlink) {
        return this.navlinks[this.currentNavlink].menu
      }
    },
    submenuTitle: function() {
      if (this.currentNavlink) {
        return this.navlinks[this.currentNavlink].title
      }
      return ''
    },
    submenuItems: function() {
      if (this.currentNavlink) {
        return this.navlinks[this.currentNavlink].items
      }
      return []
    }
  },

  methods: {
    changeNavlink: function(index) {
      if (this.currentNavlink === index && this.currentNavlink != null) {
        this.currentNavlink = null
      } else {
        this.currentNavlink = index
      }

      this.showSubNavmenu = false
      if (this.currentNavlink && this.linkIsSubmenu) {
        this.showSubNavmenu = true
      }
    }
  }
};
</script>

<style lang="scss">
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
  width: 35px;
}

.st0 {
  fill: #123458;
}
</style>
