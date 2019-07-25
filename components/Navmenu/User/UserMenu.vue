<template>
  <el-dropdown trigger="click">

    <Avatar
      :name="username"
      :size="38"
      cursor
      hover
    />

    <el-dropdown-menu slot="dropdown">
      <div class="th-user-card-wrapper">
        <div class="th-user-card">

          <div class="th-user-card-main">
            <el-dropdown-item disabled>
              <div class="UserMenu__dropdown-user">
                <div class="th-username">{{ username }}</div>
                <div class="th-email">{{ email }}</div>
              </div>
            </el-dropdown-item>

            <el-dropdown-item class="UserMenu__dropdown-item no-hover">
              <el-button
                class="th-user-btn UserMenu__dropdown-item__profile-link"
                type="text"
                @click="$router.push($i18n.path('user/profile'))"
              >
                {{ $t('links.system.viewProfile') }}
              </el-button>
            </el-dropdown-item>

            <!-- <el-dropdown-item class="UserMenu__dropdown-item" divided>
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text" @click="$router.push($i18n.path('user/profile'))">
                  <fa icon="user" />
                  {{ $t('links.system.profile') }}
                </el-button>
              </div>
            </el-dropdown-item> -->

             <!-- <el-dropdown-item class="UserMenu__dropdown-item">
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text">
                  <fa icon="cog" />
                  {{ $t('links.system.settings') }}
                </el-button>
              </div>
            </el-dropdown-item> -->

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
                  <fa icon="suitcase" />
                  {{ $t('links.system.companies') }}
                </el-button>
              </div>
            </el-dropdown-item>

            <el-dropdown-item class="UserMenu__dropdown-item" divided>
              <div class="th-user-link">
                <a rel="noopener" href="https://t.me/TH_support" target="_blank">
                  <el-button class="th-user-btn" type="text">
                    <fa icon="question" />
                    {{ $t('links.system.supportOnTelegram') }}
                  </el-button>
                </a>
              </div>
            </el-dropdown-item>

             <el-dropdown-item class="UserMenu__dropdown-item" divided>
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text" @click="logout">
                  <fa icon="sign-out-alt" />
                  {{ $t('links.system.logout') }}
                </el-button>
              </div>
            </el-dropdown-item>
          </div>
        </div>
      </div>
    </el-dropdown-menu>

  </el-dropdown>
</template>

<script>
import Avatar from '@/components/Common/Avatar'

export default {
  components: {
    Avatar
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
  transition: .5s;

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

.el-dropdown-menu {
  border-radius: 10px !important;
}

.UserMenu__dropdown-item {
  line-height: 16px;
  transition: .5s;

  &__profile-link {
    font-size: 12px;
    padding: 8px 15px;
    border-radius: 30px;
    background: #FFD74D;
    color: white !important;
    transition: 0.5s;
    margin: {
      top: 5px;
      bottom: 20px;
    }

    &:hover {
      background: #ffdf71;
      border-color: #ffdf71;
    }
  }
}

.no-hover {
  &:hover{
    background: transparent !important;
  }
}

.UserMenu__dropdown-item:not(.is-disabled):hover, .UserMenu__dropdown-item:focus {
  background-color: rgba(254, 205, 52, 0.15);
  color: #606266;
}

svg:not(:root).svg-inline--fa {
  margin-right: 5px;
}

.UserMenu__dropdown-user {
  color: #000;
  line-height: 16px;
  padding: {
    top: 5px;
  }
}
</style>
