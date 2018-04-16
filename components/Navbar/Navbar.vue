<template>
  <el-header>
    <el-menu :router="true" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1" :route="$i18n.path('workspace')">
        TransitHub
      </el-menu-item>
      <el-menu-item index="2" :route="$i18n.path('orders')">
        {{ $t('links.documents.orders') }}
      </el-menu-item>
      <el-menu-item index="3" :route="$i18n.path('goods')">
        {{ $t('links.catalogs.goods') }}
      </el-menu-item>

      <el-submenu index="4" class="el-menu-item-right">
        <template slot="title">{{ username }}</template>
        <el-menu-item index="4.2" :route="$i18n.path('profile')">
          {{ $t('links.system.profile') }}
        </el-menu-item>
        <el-menu-item index="4.2" @click="logout">
          {{ $t('links.system.logout') }}
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="5" class="el-menu-item-right" v-if="$i18n.locale === 'en'" :route="localeRouth('ua')">
        {{ $t('links.system.locales.ukraine') }}
      </el-menu-item>
      <el-menu-item index="5" class="el-menu-item-right" v-else :route="localeRouth('en')">
        {{ $t('links.system.locales.english') }}
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  methods: {
    localeRouth: function(locale) {
      const currentLocale = this.$store.state.locale;
      return this.$route.fullPath.replace(`/${currentLocale}/`, `/${locale}/`);
    },
    logout: async function() {
      this.$nuxt.layoutName = 'public'
      await this.$store.dispatch('user/userLogout')
      window.location.reload(true)
    }
  },

  computed: {
    username: function() {
      return this.$store.getters['user/username']
    }
  }
}
</script>

<style lang="scss" scoped>
#nav-logo {
  // color: grey;
  font-weight: 600;
}

.el-header {
  padding: 0;
  //text-align: center;
  line-height: 60px;
}

.el-menu-item-right {
  float: right;
}
</style>
