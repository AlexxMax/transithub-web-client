<template>
  <el-popover placement="right" width="220" size="40" trigger="click">
    <div class="th-user-card">
      <th-user-avatar
        slot="reference"
        :name="username"
        class="th-user-avatar-big"
        :size="140"
        :shadow=false
        :cursor=false />

      <div class="th-username">
        <span>{{username}}</span>
      </div>

      <div class="th-user-links">
        <el-row>
          <el-col :span="12">
            <div class="th-user-link">
              <el-button size="small" @click="$router.push($i18n.path('user/profile'))">
                {{ $t('links.system.profile') }}
              </el-button>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="th-user-link" style="margin-left: 10px;">
              <el-button size="small">
                <span class="th-link" @click="logout">{{ $t('links.system.logout') }}</span>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <th-user-avatar slot="reference" :name="username" class="th-user-avatar" :size="30" />
  </el-popover>
</template>

<script>
import Avatar from "@/components/Common/Avatar.vue"

export default {
  components: {
    "th-user-avatar": Avatar
  },

  computed: {
    username: function() {
      return this.$store.getters["user/username"]
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
.th-user-card {
  text-align: center !important;
  padding: 10px 0;
  cursor: default;

  .th-username {
    margin-top: 15px;
    font-size: 16px;
    text-transform: capitalize;
  }

  .th-user-links {
    margin: 10px -12px -12px -12px;
    border-top: 1px solid rgb(231, 232, 236);
    padding: 15px 0 5px;

    .th-user-link {
      //display: inline-block;
      cursor: pointer;

      .th-link {
        color: inherit;
      }
    }
  }
}

.th-user-avatar {
  position: absolute;
  bottom: 60px;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.th-user-avatar-big {
  margin: auto;
  width: 140px;
}
</style>
