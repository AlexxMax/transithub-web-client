<template>
  <el-row>
    <el-table :data="requests" :default-sort = "{prop: 'number', order: 'ascending'}" stripe style="width: 100%" height="78vh" @row-click="rowClick">
      <el-table-column prop="number" label="№" width="90" sortable fixed>
      </el-table-column>
      <el-table-column prop="carrier_name" label="Перевізник" width="350">
      </el-table-column>
      <el-table-column prop="date" label="Дата" width="350">
      </el-table-column>
      <el-table-column prop="logist_name" label="Автор" width="350">
      </el-table-column>
      <el-table-column prop="client_name" label="Замовник" width="350">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  props: {
    requests: {
      type: Array,
      required: true
    }
  },

  methods: {
    rowClick: function(row) {
      this.$router.push(`/workspace/requests/${row.guid}`);
    }
  }
};
</script>

<style scoped>
.el-table {
  display: block;
}
</style>
