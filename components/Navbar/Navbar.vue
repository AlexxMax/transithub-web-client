<template>
  <el-menu :router="true" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class="th-navbar">
    <el-menu-item index="1" :route="$i18n.path('workspace')">
      <span>TransitHub</span>
    </el-menu-item>

    <el-submenu index="1" class="el-menu-item-left">
      <template slot="title"></template>
      <el-menu-item class="th-companies-list" v-for="(company, index) in companies.list" :key="index">
        {{company.name}}
      </el-menu-item>
    </el-submenu>

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
export default {
  methods: {
    localeRouth: function(locale) {
      const currentLocale = this.$store.state.locale;
      return this.$route.fullPath.replace(`/${currentLocale}/`, `/${locale}/`);
    },
    logout: async function() {
      this.$nuxt.layoutName = "public";
      await this.$store.dispatch("user/userLogout");
      window.location.reload(true);
    }
  },

  computed: {
    username: function() {
      return this.$store.getters["user/username"];
    },

    companies: function() {
      return this.$store.state.companies;
    }
  }
};
</script>

<style lang="scss" scoped>
#nav-logo {
  font-weight: 600;
}

.el-menu-item-right {
  float: right;
}
</style>
