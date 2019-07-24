<template>
  <div class="MainContainer">

    <!-- Navbar -->
    <el-header id="top" class="Navbar" v-bind:class="{ changed: scrolled || isSubRoute }" style="height: 0;">
      <el-row type="flex" class="Navbar__stick-navbar" :gutter="50">

        <div class="Navbar__navbar-brand">
          <nuxt-link class="Navbar__navbar-brand__logo" to="/">Transithub</nuxt-link>
          <p class="Navbar__navbar-brand__sublogo">Driving agribusiness every day</p>
        </div>

        <div class="Navbar__navbar-toggler" @click="showMenu = !showMenu">
          <span class="Navbar__navbar-toggler__icon">
            <fa icon="bars" class="el-icon-menu"/>
          </span>

          <div class="Navbar__navbar-toggler__navbar-collapse" v-show="showMenu">
            <nuxt-link :to="$i18n.path('auto-transportations')" class="Navbar__navbar-link">{{ $t('forms.common.autoTransportation') }}</nuxt-link>
            <nuxt-link :to="$i18n.path('railway-aggregations')" class="Navbar__navbar-link">{{ $t('forms.common.railwayTransportation') }}</nuxt-link>
            <nuxt-link :to="$i18n.path('login')" class="Navbar__navbar-link">{{ $t('forms.user.login.title') }}</nuxt-link>
            <nuxt-link :to="$i18n.path('registration')" class="Navbar__navbar-link btn-register">{{ $t('forms.user.registration.title') }}</nuxt-link>
          </div>
        </div>

        <div class="Navbar__navbar">
          <!-- <div class="Navbar__navigation">
            <div class="Navbar__navigation-right">
              <div class="Navbar__navbar-link">
                <div class="Navbar__dropdown">
                  <div class="Navbar__dropdown__header" @click="toggleDropdown($event)">
                      <span>{{ $t('forms.common.transportation') }}</span>
                  </div>

                  <div class="Navbar__dropdown__content">
                      <ul>
                          <li>
                            <a class="Navbar__navbar-link">{{ $t('forms.common.autoTransportation') }}</a>
                          </li>
                          <li>
                            <a class="Navbar__navbar-link">{{ $t('forms.common.railwayTransportation') }}</a>
                          </li>
                      </ul>
                  </div>
                </div>
              </div>


            </div>

            <div class="Navbar__navigation-left">
              <nuxt-link
                class="Navbar__navbar-link"
                :to="$i18n.path('login')"
              >
                {{ $t('forms.user.login.title') }}
              </nuxt-link>

              <nuxt-link
                class="Navbar__navbar-link btn-register"
                :to="$i18n.path('registration')"
              >
                {{ $t('forms.user.registration.title') }}
              </nuxt-link>
            </div>
          </div> -->

          <el-menu mode="horizontal" menu-trigger="click">

            <el-menu-item index="1" class="Navbar__navbar-link">
              <div class="Navbar__dropdown" @mouseover="showMenu = true" @mouseleave="showMenu = false">
                <div class="Navbar__dropdown__header animated_link" >
                  <span>{{ $t('forms.common.transportation') }}</span>
                </div>

                <div class="Navbar__dropdown__content animated_link">
                  <ul v-if="showMenu" @click="showMenu = false">
                    <li>
                      <nuxt-link :to="$i18n.path('auto-transportations')" class="Navbar__navbar-link">{{ $t('forms.common.autoTransportation') }}</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link :to="$i18n.path('railway-aggregations')" class="Navbar__navbar-link">{{ $t('forms.common.railwayTransportation') }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </el-menu-item>

            <el-menu-item index="2" class="Navbar__navbar-link animated_link">
              <nuxt-link :to="isHomeUrl ? '' : '/' + '#Functional'" v-scroll-to="'#Functional'">{{ $t('forms.common.functionalTitle') }}</nuxt-link>
            </el-menu-item>

            <el-menu-item index="3" class="Navbar__navbar-link animated_link">
              <nuxt-link :to="isHomeUrl ? '' : '/' + '#App'" v-scroll-to="'#App'">TrackCheckBot</nuxt-link>
            </el-menu-item>

            <el-menu-item class="Navbar__navbar-link th-left-auto animated_link" index="4">
              <nuxt-link :to="$i18n.path('login')">{{ $t('forms.user.login.title') }}</nuxt-link>
            </el-menu-item>

            <el-menu-item class="Navbar__navbar-link" index="5">
              <nuxt-link :to="$i18n.path('registration')" class="btn-register">{{ $t('forms.user.registration.title') }}</nuxt-link>
            </el-menu-item>
          </el-menu>

        </div>
      </el-row>
    </el-header>

    <el-main>
      <nuxt></nuxt>
    </el-main>

    <el-footer style="height: 100%;" id="Footer">
      <div class="Footer__wrapper">
        <div>
          <h1 class="Footer__wrapper__logo">Transithub</h1>
          <p class="Footer__wrapper__sublogo">Driving agribusiness every day</p>
        </div>

        <div class="Footer__wrapper__subscription animated_link">
          <a rel="noopener" href="https://t.me/TH_support" target="_blank">{{ $t('forms.common.subscribeUpdates') }}
            <fa class="icon" :icon="['fab', 'telegram-plane']"></fa>
          </a>

        </div>

        <div class="Footer__wrapper__list-links animated_link">
          <ul class="Footer__wrapper__list-links__items">
            <li><nuxt-link :to="$i18n.path('auto-transportations')">{{ $t('forms.common.autoTransportation') }}</nuxt-link></li>
            <li><nuxt-link :to="$i18n.path('railway-aggregations')">{{ $t('forms.common.railwayTransportation') }}</nuxt-link></li>
            <li><nuxt-link :to="isHomeUrl ? '' : '/' + '#Functional'" v-scroll-to="'#Functional'">{{ $t('forms.common.functionalTitle') }}</nuxt-link></li>
            <li><nuxt-link :to="isHomeUrl ? '' : '/' + '#App'" v-scroll-to="{el: '#App'}">TrackCheckBot</nuxt-link></li>
          </ul>
        </div>

        <div class="Footer__copyright">
          <p>&copy; {{ $t('forms.common.copyrightFooter') }}</p>
        </div>

        <!-- <nuxt-link v-scroll-to="{
          el: '#top',
          duration: 900,
          easing: 'ease-in',
          offset: -200
          }"  to="#"
          class="Footer__wrapper__return-to-top">
          <fa icon="chevron-up"/>
        </nuxt-link> -->
      </div>
    </el-footer>

    <Cookies />

    <Backtop/>
  </div>
</template>

<script>
import Cookies from '@/components/Common/Cookies'
import Backtop from '@/components/Common/Buttons/BacktopButton'

export default {
  components: {
    Cookies,
    Backtop
  },

  data () {
    return {
      scrolled: false,
      showMenu: false,
      activeIndex: '1',
      //showCookieLaw: false
    }
  },

  computed: {
    isSubRoute() {
      return this.$route.name === 'LANG-railway-aggregations'
       || this.$route.name === 'LANG-railway-aggregations-guid'
       || this.$route.name === 'LANG-auto-transportations'
       || this.$route.name === 'LANG-auto-transportations-guid'
    },

    isHomeUrl() {
      if (this.$route.name === 'LANG') {
        return true
      }
      return false
    }
  },

  methods: {
    handleScroll () {
      this.scrolled = window.pageYOffset || document.documentElement.scrollTop;;
      if(this.scrolled > 100) {
        this.scrolled= true;
      }
    },

    toggleDropdown (event) {
      event.currentTarget.classList.toggle('is-active')
    }
  },

  // mounted() {
  //   this.showCookieLaw = true;
  // },

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss" scoped>
$color-primary: #ffce00;

.Navbar__navbar-brand__sublogo, .Footer__wrapper__sublogo {
  //font-family: 'Lobster', cursive;
  //font-size: 13px;
  letter-spacing: 1px;
  margin-top: -3px;
  color: white;
  text-align: center;
  font-family: 'Darker Grotesque', sans-serif;
  font-size: 8.5px;
  font-weight: 800;
  text-transform: uppercase;
}

.changed {
  background-color: #484848 !important;
  transition: padding-top .3s,padding-bottom .3s !important;
}

// Navbar
.Navbar {
  display: flex;
  width: 100%;
  padding: 40px 50px;
  position: fixed;
  top: 0;
  background-color: rgba(112, 112, 112, 0.05);
  z-index: 999;

  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  .Navbar__stick-navbar {
    width: 100%;
    margin: 0 auto !important;
    display: flex;
    justify-content: space-between;
    align-items: center;

     .Navbar__navbar-brand {
      &__logo {
        font-size: 1.75rem;
        color: $color-primary;
        font-weight: 400;
        letter-spacing: 0.36px;
        text-transform: uppercase;
        cursor: pointer;
        transition: .4s;

        &:hover {
          color: #f0b917;

          .el-menu-item:hover {
            background: transparent;
            padding-left: 25px;
            width: 270px;
            color: $color-primary;
          }
        }
      }
    }

    .Navbar__navbar {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: auto !important;
      // width: 100%;

      .Navbar__navigation {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .el-menu {
        background-color: transparent;
        border-bottom: none;
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        width: 100%;

        .Navbar__navbar-link {
          color: #333333;
          letter-spacing: 0.16px;
          border-bottom: none;
          color: white;

          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          transition: .4s;

          &:hover{
            background-color: transparent;
            color: $color-primary;
          }

          &:focus {
            background-color: transparent !important;
          }

           .Navbar__dropdown {
            // &__header {
              // &.is-active {
              //   + .Navbar__dropdown__content {
              //     height: auto;
              //     opacity: 1;
              //     visibility: visible;
              //   }
              // }
            // }

            &__content {
              // height: 0;
              // opacity: 0;
              // overflow: hidden;
              position: absolute;
              height: auto;
              opacity: 1;
              visibility: visible;
              padding-top: 15px;
              transition: opacity .3s;
              //visibility: hidden;
              border-radius: 30px;

              ul {
                text-decoration: none;
                list-style: none;
                padding: 5px 20px 20px 20px;
                background: rgba(112, 112, 112, 0.8);
                //opacity: .3;

                li {
                  height: 40px;

                  a {
                     font-size: 11px;
                  }
                }
              }
            }
          }

          .btn-register {
            color: #fff;
            border: none;
            border-radius: 30px;
            //padding: 9px 15px;
            background-color: $color-primary;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            transition: all .4s ease-in-out;

            font-size: 11px;
            padding: 9px 20px;

            &:hover {
              //box-shadow: 1px 1px 5px $color-primary;
              background-color: #0d223f;
            }
          }
        }
      }

      .th-left-auto {
        margin-left: auto !important;
      }

      .el-menu--horizontal{
        margin-left: 40px;

        .el-submenu /deep/ .el-submenu__title {
          color: white;

          &:hover{
            color: $color-primary;
            background-color: transparent;
          }
        }
      }
    }

    .Navbar__navbar-toggler {
      display: none;
    }
  }
}

.el-main {
  padding: 0;
}

.MainContainer {
  min-height: 100vh;
  overflow: hidden;
  position: relative;

}

// Footer
#Footer {
  background-color: #5D5D5D;
  padding: 30px 0 0 0;
  color: white;

  .Footer__wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;

    &__logo {
      color: $color-primary;
      font-size: 16px;
      text-transform: uppercase;
      margin-bottom: 15px;
      font-weight: 600;
      text-align: center;
    }

    &__subscription {
      text-align: center;
      margin-top: 15px;
      font-size: 11px;
      color: $color-primary;

      a {
        color: $color-primary;

        .icon {
          margin-left: 3px;
        }
      }
    }

    &__list-links {
      &__items {
        display: flex;
        flex-direction: row;
        justify-content: center;
        list-style: none;
        font-size: 10px;
        margin: 15px 0;
        padding: 0;
        transition: all .4s ease-in-out;

        li {
          padding: 0 10px;

          a {
            color: white !important;

            &:hover {
              color: $color-primary !important;
            }
          }
        }
      }
    }

    .title {
      color: #AAAAAA;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    &__return-to-top {
      z-index: 1000;
      position: absolute;
      bottom: 38px;
      right: 90px;
      background: rgba(0, 0, 0, 0.3);
      width: 40px;
      height: 40px;
      text-decoration: none;
      border-radius: 50%;
      transition: all 0.4s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.5);
      }

      .svg-inline--fa {
        color: #fff;
        margin: 0;
        position: relative;
        left: 14px;
        top: 11px;
        font-size: 15px;
        transition: all 0.4s ease;

        &:hover {
          top: 5px;
        }
      }
    }
  }
}

.animated_link {
  a {
    position: relative;
    transition: all .4s ease-in-out;

    &:hover {
      font-size: 105%;
    }

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: -2px;
      left: 0;
      background-color: $color-primary;
      visibility: hidden;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transition: all 0.3s ease-in-out 0s;
      transition: all 0.3s ease-in-out 0s;
    }

    &:hover:before {
      visibility: visible;
      background-color: $color-primary;
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
}

.Footer__copyright {
  text-align: center;
  font-size: 10px;
  background-color: #484848;
  color: #8E8E8E;
  padding: 8px 0;
}

@media screen and (max-width: 580px) {
  #Footer .Footer__wrapper {
    &__return-to-top {
      bottom: 6px;
      right: 30px;
    }
  }
}

@media (max-width: 380px) {
  .Navbar {
    padding: 40px 20px;
  }
}

@media screen and (max-width: 886px){
  .Navbar {
    color: white;

    &__stick-navbar {
      .Navbar__navbar-brand {
        &__logo {
          color: white !important;
        }
      }

      .Navbar__navbar-toggler {
        display: flex !important;
        justify-content: flex-end;
        position: absolute;
        right: 0;
        bottom: 0px;
        top: -14px;

        &__icon {
          .el-icon-menu{
            font-size: 24px;
          }
        }

        &__navbar-collapse {
          position: fixed;
          display: flex;
          flex-direction: column;
          align-items: center;
          top: 0;
          right: 0;
          left: 0;
          padding: 90px 0 30px 0;
          z-index: -1;
          background-color: #484848;

          .Navbar__navbar-link {
            display: block;
            padding: 15px 0;
            font-size: 1rem;
            color: white;
            transition: .4s ease-in-out;

            &:hover{
              color: $color-primary;
              cursor: pointer;
            }
          }
        }
      }

      .Navbar__navbar .Navbar__navbar-link {
        display: none;
      }
    }
  }
}


@media only screen and (max-width: 700px) {
  #Footer {
    height: 265px !important;

    .Footer__wrapper__list-links__items {
      flex-direction: column;
      align-items: center;

      li {
        padding: 7px 0;
      }
    }
  }
}
</style>
