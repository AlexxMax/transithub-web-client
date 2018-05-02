<template>
  <el-row>
    <el-table :data="orders" stripe style="width: 100%">
      <el-table-column prop="created_at" label="Дата та час створення замовлення" width="270">
      </el-table-column>
      <el-table-column prop="owner" label="Власник" width="155">
      </el-table-column>
      <el-table-column prop="client" label="Клієнт" width="155">
      </el-table-column>
      <el-table-column prop="point_from_name" label="Пункт завантаження" width="195">
      </el-table-column>
      <el-table-column prop="point_to_name" label="Пункт розвантаження" width="195">
      </el-table-column>
      <el-table-column prop="warehouse_from_name" label="Склад завантаження" width="260">
      </el-table-column>
      <el-table-column prop="warehouse_to_name" label="Склад розвантаження" width="260">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  computed: {
    orders: function() {
      return this.$store.state.orders.list.slice();
    }
  }
};
</script>

<style scoped>
/* .el-table .cell {
  word-break: break-word !important;
} */
</style>
