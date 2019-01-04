<template>
  <el-container>
    <!-- <el-container> -->
      <el-aside width="/* width: 100px; */">
        <Navmenu />
      </el-aside>

      <el-main>
        <div>
          <nuxt></nuxt>
        </div>

        <CompanyCreateNew @close="$store.dispatch('companies/showCreateNewDialog', false)"/>
      </el-main>
    <!-- </el-container> -->
  </el-container>

</template>

<script>
import Navmenu from '@/components/Navmenu/Navmenu'
import CompanyCreateNew from '@/components/Companies/CompanyCreateNew'

export default {
  components: {
    Navmenu,
    CompanyCreateNew
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


// .el-main {
//   padding-bottom: 0px !important;
// }
</style>

