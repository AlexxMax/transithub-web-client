<template>
  <div id="menu-toggle">
    <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>

    <div id="menu">
      <div class="Menu__item">
        <div slot="reference" class="Menu__item__user-avatar-wrapper">
          <Avatar
            class="hamburger-menu__avatar"
            :name="username"
            :size="65"
          />
        </div>
      </div>

      <div class="Menu__item" style="margin-bottom: -15px;">
        <div class="Menu__item__user">
          <div class="Menu__item__user__username">{{ username }}</div>
          <div class="Menu__item__user__email">{{ email }}</div>
        </div>
      </div>

      <div class="Menu__content">
        <div class="Menu__content__item" style="margin-bottom: -25px;">
          <div class="Menu__content__item__collapse-menu">
            <input id="toggle-auto" type="checkbox">
            <label for="toggle-auto">{{ $t('links.navmenu.auto') }}</label>
            <div id="expand-auto">
              <section>
                <div>
                  <el-button type="text" @click="$router.push($i18n.path('workspace/requests'))">
                    {{ $t('lists.requests') }}
                  </el-button>
                </div>

                <div>
                  <el-button type="text" @click="$router.push($i18n.path('workspace/drivers'))">
                    {{ $t('forms.common.drivers') }}
                  </el-button>
                </div>

                 <div>
                  <el-button type="text" @click="$router.push($i18n.path('workspace/vehicles'))">
                    {{ $t('forms.common.vehicles') }}
                  </el-button>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div class="Menu__content__item" style="margin-bottom: -25px;">

          <div class="Menu__content__item__collapse-menu">
            <input id="toggle-railway" type="checkbox">
            <label for="toggle-railway">{{ $t('links.navmenu.railway') }}</label>

            <div id="expand-railway">
              <section>
                <div>
                  <el-button type="text" @click="$router.push($i18n.path('workspace/railway-aggregations'))">
                    {{ $t('lists.railwayAggregations') }}
                  </el-button>
                </div>

                <div>
                  <el-button type="text" @click="$router.push($i18n.path('workspace/railway-requests'))">
                    {{ $t('lists.railwayRequests') }}
                  </el-button>
                </div>

                <div>
                  <el-button type="text" @click="$router.push($i18n.path('workspace/railway-stations'))">
                    {{ $t('forms.common.catalog') }}: {{ $t('forms.common.railwayStations') }}
                  </el-button>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div class="Menu__content__item" style="margin-bottom: -25px;">
          <div class="Menu__content__item__collapse-menu">
            <input id="toggle-queue" type="checkbox">
            <label for="toggle-queue">{{ $t('links.navmenu.electronicQueues') }}</label>

            <div id="expand-queue">
              <section>
                <div>
                  <el-button type="text" @click="$router.push($i18n.path('workspace/pq-queue-profiles'))">
                    {{ $t('forms.common.pqQueueProfiles') }}
                  </el-button>
                </div>

                <div>
                  <el-button type="text" @click="$router.push($i18n.path('workspace/pq-warehouses'))">
                    {{ $t('forms.common.pqWarehouses') }}
                  </el-button>
                </div>

                <div>
                  <el-button type="text" @click="$router.push($i18n.path('workspace/pq-parkings'))">
                    {{ $t('forms.common.pqParkings') }}
                  </el-button>
                </div>

                 <div>
                  <el-button type="text" @click="$router.push($i18n.path('workspace/pq-queues'))">
                    {{ $t('forms.queue.queues') }}
                  </el-button>
                </div>
              </section>
            </div>
          </div>
        </div>

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

         <div class="Menu__content__item">
          <div>
            <el-button type="text" @click="$router.push($i18n.path('workspace/user-subscriptions'))">
              <fa icon="bolt" />
              {{ $t('links.system.userSubscriptions') }}
            </el-button>
          </div>
        </div>


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
            <a rel="noopener" href="https://t.me/TH_support" target="_blank">
              <el-button class="th-user-btn" type="text">
                <fa icon="question" />
                {{ $t('links.system.supportOnTelegram') }}
              </el-button>
            </a>
          </div>
        </div>

        <!-- <div class="Menu__content__item">
          <div>
            <el-button type="text" @click="$store.dispatch('companies/showCreateNewDialog', true)">
              <fa icon="plus" />
              {{ $t('links.system.newCompany') }}
            </el-button>
          </div>
        </div> -->
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
</template>

<script>
import Avatar from '@/components/Common/Avatar'

export default {
  name: 'th-hamburger-menu',

  components: {
    Avatar
  },

  computed: {
    username: function() {
      return this.$store.getters["user/username"];
    },
    email: function() {
      return this.$store.state.user.email;
    },
  },

  methods: {
    logout: async function() {
      this.$nuxt.layoutName = "public";
      this.$store.dispatch("user/userLogout");
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
.hamburger-menu {
  &__avatar {
    background: #c0c4cc !important;
  }
}

#menu-toggle {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  user-select: none;
  margin-right: 10px;

  input {
    display: flex;
    width: 40px;
    height: 32px;
    position: absolute;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
    top: -10px;
    left: -15px;

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
    z-index: 1;
    background: #606266;
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
  position: fixed;
  right: 0;
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
        box-shadow: 0px 0px 1px 4px rgba(175, 176, 178, 0.1);
      }
    }
  }

  .divided {
    content: '';
    height: 1px;
    display: block;
    width: 100%;
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
  font-size: 16px;
  color: #606266;
  padding: 8px 0px;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 400;
}

.Menu__content__item__collapse-menu {
  padding: 8px 0px;

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
      width: 8px;
      height: 8px;
      transition: all 0.5s;
      margin-left: 5px;
      margin-bottom: 1px;
      color: #606266;
    }
  }

  #expand-railway, #expand-auto, #expand-queue {
    margin-top: 15px;
    height: 0px;
    overflow: hidden;
    transition: height 0.5s;
  }

  section {
    margin-top: -8px;

    & > div {
      padding: 14px 0;

      .el-button {
        color: #000000;
        font-size: 15px;
        padding: 0;
      }
    }
  }

  #toggle-auto:checked ~ #expand-auto, #toggle-railway:checked ~ #expand-railway,  #toggle-queue:checked ~ #expand-queue {
    height: 205px;
  }

  #toggle-railway:checked ~ label::after, #toggle-auto:checked ~ label::after, #toggle-queue:checked ~ label::after{
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
  height: calc(100vh - 200px);
  overflow-y: auto;

  &__item {
    margin: {
      top: 2px;
      bottom: 2px;
    }
    padding: 15px 30px 10px 30px !important;
  }
}

.Menu__footer {
  height: 130px;
  width: 100vw;

  &__item {
    padding: 10px 30px !important;
    text-align: left;

    .el-button {
      color: #F56C6C;
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
      font-size: 16px;
    }
  }

  .el-button {
    font-size: 16px !important;
    padding: 4px 0;
  }

  svg:not(:root).svg-inline--fa {
    font-size: 11px;
  }
}

@media (max-width: 320px) {
  #menu {
    height: 110vh;

    .Menu__content {
      margin-top: 20px;
      height: calc(100vh - 290px);
    }

    .Menu__footer {
      height: 60px;
    }
  }
}
</style>
