<template>
  <div>
    <div class="Navmenu__menu-horizontal">

      <div class="Navmenu__menu-horizontal__collapse">
        <div class="Navmenu__group-left">
          <th-main-logo />

          <div class="Navmenu__group-left__links">
            <NavmenuItem v-if="userAccessAuto" :label="$t('links.navmenu.auto')" :items="autoItems"/>
            <NavmenuItem v-if="userAccessRailway" :label="$t('links.navmenu.railway')" :items="railwayItems"/>
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

      <CompanyMenu class="Navmenu__menu-horizontal__expand__company-menu" />

      <th-user-menu class="Navmenu__menu-horizontal__expand__user-menu" />

      <HamburgerMenu class="Navmenu__menu-horizontal__expand__hamburger-menu" />
    </div>
  </div>
</template>

<script>
import MainLogo from "@/components/Navmenu/MainLogo"
import UserMenu from "@/components/Navmenu/User/UserMenu"
import CompanyMenu from "@/components/Navmenu/Company/CompanyMenu"
import NavmenuItem from '@/components/Navmenu/NavmenuItem'
import CreateNewMenu from "@/components/Navmenu/CreateNewMenu"
import HamburgerMenu from "@/components/Navmenu/HamburgerMenu"

export default {
  name: 'th-navmenu',

  components: {
    "th-main-logo": MainLogo,
    "th-user-menu": UserMenu,
    CompanyMenu,
    NavmenuItem,
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
        key: 0,
        label: this.$t('forms.common.documents'),
        isGroup: true
      }, {
        key: 1,
        href: this.$i18n.path('workspace/requests'),
        label: this.$t('lists.requests')
      }, /*{
        key: 2,
        href: this.$i18n.path('workspace/vehicles-registers'),
        label: this.$t('lists.vehiclesRegisters')
      }, {
        key: 3,
        href: this.$i18n.path('workspace/races'),
        label: this.$t('lists.races')
      },*/ {
        key: 4,
        label: this.$t('forms.common.catalogs'),
        isGroup: true,
        addMarginTop: true
      }, {
        key: 5,
        href: this.$i18n.path('workspace/drivers'),
        label: this.$t('forms.common.drivers')
      }, {
        key: 6,
        href: this.$i18n.path('workspace/vehicles'),
        label: this.$t('forms.common.vehicles')
      }, {
        key: 7,
        href: this.$i18n.path('workspace/pq-warehouses'),
        label: this.$t('forms.common.pqWarehouses')
      },{
        key: 8,
        href: this.$i18n.path('workspace/pq-parkings'),
        label: this.$t('forms.common.pqParkings')
      }, {
        key: 10,
        href: this.$i18n.path('workspace/pq-queues'),
        label: this.$t('forms.queue.queues')
      }]
    },

    railwayItems() {
      return [{
        key: 0,
        label: this.$t('forms.common.documents'),
        isGroup: true
      }, {
        key: 1,
        href: this.$i18n.path('workspace/railway-aggregations'),
        label: this.$t('lists.railwayAggregations')
      }, {
        key: 2,
        href: this.$i18n.path('workspace/railway-requests'),
        label: this.$t('lists.railwayRequests')
      }, {
        key: 3,
        label: this.$t('forms.common.catalogs'),
        isGroup: true,
        addMarginTop: true
      }, {
        key: 4,
        href: this.$i18n.path('workspace/railway-stations'),
        label: this.$t('forms.common.railwayStations')
      }]
    },

    userAccessAuto() {
      return this.$store.state.companies.userAccess.accessAuto
    },

    userAccessRailway() {
      return this.$store.state.companies.userAccess.accessRailway
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
  z-index: 5;

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
  height: 60px;
  position: fixed;
  right: 0;
  margin-right: 17px;
  z-index: 6;

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
