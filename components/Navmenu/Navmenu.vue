<template>
  <div>
    <div class="Navmenu__menu-horizontal">

      <div class="Navmenu__menu-horizontal__collapse">
        <div class="Navmenu__group-left">
          <th-main-logo />

          <div class="Navmenu__group-left__links">
            <!-- <NavmenuItem :label="$t('links.navmenu.auto')" :items="autoItems"/> -->
            <NavmenuItem :label="$t('links.navmenu.railway')" :items="railwayItems"/>
            <!-- <th-navlink
              class="Navmenu__group-left__link"
              v-for="(navlink, index) in navlinks"
              :key="index"
              :link="navlink.link"
              :icon="navlink.icon"
              :title="navlink.title"
              :menu="navlink.menu"
              :toggled="currentNavlink === index"
              :collapse="collapse"
              @clicked="changeNavlink(index)">
            </th-navlink> -->
          </div>
        </div>
      </div>
    </div>
        <!-- <th-subnavmenu
          :show="showSubNavmenu"
          :title="submenuTitle"
          :items="submenuItems"
          :collapse="collapse"
          @close="changeNavlink(null)"/> -->

        <!-- <CompanyItemMenu/>
        <CompaniesMenu/> -->

    <div class="Navmenu__menu-horizontal__expand">
      <CreateNewMenu />
      <th-user-menu class="Navmenu__menu-horizontal__expand__user-menu" />

      <HamburgerMenu class="Navmenu__menu-horizontal__expand__hamburger-menu" />
    </div>
  </div>
</template>

<script>
import MainLogo from "@/components/Navmenu/MainLogo"
import UserMenu from "@/components/Navmenu/User/UserMenu"
import NavmenuItem from '@/components/Navmenu/NavmenuItem'
import Avatar from "@/components/Common/Avatar"
import CreateNewMenu from "@/components/Navmenu/CreateNewMenu"
import HamburgerMenu from "@/components/Navmenu/HamburgerMenu"

export default {
  name: 'th-navmenu',

  components: {
    "th-main-logo": MainLogo,
    "th-user-menu": UserMenu,
    NavmenuItem,
    // "th-user-avatar": Avatar,
    CreateNewMenu,
    HamburgerMenu
  },

  data() {
    return {
      // navlinks: [{
      //   icon: 'store',
      //   title: 'links.documents.orders',
      //   link: 'workspace/orders'
      // }, {
      //   icon: 'briefcase',
      //   title: 'links.documents.workPlace',
      //   menu: true,
      //   items: [{
      //     icon: 'list',
      //     title: 'links.documents.requests',
      //     link: 'workspace/requests'
      //   }, {
      //     icon: 'book-open',
      //     title: 'links.documents.vehiclesRegisters',
      //     link: 'workspace/vehicles-registers'
      //   }, {
      //     icon: 'shipping-fast',
      //     title: 'links.documents.races',
      //     link: 'workspace/races'
      //   }, {
      //     icon: 'truck',
      //     title: 'links.catalogs.vehicles',
      //     link: 'workspace/vehicles'
      //   }, {
      //     icon: 'user',
      //     title: 'links.catalogs.drivers',
      //     link: 'workspace/drivers'
      //   }]
      // }],

      // navlinks: [
      //   {
      //     icon: 'angle-down',
      //     title: 'links.navmenu.auto',
      //     //link: 'workspace/railway-aggregations'
      //   }, {
      //     icon: 'angle-down',
      //     title: 'links.navmenu.railway',
      //     //link: 'workspace/railway-aggregations'
      //   }
      // ],

      // currentNavlink: null,
      // currentSubNavmenu: null,


    }
  },

  computed: {
    autoItems() {
      return [{
        href: this.$i18n.path('workspace/requests'),
        label: this.$t('lists.requests')
      }, {
        href: this.$i18n.path('workspace/vehicles-registers'),
        label: this.$t('lists.vehiclesRegisters')
      }, {
        href: this.$i18n.path('workspace/races'),
        label: this.$t('lists.races')
      }]
    },

    railwayItems() {
      return [{
        href: this.$i18n.path('workspace/railway-aggregations'),
        label: this.$t('lists.railwayAggregations')
      }, {
        href: this.$i18n.path('workspace/railway-requests'),
        label: this.$t('lists.railwayRequests')
      }, {
        href: this.$i18n.path('workspace/railway-stations'),
        label: `${this.$t('forms.common.catalog')}: ${this.$t('forms.common.railwayStations')}`,
        divided: true
      }]
    }
  },

  methods: {
    logout: async function() {
      this.$nuxt.layoutName = "public";
      this.$store.dispatch("user/userLogout");
      this.$router.push("/");
    }
  }

  // computed: {
    // showSubNavmenu: {
    //   get: function() {
    //     return this.$store.state.subnavmenu.show
    //   },
    //   set: function(value) {
    //     if (value) {
    //       this.$store.commit('subnavmenu/SHOW_SUBNAVMENU')
    //     } else {
    //       this.$store.commit('subnavmenu/HIDE_SUBNAVMENU')
    //     }
    //   }
    // },
    // currentCompanySet: function() {
    //   return !!this.$store.state.companies.currentCompany.guid;
    // },
    // collapse: {
    //   get() {
    //     return !!this.$store.state.userSettings.navmenu.collapse
    //   },
    //   set(value) {
    //     this.$store.dispatch('userSettings/toggleNavmenu', value)
    //   }
    // },
    // linkIsSubmenu: function() {
    //   if (this.currentNavlink !== null) {
    //     return this.navlinks[this.currentNavlink].menu
    //   }
    // },
    // submenuTitle: function() {
    //   if (this.currentNavlink !== null) {
    //     return this.navlinks[this.currentNavlink].title
    //   }
    //   return ''
    // },
    // submenuItems: function() {
    //   if (this.currentNavlink !== null) {
    //     return this.navlinks[this.currentNavlink].items
    //   }
    //   return []
    // }
  // },

  // methods: {
  //   changeNavlink: function(index) {
  //     this.$store.commit('companies/SET_NAVMENU')

  //     if (this.currentNavlink === index && this.currentNavlink !== null) {
  //       this.currentNavlink = null
  //     } else {
  //       this.currentNavlink = index
  //     }

  //     this.showSubNavmenu = false
  //     if (this.currentNavlink !== null && this.linkIsSubmenu) {
  //       this.showSubNavmenu = true
  //     }
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.Navmenu__menu-horizontal {
  display: flex;
  position: fixed !important;
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #EBEEF5;
  z-index: 2000;

  &__collapse {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
  }
}

.Navmenu__menu-horizontal__expand__user-menu {
  display: none;
}

.Navmenu__group-left, .Navmenu__menu-horizontal__expand {
  display: flex;
  align-items: center;
}

.Navmenu__group-left {
  position: absolute;
  left: 0;
  margin-left: 25px;

  &__links {
    display: none;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;

    &__link {
      text-align: center;
      display: block;
    }
  }
}

.Navmenu__menu-horizontal__expand {
  position: absolute;
  right: 0;
  margin-right: 25px;
  z-index: 2002;

  &__user-menu {
    padding: 5px;
  }
}

@media (min-width: 576px) {
  .Navmenu__group-left__links, .Navmenu__menu-horizontal__expand__user-menu {
    display: flex !important;
  }

  .Navmenu__menu-horizontal__expand__hamburger-menu {
    display: none !important;
  }
}
</style>
