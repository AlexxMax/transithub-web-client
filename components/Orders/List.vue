<template>
  <el-row>
    <el-table :data="orders" :default-sort = "{prop: 'number', order: 'ascending'}" stripe style="width: 100%" height="78vh" @row-click="rowClick">
      <el-table-column prop="number" label="№" width="70" sortable fixed>
      </el-table-column>
      <el-table-column prop="created_at" label="Дата та час створення замовлення" width="265">
      </el-table-column>
      <el-table-column prop="owner" label="Власник" width="135">
      </el-table-column>
      <el-table-column prop="client" label="Клієнт" width="135">
      </el-table-column>
      <el-table-column prop="point_from_name" label="Пункт завантаження" width="180">
      </el-table-column>
      <el-table-column prop="point_to_name" label="Пункт розвантаження" width="180">
      </el-table-column>
      <el-table-column prop="warehouse_from_name" label="Склад завантаження" width="265">
      </el-table-column>
      <el-table-column prop="warehouse_to_name" label="Склад розвантаження" width="265">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true
    }
  },

  methods: {
    rowClick: function(row) {
      this.$router.push(this.$i18n.path(`workspace/orders/${row.guid}`))
    }
  }
};
</script>

<style scoped>
/* .el-table .cell {
  word-break: break-word !important;
} */

.el-table {
  display: block;
}
</style>
