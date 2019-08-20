<template>
  <div id="wrapper">
    <el-header>
      <TopNavmenu />
    </el-header>

    <el-main>
      <nuxt></nuxt>
    </el-main>

    <el-footer>
      <BottomNavmenu />
    </el-footer>
  </div>
</template>

<script>
import TopNavmenu from "@/components/DriverWorkspace/Navmenu/TopNavmenu"
import BottomNavmenu from "@/components/DriverWorkspace/Navmenu/BottomNavmenu"

export default {
  components: {
    TopNavmenu,
    BottomNavmenu
  }
}
</script>

<style lang="scss" scoped>
#wrapper {
  color: $--main-text-color;
  max-width: 600px;
}

.el-header, .el-footer {
  padding: 0 !important;
  height: 55px !important;
}

.el-main {
  padding: 0 !important;
}

.el-footer {
  position: absolute;
  bottom: 0;
}
</style>