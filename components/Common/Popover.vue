<template>
  <div>
    <el-popover placement="right" width="220" size="40" trigger="click">
      <div class="th-user-card">
        <th-user-avatar/>

        <div class="th-username">
          <span>{{username}}</span>
        </div>

        <el-row>
          <el-col :span="12">
            <div class="th-user-link">
              <i class="fas fa-user"></i>
              <nuxt-link class="th-link" to="/workspace/profile">
                {{ $t('links.system.profile') }}
              </nuxt-link>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="th-user-link" style="margin-left: 10px;">
              <i class="fas fa-sign-out-alt"></i>
              <span class="th-link" @click="logout">{{ $t('links.system.logout') }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <th-user-avatar slot="reference" />
    </el-popover>
  </div>
</template>

<script>
import User from "@/components/Common/User";

export default {
  components: {
    "th-user-avatar": User
  },

  computed: {
    username: function() {
      return this.$store.getters["user/username"];
    }
  },

  methods: {
    logout: async function() {
      this.$nuxt.layoutName = "public";
      await this.$store.dispatch("user/userLogout");
      window.location.reload(true);
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

  .th-user-link {
    //display: inline-block;
    margin-top: 30px;
    cursor: pointer;

    .th-link:nth-child(2) {
      color: #606266;
      margin-left: 3px;

      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
