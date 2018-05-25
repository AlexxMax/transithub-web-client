<template>
  <el-row>
    <el-table :data="vehicles" stripe style="width: 100%" height="78vh" @row-click="rowClick">
      <el-table-column prop="v_number_slug" label="Номерний знак" width="180" fixed>
      </el-table-column>
      <el-table-column prop="tech_passport" label="Тех паспорт" width="265">
      </el-table-column>
      <el-table-column prop="kind" label="Різновид" width="265">
      </el-table-column>
      <el-table-column prop="gross" label="Брутто" width="265">
      </el-table-column>
      <el-table-column prop="net" label="Нетто" width="265">
      </el-table-column>
      <el-table-column prop="cargo_capacity" label="Вантажомісткість" width="265">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  props: {
    vehicles: {
      type: Array,
      required: true
    }
  },

  methods: {
    rowClick: function(row) {
      this.$router.push(`/workspace/vehicles/${row.guid}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.th-btn-delete {
  margin-left: 10px;
}
</style>

