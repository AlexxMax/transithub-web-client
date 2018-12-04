<template>
  <el-container>
    <!-- <el-container> -->
      <el-aside width="/* width: 100px; */">
        <Navmenu />
      </el-aside>

      <el-main>
        <div class="th-main">
          <nuxt></nuxt>
        </div>

        <DialogNewCompany
          :visible="$store.state.companies.showCreateNewDialog"
          @close="$store.dispatch('companies/showCreateNewDialog', false)" />
      </el-main>
    <!-- </el-container> -->
  </el-container>

</template>

<script>
import Navmenu from '@/components/Navmenu/Navmenu'
import DialogNewCompany from '@/components/Companies/DialogNewCompany/DialogNewCompany'

export default {
  components: {
    Navmenu,
    DialogNewCompany
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

