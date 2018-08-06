<template>
  <el-popover placement="right" trigger="click">
    <div class="th-user-card-wrapper">
      <div class="th-user-card">
        <th-user-avatar
          slot="reference"
          :name="username"
          class="th-user-avatar-big"
          :size="85"
          :shadow=false
          :cursor=false />

        <div class="th-user-card-main">
          <span class="th-username">{{ username }}</span>
          <span class="th-email">{{ email }}</span>

          <div class="th-user-links">
            <el-row>
              <el-col :span="12">
                <div class="th-user-link">
                  <el-button class="th-user-btn" type="text" size="small" @click="$router.push($i18n.path('user/profile'))">
                    <fa icon="user" />
                    {{ $t('links.system.profile') }}
                  </el-button>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="th-user-link" style="margin-left: 10px;">
                  <el-button class="th-user-btn" type="text" size="small" @click="logout">
                    <fa icon="sign-out-alt" />
                    {{ $t('links.system.logout') }}
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>

    <div slot="reference" class="th-user-avatar-wrapper">
      <div class="th-user-avatar">
        <th-user-avatar :class="{'th-user-avatar-icon': !collapse, 'th-user-avatar-icon-collapsed': collapse}" :name="username" :size="32"/>
        <div class="th-user-avatar-username">
          <span v-if="!collapse" style="font-size: 13px; font-weight: 500; color: #606266">{{ firstname }}</span>
          <span v-if="!collapse" style="font-size: 13px; font-weight: 500; color: #606266">{{ lastname }}</span>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script>
import Avatar from "@/components/Common/Avatar.vue"

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
      return this.$store.getters["user/username"]
    },
    firstname: function() {
      return this.$store.state.user.firstname
    },
    lastname: function() {
      return this.$store.state.user.lastname
    },
    email: function() {
      return this.$store.state.user.email;
    }
  },

  methods: {
    logout: async function() {
      this.$nuxt.layoutName = "public"
      await this.$store.dispatch("user/userLogout")
      window.location.reload(true)
    }
  }
};
</script>

<style lang="scss" scoped>
.th-user-card-wrapper {
  padding: 10px 15px;

  .th-user-card {
    cursor: default;
    display: flex;
    flex-direction: row;

    .th-user-card-main {
      display: flex;
      flex-direction: column;

      .th-username {
        font-size: 16px;
        text-transform: capitalize;
        font-weight: 500;
      }

      .th-email {
        font-size: 13px;
        margin-top: 5px;
        font-weight: 300;
      }

      .th-user-links {
        // border-top: 1px solid rgb(231, 232, 236);
        margin-top: 7px;

        .th-user-link {
          //display: inline-block;
          // cursor: pointer;

          .th-user-btn {
            color: inherit;
          }
        }
      }
    }
  }
}

.th-user-avatar-wrapper {
  width: 100%;
  cursor: pointer;
  position: absolute;
  bottom: 60px;
  margin-bottom: 10px;

  .th-user-avatar {
    display: flex;
    flex-direction: row;
    margin: 0 10px;
    border-radius: 5px;

    &:hover {
      background-color: #f8f8f8;
    }

    .th-user-avatar-icon {
      margin: 6px;
    }

    .th-user-avatar-icon-collapsed {
      margin: 6px 6px;
    }

    .th-user-avatar-username {
      margin: 6px 0;
      display: flex;
      flex-direction: column;
    }

  }

}

.th-user-avatar-big {
  margin-right: 27px;
}
</style>
