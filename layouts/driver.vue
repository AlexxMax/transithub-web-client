<template>
  <div id="wrapper">
    <el-header>
      <TopNavmenu />
    </el-header>

    <div class="DriverWorkspace mobile-driver-workspace__container">
      <el-main>
        <nuxt></nuxt>
      </el-main>
    </div>

    <el-footer v-if="bottomNavmenuVisible">
      <BottomNavmenu />
    </el-footer>

    <Actionsheet
      v-model="actionsheet.visible"
      :items="actionsheet.items"
      @close="$methods.driver.setActionsheet(false)"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import TopNavmenu from "@/components/DriverWorkspace/Navmenu/TopNavmenu"
import BottomNavmenu from "@/components/DriverWorkspace/Navmenu/BottomNavmenu"

import Actionsheet from "@/components/DriverWorkspace/Actionsheet"

export default {
  components: {
    TopNavmenu,
    BottomNavmenu,

    Actionsheet
  },

  computed: {
    ...mapState({
      bottomNavmenuVisible: state => state.driver.workspace.bottomNavmenuVisible,
      actionsheet: state => state.driver.workspace.actionsheet
    })
  },

  mounted() {
    if (process.browser) {
      const body = document.getElementsByTagName('body')[0]
      body.classList.add('user-is-driver')
    }
  },
}
</script>

<style lang="scss" scoped>
#wrapper {
  color: $--main-text-color;
}

.DriverWorkspace {
  margin: 0 auto;
}

.el-header, .el-footer {
  padding: 0 !important;
  height: 55px !important;
}

.el-main {
  padding: 0 !important;
}

.el-footer {
  position: sticky;
  bottom: 0;
}
</style>
