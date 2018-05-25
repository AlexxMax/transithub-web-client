<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="th-breadcrumbs">
    <el-breadcrumb-item class="th-breadcrumbs-item" v-for="({ name, path }, i) in breadcrumbs" :key="i" :to="{ path }">{{ name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  data() {
    return {
      breadcrumbs: this.generateBreadcrumbs()
    }
  },

  mounted() {
    EventBus.$on('update-breadcrumbs', () => {
      this.breadcrumbs = this.generateBreadcrumbs()
    })
  },

  methods: {
    generateBreadcrumbs: function() {
      const breadcrumbs = []
      const routePaths = this.$route.fullPath.split('/')
      const locale = this.$store.state.locale
      let oldPath = ''
      let oldName = ''
      for (const routePath of routePaths) {
        if (routePath) {
          if (routePath !== locale && routePath !== 'workspace') {
            const name = routePath === this.$route.params.guid ? this.$store.getters[`${oldName}/getBreadcrumb`](this.$route.params.guid) : routePath
            if (name) {
              breadcrumbs.push({
                name,
                path: oldPath + '/' + routePath
              })
              oldName = routePath
            }
          }
          oldPath = oldPath + '/' + routePath
        }
      }
      return breadcrumbs
    }
  }
}
</script>

<style lang="scss">
.th-breadcrumbs {
  margin-bottom: 20px;

  .th-breadcrumbs-item {
    text-transform: capitalize;
  }
}
</style>
