<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="th-breadcrumbs">
    <el-breadcrumb-item class="th-breadcrumbs-item" v-for="(_path, i) in paths" :key="i" :to="{ path: `/workspace/${_path}` }">{{ _path }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    let paths = this.$route.fullPath.split('/')
    paths.splice(0, 3)
    if (paths[paths.length -1] === '') {
      paths.splice(paths.length -1, 1)
    }
    return {
      paths
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
