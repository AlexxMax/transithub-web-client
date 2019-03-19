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

        <div class="Navmenu__group-right">
          <th-user-menu class="Navmenu__group-right__user-menu"/>
        </div>
      </div>

      <div class="Navmenu__menu-horizontal__expand">
        <div class="Navmenu__group-left">
          <th-main-logo />
        </div>

        <div class="Navmenu__group-right">
          <div id="menu-toggle">
            <input type="checkbox" />
              <span></span>
              <span></span>
              <span></span>

            <div id="menu">
              <div class="Menu__item">
                <div slot="reference" class="Menu__item__user-avatar-wrapper">
                  <th-user-avatar class="Menu__item__user-avatar-wrapper__icon-collapsed" :name="username" :size="65"/>
                </div>
              </div>

              <div class="Menu__item" style="margin-bottom: -15px;">
                <div class="Menu__item__user">
                  <div class="Menu__item__user__username">{{ username }}</div>
                  <div class="Menu__item__user__email">{{ email }}</div>
                </div>
              </div>

              <div class="divided"></div>

              <div class="Menu__content">

                <!-- <div class="Menu__content__item" style="margin-bottom: -15px;">
                  <div class="Menu__content__item__collapse-menu">
                    <input id="toggle-auto" type="checkbox" checked>
                    <label for="toggle-auto">{{ $t('links.navmenu.auto') }}</label>
                    <div id="expand-auto">
                      <section>
                        <div>
                          <nuxt-link :to="this.$i18n.path('workspace/requests')">
                            {{ $t('lists.requests') }}
                          </nuxt-link>
                        </div>

                        <div>
                          <nuxt-link :to="this.$i18n.path('workspace/races')">
                            {{ $t('lists.races') }}
                          </nuxt-link>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="divided"></div> -->

                <div class="Menu__content__item" style="margin-bottom: -15px;">

                  <div class="Menu__content__item__collapse-menu">
                    <input id="toggle-railway" type="checkbox" checked>
                    <label for="toggle-railway">{{ $t('links.navmenu.railway') }}</label>

                    <div id="expand-railway">
                      <section>
                        <div>
                          <nuxt-link :to="this.$i18n.path('workspace/railway-aggregations')">
                            {{ $t('lists.railwayAggregations') }}
                          </nuxt-link>
                        </div>

                        <div>
                          <nuxt-link :to="this.$i18n.path('workspace/railway-requests')">
                            {{ $t('lists.railwayRequests') }}
                          </nuxt-link>
                        </div>

                        <div>
                          <nuxt-link :to="this.$i18n.path('workspace/railway-stations')">
                            {{ $t('forms.common.catalog') }} : {{ $t('forms.common.railwayStations') }}
                          </nuxt-link>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="divided"></div>


                <div class="Menu__content__item">
                  <div>
                    <el-button type="text" @click="$router.push($i18n.path('user/profile'))">
                      <fa icon="user" />
                      {{ $t('links.system.profile') }}
                    </el-button>
                  </div>
                </div>

                <div class="Menu__content__item">
                  <div>
                    <el-button type="text" @click="$router.push($i18n.path('workspace/user-favorites'))">
                      <fa icon="bookmark" />
                      {{ $t('links.system.userFavorites') }}
                    </el-button>
                  </div>
                </div>

                <div class="divided"></div>

                <div class="Menu__content__item">
                  <div>
                    <el-button type="text" @click="$router.push($i18n.path('workspace/companies'))">
                    <fa icon="building" />
                      {{ $t('links.system.companies') }}
                    </el-button>
                  </div>
                </div>

                <div class="Menu__content__item">
                  <div>
                    <el-button type="text" @click="$store.dispatch('companies/showCreateNewDialog', true)">
                      <fa icon="plus" />
                      {{ $t('links.system.newCompany') }}
                    </el-button>
                  </div>
                </div>
              </div>

              <div class="Menu__footer">
                <div class="divided"></div>

                <div class="Menu__footer__item bottom">
                  <el-button type="text" @click="logout">
                    <fa icon="sign-out-alt" />
                    {{ $t('links.system.logout') }}
                  </el-button>
                </div>
              </div>
            </div>
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
  </div>
</template>

<script>
import MainLogo from "@/components/Navmenu/MainLogo"
import UserMenu from "@/components/Navmenu/User/UserMenu"
import NavmenuItem from '@/components/Navmenu/NavmenuItem'
import Avatar from "@/components/Common/Avatar.vue";

export default {
  name: 'th-navmenu',

  components: {
    "th-main-logo": MainLogo,
    "th-user-menu": UserMenu,
    NavmenuItem,
    "th-user-avatar": Avatar
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

  computed: {
    username: function() {
      return this.$store.getters["user/username"];
    },
    email: function() {
      return this.$store.state.user.email;
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
  z-index: 999;

  &__collapse {
    display: none;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
  }

  &__expand {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
  }
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

  &__user-menu {
    padding: 5px;
  }
}

#menu-toggle {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  -webkit-user-select: none;
  user-select: none;

  input {
    display: flex;
    width: 40px;
    height: 32px;
    position: absolute;
    cursor: pointer;
    opacity: 0;
    z-index: 2;

    &:checked ~ span {
      opacity: 1;
      transform: rotate(45deg) translate(-3px, -1px);
      background: #36383F;

      &:nth-last-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }

      &:nth-last-child(2) {
        transform: rotate(-45deg) translate(0, -1px);
      }
    }

    &:checked ~ div {
      transform: none;
    }
  }

  span {
    display: flex;
    width: 23px;
    height: 2px;
    margin-bottom: 3px;
    position: relative;
    background:#606266;
    border-radius: 5px;
    z-index: 1;
    transform-origin: 5px 0px;
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                opacity 0.55s ease;

    &:first-child {
      transform-origin: 0% 0%;
    }

    &:nth-last-child(2) {
      transform-origin: 0% 100%;
    }
  }
}

#menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  right: -110%;
  width: 100vw;
  height: 100vh;
  box-shadow: 0 0 5px #EBEEF5;
  margin: -50px 0 0 -50px;
  padding-top: 75px;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
  transform-origin: 0% 0%;
  transform: translate(100%, 0);
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);

  .Menu__item {
    padding: 10px 0;
    transition-delay: 2s;
    list-style: none;

    &__user-avatar-wrapper {
      width: 100%;
      margin-bottom: -10px;

      &__icon-collapsed {
        box-shadow: 0px 0px 1px 4px rgba(175, 176, 178, 0.20);
      }
    }
  }

  .divided {
    content: '';
    height: 1px;
    display: block;
    width: 100%;
    //margin: 15px 0 20px 0;
    background-color: #EBEEF5;
  }
}

.Menu__item__user {
  color: #000;
  line-height: 16px;
  padding: {
    top: 5px;
    bottom: 5px;
  }

  &__username {
    font-size: 24px;
    text-transform: capitalize;
    font-weight: 500;
    margin-top: 7px;
  }

  &__email {
    font-size: 16px;
    font-weight: 300;
    margin: 10px 0 15px 0;
  }
}

.el-collapse {
  border: none;
}

.el-collapse-item__content > div {
  padding: 5px 0;

  & > a {
    color: #606266 !important;
  }
}

.el-collapse-item__wrap {
  background: transparent;
}

.el-collapse-item__header {
  background: transparent !important;
  line-height: 38px !important;
  border-bottom: none !important;
  font-size: 18px !important;
}

.el-collapse-item__arrow {
  margin: 0 auto;
}

.el-button {
  font-size: 18px;
  color: #606266;
  padding: 8px 0px;
  font-family: "Montserrat" !important;
  font-weight: 400;
}

.Menu__content__item__collapse-menu {
  input {
    display: none;
    visibility: hidden;
  }

  label {
    display: block;
    font-size: 18px;
    color: #606266;

    &::after {
      content: '';
      transform: rotate(-45deg);
      border-width: 0 .3vmin .3vmin 0;
      border-style: solid;
      font-size: 13px;
      display: inline-block;
      width: 5px;
      height: 5px;
      transition: all 0.5s;
      margin-left: 5px;
    }
  }

  #expand-railway, #expand-auto {
    margin-top: 15px;
    height: 0px;
    overflow: hidden;
    transition: height 0.5s;
  }

  section {
    margin-top: -8px;

    & > div {
      padding: 14px 0;
      font-size: 15px;

      a {
        color: #000000;
      }
    }
  }

  #toggle-railway:checked ~ #expand-railway {
    height: 135px;
  }

  #toggle-auto:checked ~ #expand-auto {
    height: 80px;
  }

  #toggle-railway:checked ~ label::after, #toggle-auto:checked ~ label::after {
    transform: rotate(225deg);
    margin-top: 0;
  }
}

svg:not(:root).svg-inline--fa {
  font-size: 14px;
  margin-right: 10px;
}

.Menu__content {
  text-align: left;
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: calc(100vh - 282px);

  &__item {
    //padding: 10px 30px !important;
    padding: 15px 30px 10px 30px !important;
  }
}

.Menu__footer {
  height: 50px;
  width: 100vw;

  &__item {
    padding: 10px 30px !important;
    text-align: left;

    .el-button {
      color: #F56C6C;
    }
  }
}

@media (min-width: 576px) {
  .Navmenu__menu-horizontal {
    &__collapse {
      display: flex !important;
      flex-basis: auto;
    }

    &__expand {
      display: none;
    }
  }
}

@media (max-width: 414px) {
  .Menu__item__user {
    &__username {
      font-size: 16px;
    }

    &__email {
      font-size: 12px;
    }
  }

  .divided {
    margin: 10px 0 5px 0 !important;
  }

  .Menu__content__item__collapse-menu {
    label, section > div {
      font-size: 14px;
    }
  }

  .el-button {
    font-size: 14px;
    padding: 4px 0;
  }

  svg:not(:root).svg-inline--fa {
    font-size: 11px;
  }
}

@media (max-width: 320px) {
  #menu {
    height: auto;

    .Menu__content {
      min-height: calc(100vh - 278px);
    }

    .Menu__footer {
      height: 60px;
    }
  }
}
</style>
