<template>
  <div>

    <!-- Navbar -->
    <el-header class="Navbar" v-bind:class="{ changed: scrolled || isSubRoute }" style="height: 0;">
      <el-row type="flex" class="Navbar__stick-navbar" :gutter="50">

        <div class="Navbar__navbar-brand">
          <nuxt-link class="Navbar__navbar-brand__logo" to="/">Transithub</nuxt-link>
        </div>

        <div class="Navbar__navbar-toggler" @click="showMenu = !showMenu">
          <span class="Navbar__navbar-toggler__icon">
            <fa icon="bars" class="el-icon-menu"/>
          </span>

          <div class="Navbar__navbar-toggler__navbar-collapse" v-show="showMenu">
            <nuxt-link to="#" class="Navbar__navbar-link">{{ $t('forms.common.autoTransportation') }}</nuxt-link>
            <nuxt-link to="/railway-aggregations" class="Navbar__navbar-link">{{ $t('forms.common.railwayTransportation') }}</nuxt-link>
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
                to="/login"
              >
                {{ $t('forms.user.login.title') }}
              </nuxt-link>

              <nuxt-link
                class="Navbar__navbar-link btn-register"
                to="/registration"
              >
                {{ $t('forms.user.registration.title') }}
              </nuxt-link>
            </div>
          </div> -->

          <el-menu mode="horizontal" menu-trigger="click">

              <el-menu-item index="1" class="Navbar__navbar-link">
                <div class="Navbar__dropdown">
                  <div class="Navbar__dropdown__header" @click="toggleDropdown($event)">
                      <span>{{ $t('forms.common.transportation') }}</span>
                      <!-- <i class="fas fa-angle-down"></i>
                      <i class="fas fa-angle-up"></i> -->
                  </div>

                  <div class="Navbar__dropdown__content">
                      <ul>
                          <li>
                            <nuxt-link to="#" class="Navbar__navbar-link">{{ $t('forms.common.autoTransportation') }}</nuxt-link>
                          </li>
                          <li>
                            <nuxt-link to="/railway-aggregations" class="Navbar__navbar-link">{{ $t('forms.common.railwayTransportation') }}</nuxt-link>
                          </li>
                      </ul>
                  </div>
                </div>
              </el-menu-item>

              <el-menu-item
                class="Navbar__navbar-link"
                index="2"
                v-scroll-to="{el: '#Functional'}"
                style="margin-left: -116px;"
                :route="{ path: '/#Functional' }"
              >
                {{ $t('forms.common.functions') }}
              </el-menu-item>

              <el-menu-item class="Navbar__navbar-link" index="3" v-scroll-to="{el: '#App'}">TrackCheckBot</el-menu-item>

              <!-- <el-menu-item class="Navbar__navbar-link" index="2" v-scroll-to="{el: '#'}" style="margin-left: -116px;">{{ $t('forms.common.tariffCalc') }}</el-menu-item> -->

              <el-menu-item class="Navbar__navbar-link th-left-auto" index="4">
                <a href="/login">{{ $t('forms.user.login.title') }}</a>
              </el-menu-item>

              <el-menu-item class="Navbar__navbar-link" index="5">
                <a href="/registration" class="btn-register">{{ $t('forms.user.registration.title') }}</a>
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
          <p class="Footer__wrapper__description">Driving business every day.</p>
        </div>

        <div class="Footer__wrapper__list-links">
          <p class="title">{{ $t('forms.common.menu') }}</p>
          <ul class="Footer__wrapper__list-links__items">
            <li><nuxt-link to="#">{{ $t('forms.common.autoTransportation') }}</nuxt-link></li>
            <li><nuxt-link to="#">{{ $t('forms.common.railwayTransportation') }}</nuxt-link></li>
            <!-- <li><nuxt-link to="#">{{ $t('forms.common.tariffCalc') }}</nuxt-link></li> -->
            <li><nuxt-link to="#">{{ $t('forms.common.reviewsAndSuggestions') }}</nuxt-link></li>
          </ul>
        </div>

         <!-- <el-col :xs="24" :md="12" :lg="6">
          <div>
            <ul class="Footer__list-links">

            </ul>
          </div>
        </el-col> -->

        <div>
          <div class="Footer__wrapper__contact-info">
            <p class="title">{{ $t('forms.common.feedback') }}</p>

            <div class="Footer__wrapper__contact-info__location">
              <span class="Footer__wrapper__contact-info__location__icon">
                <i class="fas fa-map-marker-alt"></i>
              </span>
              <span>01001, м. Київ, пров. Тараса Шевченка, 3</span>
            </div>

            <div class="Footer__wrapper__contact-info__phone">
              <span class="Footer__wrapper__contact-info__phone__icon">
                <i class="fas fa-mobile-alt"></i>
              </span>
              <span>+380 44 461-88-01</span>
            </div>

            <div class="Footer__wrapper__contact-info__email">
              <span class="Footer__wrapper__contact-info__email__icon">
                <i class="fas fa-envelope"></i>
              </span>
              <a href="mailto:support@company.com">support@company.com</a>
            </div>
          </div>
        </div>
      </div>
    </el-footer>

    <el-row type="flex">
        <el-col :span="24">
          <div class="Footer__copyright">
            <p>&copy; 2018. Transithub. Всі права захищені.</p>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrolled: false,
      showMenu: false,
      activeIndex: '1'
    }
  },

  computed: {
    isSubRoute() {
      return this.$route.name === 'LANG-railway-aggregations'
       || this.$route.name === 'LANG-railway-aggregations-guid'
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

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700');

.Navbar__navbar-link {
  font-size: 0.875rem;
  color: #333333;
  font-weight: 400;
  letter-spacing: 0.16px;
  cursor: pointer;
  border-bottom: none;
  color: white;
  transition: .4s ease-in-out;

  &:hover{
    background-color: transparent;
    color: #FECD34;
  }

  &:focus {
    background-color: transparent !important;
  }

    .Navbar__dropdown {
    &__header {
      &.is-active {
        + .Navbar__dropdown__content {
          height: auto;
          opacity: 1;
          visibility: visible;
        }
      }
    }

    &__content {
      height: 0;
      opacity: 0;
      overflow: hidden;
      padding-top: 15px;
      transition: opacity .3s;
      visibility: hidden;
      border-radius: 3px;

      ul {
        text-decoration: none;
        list-style: none;
        padding: 5px 20px 20px 20px;
        background: rgba(112, 112, 112, 0.8);
        //opacity: .3;

        li {
          height: 40px;

          a {
              font-size: 12px;
          }
        }
      }
    }
  }

  &.btn-register {
    color: #fff;
    border: none;
    border-radius: 30px;
    padding: 10px 18px;
    background-color: #FECD34;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
  }
}

.changed {
  background-color: #484848 !important;
  // padding-top: 45px !important;
  // padding-bottom: 45px !important;
  transition: padding-top .3s,padding-bottom .3s !important;
}

// Navbar
.Navbar {
  display: flex;
  width: 100%;
  padding: 35px 50px;
  position: fixed;
  top: 0;
  background-color: rgba(112, 112, 112, 0.2);
  z-index: 999;

  .Navbar__stick-navbar {
    width: 100%;
    margin: 0 auto !important;
    display: flex;
    justify-content: space-between;
    align-items: center;

     .Navbar__navbar-brand {
      .Navbar__navbar-brand__logo {
        font-size: 1.75rem;
        color: #FECD34;
        font-weight: 400;
        letter-spacing: 0.36px;
        text-transform: uppercase;
        cursor: pointer;

        &:hover {
          color: #f0b917;

          .el-menu-item:hover {
            background: transparent;
            padding-left: 25px;
            width: 270px;
            color: #FECD34;
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

        &-left {

        }

        &-roght {

        }
      }

      .el-menu {
        background-color: transparent;
        border-bottom: none;
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        width: 100%;

        .Navbar__navbar-link {
          font-size: 0.875rem;
          color: #333333;
          font-weight: 400;
          letter-spacing: 0.16px;
          cursor: pointer;
          border-bottom: none;
          color: white;
          transition: .4s ease-in-out;

          &:hover{
            background-color: transparent;
            color: #FECD34;
          }

          &:focus {
            background-color: transparent !important;
          }

           .Navbar__dropdown {
            &__header {
              &.is-active {
                + .Navbar__dropdown__content {
                  height: auto;
                  opacity: 1;
                  visibility: visible;
                }
              }
            }

            &__content {
              height: 0;
              opacity: 0;
              overflow: hidden;
              padding-top: 15px;
              transition: opacity .3s;
              visibility: hidden;
              border-radius: 3px;

              ul {
                text-decoration: none;
                list-style: none;
                padding: 5px 20px 20px 20px;
                background: rgba(112, 112, 112, 0.8);
                //opacity: .3;

                li {
                  height: 40px;

                  a {
                     font-size: 12px;
                  }
                }
              }
            }
          }

          .btn-register {
            color: #fff;
            border: none;
            border-radius: 30px;
            padding: 10px 18px;
            background-color: #FECD34;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
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
            color: #FECD34;
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
  padding: 0 !important;
}

// Footer
#Footer {
  background-color: #5D5D5D;
  padding: 30px 180px 10px 180px;
  color: white;

  .Footer__wrapper {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    flex-direction: row;

    &__logo {
      color: #FECD34;
      font-size: 16px;
      text-transform: uppercase;
      margin-bottom: 15px;
      font-weight: 600;
      text-align: unset;
    }

    &__description {
      font-size: 10px;
    }

    &__list-links {
      &__items {
        text-decoration: none;
        list-style: none;
        font-size: 10px;
        margin-top: 25px;
        padding: 0;

        li {
          margin-bottom: 15px;

          a {
            color: white !important;

            &:hover {
              color: #FECD34 !important;
            }
          }
        }
      }
    }

    &__contact-info {
      color: white;
      font-size: 10px;

      &__location__icon, &__phone__icon, &__email__icon {
        font-size: 16px;
        display: inline-block;
        text-align: center;
        margin: 7px 15px 7px 0;
        opacity: .3;
        height: 26px;
        width: 28px;
        background-color: white;
        color: #5D5D5D;
        border-radius: 50%;
        vertical-align: middle;
        line-height: 30px;
        //border: 2px solid white;
      }

      a {
        text-decoration: none;
        color: white;

        &:hover {
          color: #FECD34;
        }
      }
    }

    .title {
      color: #AAAAAA;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
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
              color: #FECD34;
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

@media only screen and (max-width: 992px) {
  #Footer {
    padding: 30px 0 10px 0;

    .Footer__wrapper {
      flex-direction: column;
      text-align: center;

      &__list-links {
         margin-top: 35px;

         &__items {
          margin-top: 0;
         }
      }

      &__contact-info {
        margin-top: 25px;
      }
    }
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  #Footer {
    padding: 30px 100px 10px 100px;
  }
}
</style>
