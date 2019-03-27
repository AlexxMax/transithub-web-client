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

      <RailwayAggregationEditForm creation/>

      <InaccessibleFunctionality
        ref="inaccessible-functionality-railway-aggregations-create-new"
        :text="$t('forms.common.inaccessibleFunctionalityRailwayAggregationsCreateWithoutCompany')"
        no-login-btn
      >
        <Button
          style="margin-top: 30px"
          type="primary"
          round
          @click="handleCreateCompany"
        >{{ $t('links.navmenu.company.createNewCompany') }}</Button>
      </InaccessibleFunctionality>
    </el-main>

    <Cookies/>
  </el-container>
</template>

<script>
import Button from "@/components/Common/Buttons/Button";
import Navmenu from "@/components/Navmenu/Navmenu";
import CompanyCreateNew from "@/components/Companies/CompanyCreateNew";
import Cookies from "@/components/Common/Cookies";
import RailwayAggregationEditForm from "@/components/RailwayAggregations/RailwayAggregationEditForm";
import InaccessibleFunctionality from "@/components/Common/InaccessibleFunctionality";

export default {
  components: {
    Button,
    Navmenu,
    CompanyCreateNew,
    Cookies,
    RailwayAggregationEditForm,
    InaccessibleFunctionality
  },

  data() {
    return {
      visibleNewCompanyDialog: false
    };
  },

  computed: {
    showInaccessibleFunctionality() {
      return this.$store.state.railwayAggregations.createNew
        .showInaccessibleFunctionality;
    }
  },

  methods: {
    handleCreateCompany() {
      this.$store.dispatch("companies/showCreateNewDialog", true);
      this.$store.commit(
        "railwayAggregations/SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY",
        false
      );
    }
  },

  watch: {
    showInaccessibleFunctionality() {
      const inaccessibleFunctionality = this.$refs[
        "inaccessible-functionality-railway-aggregations-create-new"
      ];
      if (this.showInaccessibleFunctionality) {
        inaccessibleFunctionality.show();
      } else {
        inaccessibleFunctionality.hide();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
</style>

