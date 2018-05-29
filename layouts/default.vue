<template>
  <el-container>
    <!-- <el-header height="60px">
      <Navbar />
    </el-header> -->

    <el-container>
      <el-aside width="/* width: 100px; */">
        <th-navmenu />
      </el-aside>

      <el-main>
        <div class="th-main">
          <nuxt></nuxt>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
// import Navbar from "@/components/Navbar/Navbar";
import Navmenu from "@/components/Navmenu/Navmenu";

export default {
  components: {
    // Navbar,
    "th-navmenu": Navmenu
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  line-height: 60px;
}

.th-main {
  // margin-left: 64px;
}

// .el-main {
//   padding-bottom: 0px !important;
// }
</style>

