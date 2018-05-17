<template>
  <el-container>
    <el-header>
      <Navbar />
    </el-header>

    <el-container>
      <el-aside width="/* width: 100px; */">
        <Navmenu />
      </el-aside>
      
      <el-main>
        <nuxt></nuxt>
      </el-main>
    </el-container>
  </el-container>
  
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import Navmenu from "@/components/Navmenu/Navmenu";

export default {
  components: {
    Navbar,
    Navmenu
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  line-height: 60px;
}

// .el-main {
//   padding-bottom: 0px !important;
// }
</style>

