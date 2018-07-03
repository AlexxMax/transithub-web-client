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

        <th-company-dialog-new
          :visible="$store.state.companies.showCreateNewDialog"
          @close="$store.dispatch('companies/showCreateNewDialog', false)" />
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
// import Navbar from "@/components/Navbar/Navbar";
import Navmenu from "@/components/Navmenu/Navmenu"
import DialogNewCompany from '@/components/Companies/DialogNewCompany/DialogNewCompany'

export default {
  components: {
    // Navbar,
    "th-navmenu": Navmenu,
    "th-company-dialog-new": DialogNewCompany
  },

  data() {
    return {
      visibleNewCompanyDialog: false
    }
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

