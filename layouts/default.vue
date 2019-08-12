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
      <OrganisationEditDialog/>

      <!-- PQWarehouses -->
      <PQWarehousesPattern
        create
        :visible.sync="isDialogPQWarehouses"
        @close="isDialogPQWarehouses = false"
      />

      <PQWarehousesParking />

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
// import VehicleEditDialog from "@/components/Vehicles/VehicleEditDialog";
// import DriverEditDialog from "@/components/Drivers/DriverEditDialog";
import OrganisationEditDialog from "@/components/Organisations/OrganisationEditDialog";

import PQWarehousesPattern from '@/components/PQWarehouses/PQWarehousesPattern'
import PQWarehousesParking from '@/components/PQWarehouses/PQWarehousesParking'

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
    PQWarehousesPattern,
    PQWarehousesParking
  },

  computed: {
    isDialogPQWarehouses: {
      get() { return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].isShowCreateDialog },
      set(value) { this.$store.commit(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_MUTATIONS_KEYS.IS_SHOW_CREATE_DIALOG}`, value) }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
</style>
