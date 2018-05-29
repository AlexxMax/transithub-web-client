<template>
  <el-menu :router="true" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class="th-navbar">
    <el-menu-item index="1" :route="$i18n.path('workspace')">
      <span class="th-main-logo">TransitHub</span>
    </el-menu-item>

    <th-company-select></th-company-select>

    <el-submenu index="99" class="el-menu-item-right">
      <template slot="title">{{ username }}</template>
      <el-menu-item index="99-1" :route="$i18n.path('workspace/profile')">
        {{ $t('links.system.profile') }}
      </el-menu-item>
      <el-menu-item index="99-2" @click="logout">
        {{ $t('links.system.logout') }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import CompanySelect from '@/components/Navbar/CompanySelect'

export default {
  components: {
    "th-company-select": CompanySelect
  },

  methods: {
    logout: async function() {
      this.$nuxt.layoutName = "public";
      await this.$store.dispatch("user/userLogout");
      window.location.reload(true);
    }
  },

  computed: {
    username: function() {
      return this.$store.getters["user/username"];
    }
  }
};
</script>

<style lang="scss" scoped>
#nav-logo {
  font-weight: 600;
}

.th-main-logo {
  font-weight: 600
}

.el-menu-item-right {
  float: right;
}
</style>
