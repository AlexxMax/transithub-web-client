<template>
  <el-dropdown trigger="click">
    <span>
      <div slot="reference" class="th-user-avatar-wrapper">
        <div class="th-user-avatar">
          <th-user-avatar :class="{'th-user-avatar-icon': !collapse, 'th-user-avatar-icon-collapsed': collapse}" :name="username" :size="48"/>
          <div class="th-user-avatar-username">
            <span v-if="!collapse" style="font-size: 13px; font-weight: 500; color: #606266">{{ firstname }}</span>
            <span v-if="!collapse" style="font-size: 13px; font-weight: 500; color: #606266">{{ lastname }}</span>
          </div>
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
            <el-dropdown-item>
              <div class="th-username">{{ username }}</div>
              <div class="th-email">{{ email }}</div>
            </el-dropdown-item>

            <el-dropdown-item>
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text" size="small" @click="$router.push($i18n.path('user/profile'))">
                  <fa icon="user" />
                    {{ $t('links.system.profile') }}
                </el-button>
              </div>
            </el-dropdown-item>

             <el-dropdown-item>
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text" size="small">
                  <fa icon="cog" />
                    {{ $t('links.system.settings') }}
                </el-button>
              </div>
            </el-dropdown-item>

            <el-dropdown-item>
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text" size="small" @click="logout">
                  <fa icon="sign-out-alt" />
                    {{ $t('links.system.logout') }}
                </el-button>
              </div>
            </el-dropdown-item>

            <el-dropdown-item>
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text" size="small">
                  <fa icon="building" />
                    {{ $t('links.system.companies') }}
                </el-button>
              </div>
            </el-dropdown-item>

            <el-dropdown-item>
              <div class="th-user-link">
                <el-button class="th-user-btn" type="text" size="small">
                  <fa icon="plus" />
                    {{ $t('links.system.newCompany') }}
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
import Avatar from "@/components/Common/Avatar.vue";

export default {
  components: {
    "th-user-avatar": Avatar
  },

  props: {
    collapse: {
      type: Boolean,
      required: true
    }
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
.th-user-card-wrapper {
  //padding: 10px 15px;

  .th-user-card {
    // cursor: default;
    // display: flex;
    // flex-direction: row;

    .th-user-card-main {
      // position: absolute;
      // right: 0;
      // display: flex;
      // flex-direction: column;

      .th-username {
        font-size: 16px;
        text-transform: capitalize;
        font-weight: 500;
        margin-top: 7px;
      }

      .th-email {
        font-size: 12px;
        color: #afb0b2;
        font-weight: 300;
        margin: 10px 0 15px 0;
      }

      .th-user-links {
        // border-top: 1px solid rgb(231, 232, 236);
        margin-top: 7px;

        .th-user-link {
          //display: inline-block;
          // cursor: pointer;

          .th-user-btn {
            color: #606266 !important;
          }
        }
      }
    }
  }
}

.th-user-avatar-wrapper {
  width: 100%;
  cursor: pointer;
  // position: absolute;
  // bottom: 60px;
  // margin-bottom: 10px;

  .th-user-avatar {
    //display: flex;
    // flex-direction: row;
    // margin: 0 10px;
    //border-radius: 50%;
   
    &:hover {
      //background-color: #f8f8f8;
    }

    // .th-user-avatar-icon {
    //   margin: 6px;
    // }

    .th-user-avatar-icon-collapsed {
      //margin: 6px 6px;
      box-shadow: 0px 0px 1px 4px rgba(175, 176, 178, 0.20);

       &:hover {
        box-shadow: 0px 0px 2px 4px rgba(175, 176, 178, 0.28);
      }
    }

    // .th-user-avatar-username {
    //   margin: 6px 0;
    //   display: flex;
    //   flex-direction: column;
    // }
  }
}

.th-user-avatar-big {
  margin-right: 27px;
}

.el-dropdown-menu {
  border-radius: 10px !important;
}

.el-dropdown-menu__item {
  line-height: 16px;

  &:hover {
    border-left: 2px solid #fecd34;
  }
}

.el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item:focus {
  background-color: rgba(254, 205, 52, 0.15) !important;
  color: #606266 !important;
}

.el-button--text {
  color: #606266 !important;
  font-weight: 400 !important;
}

svg:not(:root).svg-inline--fa {
  margin-right: 5px;
}
</style>
