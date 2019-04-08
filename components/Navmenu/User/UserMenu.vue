<template>
  <el-dropdown trigger="click">
    <span>
      <div slot="reference" class="th-user-avatar-wrapper">
        <div class="th-user-avatar">
          <th-user-avatar class="th-user-avatar-icon-collapsed" :name="username" :size="38"/>
          <!-- <div class="th-user-avatar-username">
            <span v-if="!collapse" style="font-size: 13px; font-weight: 500; color: #606266">{{ firstname }}</span>
            <span v-if="!collapse" style="font-size: 13px; font-weight: 500; color: #606266">{{ lastname }}</span>
          </div> -->
        </div>
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <div class="th-user-card-wrapper">
        <div class="th-user-card">
          <!-- <th-user-avatar
            slot="reference"
            :name="username"
            class="th-user-avatar-big"
            :size="85"
            :shadow=false
            :cursor=false /> -->

          <div class="th-user-card-main">
            <el-dropdown-item disabled>
              <div class="UserMenu__dropdown-user">
                <div class="th-username">{{ username }}</div>
                <div class="th-email">{{ email }}</div>
              </div>
            </el-dropdown-item>

            <el-dropdown-item class="UserMenu__dropdown-item" divided>
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text" @click="$router.push($i18n.path('user/profile'))">
                  <fa icon="user" />
                  {{ $t('links.system.profile') }}
                </el-button>
              </div>
            </el-dropdown-item>

             <!-- <el-dropdown-item class="UserMenu__dropdown-item">
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text">
                  <fa icon="cog" />
                  {{ $t('links.system.settings') }}
                </el-button>
              </div>
            </el-dropdown-item> -->

            <el-dropdown-item class="UserMenu__dropdown-item">
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text" @click="logout">
                  <fa icon="sign-out-alt" />
                  {{ $t('links.system.logout') }}
                </el-button>
              </div>
            </el-dropdown-item>

            <el-dropdown-item class="UserMenu__dropdown-item" divided>
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text" @click="$router.push($i18n.path('workspace/user-favorites'))">
                  <fa icon="bookmark" />
                  {{ $t('links.system.userFavorites') }}
                </el-button>
              </div>
            </el-dropdown-item>

             <el-dropdown-item class="UserMenu__dropdown-item">
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text" @click="$router.push($i18n.path('workspace/user-subscriptions'))">
                  <fa icon="bolt" />
                  {{ $t('links.system.userSubscriptions') }}
                </el-button>
              </div>
            </el-dropdown-item>

            <el-dropdown-item class="UserMenu__dropdown-item" divided>
              <div class="th-user-link">
                <el-button
                  class="th-user-btn"
                  type="text"
                  @click="$router.push($i18n.path('workspace/companies'))"
                >
                  <fa icon="building" />
                  {{ $t('links.system.companies') }}
                </el-button>
              </div>
            </el-dropdown-item>

            <!-- <el-dropdown-item class="UserMenu__dropdown-item">
              <div class="th-user-link">
                <el-button
                  class="th-user-btn"
                  type="text"
                  @click="$store.dispatch('companies/showCreateNewDialog', true)"
                >
                  <fa icon="plus" />
                  {{ $t('links.system.newCompany') }}
                </el-button>
              </div>
            </el-dropdown-item> -->
          </div>
        </div>
      </div>
    </el-dropdown-menu>

  </el-dropdown>
</template>

<script>
import Avatar from "@/components/Common/Avatar.vue";

export default {
  components: {
    "th-user-avatar": Avatar
  },

  computed: {
    username: function() {
      return this.$store.getters["user/username"];
    },
    firstname: function() {
      return this.$store.state.user.firstname;
    },
    lastname: function() {
      return this.$store.state.user.lastname;
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
      // window.location.reload(true);
    }
  }
};
</script>

<style lang="scss" scoped>
.th-username {
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 500;
  margin-top: 7px;
}

.th-email {
  font-size: 12px;
  font-weight: 300;
  margin: 10px 0 15px 0;
}

.th-user-link {
  margin: 0 -20px;
  padding: 0 20px;

  &:hover {
    border-left: 2px solid #fecd34;
  }

  .th-user-btn {
    width: 100%;
    text-align: left;
    font-family: Montserrat;
    color: #606266 !important;
    font-weight: 400 !important;
  }
}

.th-user-avatar-wrapper {
  width: 100%;
  cursor: pointer;

  .th-user-avatar-icon-collapsed {
    box-shadow: 0px 0px 1px 4px rgba(175, 176, 178, 0.20);
    transition: .5s;

      &:hover {
      box-shadow: 0px 0px 2px 4px rgba(175, 176, 178, 0.28);
    }
  }
}

.el-dropdown-menu {
  border-radius: 10px !important;
}

.UserMenu__dropdown-item {
  line-height: 16px;
  transition: .5s;
}

.UserMenu__dropdown-item:not(.is-disabled):hover, .UserMenu__dropdown-item:focus {
  background-color: rgba(254, 205, 52, 0.15) !important;
  color: #606266 !important;
}

svg:not(:root).svg-inline--fa {
  margin-right: 5px;
}

.UserMenu__dropdown-user {
  color: #000;
  line-height: 16px;
  padding: {
    top: 5px;
    bottom: 5px;
  }
}
</style>
