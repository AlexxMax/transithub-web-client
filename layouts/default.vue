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
      <PQQueueCreateNewDialog/>
      <OrganisationEditDialog/>

      <!-- PQWarehouses -->
      <PQWarehousesCreateNewDialog />

      <PQWarehousesParkings />
      <PQWarehousesParkingsNotSubordinateDialog />
      <PQWarehousesQueues />

    </el-main>

    <Cookies/>
  </el-container>
</template>

<script>
import {
  STORE_MODULE_NAME as PQ_WAREHOUSES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_WAREHOUSES_MUTATIONS_KEYS
} from '@/utils/pq.warehouses'

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
import PQQueueCreateNewDialog from "@/components/PQQueues/PQQueueCreateNewDialog";

import PQWarehousesCreateNewDialog from '@/components/PQWarehouses/PQWarehousesCreateNewDialog'
import PQWarehousesParkings from '@/components/PQWarehouses/PQWarehousesParkings'
import PQWarehousesParkingsNotSubordinateDialog from '@/components/PQWarehouses/PQWarehousesParkingsNotSubordinateDialog'
import PQWarehousesQueues from '@/components/PQWarehouses/PQWarehousesQueues'


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
    PQWarehousesCreateNewDialog,
    PQWarehousesParkings,
    PQWarehousesParkingsNotSubordinateDialog,
    PQWarehousesQueues,
    PQParkingCreateNewDialog,
    PQQueueCreateNewDialog
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
</style>
