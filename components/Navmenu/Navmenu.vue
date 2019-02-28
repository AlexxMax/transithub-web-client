<template>
  <div>
    <div class="Navmenu__menu-horizontal area">

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

      <div class="Navmenu__group-right">
        <th-user-menu class="Navmenu__group-right__user-menu"/>
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
  </div>
</template>

<script>
import MainLogo from "@/components/Navmenu/MainLogo"
import UserMenu from "@/components/Navmenu/User/UserMenu"
// import Navlink from '@/components/Navmenu/Navlink'
import NavmenuItem from '@/components/Navmenu/NavmenuItem'
// import SlideLeft from '@/components/Common/Transitions/SlideLeft'
// import Companies from '@/components/Navmenu/CompaniesList'
// import CompanyItemMenu from '@/components/Navmenu/CompaniesListElements/CompanyListItemMenu'
// import CompaniesMenu from '@/components/Navmenu/CompaniesListElements/CompaniesListMenu'

export default {
  name: 'th-navmenu',

  components: {
    "th-main-logo": MainLogo,
    "th-user-menu": UserMenu,
    // "th-navlink": Navlink,
    NavmenuItem,
    // SlideLeft,
    // Companies,
    // CompanyItemMenu,
    // CompaniesMenu
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

      autoItems: [{
        href: this.$i18n.path('workspace/requests'),
        label: this.$t('lists.requests')
      }, {
        href: this.$i18n.path('workspace/vehicles-registers'),
        label: this.$t('lists.vehiclesRegisters')
      }, {
        href: this.$i18n.path('workspace/races'),
        label: this.$t('lists.races')
      }],

      railwayItems: [{
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
    };
  },

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
  position: fixed !important;
  width: 100%;
  height: 60px;
  z-index: 1;
  background-color: white;
  border-bottom: 1px solid #EBEEF5;
}

.area {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
}

.Navmenu__group-left, .Navmenu__group-right {
  display: flex;
  align-items: center;
}

.Navmenu__group-left {
  position: absolute;
  left: 0;
  margin-left: 25px;

  &__links {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;

    &__link {
      text-align: center;
      display: block;
    }
  }
}

.Navmenu__group-right {
  position: absolute;
  right: 0;
  margin-right: 25px;

  .icon-bell {
    color: #606266;
    font-size: 1rem;
  }

  &__user-menu {
    // margin-left: 30px;
    padding: 5px;
  }
}
</style>
