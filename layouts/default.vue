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
      <DriverCreateNew/>
      <!-- <VehicleEditDialog/> -->
      <VehicleCreateNew/>
      <!-- <DriverEditDialog/> -->
      <PQParkingCreateNewDialog/>
      <OrganisationEditDialog/>
    </el-main>

    <Cookies/>
  </el-container>
</template>

<script>
import Navmenu from "@/components/Navmenu/Navmenu";
import CompanyCreateNew from "@/components/Companies/CompanyCreateNew";
import Cookies from "@/components/Common/Cookies";
import RailwayAggregationCreateNew from "@/components/RailwayAggregations/CreateNewDialog";
import DriverCreateNew from "@/components/Drivers/CreateNewDialog";
import VehicleCreateNew from "@/components/Vehicles/CreateNewDialog";
import PQParkingCreateNewDialog from "@/components/PQParkings/PQParkingCreateNewDialog";
// import VehicleEditDialog from "@/components/Vehicles/VehicleEditDialog";
// import DriverEditDialog from "@/components/Drivers/DriverEditDialog";
import OrganisationEditDialog from "@/components/Organisations/OrganisationEditDialog";

export default {
  components: {
    Navmenu,
    CompanyCreateNew,
    Cookies,
    RailwayAggregationCreateNew,
    // VehicleEditDialog,
    // DriverEditDialog,
    OrganisationEditDialog,
    DriverCreateNew,
    VehicleCreateNew,
    PQParkingCreateNewDialog
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
</style>

