<template>
  <el-container>
    <el-header style="height: 60px">
      <Navmenu/>
    </el-header>

    <el-main>
      <div>
        <nuxt></nuxt>
      </div>

      <CompanyCreateNew @close="$store.dispatch('companies/showCreateNewDialog', false)"/>
      <RailwayAggregationCreateNew/>
    </el-main>

    <Cookies/>
  </el-container>
</template>

<script>
import Navmenu from "@/components/Navmenu/Navmenu";
import CompanyCreateNew from "@/components/Companies/CompanyCreateNew";
import Cookies from "@/components/Common/Cookies";
import RailwayAggregationCreateNew from '@/components/RailwayAggregations/CreateNewDialog'

export default {
  components: {
    Navmenu,
    CompanyCreateNew,
    Cookies,
    RailwayAggregationCreateNew
  },

  data() {
    return {
      visibleNewCompanyDialog: false
    };
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
</style>

