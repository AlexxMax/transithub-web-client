<template>
  <div>
    <el-menu-item v-for="(navlink, index) in navlinks" :key="navlink.id" :index="index.toString()">
      <a :href="navlink.link">
        <i :class="'fas ' + navlink.icon"></i>
      </a>
      <span slot="title">{{navlink.title}}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  computed: {
    navlinks: function() {
      return this.$store.state.navmenu.list.slice();
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #606266;
}
</style>

