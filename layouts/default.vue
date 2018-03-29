<template>
  <div>
    <el-header>
      <el-menu
        :router="true"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1" :route="$i18n.path('')">
          TransitHub
        </el-menu-item>
        <el-menu-item index="2" :route="$i18n.path('orders')">
          {{ $t('links.documents.orders') }}
        </el-menu-item>
        <el-menu-item index="3" :route="$i18n.path('goods')">
          {{ $t('links.catalogs.goods') }}
        </el-menu-item>

        <el-menu-item index="4" class="el-menu-item-right" :route="$i18n.path('')">
          {{ $t('links.system.login') }}
        </el-menu-item>

        <el-menu-item index="4" class="el-menu-item-right" v-if="$i18n.locale === 'en'" :route="localeRouth('ua')">
          {{ $t('links.system.locales.ukraine') }}
        </el-menu-item>
        <el-menu-item index="4" class="el-menu-item-right" v-else :route="localeRouth('en')">
          {{ $t('links.system.locales.english') }}
        </el-menu-item>
      </el-menu>
    </el-header>

    <el-container>
      <el-main>
        <nuxt></nuxt>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
#nav-logo {
  // color: grey;
  font-weight: 600;
}

.el-header {
  padding: 0;
  text-align: center;
  line-height: 60px;
}

.el-menu-item-right {
  float: right;
}
</style>

<script>
export default {
  methods: {
    localeRouth: function(locale) {
      const currentLocale = this.$store.state.locale;
      return this.$route.fullPath.replace(`/${currentLocale}/`, `/${locale}/`);
    }
  }
};
</script>
